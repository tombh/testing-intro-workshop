#Mocking, Doubles, Stubs

I'm using the terms 'mocking, 'doubles' and 'stubs' pretty much interchangeably here. There are differences, but for the
purposes of an introduction, it's fairly safe to assume they all do the same kind of thing.

##Slow databases
Another advantage of test-driven development is that you can create pretend services to work with.
Say you're struggling with some code that interacts with a long-running database query. And every
time you try something new to fix the problem you have to wait for the query to finish. Wouldn't it
be great if you could stub out the database query and just get it to return the same thing every time?
Then you can just concentrate on fixing the bit of code you're concerned by. This is what is meant by
mocking.

##Integration tests
Of course if you're actually testing the database query then you can't use a pretend one, but that's
fine too, these tests are nearer to what are called integration tests and are important. More on that later.

##Most libraries have mocks
A lot of libraries come with their own testing features (or at least they should!). For instance the
NodeJS Postgres driver has [unit tests](https://github.com/brianc/node-postgres/wiki/Testing#unit-tests)
that [stub out the connection to the database](https://github.com/brianc/node-postgres/blob/master/test/unit/client/test-helper.js).
You can use these too when writing your own tests. Of course some libraries have better docs than
others on how to implement their mocks.

##Mocking HTTP requests

Consider the following code that gets the most starred repo on Github containing cats ([JSFiddle](http://jsfiddle.net/wzAyL/149/));
```js
function bestCatRepo(callback){
  $.ajax({
    url: "https://api.github.com/search/repositories?q=cat&sort=stars&order=desc"
  }).done(function(data) {
    callback(data.items[0]);
  });
}

describe("bestCatRepo()", function() {
  it("should find the best cat repo", function() {
    var complete = false;
    bestCatRepo(function(repo){
      expect(repo.name).toEqual('kittydar');
      expect(repo.description).toEqual('Face detection for cats in JavaScript - demo for a TXJS talk');
      complete = true;
    });
    waitsFor(function(){
      return complete;
    });
  });
});
```

As of July 2014 the above test passed because 'kittydar' is currently the most popular repo about cats. But what if that
were to change? Then the test would fail, even though we hadn't introduced any new code.

##Jasmine-ajax
One solution is to stub out the underlying HTTP request and get it to return a mocked response of our choosing. It would
be pretty complicated to write our own doubles for the `XMLHttpRequest` class. Fortunately, that's already been done for
us with the [jasmine-ajax](https://github.com/pivotal/jasmine-ajax) extension ([JSFiddle](http://jsfiddle.net/wzAyL/148/));

```js
function bestCatRepo(callback){
  $.ajax({
    url: "https://api.github.com/search/repositories?q=cat&sort=stars&order=desc"
  }).always(function(data) {
    callback(data.items[0]);
  });
}

describe("bestCatRepo()", function() {

  // Setup the jasmin-ajax lib to prevent real HTTP requests
  beforeEach(function() {
    jasmine.Ajax.useMock();
  });

  it("should find the best cat repo", function() {
    var complete = false;
    bestCatRepo(function(repo){
      expect(repo.name).toEqual('cat');
      expect(repo.description).toEqual('testing123');
      complete = true;
    });

    // Manually dictate what the fake HTTP request should return
    request = mostRecentAjaxRequest();
    request.response({
      status: 200,
      responseText: '{"items":[{"name":"cat","description":"testing123"}]}'
    });

    waitsFor(function(){
      return complete;
    });
  });
});
```

Note how it is only the *test* that has become more complicated. The original code itself remains completely unchanged.
This is an important rule to try and keep; you should never write code that is used for the sole purpose of testing
environments.

##Hooks
Also note the introduction of the `beforeEach()` hook function. This, along with its siblings like `beforeAll()` and
`afterEach()`, are extremely useful hooks for keeping your tests organised. For example, within a `describe()` block
a `beforeEach()` applies to every `it()` test. They can prevent a lot of repetition and are essential in contributing to
idempotency; ie. the guarantee that tests always run in the same environment. More on that later.

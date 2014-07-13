#Mocking, Doubles, Stubs

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

Consider the following code that gets the most starred repo on Github containing cats ([JSFiddle](http://jsfiddle.net/wzAyL/147/));
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
    }, 'the ajax request to complete');
    waitsFor(function(){
      return complete;
    });
  });
});
```

#Integration tests

As we've been working through these examples we've also been moving through an infamous testing spectrum. Namely
the Unit vs Integration spectrum.

##Units
Unit tests tend to be very specific, often isolating just a single function. Generally speaking, the more unit
tests you have the more likely you are to surface edge cases in your code. This increases the highly sought-after
'code coverage'. You sometimes see 'code coverage' badges on github with a percantage that isn't quite 100%.

Unit tests also run very quickly as they don't involve many moving parts.

##Integration
Integration tests look at your code in a state as near to production as possible. They most often involve user-interaction.
So you might be testing how a CLI program interacts with data. Or what happens on a website when someone clicks something.

By their nature integration tests are testing vast swathes of your code. Often by testing a simple mouse click you put
into motion the entire stack of your application, from database, to MVC logic, to frontend JS and CSS. So they're good value
for money; a lot of code gets tested with a few small tests.

However, integration tests are slow and brittle. I've heard of integration suites that take hours to run. By brittleness I
mean that it can be hard to ensure all the external factors of your system. For instance, what if you're loading jQuery
from an external CDN and that CDN is down?

Let's take a look at some integration-style tests for our cat-based code ([JSFiddle](http://jsfiddle.net/wzAyL/153/));

```html
<div class="wrap">
	<h1>The Best Cat Repo</h1>
	<p>
	    <span class="repo">Loading...</span>:
	    <span class="desc">Loading...</span>
	</p>
	<a href="#" class="catify">Find the cats!</a>
</div>
```
```js
$(function() {
  bestCatRepo(function(repo){
    $('.repo').text(repo.name);
    $('.desc').text(repo.description);
  });
  $('.catify').on('click', function(){
    var repo_cat = findCat($('.repo').text());
    var desc_cat = findCat($('.desc').text());
    $('.repo').text(repo_cat);
    $('.desc').text(desc_cat);
  });
});
```

This code loads the most popular Github cat repo into some HTML. You can then click on a link that finds the word 'cat' in
the name of the repo. And here are some integration tests for it ([JSFiddle](http://jsfiddle.net/wzAyL/154/));

```js
describe("Integration Tests", function() {
  beforeEach(function(){
    waitsFor(function(){
      return $('.repo').text() != 'Loading...';
    });
  });
  it("should load a repo from github", function(){
    expect($('.repo').text()).not.toEqual('Loading...');
  });
  it("should find cats when clicking on the link", function() {
    var original = $('.repo').text();
    $('.catify').click();
    expect($('.repo').text()).not.toEqual(original);
    expect($('.repo').text()).toContain('_');
  });
});
```

Looking at the tests you can see that there are 2 simple things being tested. Firstly, that the Github repo
details get loaded and replace the 'Loading...' text. Secondly, that when the link gets clicked the text changes and
includes at least one underscore. These aren't perfect tests, for instance merely looking for a single underscore
is open to all kinds of possible false positive edge cases. What if an error gets injected into the HTML which itself
contains an underscore? The tests will then pass when in reality something went wrong. Luckily we have some decent
unit tests that would catch out any issues like that.

The lesson here is balance.

##Balance
When thinking about writing tests, the question often comes up of what to test. The reality is that tests are rarely one
thing or the other. Unit-ness and integration-ness are more like flavours and it's up to you to get a feel for how specific
or generic to be. But you'll always be better off with a mix. If you can get some decent tests for each part of the spectrum
you're likely to have a useful and reliable suite.

##Headless browsers
Generally speaking you won't want to run your tests in JSFiddle, in fact most of them shouldn't need a browser at all.
However, to run integration tests for a website you have no choice to use a browser, it's the only way to simulate a
production environment. To automate this you will need to use a headless browser. All this means is that you have a browser
that doesn't have any kind of visual interface. It could be run on a remote server somehwere that doesn't even have a
monitor.

There are a lot of headless browsers and frameworks that make it easy to use them. 2 popular projects are;
[PhantomJS](http://phantomjs.org/) and [Selenium](http://docs.seleniumhq.org/)

This is what the above integration tests might look like in Ruby. They would work against the existing JS code we have
written because the tests are talking to the PhantomJS driver;

```ruby
describe 'Cats Integration Tests' do
  before :each do
    visit './lib/cats.html'
  end

  it "should load a repo from github" do
    expect(find('.repo').text).to_not be 'Loading...'
  end

  it "should find cats when clicking on the link" do
    original = find('.repo').text
    find_link('.catify').click
    find('.repo').text
    expect(find('.repo').text).to_not eq original
    expect(find('.repo').text).to include('_')
  end
end
```

#Refactoring

##Whackamole
Refactoring was one of my first moments of testing enlightenment. We've all been there; a bug that's
taken ages to fix and finally we have a fix and we deploy it and are feeling pleased with ourselves.
But then suddenly we realise that our 'fix' has broken something else :(

Consider this 'Find a Cat' code ([JSFiddle](http://jsfiddle.net/wzAyL/146/));
```js
// Replace a particular character specified by 'index' with a new character
function replaceAt(string, index, replacement) {
  // Get the string from the beginning up to index
  var beginning = string.substr(0, index);
  // Get the string from the character after index to the end
  var end = string.substr(index + 1);
  // Glue the pieces together
  return  beginning + replacement + end;
}

// Find the word 'cat' hidden in a string
function findCat(string){
  var cat = ['c', 'a', 't'];
  // Pop off the first letter from the cat array
  var looking_for = cat.shift();
  // Iterate over every character
  for (var i = 0, len = string.length; i < len; i++) {
    // If the current character doesn't match the searched-for character replace it with an underscore
    if(string[i] != looking_for){
      string = replaceAt(string, i, '_');
    }else{
      // There was a match so get the next character to look for
      looking_for = cat.shift();
    }
  }
  return string;
}

describe("findCat()", function() {
  it("should find a simple 'cat'", function() {
    result = findCat('catering');
    expect(result).toEqual('cat_____');
  });

  it("should find a spaced out 'cat'", function() {
    result = findCat('accidentally a test');
    expect(result).toEqual('_c______a______t___');
  });
});
```

But we can make it sooooo much simpler with regex! ([JSFiddle](http://jsfiddle.net/wzAyL/145/))
```js
// Find the word 'cat' hidden in a string
function findCat(string){
  return string.replace(/[^cat]/g, "_");
}

describe("findCat()", function() {
  it("should find a simple 'cat'", function() {
    result = findCat('catering');
    expect(result).toEqual('cat_____');
  });

  it("should find a spaced out 'cat'", function() {
    result = findCat('accidentally a test');
    expect(result).toEqual('_c______a______t___');
  });
});
```

Unfortunately not :( The first spec passes, but the second one doesn't;
```
.F

Failures:

  1) findCat() should find a spaced out 'cat'
   Message:
     Expected 'acc____ta____a_t__t' to equal '_c______a______t___'.
   Stacktrace:
     Error: Expected 'acc____ta____a_t__t' to equal '_c______a______t___'.
    at null.<anonymous> (/home/tombh/Workspace/testing-workshop/spec/find_cat_using_regex_spec.js:14:20)

Finished in 0.007 seconds
2 tests, 2 assertions, 1 failure, 0 skipped
```

##Preventing post-deploy pain
So, our test suite has quickly and easily shown us that our fix wasn't such a good idea. This is a
trivial example. But imagine if there was a lot more code depending on `findCat()`, running a suite
of tests saves a lot of time and a lot of post-deploy pain.
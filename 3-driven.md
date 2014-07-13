#Test-Driven Programming

##CTRL+S, ALT+TAB, F5
We all test, whether we know it or not. Refereshing a page is just a different form of test output.
When we have a test suite, it's actually possible to write code using the tests as the thing we come
back to check that we're doing it right. So CTRL+S, ALT+TAB, UP, RETURN.

Indeed, there's a celebrated movement in the testing world of writing your tests *before* your code.
I've never really done this but apparently a lot of people do. What's interesting about this is that
even without any code a test suite will run completely, it just won't pass any of the tests.

For example [JSFiddle](http://jsfiddle.net/wzAyL/138/);

```js
describe("foo", function() {
  it("has a value of bar", function() {
    expect(foo).toBe('bar');
  });
});

describe("theMeaningOfLife()", function() {
  it("displays the meaning of life", function() {
    expect(theMeaningOfLife()).toBe(42);
  });
});
```

Outputs;
```
FF

Failures:

  1) foo has a value of bar
   Message:
     ReferenceError: foo is not defined
   Stacktrace:
     ReferenceError: foo is not defined
    at null.<anonymous> (/home/tombh/Workspace/testing-workshop/spec/no_code_spec.js:3:12)

  2) theMeaningOfLife() displays the meaning of life
   Message:
     ReferenceError: theMeaningOfLife is not defined
   Stacktrace:
     ReferenceError: theMeaningOfLife is not defined
    at null.<anonymous> (/home/tombh/Workspace/testing-workshop/spec/no_code_spec.js:9:12)

Finished in 0.008 seconds
2 tests, 2 assertions, 2 failures, 0 skipped
```
mar
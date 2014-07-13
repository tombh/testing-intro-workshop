#Introduction To Testing Workshop

##Assumptions
**Focusing on Javascript, but concepts applicable to all languages**

Even though this is an introduction to the topic of software testing in general. For the sake of convenience
we will focus on Javascript. It's the language that most people are likely to have at least
some exposure to. So even though you'll see almost nothing but JS examples here, bear in mind that
most of it should be relevant to other languages.

**Focusing on BDD and Jasmine**

There are many languages and within each language there are many testing frameworks. Again, for the
sake of convenience, we will be working with [Jasmine](http://jasmine.github.io/), which uses the
methodology and syntax from Behaviour Driven Development (BDD). I first learnt to test using Ruby's Rspec
framework, which might explain why I've opted for Jasmine here.

**A typical Jasmine spec ([JSFiddle](http://jsfiddle.net/wzAyL/136/))**
```js
//--- CODE --------------------------
var foo = 'bar';

//--- SPECS -------------------------
describe("foo", function() {
  it("has a value of bar", function() {
    expect(foo).toBe('bar');
  });
});

//--- OUTPUT ------------------------
// foo
//   has a value of bar
```

The other notable testing paradigm besides BDD is Test Driven Development (TDD).

**Test Driven Development example using QUnit ([JSFiddle](http://jsfiddle.net/DuYAc/88/))**
```js
//--- CODE --------------------------
var foo = 'bar';

//--- TESTS -------------------------
test("foo", function () {
    equal(foo, 'bar', "has a value of bar");
});

//--- OUTPUT ------------------------
// 1. foo (0, 1, 1)
//    1. has a value of bar
```

And just out of interest, this is how a similar test might look in PHP;
```php
//--- CODE --------------------------
$foo = 'bar';

//--- TESTS --------------------------
class FooTest extends PHPUnit_Framework_TestCase
{
  public function testFoo()
  {
    $this->assertEquals($foo, 'bar');
  }
}

//--- OUTPUT --------------------------
// OK (1 test, 1 assertion)
```

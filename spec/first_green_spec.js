var foo = 'bar';
function theMeaningOfLife() {
  return 42;
}

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

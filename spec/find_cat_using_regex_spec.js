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

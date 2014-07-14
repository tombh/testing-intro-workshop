// Run these tests with `jasmine-node integration/phantom_test.js`

var phantom = require('phantom');

function loadPage(uri, callback){
  phantom.create(function (ph) {
    ph.createPage(function (page) {
      page.open(uri, function (status) {
        callback(page);
        ph.exit();
      });
    });
  });
}

loadPage("./lib/cats.html", function(page){
  function $(selector, callback){
    page.evaluate(function(){
      return document.querySelector(selector);
    }, function(result){
      callback(result);
    });
  }
  $('.repo', function(element){
    console.log(element.innerText);
  });
});

// describe("Integration Tests", function() {
//   beforeEach(function(){
//     waitsFor(function(){
//       return $('.repo').text() != 'Loading...';
//     });
//   });
//   it("should load a repo from github", function(){
//     expect($('.repo').text()).not.toEqual('Loading...');
//   });
//   it("should find cats when clicking on the link", function() {
//     var original = $('.repo').text();
//     $('.catify').click();
//     expect($('.repo').text()).not.toEqual(original);
//     expect($('.repo').text()).toContain('_');
//   });
// });

Template.homePage.onRendered(function() {
  setTimeout(function() {
    foo();
  }, 3500);
});

function foo() {
  $('#text-shape').shape('flip up');
  setTimeout(foo, 3500);
}

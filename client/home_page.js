Template.homePage.onRendered(function() {

});

function foo() {
  $('#text-shape').shape('flip up');
  setTimeout(foo2, 3500);
}

function foo2() {
  $('#text-shape').shape('flip up');
  setTimeout(foo3, 3500);
}

function foo3() {
  $('#text-shape').shape('flip down');
}

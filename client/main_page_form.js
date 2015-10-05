Template.mainPageForm.onRendered(function() {

});

var searchBox;
var searchBox2;
var input;
var input2;

Template.mainPageForm.onCreated(function() {
  GoogleMaps.ready('exampleMap', function(map) {
    input = document.getElementById('from-input');
    searchBox = new google.maps.places.SearchBox(input);
    input2 = document.getElementById('to-input');
    searchBox2 = new google.maps.places.SearchBox(input2);
  });
});

Template.mainPageForm.helpers({
  exampleMapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 9
      };
    }
  }
});

Template.mainPageForm.events({
  'submit form': function(e) {
    e.preventDefault();
    var from = input.value;
    var to = input2.value;
    if(from.length === 0 || to.length === 0) {
      return;
    }
    console.log(from);
    console.log(to);
    Router.go('search', {search: 'search'}, {query: 'from=' + from + '&to=' + to});
  }
});

var geocoder;
var infowindow;
var directionsService;
var globalMap;

Template.homePageMap.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    Session.set('mapReady', true);
    // Add a marker to the map once it's ready
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        map.instance.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
      });
      geocoder = new google.maps.Geocoder;
      infowindow = new google.maps.InfoWindow;
      directionsService = new google.maps.DirectionsService;
      globalMap = map.instance;
    }
  });
});

Template.homePageMap.helpers({
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 14
      };
    }
  },
  pools: function() {
    return Pools.find();
  },
  drawRoute: function(start, end) {
    if(Session.get('mapReady'))
      calculateAndDisplayRouteHomePage(start, end, globalMap);   
  }
});

function calculateAndDisplayRouteHomePage(startLocation, endLocation, map) {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);
  directionsService.route({
    origin: startLocation,
    destination: endLocation,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

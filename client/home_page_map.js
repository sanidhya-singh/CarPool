var geocoder;
var infowindow;
var directionsService;
var globalMap;

Template.homePageMap.onCreated(function() {
  Session.set('mapReady', false);
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
        zoom: 9
      };
    }
  },
  pools: function() {
    return Pools.find();
  },
  drawRoute: function(start, end) {
    if(Session.get('mapReady')) {
      calculateAndDisplayRouteHomePage(start, end, globalMap);
      $('#home-page-loader').removeClass('active');
    }
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
      //var path = response.routes[0].overview_path;
      //drawPath(path, map);
      directionsDisplay.setDirections(response);
      directionsDisplay.addListener('click', function(event) {
        console.log('You clicked on a route');
      });
    } else {
      console.log('Directions request failed due to ' + status);
    }
  });
}

function drawPath(path, map) {
  var pathOptions = {
       path: path,
       strokeColor: "#"+((1<<24)*Math.random()|0).toString(16),
       strokeWeight: 5,
       opacity: 0.00001,
       map: map
     }
     if(Session.get('mapReady')) {
      routePolyline = new google.maps.Polyline(pathOptions);
      routePolyline.addListener('click', function(event) {
        console.log('You clicked on a Polyline');
      });
    }
}

var geocoder;
var infowindow;
var directionsService;
var globalMap;
var directionsDisplay;

Template.poolPage.helpers({
  notOwnPost: function() {
    if(Meteor.userId() !== this.author) {
      return true;
    }
    return false;
  },
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
  drawRoute: function(start, end) {
    if(Session.get('poolPageMapReady')) {
        calculateAndDisplayRoutePoolPage(start, end, globalMap);
        $('#pool-page-loader').removeClass('active');
    }
  },
  getDP: function() {
    var author = Meteor.users.findOne(this.author);
    if(author) {
      return author.profile.image;
    }
    return '/images/photo.png';
  },
  requested: function() {
    console.log(this.author);
    if(PoolRequest.findOne({postId: this._id, requestId: Meteor.userId()})) {
      return true;
    }
    return false;
  }
});

Template.poolPage.onCreated(function() {
  Session.set('poolPageMapReady', false);
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    Session.set('poolPageMapReady', true);
    // Add a marker to the map once it's ready
      geocoder = new google.maps.Geocoder;
      infowindow = new google.maps.InfoWindow;
      directionsService = new google.maps.DirectionsService;
      directionsDisplay = new google.maps.DirectionsRenderer;
      globalMap = map.instance;
    }
  );
});

function calculateAndDisplayRoutePoolPage(startLocation, endLocation, map) {
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

Template.poolPage.events({
  'click .requested': function(e) {
    console.log('Request sent');
    var request = {
      postId: this._id,
      authorId: this.author
    }
    Meteor.call('poolRequestInsert', request, function(err, res) {
      if(err) {
        alert('An error occured');
      } else {
        alert('Request submitted successfully');
      }
    });
  }
});

var marker;
var geocoder;
var infowindow;
var directionsService;
var directionsDisplay;

var input1;
var input2;

var startMarker;
var endMarker;

var startCoordinates;
var endCoordinates;

Template.newPool.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  Session.set('start', null);
  Session.set('end', null);
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    input1 = document.getElementById('start-box');
    input2 = document.getElementById('end-box');
    var searchBox1 = new google.maps.places.SearchBox(input1);
    var searchBox2 = new google.maps.places.SearchBox(input2);
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        map.instance.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
        $('#new-pool-loader').removeClass('active');
        geocoder = new google.maps.Geocoder;
        infowindow = new google.maps.InfoWindow;
        directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map.instance);
        directionsDisplay.setPanel(document.getElementById('right-panel'));
      });
    }
  });
});

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function calculateAndDisplayRoute() {
  directionsService.route({
    origin: input1.value,
    destination: input2.value,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      document.getElementById('distance-box').value = response.routes[0].legs[0].distance.value/1000;
      document.getElementById('duration-box').value = response.routes[0].legs[0].duration.text;
      directionsDisplay.setDirections(response);
      $('#new-pool-loader').removeClass('active');
    } else {
      alert('That\'s too far!');
      $('#new-pool-loader').removeClass('active');
    }
  });
}

function toTimestamp(strDate){
 var datum = Date.parse(strDate);
 return datum/1000;
}

function geocodeStart(address) {
  if(address) {
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            startCoordinates = results[0].geometry.location;
            console.log(startCoordinates);
          } else {
            alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
      });
    }
}

function geocodeEnd(address) {
  if(address) {
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            endCoordinates = results[0].geometry.location;
            console.log(endCoordinates);
          } else {
            alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
      });
    }
}

Template.newPool.helpers({
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 14
      };
    }
  }
});

Template.newPool.onRendered(function() {
  this.$('.datetimepicker').datetimepicker();
  $('.ui.fluid.selection.dropdown')
  .dropdown()
  ;
});


Template.newPool.events({
  'submit form': function(e) {
    e.preventDefault();
    var user = Meteor.user();
    var startLocation = document.getElementById('start-box').value;
    var endLocation = document.getElementById('end-box').value;
    var time = document.getElementById('date-box').value;
    var vehicle = document.getElementById('vehicle-box').value;
    var distance = document.getElementById('distance-box').value;
    var time_taken = document.getElementById('duration-box').value;
    var pool = {
      source: startLocation,
      destination: endLocation,
      time: toTimestamp(time),
      vehicle_type: vehicle,
      customer_id: user.services.google.accessToken,
      source_lat: startCoordinates.lat(),
      source_lng: startCoordinates.lng(),
      destination_lat: endCoordinates.lat(),
      destination_lng: endCoordinates.lng(),
      distance: distance,
      time_taken: time_taken
    }
    var errors = validatePost(pool);
    if (errors.source || errors.destination || errors.vehicle_type || errors.time) {
      return;
    }
    var info = {
      distance: distance,
      type: vehicle
    };
    var extractBase = 'http://128.199.206.145/vigo/v1/bulkFare';
    HTTP.call( 'POST', extractBase, {
      params: info
      }, function(err, resp) {
        console.log(resp.data);
        return resp.data;
    });
    /*Meteor.call('bulkFare', info, function(res) {
      console.log(res);
    });
    Meteor.call('book', pool, function(res) {
      console.log(res);
    });*/
    return;
  },
  'change .startBox': function(e) {
    e.preventDefault();
    if(input1.value.length === 0 || input2.value.length === 0)
      return;
    $('#new-pool-loader').addClass('active');
    geocodeStart(input1.value);
    geocodeEnd(input2.value);
    calculateAndDisplayRoute();

  },
  'change .endBox': function(e) {
    e.preventDefault();
    if(input1.value.length === 0 || input2.value.length === 0)
      return;
    $('#new-pool-loader').addClass('active');
    geocodeStart(input1.value);
    geocodeEnd(input2.value);
    calculateAndDisplayRoute();
  }
});

validatePost = function (pool) {
  var errors = {};

  if (!pool.source) {
    errors.source = "No Travel Desitnation";
    $('#end-field').addClass('error');
  }

  if(!pool.vehicle_type) {
    errors.vehicle_type = "Please choose Vehicle";
    $('#vehicle-field').addClass('error');
  }

  if (!pool.destination) {
    errors.destination =  "No Starting Location";
    $('#start-field').addClass('error');
  }

  if(!pool.time) {
    errors.time = "No Travel Time";
    $('#date-field').addClass('error');
  }
  return errors;
}

var marker;
var geocoder;
var infowindow;
var directionsService;
var directionsDisplay;

Template.newPool.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  Session.set('start', null);
  Session.set('end', null);
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        map.instance.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
        marker = new google.maps.Marker({
          map: map.instance,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: {lat: position.coords.latitude, lng: position.coords.longitude}
        });
        marker.addListener('click', toggleBounce);
        geocoder = new google.maps.Geocoder;
        infowindow = new google.maps.InfoWindow;
        directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map.instance);
        directionsDisplay.setPanel(document.getElementById('right-panel'));
        if(!Session.get('start'))
          getStartLocation(map.instance, {lat: position.coords.latitude, lng: position.coords.longitude});

        google.maps.event.addListener(marker,'dragend',function(event) {
          var newPosition = {
            lat: event.latLng.lat(),
            lng:  event.latLng.lng()
          }
          geocodeLatLng(map.instance, newPosition);
        });
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
    origin: Session.get('start'),
    destination: Session.get('end'),
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function getStartLocation(map, position) {
  if(position) {
      var latlng = {lat: position.lat, lng: position.lng};
      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
            document.getElementById('start-box').value = results[0].formatted_address;
            Session.set('start', results[0].formatted_address);
          } else {
            alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
      });
    }
}


function geocodeLatLng(map, position) {
  if(position) {
      var latlng = {lat: position.lat, lng: position.lng};
      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
            Session.set('end', results[0].formatted_address);
            document.getElementById('end-box').value = results[0].formatted_address;
            calculateAndDisplayRoute();
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
});


Template.newPool.events({
  'submit form': function(e) {
    e.preventDefault();
    var startLocation = document.getElementById('start-box').value;
    var endLocation = document.getElementById('end-box').value;
    var numberOfPersons = document.getElementById('people-box').value;
    var time = document.getElementById('date-box').value;
    var accomodateMore = $('#more-box').is(':checked');
    var pool = {
      start: startLocation,
      end: endLocation,
      numberOfPersons: numberOfPersons,
      people: [Meteor.userId()],
      time: time,
      more: accomodateMore,
      author: Meteor.userId()
    }
    var errors = validatePost(pool);
    if (errors.start || errors.end || errors.numberOfPersons || errors.time) {
      return;
    }
    Meteor.call('poolInsert', pool, function(err, res) {
      if(err) {
        console.log(err);
      }
    });

    Router.go('home');
  }
});

validatePost = function (pool) {
  var errors = {};

  if (!pool.end) {
    errors.end = "No Travel Desitnation";
    $('#end-field').addClass('error');
  }

  if (!pool.start) {
    errors.start =  "No Starting Location";
    $('#start-field').addClass('error');
  }

  if(!pool.time) {
    errors.time = "No Travel Time";
    $('#date-field').addClass('error');
  }

  if(!pool.numberOfPersons) {
    errors.location = "Please specify the number of people";
    $('#people-field').addClass('error');
  }

  return errors;
}

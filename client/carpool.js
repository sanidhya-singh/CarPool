if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Meteor.startup(function(){
      GoogleMaps.load();
  });

  Template.header.events({
    'click .toggleSidebar': function(e) {
      e.preventDefault();
      $('.ui.sidebar')
      .sidebar('toggle');
    }
  });
}

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Meteor.startup(function(){
      GoogleMaps.load();
  });
}

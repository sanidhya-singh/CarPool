Template.header.events({
  'click .toggleSidebar': function(e) {
    e.preventDefault();
    $('#sidebar')
    .sidebar('toggle');
  }
});

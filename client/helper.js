Template.registerHelper('getUserName', function(id) {
  var user = Meteor.users.findOne({_id: id});
  if(user)
    return user.username;
});

Template.registerHelper('getFullName', function(id) {
  var user = Meteor.users.findOne({_id: id});
  if(user)
    return user.profile.firstName + ' ' + user.profile.lastName;
});

Template.registerHelper('getSession', function(name) {
  var variable = Session.get(name);
  if(variable)
    return variable;
});

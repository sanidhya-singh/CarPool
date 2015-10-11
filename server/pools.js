Meteor.methods({
  'poolInsert': function(pool) {
    check(pool, {
      end: String,
      start: String,
      numberOfPersons: String,
      time: String,
      more: Boolean,
      author: String,
      people: Array
    });

    var errors = validatePost(pool);
    if (errors.start || errors.end || errors.numberOfPersons || errors.time) {
      throw new Meteor.Error('invalid-post', "Please ensure that you have filled all the required information.");
      return;
    }

    return Pools.insert(pool);
  },
  'updatePool': function(pool) {
    Pools.update({_id: pool._id}, {$set: pool}, function(err) {
      if(err) {
        console.log('There was an error in accepting the request');
      } else {        
        alert('Request accepted');
      }
    });
  }
});

validatePost = function (pool) {
  var errors = {};

  if (!pool.end)
    errors.end = "No Travel Desitnation";

  if (!pool.start)
    errors.start =  "No Starting Location";

  if(!pool.time)
    errors.time = "No Travel Time";

  if(!pool.numberOfPersons)
    errors.location = "Please specify the number of people";

  return errors;
}

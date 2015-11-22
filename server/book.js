Meteor.methods({
  'book': function(ride_info) {
    var extractBase = 'http://128.199.206.145/vigo/v1/book';
    HTTP.call( 'POST', extractBase, {
    params: ride_info
  }, function( error, response ) {
    if ( error ) {
      console.log( error );
      return error;
    } else {
      console.log( response );
      return response;
    }
  });
  }
});

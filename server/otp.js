Meteor.methods({
  'generateOTP': function(param, user) {
    var extractBase = 'http://128.199.206.145/vigo/v1/CustomerRegistration';
    var info = {
      shareRegId: "abcd",
      customer_id: user.services.google.accessToken,
      name: user.services.google.name,
      contact: param.contact,
      email: user.services.google.email
    }
    HTTP.call('POST', extractBase, {
      params: info
    }, function( error, response ) {
      if ( error ) {
        console.log( error );
        var user_doc = Meteor.users.find(user._id);
        if(user_doc.profile.registered && user_doc.profile.registered === true) {
          HTTP.call('POST', 'http://128.199.206.145/vigo/v1/otp', {
            params: param
          }, function(error, response) {
            if ( error ) {
              console.log( error );
              return error;
            } else {
              console.log( response );
              return response;
            }
          });
        }
      } else {
        console.log( response );
        Meteor.users.update({_id: user._id}, {$set: {"profile.registered": true}});
        HTTP.call('POST', 'http://128.199.206.145/vigo/v1/otp', {
          params: param
        }, function(error, response) {
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
  }
});

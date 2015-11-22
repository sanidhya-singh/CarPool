/*Accounts.onLogin(function(user) {
  if(user.user.profile.registered === false || !user.user.profile.hasOwnProperty('registered')) {
    var extractBase = 'http://128.199.206.145/vigo/v1/CustomerRegistration';
    var info = {
      shareRegId: "abcd",
      customer_id: user.user.services.google.accessToken,
      name: user.user.services.google.name,
      contact: 0000000000,
      email: user.user.services.google.email
    }
    HTTP.call('POST', extractBase, {
      params: info
    }, function( error, response ) {
      if ( error ) {
        user.user.profile.registered = false;
        console.log( error );
      } else {
        user.user.profile.registered = true;
        console.log( response );
      }
    });
  }
});*/

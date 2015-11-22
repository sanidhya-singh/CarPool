Meteor.methods({
  'bulkFare': function(info) {
    var extractBase = 'http://128.199.206.145/vigo/v1/bulkFare';
    HTTP.call( 'POST', extractBase, {
      params: info
      }, function(err, resp) {
        console.log(resp.data);
        return resp.data;
    });
  }
});

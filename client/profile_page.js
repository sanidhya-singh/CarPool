Template.profilePage.events({
  'change .upload-profile-photo': function(event) {
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        if (err){
          alert('Error: ' + error.reason);
        } else {
            // handle success depending what you need to do
          console.log('file inserted');
          var userId = Meteor.userId();
          var imagesURL = {
            "profile.image": "/cfs/files/images/" + fileObj._id
          };
          Meteor.users.update(userId, {$set: imagesURL});
        }
      });
    });
  }
});

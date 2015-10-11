Template.profilePage.events({
  'change .upload-profile-photo': function(event) {
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        if (err){
          console.log('Error: ' + error.reason);
          alert('There was an error, please try again.');
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
  },
  'click .accept': function(e) {
    var pool = Pools.findOne(this.postId);
    pool.people.push(this.requestId);
    console.log(this._id);
    Meteor.call('updatePool', pool, function(err, res) {
      if(err) {
        alert('There was an error in accepting the request');
      } else {
        Meteor.call('removePoolRequest', this._id, function(err1, res1) {
          if(err1) {
            console.log('error: ' + err);
          } else {
            console.log('The pool request was removed');
          }
        });
        alert('Request Successfully accepted');
      }
    });
  },
  'click .reject': function(e) {
    Meteor.call('removePoolRequest', this._id, function(err, res) {
      if(err) {
        console.log('error: ' + err);
      } else {
        console.log('The pool request was removed');
      }
    });
  }
});

Template.profilePage.helpers({
  'poolRequests': function() {
    return PoolRequest.find({authorId: Meteor.userId()});
  },
  'getSource': function(poolId) {
    var pool = Pools.findOne(poolId);
    if(pool) {
      return pool.start;
    }
  },
  'getDestination': function(poolId) {
    var pool = Pools.findOne(poolId);
    if(pool) {
      return pool.end;
    }
  },
  'getDP': function(userId) {
    var user = Meteor.users.findOne(userId);
    if(user && user.profile.image) {
      return user.profile.image;
    }
  },
  'getEmail': function(user) {
    var user = Meteor.user();
    if(user) {
      return user.emails[0].address;
    }
  },
  'havePoolRequests': function() {
    if(PoolRequest.find({authorId: Meteor.userId()}).count() > 0) {
      return true;
    }
    return false;
  },
  'pools': function() {
    return Pools.find();
  },
  'havePools': function() {
    if(Pools.find().count() > 0) {
      return true;
    }
    return false;
  }
});

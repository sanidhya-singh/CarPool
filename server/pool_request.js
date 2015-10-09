Meteor.methods({
  'poolRequestInsert': function(request) {
    check(request, {
      postId: String,
      authorId: String
    });
    var poolRequest = {
      requestId: Meteor.userId(),
      postId: request.postId,
      authorId: request.authorId
    }
    return PoolRequest.insert(poolRequest);  
  }
});

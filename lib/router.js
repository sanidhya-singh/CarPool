Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [
      Meteor.subscribe('users'),
      Meteor.subscribe('requests', Meteor.userId())
    ];
  }
});

SearchController = RouteController.extend({
  template: 'search',
  subscriptions: function() {
    var from = this.params.query.from.split(",");
    var to = this.params.query.to.split(",");
    var fromSearchTerm = ".*" + from[0] + ".*";
    var toSearchTerm = ".*" + to[0] + ".*";
    var options = {$and :[
      {start: {$regex: fromSearchTerm, $options: "i"}},
      {end: {$regex: toSearchTerm, $options: "i"}}
      ]
    }
    return Meteor.subscribe('searchPools', options);
  },
  pools: function() {
    return Pools.find();
  },
  count: function() {
    return Pools.find().count();
  },
  data: function() {
    var from = this.params.query.from.split(",");
    var to = this.params.query.to.split(",");
    return {
      pools: this.pools(),
      from: from[0],
      to: to[0],
      count: this.count()
    }
  }
});

Router.route('/poolPage/:_id', {
  name: 'poolPage',
  template: 'poolPage',
  waitOn: function() {
    return Meteor.subscribe('singlePool', this.params._id);
  },
  data: function() {
    return Pools.findOne(this.params._id);
  }
});

PoolListController = RouteController.extend({
  template: 'poolList',
  subscriptions: function() {
    console.log('sub');
    return Meteor.subscribe('pools', {});
  },
  pools: function() {
    return Pools.find();
  },
  data: function() {
    return {
      pools: this.pools()
    }
  }
});

Router.route('/about', {
  name: 'aboutUs',
  template: 'aboutUs'
});

Router.route('/profilePage', {
  name: 'profilePage',
  template: 'profilePage',
  waitOn: function() {
    return Meteor.subscribe('userPosts', Meteor.userId());
  }
});

Router.route('/newPool', {
  name: 'newPool',
  template: 'newPool'
});

Router.route('/poolList', {
  name: 'poolList'
});

Router.route('/otp', {
  name: 'otp',
  template: 'otp'
})

Router.route('/search/:search', {
  name: 'search'
});

Router.route('/', {
    name: 'home',
    template: 'homePage',
    waitOn: function() {
      return Meteor.subscribe('pools', {limit: 5});
    }
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {only: 'profilePage'});
Router.onBeforeAction(requireLogin, {only: 'newPool'});

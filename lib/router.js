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
    console.log('subscribed');
    return Meteor.subscribe('pools');
  },
  pools: function() {
    console.log('data called');
    var from = this.params.query.from.split(",");
    var to = this.params.query.to.split(",");
    console.log(from);
    console.log(to);
    var fromSearchTerm = ".*" + from[0] + ".*";
    var toSearchTerm = ".*" + to[0] + ".*";
    return Pools.find(
    {$and :[
      {start: {$regex: fromSearchTerm, $options: "i"}},
      {end: {$regex: toSearchTerm, $options: "i"}}
      ]
    });
  },
  data: function() {
    var from = this.params.query.from.split(",");
    var to = this.params.query.to.split(",");
    return {
      pools: this.pools(),
      from: from[0],
      to: to[0]
    }
  }
});

Router.route('/poolPage/:_id', {
  name: 'poolPage',
  template: 'poolPage',
  waitOn: function() {
    return Meteor.subscribe('pools');
  },
  data: function() {
    return Pools.findOne(this.params._id);
  }
});

PoolListController = RouteController.extend({
  template: 'poolList',
  subscriptions: function() {
    console.log('sub');
    return Meteor.subscribe('pools');
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

Router.route('/search/:search', {
  name: 'search'
});

Router.route('/', {
    name: 'home',
    template: 'homePage',
    waitOn: function() {
      return Meteor.subscribe('pools');
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

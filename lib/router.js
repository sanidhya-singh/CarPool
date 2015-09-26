Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/poolPage/:_id', {
  name: 'poolPage',
  template: 'poolPage',
  data: function() {
    var pool = Pools.findOne(this.params._id);
    return pool;
  }
});

Router.route('/poolList', {
  name: 'poolList',
  template: 'poolList'
});

Router.route('/about', {
  name: 'aboutUs',
  template: 'aboutUs'
});

Router.route('/profilePage', {
  name: 'profilePage',
  template: 'profilePage'
});

Router.route('/newPool', {
  name: 'newPool',
  template: 'newPool'
});

Router.route('/', {
    name: 'home',
    template: 'homePage'
});

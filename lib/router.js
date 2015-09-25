Router.configure({
  layoutTemplate: 'layout'
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

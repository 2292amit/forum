// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    jquery: '/static/js/libs/jquery/jquery-1.7.1',
    underscore: '/static/js/libs/underscore/underscore-min',
    backbone: '/static/js/libs/backbone/backbone',
    backbonerel:'/static/js/libs/backbone/backbone-relational-0.5.0',
    backbonepag:'/static/js/libs/backbone/backbone-paginator',
    templates: '/static/js/templates'
  },
shim: {
    "underscore": {
        deps: ["jquery"],
        exports: "_"
    },
    "backbone": {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
    },
    "backbonepag": {
        deps: ["Backbone"],
    },
},
});

require([
  // Load our app module and pass it to our definition function
  'app',

], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});

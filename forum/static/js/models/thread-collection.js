define([
  'models/thread-model',
  'backbone',
  'jquery',
  'underscore',
], function(Thread) {

  var ThreadCollection = Backbone.Collection.extend({
      url: '/api/thread',
      model: Thread,
  })

  	return ThreadCollection;
});

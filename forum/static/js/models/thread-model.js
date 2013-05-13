define([
  'models/message-model',
  'exports',
  'backbone',
  'jquery',
  'underscore',
], function(Message,exports) {

  var Thread = Backbone.Model.extend({
	    urlRoot: '/api/thread',
	    idAttribute: 'thread_id',
	});
  	return Thread;
});

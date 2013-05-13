define([
  'vyome',
  'backbone',
  'jquery',
  'underscore',
], function(Vyome) {

	Message = Backbone.Model.extend({
      idAttribute: 'comment_id',
    })

  	return Message;
});

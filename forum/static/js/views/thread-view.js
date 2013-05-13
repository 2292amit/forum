define([
  'views/message-view',
  'models/message-model',
  'text!templates/thread.html',
  'backbone',
  'jquery',
  'underscore',
], function(MessageView, Message, threadTemplate){

	var ThreadView = Backbone.View.extend({
        tagName: 'div',

        className: 'thread_view',
        
        initialize: function(){
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
            this.model.bind('reset', this.render); 
        },
    
        template: _.template( threadTemplate),
    
        render: function() {
            return $(this.el).html(this.template(this.model.toJSON()));
        },
    });

  return ThreadView;
  
});

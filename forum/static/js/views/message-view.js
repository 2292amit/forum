define([
  'router',
  'text!templates/message.html',
  'vyome',
  'backbone',
  'jquery',
  'underscore',
], function(Router, messageTemplate, Vyome){

    var MessageView = Backbone.View.extend({
        tagName: 'div',

        className: 'message_view',
        
        initialize: function(){
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
        },
    
        template : _.template( messageTemplate),
        
        render: function() {
            return $(this.el).html(this.template(this.model.toJSON()));
        },
    });

  return MessageView;
  
});

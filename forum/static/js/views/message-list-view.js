define([
  'models/message-model',
  'views/message-view',
  'vyome',
  'backbone',
  'jquery',
  'underscore',
], function(Message, MessageView, Vyome){
	
    var MessageListView = Backbone.View.extend({
        tagName: 'div',

        className: 'message_list_view',
        
        initialize: function(){
            //_.bindAll(this, 'render', 'on_error');
            //this.model.bind('sync', this.render, this);
            this.model.bind('reset', this.render, this); 
            //this.model.bind('change', this.render, this); 
            this.model.bind('add', this.render_message, this); 
            this.model.fetch();
        },
    
        render: function() {
            this.model.forEach(this.render_message);
            return $(this.el).html();
        },
        
        render_message: function(message) {
            var message_view = new MessageView({model: message});
            this.$('ul.message_list').append($(message_view.render()));
        },
        events: {
            'click input[type=submit]': 'on_submit',
        },
        
        on_submit: function(e) {
        	var obj = {
                    title: this.$('.new_message_text').val(),
                    content: 'no content'};
            var new_message = new Message(obj);
            this.model.create(new_message, {wait:true});
        },        
        on_error: function(model, response) {
            var error = $.parseJSON(response.responseText);
            this.$('.error_message').html(error.message);
        },
    });
    return MessageListView;
  
});

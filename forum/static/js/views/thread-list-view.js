define([
  'views/thread-summary-view',
  'models/thread-model',
  'models/message-model',
  'vyome',
  'text!templates/thread-list.html',
  'backbone',
  'jquery',
  'underscore',
], function(ThreadSummaryView, Thread, Message, Vyome, threadListTemplate){
	
    var ThreadListView = Backbone.View.extend({
        tagName: 'div',

        className: 'thread_list_view',
        
        initialize: function(){
            _.bindAll(this, 'render', 'render_thread_summary', 'on_submit', 'on_error');
            this.model.bind('sync', this.render);
            this.model.bind('reset', this.render); 
            this.model.bind('change', this.render); 
            this.model.bind('add', this.render_thread_summary); 
        },
    
        template : _.template( threadListTemplate),
        render: function() {
            $(this.el).html(this.template());
            this.model.forEach(this.render_thread_summary);
            return $(this.el).html();
        },
        
        render_thread_summary: function(thread) {
            var thread_summary_view = new ThreadSummaryView({model: thread});
            this.$('ul.thread_list').append($(thread_summary_view.render()));
        },
        
        events: {
            'click input[type=submit]': 'on_submit',
        },
        
        on_submit: function(e) {
            var thread = new Thread({ title: this.$('.new_thread_title').val(), content: this.$('.new_thread_text').val() });
            this.model.create(thread, {wait: true});
        },
                
        on_error: function(model, response) {
            var error = $.parseJSON(response.responseText);
            this.$('.error_message').html(error.message);
        },
    });
    return ThreadListView;
  
});

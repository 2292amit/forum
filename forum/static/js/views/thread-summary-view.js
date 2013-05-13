define([
  'router',
  'text!templates/thread-summary.html',
  'vyome',
  'backbone',
  'jquery',
  'underscore',
], function(Router, threadSummaryTemplate, Vyome){

    var ThreadSummaryView = Backbone.View.extend({
        tagName: 'tr',

        initialize: function(){
            _.bindAll(this, 'render', 'on_click');
            this.model.bind('change', this.render);
        },
    
        template: _.template( threadSummaryTemplate),
        
        render: function() {
            return $(this.el).html(this.template(this.model.toJSON()));
        },
        
        events: {
            'click': 'on_click',
        },
        
        on_click: function(e) {
        	Vyome.app_router.navigate('thread/'+this.model.get('thread_id')+'/', {trigger: true});
        },
    });

  return ThreadSummaryView;
  
});

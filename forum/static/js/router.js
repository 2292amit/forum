// Filename: router.js
define([
  'views/thread-list-view',
  'views/thread-summary-view',
  'views/thread-view',
  'views/message-list-view',
  'models/thread-collection',
  'models/thread-model',
  'models/message-collection',
  'vyome',
  'jquery',
  'underscore',
  'backbone',
], function( ThreadListView, ThreadSummaryView, ThreadView, MessageListView, ThreadCollection, Thread, MessageCollection, Vyome) {

  var AppRouter = Backbone.Router.extend({
	  routes: {
          "": "show_thread_list",
          "thread/:_id/": "show_thread",
      }
  });
  
  var initialize = function(){

	Vyome.app_router = new AppRouter;
    
	Vyome.app_router.on('route:show_thread_list', function(){
   
        var thread_collection = new ThreadCollection();
        var thread_list_view = new ThreadListView({el: $('#content'), 
                                                            model: thread_collection });
        thread_collection.fetch();

    });

	Vyome.app_router.on('route:show_thread', function (_id) {
    
    	var thread = new Thread({thread_id: _id});
        var thread_view = new ThreadView({el: $('#content'), model: thread});
        thread.fetch();
        var message_collection = new MessageCollection();
        message_collection.thread_id = _id;
        var message_list_view = new MessageListView({el: $('#content'), 
            model: message_collection });
        //message_collection.fetch();
        //a = message_collection;
    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});

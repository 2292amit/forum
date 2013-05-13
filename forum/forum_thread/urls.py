from django.conf.urls.defaults import patterns, url
# Uncomment the next two lines to enable the admin:
from forum.forum_thread.views import ThreadView, ThreadIdView, CommentView

urlpatterns = patterns('',
    url(r'^thread$', ThreadView()),
    
    url(r'^thread/(?P<thread_id>[^/]+)$', ThreadIdView()),
    
    url(r'^thread/(?P<thread_id>[^/]+)/comment$', CommentView())
)

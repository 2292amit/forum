from django.conf.urls.defaults import *
from basic.forum.models import *

urlpatterns = patterns('basic.forum.views',
    (r"^forum/(\d+)/$", "forum"),
    (r"^thread/(\d+)/$", "thread"),
    (r"^post/(new_thread|reply)/(\d+)/$", "post"),
    (r"^reply/(\d+)/$", "reply"),
    (r"^profile/(\d+)/$", "profile"),
    (r"^new_thread/(\d+)/$", "new_thread"),
    (r"", "main"),
)

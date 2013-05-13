from django.contrib import admin
from forum.forum_thread.models import Thread, Reply


admin.site.register(Thread)
admin.site.register(Reply)
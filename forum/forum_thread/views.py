# Create your views here.
from django.http import HttpResponse
from forum_thread.api_utils import RestView
from forum_thread.models import Thread, Reply
import uuid
import json
import datetime
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    return render_to_response('index.html')

def convertDatetimeToString(o):
    DATE_FORMAT = "%Y-%m-%d" 
    TIME_FORMAT = "%H:%M:%S"

    if isinstance(o, datetime.date):
        return o.strftime(DATE_FORMAT)
    elif isinstance(o, datetime.time):
        return o.strftime(TIME_FORMAT)
    elif isinstance(o, datetime.datetime):
        return o.strftime("%s %s" % (DATE_FORMAT, TIME_FORMAT))


class ThreadView(RestView):
    def GET(self, request):
        thread_array = Thread.objects.all()
        resp = [{'title':thread.title, "replycount":thread.reply_set.count(),'created':convertDatetimeToString(thread.created),
                 'content': thread.content, 'author': thread.author, 'thread_id': thread.thread_id} for thread in thread_array]
        return HttpResponse(json.dumps(resp))    

    def POST(self, request):
        uid = uuid.uuid4().hex
        request_dict = json.loads(request.raw_post_data)
        thread = Thread(title = request_dict['title'],
                     content = request_dict['content'],
                     thread_id = uid,
                     author = request.user.username)
        thread.save()
        resp_dict = {"thread_id" : uid, "created": convertDatetimeToString(thread.created), "author": request.user.username, "replycount":0}
        return HttpResponse(json.dumps(resp_dict))

    
class ThreadIdView(RestView):
    def GET(self, request, thread_id):
        thread = Thread.objects.get(thread_id=thread_id)    
        resp_dict = {'title':thread.title, "replycount":thread.reply_set.count(), 'content': thread.content, 'author': thread.author, 'created':convertDatetimeToString(thread.created),}
        return HttpResponse(json.dumps(resp_dict), mimetype='application/json')


class CommentView(RestView):
    def GET(self, request, thread_id):
        thread = Thread.objects.get(thread_id=thread_id)
        reply_set = thread.reply_set.all()
        reply_array = []
        for reply in reply_set:
            resp_dict = {'title':reply.title, 'created':convertDatetimeToString(reply.created), 'content': reply.content, 'author': reply.author, 'comment_id': reply.comment_id}
            reply_array.append(resp_dict)
        return HttpResponse(json.dumps(reply_array))
    
    def POST(self, request, thread_id):
        uid = uuid.uuid4().hex
        thread = Thread.objects.get(thread_id=thread_id)
        request_dict = json.loads(request.raw_post_data)
        reply = Reply(title = request_dict['title'],
                     content = request_dict['content'],
                     comment_id = uid,
                     thread = thread,
                     author = request.user.username)
        reply.save()
        resp_dict = {"comment_id" : uid, 'created':convertDatetimeToString(reply.created), "author": request.user.username}
        return HttpResponse(json.dumps(resp_dict))

class CommentIdView(RestView):
    def GET(self, request, thread_id, comment_id):
        thread = Thread.objects.get(thread_id=thread_id)
        reply = thread.reply_set.get(comment_id = comment_id)   
        resp_dict = {'title':reply.title, 'created':reply.created, 'content': reply.content, 'author': reply.author, 'comment_id': reply.comment_id}
        return HttpResponse(json.dumps(resp_dict), mimetype='application/json')
    
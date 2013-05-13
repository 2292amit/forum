from django.db import models

# Create your models here.
class Thread(models.Model):
    thread_id = models.CharField(max_length=100, primary_key = True)
    title = models.CharField(max_length=200)
    content = models.CharField(max_length=2000)
    created = models.DateTimeField(auto_now=True)
    author = models.CharField(max_length=100)
    

class Reply(models.Model):
    comment_id = models.CharField(max_length=100, primary_key = True)
    title = models.CharField(max_length=200)
    content = models.CharField(max_length=2000)
    created = models.DateTimeField(auto_now=True)
    author = models.CharField(max_length=100)
    thread = models.ForeignKey(Thread)

    

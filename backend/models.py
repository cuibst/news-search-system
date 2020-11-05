'''
Models for backend
'''
# pylint: skip-file
# Please remove these two comments after editing!
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=20, default='unknown')
    password = models.CharField(max_length=20, default='unknown')
    email = models.CharField(max_length=30, default='unknown')
    phone_number = models.CharField(max_length=20, default='unknown')

class News(models.Model):
    source = models.CharField(max_length=100, default='unknown')
    news_url = models.CharField(max_length=100, default='unknown')
    category = models.CharField(max_length=30, default='unknown')
    media = models.CharField(max_length=50, default='unknown')
    tags = models.CharField(max_length=100, default='unknown')
    title = models.CharField(max_length=60, default='unknown')
    news_id = models.CharField(max_length=50, default='unknown')
    pub_date = models.CharField(max_length=100, default='unknown')
    content = models.CharField(max_length=10000, default='unknown')
    summary = models.CharField(max_length=500, default='unknown')
    img = models.CharField(max_length=100, default='nothing')

# Create your models here.

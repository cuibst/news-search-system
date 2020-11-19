'''
Models for backend
'''
# pylint: skip-file
# Please remove these two comments after editing!
from django.db import models
import time


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
    news_id = models.CharField(max_length=50, default='unknown', db_index=True)
    pub_date = models.CharField(max_length=100, default='unknown')
    content = models.CharField(max_length=10000, default='unknown')
    summary = models.CharField(max_length=500, default='unknown')
    img = models.CharField(max_length=100, default='nothing')


class Behavior(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_behavior", default='')
    content = models.CharField(max_length=100, default='')


class Record(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_record", default='')
    content = models.CharField(max_length=100, default='')


class Search(models.Model):
    content = models.CharField(max_length=100, default='')
    create_time = models.CharField(max_length=100, default='')
# Create your models here.

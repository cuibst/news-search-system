'''
Models for backend
'''
# pylint: skip-file
# Please remove these two comments after editing!
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    email = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=20)

class News(models.Model):
    source = models.CharField(max_length=100)
    news_url = models.CharField(max_length=100)
    category = models.CharField(max_length=30)
    media = models.CharField(max_length=50)
    tags = models.CharField(max_length=100)
    title = models.CharField(max_length=60)
    news_id = models.CharField(max_length=50)
    pub_date = models.CharField(max_length=100)
    content = models.CharField(max_length=10000)
    video = models.CharField(max_length=100)


# Create your models here.

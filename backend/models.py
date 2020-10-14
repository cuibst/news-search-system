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


# Create your models here.

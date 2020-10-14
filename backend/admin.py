'''
register models in models.py to the admin site
'''
from django.contrib import admin

# Register your models here.
from .models import User

admin.site.register(User)

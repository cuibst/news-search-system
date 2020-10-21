'''
Extra Settings
'''
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DEBUG = False

CORS_ORIGIN_ALLOW_ALL = False

DATABASES = {
   'default': {
       'ENGINE': 'django.db.backends.postgresql',
       'NAME': 'news',
       'USER': 'postgres',
       'PASSWORD': '12345678',
       'HOST': 'postgres.rzotgorz.secoder.local',
       'PORT': '5432',
       'TEST': {
           'NAME': 'news'
       }
   }
}

STATICFILES_DIR = os.path.join(BASE_DIR, 'frontend', 'dist')
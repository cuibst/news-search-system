'''
urls for backends
'''
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('uploadnews/', views.upload_news, name='uploadnews'),
    path('getnews/', views.get_news, name='getnews'),
    path('userchange/', views.user_change, name='user_change'),
    path('user/', views.user, name='user'),
    path('views/', views.views, name='views'),
    path('getbehavior/', views.get_behavior, name='get_behavior')
]

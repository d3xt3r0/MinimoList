from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.listView, name='list-view'),
    path('list-view-local/', views.listViewLocal, name='list-view-local'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
]
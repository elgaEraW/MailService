from django.urls import path
from .views import ListUsers, RegisterUser

urlpatterns = [
    path('users/', ListUsers.as_view(), name='user-list'),
    path('create-user/', RegisterUser.as_view(), name='create-user'),
]

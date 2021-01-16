from django.urls import path
from .views import ListUsers, RegisterUser, GetLogin, LoginUser

urlpatterns = [
    path('users/', ListUsers.as_view(), name='user-list'),
    path('create-user/', RegisterUser.as_view(), name='create-user'),
    path('get-login/', GetLogin.as_view(), name='get-login'),
    path('login/', LoginUser.as_view(), name='login'),
]

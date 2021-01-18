from django.urls import path
from .views import ListUsers, RegisterUser, GetLogin, LoginUser, ListMails, \
    LogoutUser

urlpatterns = [
    path('users/', ListUsers.as_view(), name='user-list'),
    path('create-user/', RegisterUser.as_view(), name='create-user'),
    path('get-login/', GetLogin.as_view(), name='get-login'),
    path('login/', LoginUser.as_view(), name='login'),
    path('mail/', ListMails.as_view(), name='mail'),
    path('logout/', LogoutUser.as_view(), name='logout'),
]

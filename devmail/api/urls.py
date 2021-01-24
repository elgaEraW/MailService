from django.urls import path
from .views import ListUsers, RegisterUser, GetLogin, LoginUser, ListMails, \
    LogoutUser, SendMail, DetailMail

urlpatterns = [
    path('users/', ListUsers.as_view(), name='user-list'),
    path('create-user/', RegisterUser.as_view(), name='create-user'),
    path('get-login/', GetLogin.as_view(), name='get-login'),
    path('login/', LoginUser.as_view(), name='login'),
    path('mail/<str:slug>/', DetailMail.as_view(), name='mail'),
    path('mail/', ListMails.as_view(), name='mail'),
    path('logout/', LogoutUser.as_view(), name='logout'),
    path('send-mail/', SendMail.as_view(), name='send-mail'),
]

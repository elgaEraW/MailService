from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name='index'),
    path('signup/', index, name='signup'),
    path('login/', index, name='login'),
    path('mail/', index, name='mail'),
    path('mail/<str:slug>/', index, name='maildetail'),
    path('sent/', index, name='sent'),
    path('compose/', index, name='mail'),
]

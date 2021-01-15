from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name='index'),
    path('signup/', index, name='signup'),
    path('login/', index, name='login'),
]

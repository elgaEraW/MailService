from django.db import models

# Create your models here.


class User(models.Model):

    full_name = models.CharField(max_length=120)
    username = models.CharField(max_length=30, unique=True)
    recovery_email = models.EmailField()
    password = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name

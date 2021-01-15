from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('full_name', 'username', 'recovery_email',
                  'created_at')


class RegisterUserSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField()

    class Meta:

        model = User
        fields = ('full_name', 'username', 'recovery_email',
                  'password', 'confirm_password')

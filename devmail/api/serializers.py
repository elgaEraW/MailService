from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username',
                  'accept_promotions', 'created_at')


class RegisterUserSerializer(serializers.ModelSerializer):

    class Meta:

        model = User
        fields = ('first_name', 'last_name', 'username',
                  'password', 'accept_promotions')


class LoginUserSerializer(serializers.ModelSerializer):

    username = serializers.CharField()
    remember = serializers.BooleanField()

    class Meta:

        model = User
        fields = ('username', 'password', 'remember')

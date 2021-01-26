from rest_framework import serializers
from .models import User, Mail


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


class MailSerializer(serializers.ModelSerializer):

    class Meta:

        model = Mail
        fields = ('id', 'sender', 'subject', 'receiver', 'created_at')


class SendMailSerializer(serializers.ModelSerializer):

    to = serializers.CharField()

    class Meta:

        model = Mail
        fields = ('to', 'subject', 'message')


class DetailSerialzer(serializers.ModelSerializer):

    class Meta:

        model = Mail
        fields = ('id', 'sender', 'receiver',
                  'subject', 'message', 'created_at')

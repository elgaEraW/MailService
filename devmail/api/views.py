from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import bcrypt
from rest_framework import status
from rest_framework.response import Response
from .models import User, Mail
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from .serializers import UserSerializer, RegisterUserSerializer, \
    LoginUserSerializer, MailSerializer


# Create your views here.


class ListUsers(ListAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer


class RegisterUser(APIView):

    serializer_class = RegisterUserSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)

        if not serializer.is_valid():

            return Response(data={"Error": "Invalid Data"},
                            status=status.HTTP_406_NOT_ACCEPTABLE)

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        first_name = serializer.data.get('first_name')
        last_name = serializer.data.get('last_name')
        username = serializer.data.get('username')
        password = serializer.data.get('password')
        accept_promotions = serializer.data.get('accept_promotions')

        password = bcrypt.hashpw(password, bcrypt.gensalt(12))
        queryset = User.objects.filter(username=username)

        if queryset.exists():
            return Response({"Error": "User Already Exists"},
                            status=status.HTTP_409_CONFLICT)
        user = User(first_name=first_name, last_name=last_name,
                    username=username, password=password,
                    accept_promotions=accept_promotions)
        user.save()

        self.request.session['username'] = username

        return Response({"Success": "User Added"},
                        status=status.HTTP_200_OK)


class GetLogin(APIView):

    def get(self, request, format=None):

        if not self.request.session.exists(self.request.session.session_key):

            return Response(data={"Error": "Not logged in"},
                            status=status.HTTP_401_UNAUTHORIZED)
        return Response(data={"Success": "Logged In"},
                        status=status.HTTP_202_ACCEPTED)


class LoginUser(APIView):

    serializer_class = LoginUserSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)

        if not serializer.is_valid():

            return Response(data={"Error": "Invalid Data"},
                            status=status.HTTP_406_NOT_ACCEPTABLE)

        username = serializer.data.get('username')
        password = serializer.data.get('password')
        remember = serializer.data.get('remember')

        queryset = User.objects.filter(username=username)

        if not queryset.exists():

            return Response(data={"Error": "User Not Found"},
                            status=status.HTTP_401_UNAUTHORIZED)

        user = queryset[0]
        hashed_password = user.password

        if not bcrypt.checkpw(password, hashed_password):

            return Response(data={"Error": "Wrong Credentials"},
                            status=status.HTTP_400_BAD_REQUEST)

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            self.request.session['username'] = username

        return Response(data={"Success": "Logged In"},
                        status=status.HTTP_202_ACCEPTED)


class ListMails(APIView):

    serializer_class = MailSerializer

    def get(self, request, format=None):

        queryset = Mail.objects.filter(
            receiver=self.request.session['username'])

        data = []

        for entry in queryset:

            data.append(self.serializer_class(entry).data)

        return Response(data={"data": data}, status=status.HTTP_200_OK)


class LogoutUser(APIView):

    def get(self, request, format=None):

        if self.request.session.exists(self.request.session.session_key):
            self.request.session.delete(
                self.request.session._get_session_key())
            return Response(data={"Success": "Logged Out"},
                            status=status.HTTP_200_OK)

        return Response(data={"Error": "Not logged in"},
                        status=status.HTTP_401_UNAUTHORIZED)

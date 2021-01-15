from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from .serializers import UserSerializer, RegisterUserSerializer
from .models import User
from rest_framework.response import Response
from rest_framework import status
import bcrypt
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


# Create your views here.


class ListUsers(ListAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer


class RegisterUser(APIView):

    serializer_class = RegisterUserSerializer

    def post(self, request, format=None):

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)

        if not serializer.is_valid():

            return Response({"Error": "Invalid Data"},
                            status=status.HTTP_406_NOT_ACCEPTABLE)

        full_name = serializer.data.get('full_name')
        username = serializer.data.get('username')
        recovery_email = serializer.data.get('recovery_email')
        password = serializer.data.get('password')
        confirm_password = serializer.data.get('confirm_password')
        if not password == confirm_password:
            return Response({"Error": "Passwords do not match"},
                            status=status.HTTP_400_BAD_REQUEST)

        password = bcrypt.hashpw(password, bcrypt.gensalt(12))
        queryset = User.objects.filter(username=username)

        if queryset.exists():
            return Response({"Error": "User Already Exists"},
                            status=status.HTTP_409_CONFLICT)
        user = User(full_name=full_name, username=username,
                    recovery_email=recovery_email, password=password)
        user.save()

        return Response({"Success": "User Added"},
                        status=status.HTTP_201_CREATED)

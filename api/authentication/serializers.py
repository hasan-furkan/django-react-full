from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework import serializers, status
from user.models import User


class RegisterSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            password=make_password(validated_data['password'])
        )
        return user

    class Meta:
        model = User
        fields = ('email', 'password', 'full_name')


class LoginSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ('email', 'password', 'full_name')

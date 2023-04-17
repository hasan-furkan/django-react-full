from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework import serializers, status
from user.models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        if validated_data['password'] != validated_data['confirmPassword']:
            raise serializers.ValidationError(
                {'password': 'Passwords must match.'})
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

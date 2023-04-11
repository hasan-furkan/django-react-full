from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from user.models import UserModals as User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'fullName', 'email', 'password', 'kvkk', 'status', 'deleted', 'isActive', 'loginAttempt']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
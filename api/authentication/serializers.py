from rest_framework.serializers import ModelSerializer
from user.models import UserModals


class UserSerializer(ModelSerializer):
    class Meta:
        model = UserModals
        fields = '__all__'

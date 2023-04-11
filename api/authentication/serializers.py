from rest_framework.serializers import ModelSerializer
from user.models import UserModals


class UserSerializer(ModelSerializer):
    class Meta:
        model = UserModals
        fields = '__all__'
        extra_kwargs = {'username': {'required': False}, 'first_name': {'required': False},
                        'last_name': {'required': False}}


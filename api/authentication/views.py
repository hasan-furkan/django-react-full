from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password, check_password

from .serializers import RegisterSerializer, LoginSerializer
from django.core.mail import EmailMessage
from django.template.loader import render_to_string

from user.models import User


def send_verification_email(user_email, user_name, template_name):
    to_email = user_email
    context = {
        'product': 'HFKSHOP',
        'name': user_name,
    }
    html_message = render_to_string(template_name, context)
    email = EmailMessage(
        'Please verify your account',
        html_message,
        'hsnfrkn32@gmail.com',
        to=[to_email],
    )
    email.content_subtype = 'html'
    email.send()


class UserRegisterView(APIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # send_verification_email(request.data.get('email'), request.data.get('fullName'), 'confirm-email.html')

            return Response({
                "status": True,
                "message": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "status": False,
            "message": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = request.data.get('email')
            password = request.data.get('password')
            user = User.objects.filter(email=email).first()
            if user:
                if check_password(password, user.password):
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        "status": True,
                        "message": {
                            "refresh": str(refresh),
                            "access": str(refresh.access_token),
                            "user": {
                                "id": user.id,
                                "email": user.email,
                                "full_name": user.full_name,
                            }
                        }
                    }, status=status.HTTP_200_OK)
                return Response({
                    "status": False,
                    "message": "Wrong password or email"
                }, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                "status": False,
                "message": "User not found"
            }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            "status": False,
            "message": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

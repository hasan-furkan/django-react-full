from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


from .serializers import UserSerializer, UserLoginSerializer
from django.core.mail import EmailMessage
from django.template.loader import render_to_string

from user.models import UserModals as User


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
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            send_verification_email(request.data.get('email'), request.data.get('fullName'), 'confirm-email.html')
            return Response({
                "status": True,
                "message": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "status": False,
            "message": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = User.objects.filter(email=email).first()
            if user is None:
                return Response({'detail': 'please register'}, status=status.HTTP_401_UNAUTHORIZED)
            if user.isActive == 'Active':
                return Response({'detail': 'Inactive user'}, status=status.HTTP_401_UNAUTHORIZED)
            if user.loginAttempt > 6:
                user.isActive = False
                user.save()
                return Response({'detail': 'You have tried to login too many times. Please try again later.'},
                                status=status.HTTP_401_UNAUTHORIZED)
            if not user.check_password(password):
                user.loginAttempt += 1
                user.save()
                return Response({'detail': 'email or password wrong'}, status=status.HTTP_401_UNAUTHORIZED)
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
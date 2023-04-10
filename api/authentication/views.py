from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .serializers import UserSerializer
from django.core.mail import EmailMessage
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

def send_verification_email(user_email, user_name):
    to_email = user_email
    context = {
        'product': 'HFKSHOP',
        'name': user_name,
    }
    html_message = render_to_string('welcome.html', context)
    email = EmailMessage(
        'Please verify your account',
        html_message,
        'hsnfrkn32@gmail.com',
        to=[to_email],
    )
    email.content_subtype = 'html'
    email.send()


class RegisterView(generics.CreateAPIView, generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self, request, *args, **kwargs):
        return User.objects.all()

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        if not all([email, password]):
            return Response({'error': 'name, email and password.'},
                            status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response({'error': 'This email is already registered.'}, status=status.HTTP_400_BAD_REQUEST)
        user = User(email=email, password=make_password(password))
        user.save()
        serializer = UserSerializer(user)
        send_verification_email(request.data.get('email'), request.data.get('name'))

        return Response(serializer.data, status=status.HTTP_201_CREATED)
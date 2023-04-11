from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from .serializers import UserSerializer
from django.core.mail import EmailMessage
from django.template.loader import render_to_string

from user.models import UserModals as User


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

    def get_queryset(self):
        return User.objects.all()

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        print('hello', request.data.get)
        if not all([email, password]):
            return Response({'error': 'user_full_name, email and password.'},
                            status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response({'error': 'This email is already registered.'}, status=status.HTTP_400_BAD_REQUEST)
        user = User(first_name=first_name, last_name=last_name, username=first_name+last_name, email=email, password=make_password(password))
        print(user)
        user.save()
        serializer = UserSerializer(user)
        send_verification_email(request.data.get('email'), request.data.get('first_name'))

        return Response(serializer.data, status=status.HTTP_201_CREATED)

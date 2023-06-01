from django.urls import path

from .views import UserRegisterView, UserLoginView, UserVerifyView

urlpatterns = [
    path('register', UserRegisterView.as_view(), name='register'),
    path('<int:pk>/activate/<str:token>', UserVerifyView.as_view(), name='activate'),
    path('login', UserLoginView.as_view(), name='login'),
]

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email address must be provided')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class UserModals(AbstractBaseUser):
    fullName = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True)
    kvkk = models.BooleanField(default=False)
    status = models.CharField(
        max_length=10, choices=(('Pending', 'Pending'), ('Active', 'Active')), default='Pending')
    deleted = models.BooleanField(default=False)
    isActive = models.BooleanField(default=False)
    loginAttempt = models.IntegerField(default=0)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fullName']

    objects = UserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

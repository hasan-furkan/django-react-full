from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

# FIRM_NAMES = ((superuser, "superuser"),
#               (musteri, "Musteri"),
#               (yonetici, "Yonetici"),
#               (personel, "Personel"),
#               )

class UserModals(AbstractUser):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    # role = models.CharField(max_length=100, choices=FIRM_NAMES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    login_count = models.IntegerField(default=0)
    is_verified = models.BooleanField(default=False)
    kvkk_agreement = models.BooleanField(default=False)

    def __str__(self):
        return self.first_name + self.last_name

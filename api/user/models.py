from django.db import models


# Create your models here.

# FIRM_NAMES = ((superuser, "superuser"),
#               (musteri, "Musteri"),
#               (yonetici, "Yonetici"),
#               (personel, "Personel"),
#               )

class UserModals(models.Model):
    user_full_name = models.CharField(max_length=100, blank=True, null=True)
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
        return self.name

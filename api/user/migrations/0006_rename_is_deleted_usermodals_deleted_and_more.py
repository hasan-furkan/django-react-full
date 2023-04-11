# Generated by Django 4.2 on 2023-04-11 11:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_alter_usermodals_options_alter_usermodals_managers_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usermodals',
            old_name='is_deleted',
            new_name='deleted',
        ),
        migrations.RenameField(
            model_name='usermodals',
            old_name='is_verified',
            new_name='isActive',
        ),
        migrations.RenameField(
            model_name='usermodals',
            old_name='kvkk_agreement',
            new_name='is_staff',
        ),
        migrations.RenameField(
            model_name='usermodals',
            old_name='login_count',
            new_name='loginAttempt',
        ),
        migrations.AddField(
            model_name='usermodals',
            name='email',
            field=models.EmailField(default='', max_length=254, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usermodals',
            name='fullName',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='usermodals',
            name='kvkk',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='usermodals',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AddField(
            model_name='usermodals',
            name='password',
            field=models.CharField(default='', max_length=128, verbose_name='password'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usermodals',
            name='status',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Active', 'Active')], default='Pending', max_length=10),
        ),
    ]

# Generated by Django 3.1.4 on 2021-01-19 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_authentication', '0004_auto_20210107_1244'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_email_verified',
            field=models.BooleanField(default=False),
        ),
    ]

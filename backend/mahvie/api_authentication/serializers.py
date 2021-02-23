from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = ['id', 'username', 'password',
                  'email', 'first_name', 'last_name', 'phone_number']
        extra_kwargs = {'password': {'write_only': True},
                        'id': {'read_only': True},
                        'first_name': {'required': True},
                        'last_name': {'required': True},
                        'phone_number': {'required': True}}

    def create(self, validated_data):
        user = UserModel.objects.create(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data['phone_number']
        )
        user.set_password(validated_data['password'])
        user.is_active = False
        user.save()

        uid = urlsafe_base64_encode(force_bytes(user.email))
        token = default_token_generator.make_token(user)
        activation_link = "{0}/user/confirm-email/?uid={1}&token={2}".format(
            settings.FE_URL, uid, token)

        current_user = user.first_name if user.first_name else user.email
        context = {
            "user": current_user,
            "account_activate_url": activation_link

        }
        to_email = user.email

        mail_subject = 'Hi {}, please verify your Mahvie account'.format(
            user.first_name)

        html_message = render_to_string(
            'email/email_confirmation.html', context)
        plain_message = strip_tags(html_message)
        from_email = 'developer@techversantinfo.com'
        send_mail(
            mail_subject,
            plain_message,
            from_email,
            [to_email],
            html_message=html_message
        )
        return user

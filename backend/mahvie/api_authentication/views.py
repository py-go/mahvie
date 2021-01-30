import logging
from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django.conf import settings
from django.utils.encoding import force_bytes, force_text
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator


from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from django_rest_passwordreset.signals import reset_password_token_created


from .serializers import UserSerializer

UserModel = get_user_model()

logger = logging.getLogger(__name__)


class CreateUserView(CreateAPIView):
    """
    Use this endpoint for create users
    """
    permission_classes = [permissions.AllowAny]  # Allow public users to signup
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({
            'status': 200,
            'message': 'Email verification mail is sent to your email id. Please confirm the email for activate the account.',
            'data': response.data
        })


class ActivateAccount(APIView):
    def get(self, request, format=None):

        try:
            uid = force_text(urlsafe_base64_decode(
                request.query_params['uid']))
            user = UserModel.objects.get(email=uid)
            token = request.query_params['token']
        except(TypeError, ValueError, OverflowError, UserModel.DoesNotExist):
            raise NotFound("User does not exist.")

        if user.is_email_verified:
            response_data = {"status": 200,
                             "message": "Email is already verified."}
            return Response(response_data, status=status.HTTP_200_OK)

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.is_email_verified = True
            user.save()

        elif not default_token_generator.check_token(user, token):
            raise NotFound("Invalid or expired link.")

        response_data = {"status": 200,
                         "message": "Email verified successfully"}

        return Response(response_data, status=status.HTTP_200_OK)


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # logger.warning("I'm a warning!")
    # logger.info("Hello, Python!")
    # logger.debug("I'm a debug message!")
    # logging.getLogger("requests").setLevel(logging.WARNING)

    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': "{}forget?token={}".format(settings.FE_URL,
                                                         reset_password_token.key)
    }

    # render email text
    email_html_message = render_to_string(
        'email/user_reset_password.html', context)
    email_plaintext_message = render_to_string(
        'email/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_plaintext_message,
        # from:
        "pratiman.shahi@mahvie.com",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()

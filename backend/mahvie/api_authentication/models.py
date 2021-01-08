from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.db import models


class CustomUser(AbstractUser):

    # User roles
    CLIENT = 1
    AGENT = 2

    USER_TYPE = [
        (CLIENT, CLIENT),
        (AGENT, AGENT)
    ]

    # Speciality
    TERM = 'T'
    PERMANENT = 'P'
    CRITICAL_ILLNESS = 'CI'
    LONG_TERM = 'LT'

    SPECIALITY_TYPE = [
        (TERM, 'Term Insurance'),
        (PERMANENT, 'Permanent Insurance'),
        (CRITICAL_ILLNESS, 'Critical Illness Insurance'),
        (LONG_TERM, 'Long Term Care Insurance')
    ]

    email = models.EmailField(_('email address'), unique=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    company_name = models.CharField(max_length=255, null=True, blank=True)
    speciality = models.CharField(
        max_length=2, choices=SPECIALITY_TYPE, default=TERM)
    assigned_clients = models.ManyToManyField(
        'self', blank=True,
        limit_choices_to={'groups__name': "agents"})

    def __str__(self):
        return self.first_name + " | " + self.email

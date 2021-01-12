from django.contrib import admin
from django.db import models
from django.contrib.auth.admin import UserAdmin
from django.forms import CheckboxSelectMultiple

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email', 'username', 'first_name', 'last_name']
    fieldsets = (
        (('Profile'), {
         'fields': ('phone_number', 'company_name', 'speciality', 'assigned_clients')}),
    ) + UserAdmin.fieldsets
    formfield_overrides = {
        models.ManyToManyField: {'widget': CheckboxSelectMultiple},
    }


admin.site.register(CustomUser, CustomUserAdmin)

from django.contrib import admin
from .models import CoverageRange, AgeRange, PremiumRange, UserResponse

admin.site.register(CoverageRange)
admin.site.register(AgeRange)
admin.site.register(PremiumRange)
admin.site.register(UserResponse)

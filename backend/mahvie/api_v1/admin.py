from django.contrib import admin
from .models import CoverageRange, AgeRange, PremiumRange

admin.site.register(CoverageRange)
admin.site.register(AgeRange)
admin.site.register(PremiumRange)

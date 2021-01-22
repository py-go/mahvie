from django.conf import settings
from django_hosts import patterns, host

host_patterns = patterns(
    '',
    host(r'www', 'mahvie.urls', name='www'),
    host(r'admin', settings.ROOT_URLCONF, name='admin'),
)

from django.apps import AppConfig


class ApiV1Config(AppConfig):
    name = 'api_v1'

    def ready(self):
        from actstream import registry
        registry.register(self.get_model('UserResponse'))

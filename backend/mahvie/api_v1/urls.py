from django.urls import path
from .views import QuestionnaireResponse

urlpatterns = [
    path('submit-questionnaire/', QuestionnaireResponse.as_view(),
         name='questionnaire_response'),
]

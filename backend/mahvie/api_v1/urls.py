from django.urls import path
from .views import QuestionnaireResponse, GetQuestionnaireResponse

urlpatterns = [
    path('submit-questionnaire/', QuestionnaireResponse.as_view(),
         name='questionnaire_response'),

    path('get-questionnaire-response/', GetQuestionnaireResponse.as_view(),
         name='questionnaire_response'),
]

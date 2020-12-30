# from django.db import models
# from django.utils.translation import gettext as _

# Female = 'F'
# Male = 'M'
# GENDER = [
#     (Male, 'Male'),
#     (Female, 'Female')
# ]


# class TimeStampedModel(models.Model):
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         abstract = True


# class Questionnaire(TimeStampedModel):
#     name = models.CharField(max_length=255)
#     questions = models.ManyToManyField(Question)


# class Question(TimeStampedModel):
#     question_text = models.CharField(max_length=255)
#     question_category = models.CharField(max_length=2)


# class UserResponse(TimeStampedModel):
#     user_questionnaire = models.ForeignKey(
#         Questionnaire, null=True, on_delete=models.SET_NULL)
#     question = models.ForeignKey(
#         Question, null=True, on_delete=models.SET_NULL)
#     response_text = models.CharField(max_length=255)

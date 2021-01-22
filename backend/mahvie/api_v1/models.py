from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from actstream import action


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


FEMALE = 'F'
MALE = 'M'
GENDER = [
    (FEMALE, 'Female'),
    (MALE, 'Male')
]


class CoverageRange(TimeStampedModel):
    coverage = models.CharField(
        max_length=255, unique=True, verbose_name='Coverage Range')

    def __str__(self):
        return self.coverage


class AgeRange(TimeStampedModel):
    age = models.CharField(max_length=100, unique=True,
                           verbose_name='Age Range')

    def __str__(self):
        return self.age


class PremiumRange(TimeStampedModel):
    coverage_range = models.ForeignKey(
        CoverageRange, on_delete=models.CASCADE, verbose_name='Coverage Range')
    age_range = models.ForeignKey(
        AgeRange, on_delete=models.CASCADE, verbose_name='Age Range')
    gender = models.CharField(max_length=1, choices=GENDER, default=MALE)
    premium_range = models.CharField(
        max_length=255, verbose_name='Premium Range')

    def __str__(self):
        return str(self.coverage_range) + " | " + str(self.age_range) + " | " + str(self.gender) + " | " + str(self.premium_range)


class UserResponse(TimeStampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    questionnaire_questions = models.JSONField()
    response_json = models.JSONField()

    def __str__(self):
        return str(self.user.email)

    def my_handler(sender, instance, created, **kwargs):
        action.send(instance, verb='was saved')


class UserActivityLog(TimeStampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    activity = models.TextField(blank=True, null=True)

    # class Questionnaire(TimeStampedModel):
    #     name = models.CharField(max_length=255)
    #     questions = models.ManyToManyField(Question)

    # class Question(TimeStampedModel):
    #     question_text = models.CharField(max_length=255)
    #     question_category = models.CharField(max_length=2)

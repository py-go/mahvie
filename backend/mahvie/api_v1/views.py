from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.exceptions import NotFound

from script import noble_wealth_scraper
from api_v1.models import UserResponse


class QuestionnaireResponse(APIView):

    permission_classes = [AllowAny]

    def post(self, request, format=None):
        """
        Pass form data values to NobleWealth LDA Input
        """
        user_response = {}

        if self.request.user.is_authenticated:
            questionnaire_response = request.data

            try:
                user_response = UserResponse.objects.get(
                    user=self.request.user)
                user_response.response_json = questionnaire_response

            except UserResponse.DoesNotExist:
                user_response = UserResponse()
                user_response.user = self.request.user
                user_response.response_json = questionnaire_response

            user_response.save()

        email = request.data.get('email')
        smoke = request.data.get('smoke')
        first_name = request.data.get('firstName')
        last_name = request.data.get('lastName')
        expenses = request.data.get('expenses')
        gender = request.data.get('gender')
        no_of_childern = request.data.get('children-length')
        mortgage = request.data.get('mortgage')
        dob = request.data.get('dob')

        country = request.data.get('ontario')
        income = request.data.get('income')
        products = request.data.get('products')
        children = request.data.get('children')
        without_income = request.data.get('without-income')
        income_replaced = request.data.get('income-replaced')
        survive_without_income = request.data.get('survive-without-income')
        income_to_spouse = request.data.get('income-to-spouse')
        full_name = request.data.get('fullName')

        data = {}
        # https://github.com/Mahvie-Inc/mahvie/issues/11
        data['country'] = 'Ontario'
        data['purpose'] = 'Buying a House'
        data['amount_needed'] = "I'm not sure how much I need"
        data['phone'] = '123-456-7890'
        data['child_eduction_fund'] = ''
        data['total_household_debt'] = ''
        data['additional_coverage'] = ''
        data['inflation_percentage'] = '1.5'
        data['current_lic'] = ''

        data['gender'] = gender
        data['smoke'] = smoke
        data['dob'] = dob
        data['first_name'] = first_name
        data['last_name'] = last_name
        data['email'] = email
        data['mortage_debt'] = mortgage
        data['income_replacement_value_after_tax'] = income_replaced
        data['income_replacement_value_years'] = '5'

        data['year_of_schooling'] = '2'
        data['no_of_childern'] = no_of_childern

        data['final_expense'] = expenses

        data['year_of_inflation'] = '1'

        data['investments'] = ''

        # result = noble_wealth_scraper(**data)
        result = {"status": "OK"}
        return Response(result, status=status.HTTP_200_OK)


class GetQuestionnaireResponse(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        try:
            user_response = UserResponse.objects.get(user=self.request.user)
        except UserResponse.DoesNotExist:
            raise NotFound("No Questionnaire found")

        return Response(user_response.response_json, status=status.HTTP_200_OK)

from rest_framework import status
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from script import noble_wealth_scraper


class QuestionnaireResponse(APIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        """
        Pass form data values to NobleWealth LDA Input
        """
        # gender = request.data.get('What is your gender?')
        # smoke = request.data.get('Have you smoked in the last 12 months?')
        # dob = request.data.get('When were you born?')

        data = {}

        data['gender'] = 'Male'
        data['country'] = 'Ontario'
        data['smoker'] = 'Do'
        data['dob'] = '02/12/1970'
        data['purpose'] = 'Buying a House'
        data['amount_needed'] = "I'm not sure how much I need"
        data['first_name'] = 'John'
        data['last_name'] = 'Peter'
        data['phone'] = '123-456-7890'
        data['email'] = 'test@test.com'
        data['mortage_debt'] = '1000'
        data['income_replacement_value_after_tax'] = '1200000'
        data['income_replacement_value_years'] = '5'
        data['child_eduction_fund'] = '20000'
        data['year_of_schooling'] = '2'
        data['no_of_childern'] = '2'
        data['total_household_debt'] = '20000'
        data['final_expense'] = '250000'
        data['additional_coverage'] = ''
        data['inflation_percentage'] = '1.5'
        data['year_of_inflation'] = '1'
        data['current_lic'] = ''
        data['investments'] = ''

        result = noble_wealth_scraper(**data)
        return Response(result, status=status.HTTP_200_OK)

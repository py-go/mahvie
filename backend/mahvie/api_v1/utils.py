from datetime import date

from rest_framework.views import exception_handler
from rest_framework.exceptions import ValidationError


def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.

    response = exception_handler(exc, context)
    if response is not None:
        if isinstance(exc, ValidationError):
            response.data['error'] = "Validation Error"
        else:
            response.data['error'] = str(exc.detail)

        response.data['status_code'] = response.status_code
        response.data['status_text'] = response.status_text
        response.data.pop('detail', None)

    return response


def calculate_age(born):
    # Calculate the age from the dob
    today = date.today()
    try:
        birthday = born.replace(year=today.year)

    except ValueError:
        birthday = born.replace(year=today.year,
                                month=born.month + 1, day=1)

    if birthday > today:
        return today.year - born.year - 1
    else:
        return today.year - born.year


def get_range_value(age):
    if 25 <= age <= 30:
        return 25, 30
    elif 30 <= age <= 35:
        return 30, 35
    elif 35 <= age <= 40:
        return 35, 40
    elif 40 <= age <= 45:
        return 40, 45
    elif 45 <= age <= 50:
        return 45, 50


def critical_illness_data(t1, t2, t3):

    term = "Term-20"
    policy_length = "20 Years"

    coverage_amount_t1 = "Tier 1 Coverage Range"
    coverage_amount_t2 = "Tier 2 Coverage Range"
    coverage_amount_t3 = "Tier 3 Coverage Range"

    monthly_payment_t1 = t1
    monthly_payment_t2 = t2
    monthly_payment_t3 = t3

    data = {}

    data['Tier 1'] = {"Term": term, "Policy length": policy_length,
                      "Coverage Amount": coverage_amount_t1,
                      "Monthly payment": monthly_payment_t1}

    data['Tier 2'] = {"Term": term, "Policy length": policy_length,
                      "Coverage Amount": coverage_amount_t2,
                      "Monthly payment": monthly_payment_t2}

    data['Tier 3'] = {"Term": term, "Policy length": policy_length,
                      "Coverage Amount": coverage_amount_t3,
                      "Monthly payment": monthly_payment_t3}

    return data


def long_term_care(age):

    term = "Pay to age 65"
    policy_length = 65 - age

    data = {}

    data['Tier 1'] = {"Term": term, "Policy length": policy_length,
                      "Coverage Amount": "$2,000/month",
                      "Monthly payment": " $60"}

    data['Tier 2'] = {"Term": term, "Policy length": policy_length,
                      "Coverage Amount": "$4,000/month",
                      "Monthly payment": "$106"}

    data['Tier 3'] = {"Term": term, "Policy length": policy_length,
                      "Coverage Amount": "$6,000/month",
                      "Monthly payment": "$152"}

    return data

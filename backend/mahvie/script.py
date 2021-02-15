# import time
from selenium import webdriver
# from selenium.webdriver.firefox.options import Options
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select
import time


def noble_wealth_scraper(**input_data):

    options = Options()
    options.add_argument("--headless")
    options.add_argument("--enable-javascript")
    driver = webdriver.Chrome(
        "/usr/lib/chromium-browser/chromedriver", options=options)

    driver.get("https://www.noblewealthfinancial.com/quote")
    # time.sleep(5)
    frame1 = driver.find_element_by_name("htmlComp-iframe")
    driver.switch_to.frame(frame1)

    frame2 = driver.find_element_by_id("iFrameResizer0")
    driver.switch_to.frame(frame2)

    # Featching the form data input
    gender = Select(driver.find_element_by_id('core_gender_code'))
    country = Select(driver.find_element_by_id('core_country_region_id'))
    smoker = Select(driver.find_element_by_id('smoker'))
    purpose = Select(driver.find_element_by_id('purpose'))
    insurance_benefit_amount_select = Select(
        driver.find_element_by_id('insurance_benefit_amount_select'))

    dob = driver.find_element_by_name('birthday')
    first_name = driver.find_element_by_id('first_name')
    last_name = driver.find_element_by_id('last_name')
    phone = driver.find_element_by_id('phone')
    email = driver.find_element_by_id('email')

    # Settings random values
    gender.select_by_visible_text(input_data.get('gender'))
    country.select_by_visible_text(input_data.get('country'))
    smoker.select_by_visible_text(input_data.get('smoke'))
    purpose.select_by_visible_text(input_data.get('purpose'))
    insurance_benefit_amount_select.select_by_visible_text(
        input_data.get('amount_needed'))

    dob.clear()
    first_name.clear()
    last_name.clear()
    phone.clear()
    email.clear()

    dob.send_keys(input_data.get('dob'))
    first_name.send_keys(input_data.get('first_name'))
    last_name.send_keys(input_data.get('last_name'))
    phone.send_keys(input_data.get('phone'))
    email.send_keys(input_data.get('email'))

    driver.find_element_by_id("case_form_needsanalysis_embed_client").submit()
    # time.sleep(5)
    mortage_debt = driver.find_element_by_name('values[mortgage]')
    income_replacement_value_after_tax = driver.find_element_by_name(
        'values[income]')
    income_replacement_value_years = driver.find_element_by_name(
        'values[income-multiplier]')
    child_eduction_fund = driver.find_element_by_name('values[education]')
    year_of_schooling = driver.find_element_by_name(
        'values[education-multiplier][years]')
    no_of_childern = driver.find_element_by_name(
        'values[education-multiplier][children]')
    total_household_debt = driver.find_element_by_name('values[debt]')
    final_expenses = driver.find_element_by_name('values[expenses]')
    additional_coverage_label = driver.find_element_by_name('labels[other]')
    additional_coverage_value = driver.find_element_by_name('values[other]')
    inflation_percentage = driver.find_element_by_name(
        'multipliers[inflation]')
    year_of_inflation = driver.find_element_by_name(
        'multipliers[inflation-multiplier]')
    current_lic = driver.find_element_by_name('values[insurance]')
    investments = driver.find_element_by_name('values[assets]')

    mortage_debt.clear()
    income_replacement_value_after_tax.clear()
    income_replacement_value_years.clear()
    child_eduction_fund.clear()
    year_of_schooling.clear()
    no_of_childern.clear()
    total_household_debt.clear()
    final_expenses.clear()
    additional_coverage_label.clear()
    additional_coverage_value.clear()
    inflation_percentage.clear()
    year_of_inflation.clear()
    current_lic.clear()
    investments.clear()

    mortage_debt.send_keys(input_data.get('mortage_debt'))
    income_replacement_value_after_tax.send_keys(
        input_data.get('income_replacement_value_after_tax'))
    income_replacement_value_years.send_keys(
        input_data.get('income_replacement_value_years'))
    child_eduction_fund.send_keys(input_data.get('child_eduction_fund'))
    year_of_schooling.send_keys(input_data.get('year_of_schooling'))
    no_of_childern.send_keys(input_data.get('no_of_childern'))
    total_household_debt.send_keys(input_data.get('total_household_debt'))
    final_expenses.send_keys(input_data.get('final_expense'))
    additional_coverage_value.send_keys(input_data.get('additional_coverage'))
    inflation_percentage.send_keys(input_data.get('inflation_percentage'))
    year_of_inflation.send_keys(input_data.get('year_of_inflation'))
    current_lic.send_keys(input_data.get('current_lic'))
    investments.send_keys(input_data.get('investments'))

    driver.find_element_by_xpath(
        "//form[@action='https://lifedesignanalysis.com/case/embed/needs-analysis-save/token/iLMrd0dcMB3UggqA/']").submit()

    # time.sleep(5)
    a = driver.find_element_by_partial_link_text('VIEW')
    driver.execute_script("arguments[0].click();", a)

    driver.switch_to.window(driver.window_handles[1])
    driver.find_element_by_xpath('//button[text()="Generate PDF"]').click()

    # driver.get(
    #     "https://lifedesignanalysis.com/my-case/6a4562ef882d363727f660edc53b31a5636465d2")

    insurance_company = None
    insurance_term = None
    insurance_premium = None
    insurance_coverage = None
    insurance = None
    outer_dict = {}

    # Fetch all tables
    tables = driver.find_elements_by_tag_name('table')

    policy_length = ["10 years", "20 years", "30 years"]

    # Fetch PREMIUM SCHEDULE details

    if len(tables) >= 1:
        insurance = tables[1].find_elements_by_class_name("plan-details")
        if len(insurance) > 1:
            for i, each_tr in enumerate(insurance):
                inner_dict = {}
                # insurance_company = each_tr.text.split('-')[0].rstrip()
                start = each_tr.text.find('Term')
                end = start + 7
                insurance_term = each_tr.text[start:end].lstrip()
                insurance_premium = each_tr.find_elements_by_xpath(".//following-sibling::td")[
                    1].text

                try:
                    insurance_coverage = each_tr.text.split(
                        '\n')[2].split(':')[1].lstrip()
                except:
                    pass

                tier = "tier_" + str(i)
                # inner_dict['company'] = insurance_company
                insurance_premium = insurance_premium.replace(',', '')
                insurance_premium = insurance_premium.replace('$', '')
                inner_dict['term'] = insurance_term
                inner_dict['policy_length'] = policy_length[i]
                inner_dict['coverage_amount'] = insurance_coverage
                inner_dict['monthly_payment'] = float(insurance_premium)/12
                inner_dict['monthly_payment'] = "$" + \
                    str(inner_dict['monthly_payment'])

                if i == 1:
                    inner_dict['recommended'] = True

                outer_dict.update({tier: inner_dict})

    return outer_dict

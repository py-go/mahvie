import time

from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys

driver = webdriver.Firefox()
driver.get("https://www.noblewealthfinancial.com/quote")
time.sleep(10)
frame1 = driver.find_element_by_name("htmlComp-iframe")
driver.switch_to.frame(frame1)

frame2 = driver.find_element_by_xpath("//iframe[@id='iFrameResizer0']")
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
gender.select_by_visible_text('Male')
country.select_by_visible_text('Ontario')
smoker.select_by_visible_text("Don't")
purpose.select_by_visible_text('Buying a House')
insurance_benefit_amount_select.select_by_visible_text(
    "I'm not sure how much I need")

dob.clear()
first_name.clear()
last_name.clear()
phone.clear()
email.clear()

dob.send_keys("02/12/1970")
first_name.send_keys("John")
last_name.send_keys("Peter")
phone.send_keys("756652213251")
email.send_keys("text@text.com")


driver.find_element_by_id("case_form_needsanalysis_embed_client").submit()
time.sleep(10)
print(driver.page_source)

import { test, expect, Page } from '@playwright/test';

test('Apply Investment Manager license with valid data', async ({ page }) => {
  
  // login
  await page.goto('https://dev-sl-sec.corewatch.io/auth/entity/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('rash@mail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test123#');
  await page.getByRole('button', { name: 'Log In' }).click();

  // navigate to license application
  await page.getByRole('button', { name: 'Licenses' }).click();

  // apply new license
  await page.getByRole('button', { name: ' New License' }).click();
  await page.locator('div').filter({ hasText: /^Investment Manager$/ }).nth(1).click();
  await page.getByRole('button', { name: 'Apply Now' }).click();
  await page.getByRole('button', { name: 'Start' }).click();

  // fill application form

  // Page 1
  await page.getByRole('textbox', { name: 'Name of the Applicant' }).click();
  await page.getByRole('textbox', { name: 'Name of the Applicant' }).fill('Tester');
  await page.keyboard.press('Tab'); // important for Angular forms

  const addressInput = page.getByRole('textbox', { name: 'Address', exact: true });
  await expect(addressInput).toBeEditable();
  await addressInput.fill('Wadduwa');
  await page.getByRole('textbox', { name: 'Enter Registered Name' }).click();
  await page.getByRole('textbox', { name: 'Enter Registered Name' }).fill('ABC Company');
  await page.locator('subsection').filter({ hasText: 'Applicant Information' }).getByPlaceholder('Enter Email Address').click();
  await page.locator('subsection').filter({ hasText: 'Applicant Information' }).getByPlaceholder('Enter Email Address').fill('test@mail.com');
  await page.getByRole('textbox', { name: 'Phone Number', exact: true }).click();
  await page.getByRole('textbox', { name: 'Phone Number', exact: true }).fill('716305745');
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter Address Line 1').click();
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter Address Line 1').fill('Kaluthara');
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter City').click();
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter City').fill('Wadduwa');
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter State/Province/Region').click();
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter State/Province/Region').fill('Western');
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter Postal Code').click();
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter Postal Code').fill('12560');
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByRole('combobox').selectOption('Sri Lanka');
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter Name').click();
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter Name').fill('Tester');
  await page.getByRole('textbox', { name: 'Enter Designation' }).click();
  await page.getByRole('textbox', { name: 'Enter Designation' }).fill('CEO');
  await page.locator('subsection').filter({ hasText: 'Contact Person Information' }).getByPlaceholder('Enter Email Address').click();
  await page.locator('subsection').filter({ hasText: 'Contact Person Information' }).getByPlaceholder('Enter Email Address').fill('test@mail.com');
  await page.getByRole('textbox', { name: 'Enter Phone Number' }).click();
  await page.getByRole('textbox', { name: 'Enter Phone Number' }).fill('71564789');
  await page.getByRole('textbox', { name: 'Enter Organization Name' }).click();
  await page.getByRole('textbox', { name: 'Enter Organization Name' }).fill('ABC Com');
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter Address Line 1').click();
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter Address Line 1').fill('Kaluthara');
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter City').click();
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter City').fill('Wadduwa');
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter State/Province/Region').click();
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter State/Province/Region').fill('Western');
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter Postal Code').click();
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter Postal Code').fill('12560');
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByRole('combobox').selectOption('Sri Lanka');
  await page.getByRole('textbox', { name: 'Write..', exact: true }).click();
  await page.getByRole('textbox', { name: 'Write..', exact: true }).fill('Test sttsts tstst stts ststst ststst ststts');
  await page.locator('form-field-wrapper').filter({ hasText: 'Stated Capital' }).getByPlaceholder('0').click();
  await page.locator('form-field-wrapper').filter({ hasText: 'Stated Capital' }).getByPlaceholder('0').fill('100000000');
  await page.locator('form-field-wrapper').filter({ hasText: 'Shareholders Funds' }).getByPlaceholder('0').click();
  await page.locator('form-field-wrapper').filter({ hasText: 'Shareholders Funds' }).getByPlaceholder('0').fill('75000000');
  await page.locator('date-picker i').click();
  await page.getByLabel('Sunday, January 11,').getByText('11').click();
  await page.getByRole('button', { name: '+ Add Entry' }).click();
  await page.getByRole('textbox', { name: 'Holding Company' }).click();
  await page.getByRole('textbox', { name: 'Holding Company' }).fill('ABC 2');
  await page.getByRole('textbox', { name: 'Name of The Company' }).click();
  await page.getByRole('textbox', { name: 'Name of The Company' }).fill('XYZ');
  await page.getByRole('combobox').selectOption('Partnership');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('subsection').filter({ hasText: 'Ultimate Holding CompanyIf' }).getByPlaceholder('Enter Name').click();
  await page.locator('subsection').filter({ hasText: 'Ultimate Holding CompanyIf' }).getByPlaceholder('Enter Name').fill('N/A');
  await page.locator('form-field-wrapper').filter({ hasText: 'Country of Incorporation' }).getByRole('combobox').selectOption('Sri Lanka');
  await page.getByRole('textbox', { name: 'Write...' }).click();
  await page.getByRole('textbox', { name: 'Write...' }).fill('N/A');
  await page.locator('field-group').filter({ hasText: 'Registered Office Address' }).getByPlaceholder('Enter Address Line 1').click();
  await page.locator('field-group').filter({ hasText: 'Registered Office Address' }).getByPlaceholder('Enter Address Line 1').fill('N/A');
  await page.locator('field-group').filter({ hasText: 'Registered Office Address' }).getByPlaceholder('Enter City').click();
  await page.locator('field-group').filter({ hasText: 'Registered Office Address' }).getByPlaceholder('Enter City').fill('N/A');
  await page.locator('field-group').filter({ hasText: 'Registered Office Address' }).getByPlaceholder('Enter State/Province/Region').click();
  await page.locator('field-group').filter({ hasText: 'Registered Office Address' }).getByPlaceholder('Enter State/Province/Region').fill('N/A');
  await page.locator('field-group').filter({ hasText: 'Registered Office Address' }).getByPlaceholder('Enter Postal Code').click();
  await page.locator('field-group').filter({ hasText: 'Registered Office Address' }).getByPlaceholder('Enter Postal Code').fill('12560');
  await page.locator('form-field-wrapper').filter({ hasText: 'Country Select Country N/A' }).getByRole('combobox').selectOption('Sri Lanka');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Next' }).click();

  // Page 2

  const filePath = 'C:/Users/MSI/Downloads/postman.jpg';

  const page2 = page
  .locator('form-field-wrapper')
  .filter({ hasText: 'Group Structure' });

  await expect(page2).toBeVisible();
  await page.locator('form-field-wrapper').filter({ hasText: 'Group Structure' }).locator('img').click();
  const fileInput = page.locator('input[type="file"]').nth(0);
  await fileInput.setInputFiles(filePath);
  await page.locator('input[type="file"]').nth(1)
    .setInputFiles(filePath);

  await page.getByRole('radio', { name: 'No' }).check();
  await page.getByRole('combobox').selectOption('Individual');
  await page.getByRole('textbox', { name: 'Shareholder Name' }).click();
  await page.getByRole('textbox', { name: 'Shareholder Name' }).fill('Person A');
  await page.getByPlaceholder('No. of Shares').click();
  await page.getByPlaceholder('No. of Shares').fill('100');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('No. of Shares').click();
  await page.getByPlaceholder('Percentage of Shares Held').click();
  await page.getByPlaceholder('Percentage of Shares Held').fill('100');
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Next' }).click();

  // Page 3
  await page.getByRole('button', { name: '+ Add Entry' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill('ABC Person');
  await page.getByRole('textbox', { name: 'NIC/passport' }).click();
  await page.getByRole('textbox', { name: 'NIC/passport' }).fill('200130002222');
  await page.locator('form-field-wrapper').filter({ hasText: 'Independent/ Non-Independent' }).getByRole('combobox').selectOption('Independent');
  await page.locator('form-field-wrapper').filter({ hasText: 'Executive/ Non-Executive' }).getByRole('combobox').selectOption('Executive');
  await page.getByRole('textbox', { name: 'Address Line 1' }).click();
  await page.getByRole('textbox', { name: 'Address Line 1' }).fill('Kaluthara');
  await page.getByRole('textbox', { name: 'Enter City' }).click();
  await page.getByRole('textbox', { name: 'Enter City' }).fill('Wadduwa');
  await page.getByRole('textbox', { name: 'Enter State/Province/Region' }).click();
  await page.getByRole('textbox', { name: 'Enter State/Province/Region' }).fill('Western');
  await page.getByRole('textbox', { name: 'Enter Postal Code' }).click();
  await page.getByRole('textbox', { name: 'Enter Postal Code' }).fill('12560');
  await page.locator('form-field-wrapper').filter({ hasText: 'Country Select Country' }).getByRole('combobox').selectOption('Sri Lanka');
  await page.getByRole('button', { name: 'Save' }).click();
  
  async function selectRadio(
    page: Page,
    questionText: string,
    optionIndex: number
  ) {
    const question = page
      .locator('form-field-wrapper')
      .filter({ hasText: questionText });

    await expect(question).toBeVisible();
    await question.locator('input[type="radio"]').nth(optionIndex).check();
  }

  // No
  await selectRadio(page, 'rejected by the SEC', 0);

  // Yes
  await selectRadio(page, 'Rules of the SEC', 1);

  await page.getByRole('textbox', { name: 'Name of the Director' }).click();
  await page.getByRole('textbox', { name: 'Name of the Director' }).fill('Person A');
  await page.getByRole('textbox', { name: 'Company' }).click();
  await page.getByRole('textbox', { name: 'Company' }).fill('ABC');
  await page.getByRole('combobox').selectOption('Investment Manager');

  await selectRadio(page, 'fraudulently or dishonestly', 0);
  await selectRadio(page, 'sanction under the SEC Act', 0);
  await selectRadio(page, 'securities outside Sri Lanka', 0);
  await selectRadio(page, 'discharged or undischarged bankrupts', 0);
  await selectRadio(page, ' Is an undischarged bankrupt, either within or outside Sri Lanka', 0);

  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Next' }).click();

  // Page 4
  await selectRadio(page, 'Are there any such proceedings now pending in a court of law', 0);
  await page.waitForTimeout(1000);
  await selectRadio(page, 'in respect of any of the assets of the Applicant', 1);
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Details' }).click();
  await page.getByRole('textbox', { name: 'Details' }).fill('Test');

  await selectRadio(page, 'process of being wound up, dissolved, or an undischarged bankrupt', 0);
  await selectRadio(page, 'satisfied in whole or in part', 0);
  await selectRadio(page, 'Compromise or Scheme of Arrangement with its Creditors', 0);
  await selectRadio(page, 'actions by the SEC or any other professional or regulatory body', 0);
  await selectRadio(page, 'as a Market Intermediary and been rejected by the SEC', 0);
  await selectRadio(page, 'renew its licence in terms of the applicable Rules of the SEC', 0);

  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Next' }).click();

  // Page 5
  await page.locator('form-field-wrapper').filter({ hasText: 'Memorandum/ Articles of' }).locator('img').click();
  const fileInput2 = page.locator('input[type="file"]').nth(0);
  await fileInput2.setInputFiles(filePath);
  await page.locator('input[type="file"]').nth(1)
    .setInputFiles(filePath);
  await page.getByRole('textbox', { name: 'Regulator' }).click();
  await page.getByRole('textbox', { name: 'Regulator' }).fill('ABC');
  await page.getByRole('textbox', { name: 'Regulated Activity' }).click();
  await page.getByRole('textbox', { name: 'Regulated Activity' }).fill('Test');
  await page.getByRole('textbox', { name: 'Business Name' }).click();
  await page.getByRole('textbox', { name: 'Business Name' }).fill('ABC');
  await page.getByRole('textbox', { name: 'Nature of the Business' }).click();
  await page.getByRole('textbox', { name: 'Nature of the Business' }).fill('Test');


  async function uploadDocument(
    page: Page,
    sectionText: string,
    filePath: string
  ) {
    const section = page
      .locator('form-field-wrapper')
      .filter({ hasText: sectionText });

    await expect(section).toBeVisible();

    // click upload icon if required
    await section.locator('img').click();

    const fileInput = section.locator('input[type="file"]');
    await expect(fileInput).toHaveCount(1);

    await fileInput.setInputFiles(filePath);
  }

  await uploadDocument(page, 'Business Model Documentation', filePath);
  await uploadDocument(page, "Applicant's Declaration", filePath);
  await uploadDocument(page, 'Internal Compliance Manual', filePath);
  await uploadDocument(page, 'Documentation in support of measures taken', filePath);
  await uploadDocument(page, 'Documentation in Support of Steps Taken', filePath);

  await page.waitForTimeout(2000); 
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  // Page 6 - Payment
  await page.waitForURL(/licenses\/.*\/form-view\/2/);
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('textbox', { name: 'Enter Address Line 1' }).click();
  await page.getByRole('textbox', { name: 'Enter Address Line 1' }).fill('Kaluthara');
  await page.getByRole('textbox', { name: 'Enter City' }).click();
  await page.getByRole('textbox', { name: 'Enter City' }).fill('Wadduwa');
  await page.getByRole('textbox', { name: 'Enter State/Province/Region' }).click();
  await page.getByRole('textbox', { name: 'Enter State/Province/Region' }).fill('Western');
  await page.getByRole('textbox', { name: 'Enter Postal Code' }).click();
  await page.getByRole('textbox', { name: 'Enter Postal Code' }).fill('12560');
  await page.locator('form-field-wrapper').filter({ hasText: 'Country Select Country' }).getByRole('combobox').selectOption('Sri Lanka');
  await uploadDocument(page, 'Please upload your payment confirmation here', filePath);
  await page.getByRole('checkbox', { name: 'I hereby acknowledge that I' }).check();
  await page.getByRole('checkbox', { name: 'We declare that all' }).check();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'Ok' }).click();
});
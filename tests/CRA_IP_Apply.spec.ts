import { test, expect, Page } from '@playwright/test';

test('Apply Credit Rating Agency license with valid data', async ({ page }) => {
  
  // login
  await page.goto('https://dev-sl-sec.corewatch.io/auth/entity/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('taniya@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test123#');
  await page.getByRole('button', { name: 'Log In' }).click();

  // navigate to license application
  await page.getByRole('button', { name: 'Licenses' }).click();

  // apply new license
  await page.getByRole('button', { name: ' New License' }).click();
  await page.locator('div').filter({ hasText: /^Credit Rating Agency$/ }).nth(1).click();
  await page.getByRole('button', { name: 'Apply Now' }).click();
  await page.getByRole('button', { name: 'Start' }).click();

  // fill application form

  // Page 1
  await page.getByRole('textbox', { name: 'Name of the Applicant' }).click();
  await page.getByRole('textbox', { name: 'Name of the Applicant' }).fill('Tester');
  await page.keyboard.press('Tab'); 

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
  await page.getByRole('textbox', { name: 'Write..' }).click();
  await page.getByRole('textbox', { name: 'Write..' }).fill('Test test test test test test test');
  await page.locator('form-field-wrapper').filter({ hasText: 'Stated Capital' }).getByPlaceholder('0').click();
  await page.locator('form-field-wrapper').filter({ hasText: 'Stated Capital' }).getByPlaceholder('0').fill('100000000');
  await page.locator('form-field-wrapper').filter({ hasText: 'Shareholders Funds' }).getByPlaceholder('0').click();
  await page.locator('form-field-wrapper').filter({ hasText: 'Shareholders Funds' }).getByPlaceholder('0').fill('15000000');
  await page.locator('date-picker i').click();
  await page.getByLabel('Saturday, February 28,').getByText('28').click();
  await page.getByRole('button', { name: '+ Add Entry' }).click();
  await page.getByRole('textbox', { name: 'Holding Company' }).click();
  await page.getByRole('textbox', { name: 'Holding Company' }).fill('ABC 2');
  await page.getByRole('textbox', { name: 'Name of The Company' }).click();
  await page.getByRole('textbox', { name: 'Name of The Company' }).fill('XYZ');
  await page.getByRole('combobox').selectOption('Partnership');
  await page.getByRole('button', { name: 'Save' }).click();

  const filePath = 'C:/Users/MSI/Downloads/postman.jpg';

    async function uploadDocument(page: Page, sectionText: string, filePath: string) {
        const section = page.locator('form-field-wrapper').filter({ hasText: sectionText });

        await expect(section).toBeVisible();

        // click upload icon
        await section.getByRole('img', { name: 'Upload Icon' }).click();

        // find the file input inside THIS section only
        const fileInput = section.locator('input[type="file"]');
        await expect(fileInput).toHaveCount(1);

        await fileInput.setInputFiles(filePath);
    }

  const uploads = page.getByLabel(/upload document/i);

  for (let i = 0; i < await uploads.count(); i++) {
    await uploads.nth(i).setInputFiles(filePath);
  }
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Next' }).click();

  // Page 2

  await page.getByRole('radio', { name: 'No' }).check();
  await page.locator('date-picker i').click();
  await page.getByLabel('Saturday, February 28,').getByText('28').click();
  await page.locator('subsection').filter({ hasText: 'Odinary Shareholding Type' }).getByRole('combobox').selectOption('Individual');
  await page.getByRole('row', { name: 'Individual ' }).getByPlaceholder('Shareholder Name').click();
  await page.getByRole('row', { name: 'Individual ' }).getByPlaceholder('Shareholder Name').fill('Thisara Perera');
  await page.getByRole('row', { name: 'Individual Thisara Perera ' }).getByPlaceholder('No. of Shares').click();
  await page.getByRole('row', { name: 'Individual Thisara Perera ' }).getByPlaceholder('No. of Shares').fill('80');
  await page.getByRole('row', { name: 'Individual Thisara Perera ' }).getByPlaceholder('Percentage of Shares Held').click();
  await page.getByRole('row', { name: 'Individual Thisara Perera ' }).getByPlaceholder('Percentage of Shares Held').fill('100');
  await page.getByRole('row', { name: '1 ' }).getByPlaceholder('Shareholder Name').click();
  await page.getByRole('row', { name: '1 ' }).getByPlaceholder('Shareholder Name').fill('Thusith');
  await page.getByRole('row', { name: 'Thusith ' }).getByPlaceholder('No. of Shares').click();
  await page.getByRole('row', { name: 'Thusith ' }).getByPlaceholder('No. of Shares').fill('80');
  await page.getByPlaceholder('0').click();
  await page.getByPlaceholder('0').fill('100');
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
  await page.locator('subsection').filter({ hasText: 'Are the Directors of the Applicant, functioning in the capacity of Directors of' }).getByPlaceholder('Enter Name of The Company').click();
  await page.locator('subsection').filter({ hasText: 'Are the Directors of the Applicant, functioning in the capacity of Directors of' }).getByPlaceholder('Enter Name of The Company').fill('Company A');
  await page.locator('subsection').filter({ hasText: 'Are the Directors of the Applicant, also Directors of the Holding Company/' }).getByPlaceholder('Enter Name of The Company').click();
  await page.locator('subsection').filter({ hasText: 'Are the Directors of the Applicant, also Directors of the Holding Company/' }).getByPlaceholder('Enter Name of The Company').fill('Company B');
  await page.locator('subsection').filter({ hasText: 'Are the Directors of the Applicant, shareholders of Listed Companies? Name of' }).getByPlaceholder('Enter Name of The Company').click();
  await page.locator('subsection').filter({ hasText: 'Are the Directors of the Applicant, shareholders of Listed Companies? Name of' }).getByPlaceholder('Enter Name of The Company').fill('Company C');
  await page.locator('subsection').filter({ hasText: 'Are the Directors of the Applicant, directors of another company which has also' }).getByPlaceholder('Enter Name of The Company').click();
  await page.locator('subsection').filter({ hasText: 'Are the Directors of the Applicant, directors of another company which has also' }).getByPlaceholder('Enter Name of The Company').fill('Company D');
  await page.getByRole('row', { name: '1 ' }).getByPlaceholder('Enter Name of The Company').click();
  await page.getByRole('row', { name: '1 ' }).getByPlaceholder('Enter Name of The Company').fill('Company E');
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

  await selectRadio(page, 'fraudulently or dishonestly', 0);
  await selectRadio(page, 'sanction under the SEC Act', 0);
  await selectRadio(page, 'securities outside Sri Lanka', 0);
  await selectRadio(page, 'discharged or undischarged bankrupts', 0);
  await selectRadio(page, 'Is an undischarged bankrupt whether within or outside Sri Lanka', 0);

  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Next' }).click();

  // Page 4
  await selectRadio(page, 'in any criminal/civil proceedings, or are there any proceedings now pending in a court of law?', 0);
  await page.waitForTimeout(1000);
  await selectRadio(page, 'an equivalent person appointed in respect of any of the assets of the Applicant?', 1);
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Details' }).click();
  await page.getByRole('textbox', { name: 'Details' }).fill('Test test test test');

  await selectRadio(page, 'Is the Applicant in the course of being wound up or otherwise dissolved or an undischarged bankrupt?', 0);
  await selectRadio(page, 'a judgment debt against the Applicant which has not been satisfied in whole or in part?', 0);
  await selectRadio(page, 'the Applicant entered into a compromise or a scheme of arrangement with its creditors?', 0);
  await selectRadio(page, 'the Applicant been subjected to any form of disciplinary proceedings/ actions by the SEC or any other professional or regulatory body?', 0);

  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Next' }).click();

  // Page 5
    // Memorandum / Articles of
    // await page.locator('subsection')
    // .filter({ hasText: 'Memorandum/ Articles of' })
    // .locator('img')
    // .click();

    // const fileInput2 = page.locator('input[type="file"]');
    // await fileInput2.first().setInputFiles(filePath);


    // // Certificate of Incorporation
    // await page.locator('subsection')
    // .filter({ hasText: 'Certificate of Incorporation' })
    // .locator('img')
    // .click();

    // await fileInput2.nth(1).setInputFiles(filePath);

  await page.getByRole('textbox', { name: 'Regulator' }).click();
  await page.getByRole('textbox', { name: 'Regulator' }).fill('ABC');
  await page.getByRole('textbox', { name: 'Regulated Activity' }).click();
  await page.getByRole('textbox', { name: 'Regulated Activity' }).fill('Test');
  await page.getByRole('textbox', { name: 'Nature of the Business' }).click();
  await page.getByRole('textbox', { name: 'Nature of the Business' }).fill('Test');

  for (let i = 0; i < await uploads.count(); i++) {
    await uploads.nth(i).setInputFiles(filePath);
  }

  await page.getByRole('textbox', { name: 'Full Name' }).fill('Sasindu Rashmika');
  await page.getByRole('textbox', { name: 'NIC/Passport No.' }).fill('200130002123');
  await page.getByRole('cell', { name: 'Select Designation' }).getByRole('combobox').selectOption('CEO');
  await page.locator('.bi.bi-calendar-event').click();
  await page.getByLabel('Saturday, February 28,').getByText('28').click();
  await page.getByText('Attach File').click();
  await page.getByLabel('Attach File').setInputFiles(filePath);

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
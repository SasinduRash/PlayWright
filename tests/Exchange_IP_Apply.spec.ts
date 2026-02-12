import { test, expect, Page } from '@playwright/test';

test('Apply Exchange license with valid data', async ({ page }) => {
  
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
  await page.locator('div').filter({ hasText: /^Exchange$/ }).nth(1).click();
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
  await page.locator('form-field-wrapper').filter({ hasText: 'Describe the form of' }).getByPlaceholder('Write..').click();
  await page.locator('form-field-wrapper').filter({ hasText: 'Describe the form of' }).getByPlaceholder('Write..').fill('Test test test');
  await page.locator('form-field-wrapper').filter({ hasText: 'State whether the Applicant' }).getByPlaceholder('Write..').click();
  await page.locator('form-field-wrapper').filter({ hasText: 'State whether the Applicant' }).getByPlaceholder('Write..').fill('Test test test');
  await page.locator('form-field-wrapper').filter({ hasText: 'Stated Capital' }).getByPlaceholder('0').click();
  await page.locator('form-field-wrapper').filter({ hasText: 'Stated Capital' }).getByPlaceholder('0').fill('100000000');
  await page.locator('form-field-wrapper').filter({ hasText: 'Shareholders Funds' }).getByPlaceholder('0').click();
  await page.locator('form-field-wrapper').filter({ hasText: 'Shareholders Funds' }).getByPlaceholder('0').fill('50000000');
  await page.locator('date-picker i').click();
  await page.getByLabel('Saturday, February 28,').getByText('28').click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Next' }).click();

  // Page 2

  const filePath = 'C:/Users/MSI/Downloads/postman.jpg';

  await page.getByRole('radio', { name: 'Securities Market' }).check();
  await page.locator('subsection').filter({ hasText: 'Odinary Shareholding Type' }).getByRole('combobox').selectOption('Individual');
  await page.getByRole('row', { name: 'Individual ' }).getByPlaceholder('Shareholder Name').click();
  await page.getByRole('row', { name: 'Individual ' }).getByPlaceholder('Shareholder Name').fill('Thisara Perera');
  await page.getByRole('row', { name: 'Individual Thisara Perera ' }).getByPlaceholder('No. of Shares').click();
  await page.getByRole('row', { name: 'Individual Thisara Perera ' }).getByPlaceholder('No. of Shares').fill('80');
  await page.getByRole('row', { name: 'Individual Thisara Perera ' }).getByPlaceholder('Percentage of Shares Held').click();
  await page.getByRole('row', { name: 'Individual Thisara Perera ' }).getByPlaceholder('Percentage of Shares Held').fill('100');
  await page.locator('.ng-untouched > .text-end > .bi').first().click();
  await page.getByRole('row', { name: 'Select Shareholding Type ' }).locator('i').click(); 
    await page.getByRole('button', { name: '+ Add Entry' }).first().click();
    await page.getByRole('textbox', { name: 'Full Name of The Shareholder' }).click();
    await page.getByRole('textbox', { name: 'Full Name of The Shareholder' }).fill('Tharusha Navodya');
    await page.getByRole('textbox', { name: 'Enter Address Line 1' }).click();
    await page.getByRole('textbox', { name: 'Enter Address Line 1' }).fill('Gampaha');
    await page.getByRole('textbox', { name: 'Enter City' }).click();
    await page.getByRole('textbox', { name: 'Enter City' }).fill('Colombo');
    await page.getByRole('textbox', { name: 'Enter State/Province/Region' }).click();
    await page.getByRole('textbox', { name: 'Enter State/Province/Region' }).fill('Western');
    await page.getByRole('textbox', { name: 'Enter Postal Code' }).click();
    await page.getByRole('textbox', { name: 'Enter Postal Code' }).fill('15000');
    await page.locator('subsection').filter({ hasText: 'Residential Address Address' }).getByRole('combobox').selectOption('Sri Lanka');
    await page.locator('form-field-wrapper').filter({ hasText: 'Nationality Select' }).getByRole('combobox').selectOption('Sri Lanka');
    await page.getByRole('textbox', { name: 'NIC/Passport' }).click();
    await page.getByRole('textbox', { name: 'NIC/Passport' }).fill('2003002020');
    await page.getByRole('textbox', { name: 'Enter Occupation' }).click();
    await page.getByRole('textbox', { name: 'Enter Occupation' }).fill('Software Engineer');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: '+ Add Entry' }).nth(1).click();
    await page.getByRole('textbox', { name: 'Name of The Shareholder Entity' }).click();
    await page.getByRole('textbox', { name: 'Name of The Shareholder Entity' }).fill('XYZ Company');
    await page.getByRole('textbox', { name: 'Legal Form of Corporation' }).click();
    await page.getByRole('textbox', { name: 'Legal Form of Corporation' }).fill('Form 1');
    await page.locator('field-group').filter({ hasText: 'Name of The Shareholder' }).getByRole('combobox').selectOption('Sri Lanka');
    await page.getByRole('row', { name: 'Select Country ' }).getByRole('combobox').selectOption('Australia');
    await page.locator('.ng-untouched.ng-pristine.ng-valid > .custom-date-picker > .form-icon-group > .bi').click();
    await page.getByLabel('Select year').selectOption('2023');
    await page.getByLabel('Wednesday, February 1,').locator('div').filter({ hasText: /^1$/ }).click();
    await page.getByRole('textbox', { name: 'Principle Business Activity' }).click();
    await page.getByRole('textbox', { name: 'Principle Business Activity' }).fill('Principle 1');
    await page.getByRole('textbox', { name: 'Name/s of Shareholders Who' }).click();
    await page.getByRole('textbox', { name: 'Name/s of Shareholders Who' }).fill('Thisara Thejana');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('table').filter({ hasText: 'Member Name' }).getByPlaceholder('Name').click();
    await page.getByRole('table').filter({ hasText: 'Member Name' }).getByPlaceholder('Name').fill('Kamal Fernando');
    await page.getByRole('textbox', { name: 'Enter Name' }).click();
    await page.getByRole('textbox', { name: 'Enter Name' }).fill('N/A');
    await page.locator('form-field-wrapper').filter({ hasText: 'Country of Incorporation' }).getByRole('combobox').selectOption('N/A');
    await page.locator('.bi.bi-calendar-event').click();
    await page.getByLabel('Sunday, February 1,').locator('div').filter({ hasText: /^1$/ }).click();
    await page.getByRole('textbox', { name: 'Write...' }).click();
    await page.getByRole('textbox', { name: 'Write...' }).fill('N/A');
    await page.getByRole('textbox', { name: 'Enter Address Line 1' }).click();
    await page.getByRole('textbox', { name: 'Enter Address Line 1' }).fill('N/A');
    await page.getByRole('textbox', { name: 'Enter City' }).click();
    await page.getByRole('textbox', { name: 'Enter City' }).fill('N/A');
    await page.getByRole('textbox', { name: 'Enter State/Province/Region' }).click();
    await page.getByRole('textbox', { name: 'Enter State/Province/Region' }).fill('N/A');
    await page.getByRole('textbox', { name: 'Enter Postal Code' }).click();
    await page.getByRole('textbox', { name: 'Enter Postal Code' }).fill('N/A');
    await page.locator('form-field-wrapper').filter({ hasText: 'Country Select Country' }).getByRole('combobox').selectOption('Sri Lanka');
    await page.getByRole('row', { name: '1 ' }).getByPlaceholder('Name').click();
    await page.getByRole('row', { name: '1 ' }).getByPlaceholder('Name').fill('N/A');
    await page.getByRole('button', { name: '+ Add Entry' }).nth(2).click();
    await page.getByRole('textbox', { name: 'Full Name of The Shareholder' }).click();
    await page.getByRole('textbox', { name: 'Full Name of The Shareholder' }).fill('John Doe');
    await page.getByRole('spinbutton').click();
    await page.getByRole('spinbutton').fill('80');
    await page.getByRole('textbox', { name: 'Enter Address Line 1' }).click();
    await page.getByRole('textbox', { name: 'Enter Address Line 1' }).fill('California');
    await page.getByRole('textbox', { name: 'Enter City' }).click();
    await page.getByRole('textbox', { name: 'Enter City' }).fill('LA');
    await page.getByRole('textbox', { name: 'Enter State/Province/Region' }).click();
    await page.getByRole('textbox', { name: 'Enter State/Province/Region' }).fill('East');
    await page.getByRole('textbox', { name: 'Enter Postal Code' }).click();
    await page.getByRole('textbox', { name: 'Enter Postal Code' }).fill('10023');
    await page.locator('subsection').filter({ hasText: 'Residential Address Address' }).getByRole('combobox').selectOption('United States');
    await page.locator('form-field-wrapper').filter({ hasText: 'Nationality Select' }).getByRole('combobox').selectOption('United States');
    await page.getByRole('textbox', { name: 'NIC/Passport' }).click();
    await page.getByRole('textbox', { name: 'NIC/Passport' }).fill('3278287382828');
    await page.getByRole('textbox', { name: 'Enter Occupation' }).click();
    await page.getByRole('textbox', { name: 'Enter Occupation' }).fill('CEO');
    await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Next' }).click();

  // Page 3
  await page.getByRole('button', { name: '+ Add Entry' }).first().click();
  await page.getByRole('textbox', { name: 'Holding Company' }).click();
  await page.getByRole('textbox', { name: 'Holding Company' }).fill('ABC 2');
  await page.getByRole('textbox', { name: 'Name of The Company' }).click();
  await page.getByRole('textbox', { name: 'Name of The Company' }).fill('XYZ');
  await page.getByRole('combobox').selectOption('Partnership');
  await page.getByRole('button', { name: 'Save' }).click();

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

  await page.getByRole('button', { name: '+ Add Entry' }).nth(1).click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill('ABC Person');
  await page.getByRole('textbox', { name: 'NIC/passport' }).click();
  await page.getByRole('textbox', { name: 'NIC/passport' }).fill('200130002222');
  await page.locator('form-field-wrapper').filter({ hasText: 'Status Select Active Inactive' }).getByRole('combobox').selectOption('Active');
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
  await page.locator('subsection').filter({ hasText: 'Are the Directors of the Applicant, shareholders of Listed Companies?Please' }).getByPlaceholder('Enter Name of The Company').click();
  await page.locator('subsection').filter({ hasText: 'Are the Directors of the Applicant, shareholders of Listed Companies?Please' }).getByPlaceholder('Enter Name of The Company').fill('Company C');
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

  // No
  await selectRadio(page, 'rejected by the SEC', 0);

  // Yes
  await selectRadio(page, 'Rules of the SEC', 1);

  await page.getByRole('textbox', { name: 'Name of the Director' }).click();
  await page.getByRole('textbox', { name: 'Name of the Director' }).fill('Person A');
  await page.getByRole('textbox', { name: 'Company' }).click();
  await page.getByRole('textbox', { name: 'Company' }).fill('ABC');
  await page.getByRole('combobox').selectOption('Investment Manager'); 

  await selectRadio(page, 'the conviction of which involved a finding that he/ she has acted fraudulently or dishonestly?', 0);
  await selectRadio(page, 'Has been convicted of an offence under the SEC Act', 0);
  await selectRadio(page, 'the Commission under the SEC Act;', 0);
  await selectRadio(page, 'convicted of an offence involving moral turpitude', 0);
  await selectRadio(page, 'Is likely to have a conflict of interest', 0);
  await selectRadio(page, 'undischarged bankrupt, either within or outside Sri Lanka?', 0);
  await selectRadio(page, 'a judgment debt against him/ her which has not been satisfied in whole or in part.', 0);

  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Next' }).click();

  // Page 4
  await selectRadio(page, 'the Applicant in any criminal or civil proceedings? Are there any such proceedings now pending in a court of law?', 0);
  await page.waitForTimeout(1000);
  await selectRadio(page, 'an equivalent person appointed in respect of any of the assets of the Applicant?', 1);
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Details' }).click();
  await page.getByRole('textbox', { name: 'Details' }).fill('Test');

  await selectRadio(page, 'Has there been/is there a Petition presented in a Court for winding up of the Applicant?', 0);
  await selectRadio(page, 'a judgment debt against the Applicant which has not been satisfied in whole or in part?', 0);
  await selectRadio(page, 'the Applicant Entered into any Compromise or Scheme of Arrangement with its Creditors?', 0);
  await selectRadio(page, 'the Applicant been subjected to any form of disciplinary proceedings or action by any professional or regulatory body?', 0);
  await selectRadio(page, 'the Applicant applied for approval from the SEC to be licenced as a Market Institution and been rejected by the SEC?', 0);
  await selectRadio(page, 'the SEC which has failed to cease its business operations or to renew its licence in terms of the applicable Rules of the SEC?', 0);

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

  await page.getByRole('textbox', { name: 'Enter Regulatory Authority' }).click();
  await page.getByRole('textbox', { name: 'Enter Regulatory Authority' }).fill('Test Authority');
  await page.getByRole('textbox', { name: 'Enter Nature of The Licence' }).click();
  await page.getByRole('textbox', { name: 'Enter Nature of The Licence' }).fill('Nature 1');
  await page.getByRole('textbox', { name: 'Enter Validity Period' }).click();
  await page.getByRole('textbox', { name: 'Enter Validity Period' }).fill('01 Year');
  await page.getByRole('textbox', { name: 'Nature of the Business' }).click();
  await page.getByRole('textbox', { name: 'Nature of the Business' }).fill('Test Nature');

  for (let i = 0; i < await uploads.count(); i++) {
    await uploads.nth(i).setInputFiles(filePath);
  }

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
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

// Login
  await page.goto('https://dev-sl-sec.corewatch.io/auth/entity/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('taniya@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test123#');
  await page.getByRole('button', { name: 'Log In' }).click();

// Navigate to Licenses
  await page.getByRole('button', { name: 'Licenses' }).click();

  const secondMainRow = page
    .locator('app-table > div > div > app-table-card')
    .nth(1);

  // Expand second row
  await secondMainRow.locator('i.expand-btn.bi-chevron-down').click();

  // Wait for expanded content
  const expandedSection = secondMainRow.locator('.expanded-content');
  await expect(expandedSection).toBeVisible();

  // Open first task dropdown
  await expandedSection
    .locator('i.icon-border.bi-chevron-down')
    .first()
    .click();

  await page.getByRole('button', { name: 'View' }).click();

// Fill Page 1 Form
  await page.getByRole('textbox', { name: 'Name of the Applicant' }).click();
  await page.getByRole('textbox', { name: 'Name of the Applicant' }).fill('ABC company');
  await page.getByRole('textbox', { name: 'Address', exact: true }).click();
  await page.getByRole('textbox', { name: 'Address', exact: true }).fill('Battaramulla, Wadduwa');
  await page.getByRole('textbox', { name: 'Enter Registered Name' }).click();
  await page.getByRole('textbox', { name: 'Enter Registered Name' }).fill('ABC Company (Pvt) Ltd');
  await page.locator('subsection').filter({ hasText: 'Applicant Information' }).getByPlaceholder('Enter Email Address').click();
  await page.locator('subsection').filter({ hasText: 'Applicant Information' }).getByPlaceholder('Enter Email Address').fill('rash@mail.com');
  await page.getByRole('textbox', { name: 'Phone Number', exact: true }).click();
  await page.getByRole('textbox', { name: 'Phone Number', exact: true }).fill('716586755');
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter Address Line 1').click();
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter Address Line 1').fill('Battaramulla');
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter City').click();
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter City').fill('Colombo');
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter State/Province/Region').click();
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter State/Province/Region').fill('Western');
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter Postal Code').click();
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter Postal Code').fill('12560');
  await page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByRole('combobox').selectOption('Sri Lanka');
  await page.getByRole('textbox', { name: 'Enter Name' }).click();
  await page.getByRole('textbox', { name: 'Enter Name' }).fill('Sasindu Rashmika');
  await page.getByRole('textbox', { name: 'Enter Designation' }).click();
  await page.getByRole('textbox', { name: 'Enter Designation' }).fill('Director');
  await page.locator('subsection').filter({ hasText: 'Contact Person Information' }).getByPlaceholder('Enter Email Address').click();
  await page.locator('subsection').filter({ hasText: 'Contact Person Information' }).getByPlaceholder('Enter Email Address').fill('rash@mail.com');
  await page.getByRole('textbox', { name: 'Enter Phone Number' }).click();
  await page.getByRole('textbox', { name: 'Enter Phone Number' }).fill('716789077');
  await page.locator('date-picker i').click();
  await page.getByLabel('Saturday, February 28,').getByText('28').click();
  await page.getByRole('textbox', { name: 'Organization Name' }).click();
  await page.getByRole('textbox', { name: 'Organization Name' }).fill('ABC Company (Pvt) Ltd');
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter Address Line 1').click();
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter Address Line 1').fill('Battaramulla');
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter City').click();
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter City').fill('Wadduwa');
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter State/Province/Region').click();
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter State/Province/Region').fill('Western');
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter Postal Code').click();
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter Postal Code').fill('12560');
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByRole('combobox').selectOption('Sri Lanka');
  await page.waitForTimeout(3000);
  await page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByRole('combobox').selectOption('Sri Lanka');
  await page.getByRole('button', { name: 'Next' }).click();

// Fill Page 2 Form
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Rashmika Silva');
  await page.getByRole('textbox', { name: 'NIC/Passport No.' }).click();
  await page.getByRole('textbox', { name: 'NIC/Passport No.' }).fill('2001200021V');
  await page.getByRole('cell', { name: 'Select Designation' }).getByRole('combobox').selectOption('CEO');
  await page.locator('date-picker i').click();
  await page.getByLabel('Saturday, February 28,').getByText('28', { exact: true }).click();

  const filePath = 'C:/Users/MSI/Downloads/postman.jpg';

  await page.getByText('Attach File').click();
  await page.locator('input[type="file"]').nth(0).setInputFiles(filePath);

  await page.getByRole('button', { name: '+ Add Another Field' }).click();
  await page.getByRole('row', { name: '2 NIC Select Designation  ' }).getByPlaceholder('Full Name').click();
  await page.getByRole('row', { name: '2 NIC Select Designation  ' }).getByPlaceholder('Full Name').fill('Kavindu Sandeepa');
  await page.getByRole('row', { name: '2 Kavindu Sandeepa NIC Select' }).getByPlaceholder('NIC/Passport No.').click();
  await page.getByRole('row', { name: '2 Kavindu Sandeepa NIC Select' }).getByPlaceholder('NIC/Passport No.').fill('32000210202');
  await page.getByRole('cell', { name: 'Select Designation' }).getByRole('combobox').selectOption('Director');
  await page.locator('.ng-untouched.ng-pristine > .custom-date-picker > .form-icon-group > .bi').click();
  await page.getByLabel('Saturday, February 28,').getByText('28', { exact: true }).click();

  await page.getByText('Attach File').click();
  await page.locator('input[type="file"]').nth(1).setInputFiles(filePath);

  await page.locator('form-field-wrapper').filter({ hasText: 'Confirmation From the Auditors Please upload a confirmation from the auditors' }).locator('img').click();
  await page.locator('input[type="file"]').nth(2).setInputFiles(filePath);

  await page.locator('form-field-wrapper').filter({ hasText: 'Confirmation on Information' }).locator('img').click();
  await page.locator('input[type="file"]').nth(3).setInputFiles(filePath);
  await page.getByRole('img', { name: 'Upload Icon' }).nth(2).click();
  await page.locator('input[type="file"]').nth(4).setInputFiles(filePath);
  await page.getByRole('button', { name: '+ Add Entry' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Kamal Perera');
  await page.getByRole('textbox', { name: 'NIC/Passport No.' }).click();
  await page.getByRole('textbox', { name: 'NIC/Passport No.' }).fill('20035577788');
  await page.getByRole('textbox', { name: 'Academic/ Professional' }).click();
  await page.getByRole('textbox', { name: 'Academic/ Professional' }).fill('Bachelor of ICT');
  
  await page
  .getByRole('row', { name: /Bachelor of ICT/ })
  .getByLabel('Attach File')
  .setInputFiles(filePath);

  await page.locator('table-entry-section-content').filter({ hasText: 'Academic/ Professional' }).getByRole('button').click();
  await page.getByRole('row', { name: '2  Attach File ' }).getByPlaceholder('Academic/ Professional').click();
  await page.getByRole('row', { name: '2  Attach File ' }).getByPlaceholder('Academic/ Professional').fill('Masters in AI');
  
  await page
  .getByRole('row', { name: /Masters in AI/ })
  .getByLabel('Attach File')
  .setInputFiles(filePath);
  
  await page.getByRole('textbox', { name: 'Enter Type' }).click();
  await page.getByRole('textbox', { name: 'Enter Type' }).fill('On Site');
  await page.getByRole('textbox', { name: 'Enter Field of Expertise' }).click();
  await page.getByRole('textbox', { name: 'Enter Field of Expertise' }).fill('ICT');
  await page.getByRole('textbox', { name: 'Enter Organization' }).click();
  await page.getByRole('textbox', { name: 'Enter Organization' }).fill('ABC Company');
  await page.getByPlaceholder('Number of Years').click();
  await page.getByPlaceholder('Number of Years').fill('3');

  await page
  .getByRole('row', { name: /On Site/ })
  .getByLabel('Attach File')
  .setInputFiles(filePath);

  await page.getByRole('button', { name: 'Save' }).click();
  
  await page
  .locator('form-field-wrapper')
  .filter({ hasText: 'Applicant to the SEC' })
  .getByLabel(/upload document/i)
  .setInputFiles(filePath);

  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  await page.waitForURL(/licenses\/.*\/form-view\/2/);
  await page.getByRole('textbox', { name: 'Enter Address Line 1' }).click();
  await page.getByRole('textbox', { name: 'Enter Address Line 1' }).fill('Battaramulla');
  await page.getByRole('textbox', { name: 'Enter City' }).click();
  await page.getByRole('textbox', { name: 'Enter City' }).fill('Colombo');
  await page.getByRole('textbox', { name: 'Enter State/Province/Region' }).click();
  await page.getByRole('textbox', { name: 'Enter State/Province/Region' }).fill('Western');
  await page.getByRole('textbox', { name: 'Enter Postal Code' }).click();
  await page.getByRole('textbox', { name: 'Enter Postal Code' }).fill('12560');
  await page.locator('form-field-wrapper').filter({ hasText: 'Country Select Country' }).getByRole('combobox').selectOption('Sri Lanka');

  await page
  .locator('form-field-wrapper')
  .filter({ hasText: 'Please upload your payment confirmation here' })
  .getByLabel(/upload document/i)
  .setInputFiles(filePath);

  await page.getByRole('checkbox', { name: 'I hereby acknowledge that I' }).check();
  await page.getByRole('checkbox', { name: 'We declare that all' }).check();

  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'Ok' }).click();
});
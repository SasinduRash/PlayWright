import { test, expect, Page } from '@playwright/test';

// The calendar opens on the current month, so pick today's date
async function pickToday(page: Page) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  await page.getByRole('gridcell', { name: today }).click();
}

// Upload a document into the section with the given heading
async function uploadToSection(page: Page, heading: string, filePath: string) {
  // nearest ancestor of the heading that holds a file input = that section's uploader
  await page
    .getByRole('heading', { name: heading, exact: true })
    .locator('xpath=ancestor::*[.//input[@type="file"]][1]')
    .locator('input[type="file"]')
    .setInputFiles(filePath);
}

// Click Submit until the confirmation dialog opens, then confirm
async function submitApplication(page: Page) {
  const dialog = page.getByRole('dialog');
  await expect(async () => {
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(dialog).toBeVisible({ timeout: 3000 });
  }).toPass({ timeout: 30000 });
  await dialog.getByRole('button', { name: 'Submit' }).click();
}

test('test', async ({ page }) => {
  test.setTimeout(180000); // full multi-page flow takes ~1 min

// Login
  await page.goto('https://dev-sl-sec.corewatch.io/auth/entity/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('xyz@mail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test123#');
  await page.getByRole('button', { name: 'Log In' }).click();

// OTP verification (fixed dev OTP)
  await expect(page.getByRole('heading', { name: 'Check your email' })).toBeVisible();
  await page.getByRole('textbox').first().click();
  await page.keyboard.type('55555');
  await page.getByRole('button', { name: 'Verify' }).click();

// Navigate to Licenses
  await page.getByRole('button', { name: 'Licenses' }).click();
  await expect(page.locator('app-applications-pending div.card').first()).toBeVisible();

  // Other license types share this account, so page through the pending applications
  // until the newest Investment Manager application shows up
  const investmentManagerCard = page.locator('app-applications-pending div.card').filter({ hasText: 'Investment Manager' }).first();
  for (let nextPage = 2; !(await investmentManagerCard.isVisible()); nextPage++) {
    await page.locator('.pagination').first().getByText(String(nextPage), { exact: true }).click();
    await page.waitForTimeout(2000);
  }

  // Card opens the license detail view - open the pending Final Grant task
  await investmentManagerCard.locator('.hstack.justify-content-between.p-3').first().click();
  await expect(page.getByText('Final Grant')).toBeVisible();
  await page.locator('i.icon-border.bi-chevron-down').first().click();
  await page.locator('a.dropdown-item:visible').filter({ hasText: /View/ }).click();

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
  await pickToday(page);
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
  await page.locator('date-picker i').first().click();
  await pickToday(page);

  const filePath = 'C:/Users/MSI/Downloads/postman.jpg';

  await page.getByText('Attach File').click();
  await page.locator('input[type="file"]').nth(0).setInputFiles(filePath);

  await page.getByRole('button', { name: '+ Add Another Field' }).click();
  await page.getByRole('row', { name: '2 NIC Select Designation  ' }).getByPlaceholder('Full Name').click();
  await page.getByRole('row', { name: '2 NIC Select Designation  ' }).getByPlaceholder('Full Name').fill('Kavindu Sandeepa');
  await page.getByRole('row', { name: '2 Kavindu Sandeepa NIC Select' }).getByPlaceholder('NIC/Passport No.').click();
  await page.getByRole('row', { name: '2 Kavindu Sandeepa NIC Select' }).getByPlaceholder('NIC/Passport No.').fill('32000210202');
  await page.getByRole('cell', { name: 'Select Designation' }).getByRole('combobox').selectOption('Director');
  await page.locator('date-picker i').nth(1).click();
  await pickToday(page);

  await page.getByText('Attach File').click();
  await page.locator('input[type="file"]').nth(1).setInputFiles(filePath);

  await uploadToSection(page, 'Confirmation From the Auditors', filePath);
  await uploadToSection(page, 'Confirmation on Information Processing System', filePath);
  await uploadToSection(page, 'Confirmation on Adequate Human Resources', filePath);
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
  
  const experienceRow = page.getByRole('row').filter({ has: page.getByRole('textbox', { name: 'Enter Field of Expertise' }) });
  await experienceRow.getByRole('combobox').selectOption('Industry');
  await experienceRow.getByRole('textbox', { name: 'Enter Field of Expertise' }).fill('ICT');
  await experienceRow.getByRole('textbox', { name: 'Enter Organization' }).fill('ABC Company');
  await experienceRow.getByRole('spinbutton').fill('3');
  await experienceRow.getByLabel('Attach File').setInputFiles(filePath);

  await page.getByRole('button', { name: 'Save' }).click();
  
  await page
  .locator('form-field-wrapper')
  .filter({ hasText: 'Applicant to the SEC' })
  .getByLabel(/upload document/i)
  .setInputFiles(filePath);

  await submitApplication(page);
  await page.getByRole('button', { name: 'OK' }).click();

  await page.waitForURL(/licenses\/.*\/form-view\/2/);
  await page.locator('form-field-wrapper').filter({ hasText: 'Are you registered for VAT?' }).getByRole('radio', { name: 'No' }).check();
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

  await submitApplication(page);
  await page.getByRole('button', { name: 'Ok' }).click();
});
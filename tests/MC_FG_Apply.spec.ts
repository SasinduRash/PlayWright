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

// Show page `pageNo` of the pending applications list
async function goToPendingPage(page: Page, pageNo: number) {
  const cards = page.locator('app-applications-pending div.card');
  await page.getByRole('button', { name: 'Licenses', exact: true }).click();
  await expect(cards.first()).toBeVisible();
  for (let n = 2; n <= pageNo; n++) {
    const firstCardText = await cards.first().innerText();
    await page.locator('.pagination').first().getByText(String(n), { exact: true }).click();
    await expect(cards.first()).not.toHaveText(firstCardText);
  }
}

// Open the license detail view of the newest Managing Company application that has a Final Grant process
async function openPendingFinalGrant(page: Page) {
  const finalGrant = page.getByText('Final Grant', { exact: true });
  for (let pageNo = 1; pageNo <= 10; pageNo++) {
    await goToPendingPage(page, pageNo);
    const ids = await page.locator('app-applications-pending div.card').filter({ hasText: 'Managing Company' })
      .evaluateAll(cards => cards.map(c => (c.textContent?.match(/ID:\s*(\w+)/) || [])[1]));
    for (const id of ids) {
      if (pageNo > 1 || id !== ids[0]) await goToPendingPage(page, pageNo);
      const card = page.locator('app-applications-pending div.card').filter({ hasText: `ID:${id}` }).first();
      await card.locator('.hstack.justify-content-between.p-3').first().click();
      await expect(page.getByText('Ongoing Processes')).toBeVisible();
      // the process rows load after the page
      await expect(page.getByText(/^\s*(In Principle|Final Grant)\s*$/).first()).toBeVisible({ timeout: 30000 });
      if (await finalGrant.isVisible()) return;
    }
  }
  throw new Error('No Managing Company application with a Final Grant found in the first 10 pages');
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

  // Other license types share this account, and a newer Managing Company application may still be
  // in its In Principle stage - so open the Managing Company applications newest first until one
  // has an ongoing Final Grant
  await openPendingFinalGrant(page);
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
  // Section C - affidavits table ('Full Name' exact: the Investment Committee table has 'Enter Full Name')
  await page.getByRole('textbox', { name: 'Full Name', exact: true }).click();
  await page.getByRole('textbox', { name: 'Full Name', exact: true }).fill('Rashmika Silva');
  await page.getByRole('textbox', { name: 'NIC/Passport No.' }).click();
  await page.getByRole('textbox', { name: 'NIC/Passport No.' }).fill('2001200021V');
  await page.getByRole('cell', { name: 'Select Designation' }).getByRole('combobox').selectOption('CEO');
  await page.locator('date-picker i').first().click();
  await pickToday(page);

  const filePath = 'C:/Users/MSI/Downloads/postman.jpg';

  await page.getByText('Attach File').click();
  await page.locator('input[type="file"]').nth(0).setInputFiles(filePath);

  await page.getByRole('button', { name: '+ Add Another Field' }).first().click(); // affidavits table (the 2nd is the Investment Committee's)
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
  await uploadToSection(page, 'Documentation in Supporting Measures To Subscription of Units', filePath);
  await page.getByRole('textbox', { name: 'Enter Full Name' }).fill('Nimal Fernando'); // Investment Committee member
  await uploadToSection(page, 'Documentation in Relation to Draft Trust Deed', filePath);
  await uploadToSection(page, 'Documentation in Relation to Details of the Custodian', filePath);
  await uploadToSection(page, 'Documentation in Relation to Key Investor Information Document of the CIS', filePath);
  await uploadToSection(page, 'Documentation of the Trust Deed', filePath);
  await uploadToSection(page, 'Documentation in Relation to Intended Trustee', filePath);

  // Details of Persons Making Investment Decisions on Behalf of Unit Holders - entry dialog
  await page.getByRole('button', { name: '+ Add Entry' }).click();
  const entry = page.getByRole('dialog');
  await entry.getByRole('textbox', { name: 'Full Name' }).click();
  await entry.getByRole('textbox', { name: 'Full Name' }).fill('Kamal Perera');
  await entry.getByRole('textbox', { name: 'NIC/Passport No.' }).click();
  await entry.getByRole('textbox', { name: 'NIC/Passport No.' }).fill('20035577788');
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
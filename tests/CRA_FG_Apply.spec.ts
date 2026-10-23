import { test, expect, Page, Locator } from '@playwright/test';
import path from 'path';

test('Apply Credit Rating Agency final grant with valid data', async ({ page }) => {
  test.setTimeout(420000);

  const filePath = path.join(__dirname, 'files', 'notification letter.pdf');

  // click Next until the next page's first element appears.
  // The app sometimes swallows Next without saving (and further Next clicks stay stuck);
  // Save Draft still saves, and after a reload Next works again.
  async function goNext(page: Page, nextPageMarker: Locator) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      await page.getByRole('button', { name: 'Next' }).click();
      try {
        await nextPageMarker.waitFor({ state: 'visible', timeout: 10000 });
        return;
      } catch { }
      const draftSaved = page.waitForResponse(r => r.url().includes('/submit?draft=true'));
      await page.getByRole('button', { name: 'Save Draft' }).click();
      await draftSaved;
      await page.reload();
      await page.getByRole('button', { name: 'Next' }).waitFor();
      await page.waitForTimeout(3000);
    }
    await expect(nextPageMarker).toBeVisible();
  }

  // login
  await page.goto('https://dev-sl-sec.corewatch.io/auth/entity/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('xyz@mail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test123#');
  // OTP verification (fixed dev OTP)
  // logging in again within a short time is rejected with "Can't request OTP in a short period." - wait and retry
  const otpHeading = page.getByRole('heading', { name: 'Check your email' });
  await expect(async () => {
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(otpHeading).toBeVisible({ timeout: 20000 });
  }).toPass({ intervals: [10000], timeout: 180000 });
  await page.getByRole('textbox').first().click();
  await page.keyboard.type('55555');
  await page.getByRole('button', { name: 'Verify' }).click();

  // navigate to licenses and open the Credit Rating Agency application that has a pending Final Grant form
  // (its In Principle approval must already be completed - see CRA_IP_Approval.spec.ts)
  await page.getByRole('button', { name: 'Licenses' }).click();
  const craCards = page.locator('app-applications-pending div.card').filter({ hasText: 'Credit Rating Agency' });
  await expect(craCards.first()).toBeVisible({ timeout: 60000 });
  const finalGrantTask = page
    .locator('app-task-table-card')
    .filter({ hasText: 'Application for Credit Rating Agency Registration' })
    .filter({ hasNot: page.locator('.badge', { hasText: 'Completed' }) });

  const cardCount = await craCards.count();
  let found = false;
  for (let i = 0; i < cardCount && !found; i++) {
    await craCards.nth(i).locator('> .hstack').click();
    await expect(page.locator('app-table-card').first()).toBeVisible({ timeout: 60000 });
    found = await finalGrantTask.waitFor({ timeout: 5000 }).then(() => true, () => false);
    if (!found) {
      await page.getByRole('button', { name: 'Licenses' }).click();
      await expect(craCards.first()).toBeVisible({ timeout: 60000 });
      await page.waitForTimeout(1000);
    }
  }
  expect(found, 'no Credit Rating Agency application with a pending Final Grant form').toBe(true);

  await finalGrantTask.locator('i.bi-chevron-down').click();
  await page.locator('ul.dropdown-menu.show').getByRole('button', { name: 'View' }).click();

  // fill application form

  // Page 1
  await page.getByRole('textbox', { name: 'Name of the Applicant' }).click();
  await page.getByRole('textbox', { name: 'Name of the Applicant' }).fill('ABC company');
  await page.keyboard.press('Tab');
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
  await page.locator('.ngb-dp-day:not(.disabled)').first().click();
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
  await goNext(page, page.getByRole('button', { name: 'Submit' }));

  // Page 2

  // Affidavits of key management persons (Annexure 1)
  const affidavit = page.getByRole('row').filter({ has: page.getByRole('textbox', { name: 'Remark' }) }).first();
  await affidavit.getByRole('textbox', { name: 'Full Name' }).click();
  await affidavit.getByRole('textbox', { name: 'Full Name' }).fill('Rashmika Silva');
  await affidavit.getByRole('textbox', { name: 'NIC/Passport No.' }).click();
  await affidavit.getByRole('textbox', { name: 'NIC/Passport No.' }).fill('200120002100');
  await affidavit.getByRole('cell', { name: 'Select Designation' }).getByRole('combobox').selectOption('CEO');
  await affidavit.locator('date-picker i').click();
  await page.locator('.ngb-dp-day:not(.disabled)').first().click();
  await affidavit.locator('input[type="file"]').setInputFiles(filePath);
  await affidavit.getByRole('textbox', { name: 'Remark' }).click();
  await affidavit.getByRole('textbox', { name: 'Remark' }).fill('Test remark');

  // Rating Analysts (Annexure 5) and Rating Committee (Annexure 6) share the same entry form
  async function addPersonEntry(page: Page, addEntryIndex: number, fullName: string, nic: string) {
    await page.getByRole('button', { name: '+ Add Entry' }).nth(addEntryIndex).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('textbox', { name: 'Full Name' }).click();
    await dialog.getByRole('textbox', { name: 'Full Name' }).fill(fullName);
    await dialog.getByRole('combobox').first().selectOption({ index: 1 });
    await dialog.getByRole('textbox', { name: 'NIC/Passport No.' }).click();
    await dialog.getByRole('textbox', { name: 'NIC/Passport No.' }).fill(nic);

    const qualification = dialog.getByRole('row').filter({ has: page.getByRole('textbox', { name: 'Academic Qualification' }) });
    await qualification.getByRole('textbox', { name: 'Academic Qualification' }).click();
    await qualification.getByRole('textbox', { name: 'Academic Qualification' }).fill('Bachelor of Finance');
    await qualification.locator('input[type="file"]').setInputFiles(filePath);

    const experience = dialog.getByRole('row').filter({ has: page.getByRole('textbox', { name: 'Enter Organization' }) });
    await experience.getByRole('combobox').selectOption({ index: 1 });
    await experience.getByRole('textbox', { name: 'Enter Field of Expertise' }).click();
    await experience.getByRole('textbox', { name: 'Enter Field of Expertise' }).fill('Credit Rating');
    await experience.getByRole('textbox', { name: 'Enter Organization' }).click();
    await experience.getByRole('textbox', { name: 'Enter Organization' }).fill('ABC Company');
    await experience.getByRole('spinbutton').click();
    await experience.getByRole('spinbutton').fill('3');
    await experience.locator('input[type="file"]').setInputFiles(filePath);

    await dialog.getByRole('button', { name: 'Save' }).click();
    await expect(dialog).toBeHidden();
  }

  await addPersonEntry(page, 0, 'Kamal Perera', '200035577788');
  await addPersonEntry(page, 1, 'Nimal Fernando', '199845678912');

  // Auditors, Information Processing System, Human Resources, Methodologies and Section D documents
  const uploads = page.getByLabel(/upload document/i);
  for (let i = 0; i < await uploads.count(); i++) {
    await uploads.nth(i).setInputFiles(filePath);
  }

  // click Submit until the confirmation dialog opens, then confirm
  async function submitApplication(page: Page) {
    const dialog = page.getByRole('dialog');
    await expect(async () => {
      await page.getByRole('button', { name: 'Submit' }).click();
      await expect(dialog).toBeVisible({ timeout: 3000 });
    }).toPass({ timeout: 30000 });
    await dialog.getByRole('button', { name: 'Submit' }).click();
  }

  await page.waitForTimeout(3000);
  await submitApplication(page);

  // Page 3 - Payment
  await page.waitForURL(/licenses\/.*\/form-view\/2/);
  await page.getByRole('button', { name: 'OK' }).click();
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
  await page.locator('form-field-wrapper').filter({ hasText: 'Please upload your payment confirmation here' }).locator('input[type="file"]').setInputFiles(filePath);
  await page.getByRole('checkbox', { name: 'I hereby acknowledge that I' }).check();
  await page.getByRole('checkbox', { name: 'We declare that all' }).check();
  await page.waitForTimeout(3000);
  await submitApplication(page);
  await page.getByRole('button', { name: 'Ok' }).click();
});

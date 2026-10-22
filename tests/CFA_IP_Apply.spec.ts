import { test, expect, Page, Locator } from '@playwright/test';

test('Apply Corporate Finance Advisor license with valid data', async ({ page }) => {
  test.setTimeout(420000); // full multi-page flow, plus waiting out the OTP rate limit if needed

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

  // click Submit until the confirmation dialog opens, then confirm
  async function submitApplication(page: Page) {
    const dialog = page.getByRole('dialog');
    await expect(async () => {
      await page.getByRole('button', { name: 'Submit' }).click();
      await expect(dialog).toBeVisible({ timeout: 3000 });
    }).toPass({ timeout: 30000 });
    await dialog.getByRole('button', { name: 'Submit' }).click();
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
  const otpRateLimited = page.getByText("Can't request OTP in a short period.");
  for (let attempt = 1; attempt <= 10; attempt++) {
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(otpHeading.or(otpRateLimited)).toBeVisible({ timeout: 30000 });
    if (await otpHeading.isVisible()) break;
    await page.waitForTimeout(20000);
  }
  await expect(otpHeading).toBeVisible();
  await page.getByRole('textbox').first().click();
  await page.keyboard.type('55555');
  await page.getByRole('button', { name: 'Verify' }).click();

  // navigate to license application
  await page.getByRole('button', { name: 'Licenses' }).click();

  // apply new license
  await page.getByRole('button', { name: ' New License' }).click();
  await page.locator('div').filter({ hasText: /^Corporate Finance Advisor$/ }).nth(1).click();
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
  await page.locator('form-field-wrapper').filter({ hasText: 'Financial Year End' }).getByRole('combobox').selectOption('31st March');

  // Section E - Annexure 1 (inline table row)
  const holdingRow = page.getByRole('row').filter({ has: page.getByRole('textbox', { name: 'Name of The Company' }) }).first();
  await holdingRow.getByRole('textbox', { name: 'Name of The Company' }).fill('XYZ');
  await holdingRow.getByRole('combobox').selectOption('Partnership');

  const ultimateHolding = page.locator('subsection').filter({ hasText: 'Ultimate Holding CompanyIf' });
  await ultimateHolding.getByPlaceholder('Enter Name').click();
  await ultimateHolding.getByPlaceholder('Enter Name').fill('N/A');
  await ultimateHolding.getByRole('combobox').first().selectOption('Sri Lanka');
  await ultimateHolding.getByRole('textbox', { name: 'Write...' }).click();
  await ultimateHolding.getByRole('textbox', { name: 'Write...' }).fill('N/A');
  await ultimateHolding.getByPlaceholder('Enter Address Line 1').click();
  await ultimateHolding.getByPlaceholder('Enter Address Line 1').fill('N/A');
  await ultimateHolding.getByPlaceholder('Enter City').click();
  await ultimateHolding.getByPlaceholder('Enter City').fill('N/A');
  await ultimateHolding.getByPlaceholder('Enter State/Province/Region').click();
  await ultimateHolding.getByPlaceholder('Enter State/Province/Region').fill('N/A');
  await ultimateHolding.getByPlaceholder('Enter Postal Code').click();
  await ultimateHolding.getByPlaceholder('Enter Postal Code').fill('12560');
  await ultimateHolding.getByRole('combobox').last().selectOption('Sri Lanka');
  await page.waitForTimeout(3000);
  await goNext(page, page.locator('form-field-wrapper').filter({ hasText: 'Group Structure' }));

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

  // await page.getByRole('radio', { name: 'No' }).check();
  // await page.getByRole('combobox').selectOption('Individual');
  // await page.getByRole('textbox', { name: 'Shareholder Name' }).click();
  // await page.getByRole('textbox', { name: 'Shareholder Name' }).fill('Person A');
  // await page.getByPlaceholder('No. of Shares').click();
  // await page.getByPlaceholder('No. of Shares').fill('100');
  // await page.getByRole('button', { name: 'Next' }).click();
  // await page.getByPlaceholder('No. of Shares').click();
  // await page.getByPlaceholder('Percentage of Shares Held').click();
  // await page.getByPlaceholder('Percentage of Shares Held').fill('100');
  await page.waitForTimeout(2000);
  await goNext(page, page.getByRole('button', { name: '+ Add Entry' }));

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
  await goNext(page, page.locator('form-field-wrapper').filter({ hasText: 'are there any proceedings now pending in a court of law?' }));

  // Page 4
  await selectRadio(page, 'are there any proceedings now pending in a court of law?', 0);
  await page.waitForTimeout(1000);
  await selectRadio(page, 'in respect of any of the assets of the Applicant?', 1);
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Details' }).click();
  await page.getByRole('textbox', { name: 'Details' }).fill('Test');

  await selectRadio(page, 'in the course of being wound up or otherwise dissolved or an undischarged bankrupt?', 0);
  await selectRadio(page, 'the Applicant which has not been satisfied in whole or in part?', 0);
  await selectRadio(page, 'Compromise or Scheme of Arrangement with its Creditors', 0);
  await selectRadio(page, 'actions by the SEC or any other professional or regulatory body', 0);
  await selectRadio(page, 'as a Market Intermediary and been rejected by the SEC', 0);
  await selectRadio(page, 'renew its licence in terms of the applicable Rules of the SEC', 0);

  await page.waitForTimeout(2000);
  await goNext(page, page.getByRole('textbox', { name: 'Regulator' }));

  // Page 5
  await page.getByRole('textbox', { name: 'Regulator' }).click();
  await page.getByRole('textbox', { name: 'Regulator' }).fill('ABC');
  await page.getByRole('textbox', { name: 'Regulated Activity' }).click();
  await page.getByRole('textbox', { name: 'Regulated Activity' }).fill('Test');
  await page.getByRole('textbox', { name: 'Nature of the Business' }).click();
  await page.getByRole('textbox', { name: 'Nature of the Business' }).fill('Test');

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

  await page.waitForTimeout(2000); 
  await submitApplication(page);

  // Page 6 - Payment
  await page.waitForURL(/licenses\/.*\/form-view\/2/);
  await page.getByRole('button', { name: 'OK' }).click();
  await selectRadio(page, 'Are you registered for VAT?', 0);
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
  await submitApplication(page);
  await page.getByRole('button', { name: 'Ok' }).click();
});
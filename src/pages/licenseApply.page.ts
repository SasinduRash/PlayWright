import { expect, Page } from '@playwright/test';

export class LicenseApplicationPage {
  constructor(public readonly page: Page) {}

  // Authentication
  async loginEntity(email: string, password: string) {
    await this.page.goto('https://dev.sl.sec.corewatch.io/auth/entity/login');
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }

  // Navigation
  async openLicenses() {
    await this.page.getByRole('button', { name: 'Licenses' }).click();
  }

  async startNewLicense(licenseName = 'Investment Manager') {
    await this.page.getByRole('button', { name: ' New License' }).click();
    await this.page.locator('div').filter({ hasText: new RegExp(`^${licenseName}$`) }).nth(1).click();
    await this.page.getByRole('button', { name: 'Apply Now' }).click();
    await this.page.getByRole('button', { name: 'Start' }).click();
  }

  // Page 1 - Applicant Information (kept as a single method for brevity)
  async fillApplicantInformation() {
    await this.page.getByRole('textbox', { name: 'Name of the Applicant' }).fill('Tester');
    await this.page.getByRole('textbox', { name: 'Address', exact: true }).fill('Wadduwa');
    await this.page.getByRole('textbox', { name: 'Enter Registered Name' }).fill('ABC Company');
    await this.page.locator('subsection').filter({ hasText: 'Applicant Information' }).getByPlaceholder('Enter Email Address').fill('test@mail.com');
    await this.page.getByRole('textbox', { name: 'Phone Number', exact: true }).fill('716305745');

    await this.page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter Address Line 1').fill('Kaluthara');
    await this.page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter City').fill('Wadduwa');
    await this.page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter State/Province/Region').fill('Western');
    await this.page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter Postal Code').fill('12560');
    await this.page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByRole('combobox').selectOption('Sri Lanka');
    await this.page.locator('section-card').filter({ hasText: 'Section AGeneral' }).getByPlaceholder('Enter Name').fill('Tester');
    await this.page.getByRole('textbox', { name: 'Enter Designation' }).fill('CEO');

    await this.page.locator('subsection').filter({ hasText: 'Contact Person Information' }).getByPlaceholder('Enter Email Address').fill('test@mail.com');
    await this.page.getByRole('textbox', { name: 'Enter Phone Number' }).fill('71564789');
    await this.page.getByRole('textbox', { name: 'Enter Organization Name' }).fill('ABC Com');

    // Section B Certificate
    await this.page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter Address Line 1').fill('Kaluthara');
    await this.page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter City').fill('Wadduwa');
    await this.page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter State/Province/Region').fill('Western');
    await this.page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByPlaceholder('Enter Postal Code').fill('12560');
    await this.page.locator('section-card').filter({ hasText: 'Section BCertificate' }).getByRole('combobox').selectOption('Sri Lanka');

    await this.page.getByRole('textbox', { name: 'Write..', exact: true }).fill('Test sttsts tstst stts ststst ststst ststts');

    await this.page.locator('form-field-wrapper').filter({ hasText: 'Stated Capital' }).getByPlaceholder('0').fill('100000000');
    await this.page.locator('form-field-wrapper').filter({ hasText: 'Shareholders Funds' }).getByPlaceholder('0').fill('75000000');

    // Date picker - select 11th
    await this.page.locator('date-picker i').click();
    await this.page.getByLabel('Sunday, January 11,').getByText('11').click();

    // Add holding company
    await this.page.getByRole('button', { name: '+ Add Entry' }).click();
    await this.page.getByRole('textbox', { name: 'Holding Company' }).fill('ABC 2');
    await this.page.getByRole('textbox', { name: 'Name of The Company' }).fill('XYZ');
    await this.page.getByRole('combobox').selectOption('Partnership');
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Save' }).click();

    // Ultimate Holding
    await this.page.locator('subsection').filter({ hasText: 'Ultimate Holding CompanyIf' }).getByPlaceholder('Enter Name').fill('N/A');
    await this.page.locator('form-field-wrapper').filter({ hasText: 'Country of Incorporation' }).getByRole('combobox').selectOption('Sri Lanka');
    await this.page.getByRole('textbox', { name: 'Write...' }).fill('N/A');
    await this.page.locator('field-group').filter({ hasText: 'Registered Office Address' }).getByPlaceholder('Enter Address Line 1').fill('N/A');
    await this.page.locator('field-group').filter({ hasText: 'Registered Office Address' }).getByPlaceholder('Enter City').fill('N/A');
    await this.page.locator('field-group').filter({ hasText: 'Registered Office Address' }).getByPlaceholder('Enter State/Province/Region').fill('N/A');
    await this.page.locator('field-group').filter({ hasText: 'Registered Office Address' }).getByPlaceholder('Enter Postal Code').fill('12560');
    await this.page.locator('form-field-wrapper').filter({ hasText: 'Country Select Country N/A' }).getByRole('combobox').selectOption('Sri Lanka');

    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  // Page 2 - Group Structure and shareholders
  async fillGroupStructure() {
    const page2 = this.page.locator('form-field-wrapper').filter({ hasText: 'Group Structure' });
    await expect(page2).toBeVisible();
    await page2.locator('img').click();

    const fileInput0 = this.page.locator('input[type="file"]').nth(0);
    await fileInput0.setInputFiles('C:/Users/MSI/Downloads/postman.jpg');
    await this.page.locator('input[type="file"]').nth(1).setInputFiles('C:/Users/MSI/Downloads/postman.jpg');

    await this.page.getByRole('radio', { name: 'No' }).check();
    await this.page.getByRole('combobox').selectOption('Individual');
    await this.page.getByRole('textbox', { name: 'Shareholder Name' }).fill('Person A');
    await this.page.getByPlaceholder('No. of Shares').fill('100');
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByPlaceholder('Percentage of Shares Held').fill('100');
    await this.page.waitForTimeout(500);
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  // Page 3 - Directors / board
  async addDirector() {
    await this.page.getByRole('button', { name: '+ Add Entry' }).click();
    await this.page.getByRole('textbox', { name: 'Full Name' }).fill('ABC Person');
    await this.page.getByRole('textbox', { name: 'NIC/passport' }).fill('200130002222');
    await this.page.locator('form-field-wrapper').filter({ hasText: 'Independent/ Non-Independent' }).getByRole('combobox').selectOption('Independent');
    await this.page.locator('form-field-wrapper').filter({ hasText: 'Executive/ Non-Executive' }).getByRole('combobox').selectOption('Executive');
    await this.page.getByRole('textbox', { name: 'Address Line 1' }).fill('Kaluthara');
    await this.page.getByRole('textbox', { name: 'Enter City' }).fill('Wadduwa');
    await this.page.getByRole('textbox', { name: 'Enter State/Province/Region' }).fill('Western');
    await this.page.getByRole('textbox', { name: 'Enter Postal Code' }).fill('12560');
    await this.page.locator('form-field-wrapper').filter({ hasText: 'Country Select Country' }).getByRole('combobox').selectOption('Sri Lanka');
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Save' }).click();

    // several radio questions
    await this.selectRadio('rejected by the SEC', 0);
    await this.selectRadio('Rules of the SEC', 1);

    await this.page.getByRole('textbox', { name: 'Name of the Director' }).fill('Person A');
    await this.page.getByRole('textbox', { name: 'Company' }).fill('ABC');
    await this.page.getByRole('combobox').selectOption('Investment Manager');

    await this.selectRadio('fraudulently or dishonestly', 0);
    await this.selectRadio('sanction under the SEC Act', 0);
    await this.selectRadio('securities outside Sri Lanka', 0);
    await this.selectRadio('discharged or undischarged bankrupts', 0);
    await this.selectRadio(' Is an undischarged bankrupt, either within or outside Sri Lanka', 0);

    await this.page.waitForTimeout(500);
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  // Page 4
  async fillPage4() {
    await this.selectRadio('Are there any such proceedings now pending in a court of law', 0);
    await this.wait(500);
    await this.selectRadio('in respect of any of the assets of the Applicant', 1);
    await this.wait(500);
    await this.page.getByRole('textbox', { name: 'Details' }).fill('Test');

    await this.selectRadio('process of being wound up, dissolved, or an undischarged bankrupt', 0);
    await this.selectRadio('satisfied in whole or in part', 0);
    await this.selectRadio('Compromise or Scheme of Arrangement with its Creditors', 0);
    await this.selectRadio('actions by the SEC or any other professional or regulatory body', 0);
    await this.selectRadio('as a Market Intermediary and been rejected by the SEC', 0);
    await this.selectRadio('renew its licence in terms of the applicable Rules of the SEC', 0);

    await this.wait(500);
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  // Page 5 - documents
  async uploadDocuments() {
    await this.page.locator('form-field-wrapper').filter({ hasText: 'Memorandum/ Articles of' }).locator('img').click();
    const fileInput2 = this.page.locator('input[type="file"]').nth(0);
    await fileInput2.setInputFiles('C:/Users/MSI/Downloads/postman.jpg');
    await this.page.locator('input[type="file"]').nth(1).setInputFiles('C:/Users/MSI/Downloads/postman.jpg');

    await this.page.getByRole('textbox', { name: 'Regulator' }).fill('ABC');
    await this.page.getByRole('textbox', { name: 'Regulated Activity' }).fill('Test');
    await this.page.getByRole('textbox', { name: 'Business Name' }).fill('ABC');
    await this.page.getByRole('textbox', { name: 'Nature of the Business' }).fill('Test');

    const filePath = 'C:/Users/MSI/Downloads/postman.jpg';

    await this.uploadDocument('Business Model Documentation', filePath);
    await this.uploadDocument("Applicant's Declaration", filePath);
    await this.uploadDocument('Internal Compliance Manual', filePath);
    await this.uploadDocument('Documentation in support of measures taken', filePath);
    await this.uploadDocument('Documentation in Support of Steps Taken', filePath);

    await this.wait(500);
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.page.getByRole('button', { name: 'Confirm' }).click();
  }

  // Page 6 - Payment
  async fillPayment() {
    await this.page.waitForURL(/licenses\/.*/);
    await this.page.getByRole('button', { name: 'OK' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Address Line 1' }).fill('Kaluthara');
    await this.page.getByRole('textbox', { name: 'Enter City' }).fill('Wadduwa');
    await this.page.getByRole('textbox', { name: 'Enter State/Province/Region' }).fill('Western');
    await this.page.getByRole('textbox', { name: 'Enter Postal Code' }).fill('12560');
    await this.page.locator('form-field-wrapper').filter({ hasText: 'Country Select Country' }).getByRole('combobox').selectOption('Sri Lanka');
    await this.uploadDocument('Please upload your payment confirmation here', 'C:/Users/MSI/Downloads/postman.jpg');
    await this.page.getByRole('checkbox', { name: 'I hereby acknowledge that I' }).check();
    await this.page.getByRole('checkbox', { name: 'We declare that all' }).check();
    await this.wait(500);
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    await this.page.getByRole('button', { name: 'Ok' }).click();
  }

  // Helpers
  async selectRadio(questionText: string, optionIndex: number) {
    const question = this.page.locator('form-field-wrapper').filter({ hasText: questionText });
    await expect(question).toBeVisible();
    await question.locator('input[type="radio"]').nth(optionIndex).check();
  }

  async uploadDocument(sectionText: string, filePath: string) {
    const section = this.page.locator('form-field-wrapper').filter({ hasText: sectionText });
    await expect(section).toBeVisible();
    await section.locator('img').click();
    const fileInput = section.locator('input[type="file"]');
    await expect(fileInput).toHaveCount(1);
    await fileInput.setInputFiles(filePath);
  }

  async wait(ms = 500) {
    await this.page.waitForTimeout(ms);
  }
}

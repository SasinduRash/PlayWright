import { test, expect } from '@playwright/test';
import { LicenseApplicationPage } from '../src/pages/licenseApply.page';

test('Apply Investment Manager license with valid data', async ({ page }) => {
  const app = new LicenseApplicationPage(page);

  await app.loginEntity('rash@mail.com', 'Test123#');
  await app.openLicenses();
  await app.startNewLicense('Investment Manager');

  // fill application form

  await app.fillApplicantInformation();

  await app.fillGroupStructure();

  await app.addDirector();

  await app.fillPage4();

  await app.uploadDocuments();

  await app.fillPayment();

  // final assertion - ensure a licenses url or confirmation
  await expect(page).toHaveURL(/licenses\/.*/);
});
import { test, expect, Page } from '@playwright/test';

const filePath = 'C:/Users/MSI/Downloads/Sample_Report.pdf';

async function login(page: Page, email: string, password: string) {
  await page.goto('https://dev-sl-sec.corewatch.io/auth/system/console');
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
}

async function signOut(page: Page) {
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Sign Out' }).click();
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
}

// The license list is shared with other license types and sorted by last update, so page through
// it to the most recently updated in-progress Investment Manager license.
// (The Filters / Search options are not used: their server requests often never return.)
async function findLatestInvestmentManagerLicense(page: Page) {
  await page.getByRole('button', { name: 'Licenses', exact: true }).click();
  const cards = page.locator('app-table-card');
  // skip finished licenses (Completed / Expired) - a status change also bumps them to the top of the list
  const license = cards
    .filter({ has: page.locator('.collapse-content').filter({ hasText: /Investment Manager[\s\S]*In Progress/ }) })
    .first();
  await expect(cards.first()).toBeVisible({ timeout: 60000 });
  for (let pageNo = 2; pageNo <= 10; pageNo++) {
    if (await license.isVisible()) return license;
    const firstCardText = await cards.first().innerText();
    await page.locator('.pagination').first().getByText(String(pageNo), { exact: true }).click();
    await expect(cards.first()).not.toHaveText(firstCardText, { timeout: 60000 });
  }
  throw new Error('No in-progress Investment Manager license found in the first 10 pages of the license list');
}

// Open a stage of the In Principle process of the latest Investment Manager license.
// Each role only sees some of the stages, so stages are picked by name.
async function openStage(page: Page, stageName: string) {
  const license = await findLatestInvestmentManagerLicense(page);
  const licenseToggle = license.locator('i.expand-btn').first();
  if (await licenseToggle.getAttribute('class').then(c => c?.includes('collapsed'))) await licenseToggle.click();

  const inPrinciple = license.locator('app-table-card').filter({ hasText: 'In Principle' }).first();
  const inPrincipleToggle = inPrinciple.locator('i.expand-btn').first();
  await expect(inPrincipleToggle).toBeVisible();
  if (await inPrincipleToggle.getAttribute('class').then(c => c?.includes('collapsed'))) await inPrincipleToggle.click();

  const stageMenuIcon = page.locator('i.icon-border.bi-chevron-down');
  await expect(inPrinciple.locator(stageMenuIcon).first()).toBeVisible({ timeout: 60000 }); // stages load slowly
  // deepest element holding both the stage name and its menu icon = the stage row (latest one if the name repeats)
  const stageRow = inPrinciple.locator('div').filter({ hasText: stageName }).filter({ has: stageMenuIcon }).last();
  if (await stageRow.count() === 0) {
    throw new Error(`Stage "${stageName}" not found. Visible stages:\n${await inPrinciple.innerText()}`);
  }
  await stageRow.locator(stageMenuIcon).last().click();
  // dropdown item is " View" - an exact 'View' match would also hit the "Reviews" sidebar item
  await page.locator('a.dropdown-item:visible').filter({ hasText: /View/ }).click();
}

async function goToLastPage(page: Page) {
  for (let i = 0; i < 4; i++) {
    await page.getByRole('button', { name: 'Next' }).click();
  }
  await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
}

// The "mark as checked" icon is the extra (third) icon next to a field the validator is assigned to
async function markAsChecked(page: Page, fieldHeading: string) {
  const fieldHeader = page.getByRole('heading', { name: fieldHeading }).locator('xpath=..');
  await fieldHeader.getByRole('button').last().click();
  await page.getByRole('dialog').getByRole('button', { name: 'Mark as Checked' }).click();
  await expect(page.getByRole('dialog')).toBeHidden();
}

// Approve (Validate on some documents) opens a confirmation dialog, then a success dialog with OK
async function approve(page: Page) {
  await page.getByRole('button', { name: /^(Approve|Validate)$/ }).click();
  await page.getByRole('dialog').getByRole('button', { name: /^(Approve|Validate)$/ }).click();
  await page.getByRole('button', { name: 'OK' }).click();
}

async function uploadFiles(page: Page, count: number) {
  for (let i = 0; i < count; i++) {
    await page.locator('input[type="file"]').nth(i).setInputFiles(filePath);
  }
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
}

// Generated documents: open the PDF preview, then submit it
async function previewAndSubmit(page: Page, stageName: string) {
  // Preview is ignored on a freshly filled form - it only works once the draft is saved and the page reloaded
  await page.getByRole('button', { name: 'Save Draft' }).click();
  await page.waitForTimeout(3000);
  await page.reload();
  // If the PDF takes too long the app shows "Pdf Generation In Progress!" and sends you back to the
  // dashboard; the PDF can then be previewed by reopening the stage, so keep doing that until it's ready
  // (once generated, reopening the stage goes straight to the PDF view, which has Submit instead of Preview)
  const pdfInProgress = page.getByText('Pdf Generation In Progress!');
  const preview = page.getByRole('button', { name: 'Preview' });
  const submitPdf = page.getByRole('button', { name: 'Submit' });
  await expect(async () => {
    if (await pdfInProgress.isVisible()) {
      await page.getByRole('button', { name: 'OK' }).click();
      await openStage(page, stageName);
    }
    await expect(preview.or(submitPdf)).toBeVisible({ timeout: 15000 });
    if (await preview.isVisible()) await preview.click();
    await expect(submitPdf).toBeVisible({ timeout: 15000 });
  }).toPass({ timeout: 300000 });
  await submitPdf.click();
  await page.getByRole('button', { name: 'OK' }).click();
}

test('Approve In Principal Investment Manager license ', async ({ page }) => {
  test.setTimeout(900000);

  await test.step('Cluster 4 data validator marks as checked', async () => {
    await login(page, 'c4datavalidator@mailinator.com', 'Test@user9');
    await openStage(page, 'Application Validation');
    await goToLastPage(page);
    await markAsChecked(page, 'Memorandum/ Articles of Association or Corresponding Documents');
    await signOut(page);
  });

  await test.step('Cluster 3 data validator marks as checked', async () => {
    await login(page, 'c3datavalidator@mailinator.com', 'Test@user9');
    await openStage(page, 'Application Validation');
    await goToLastPage(page);
    await markAsChecked(page, 'Business Model Documentation');
    await markAsChecked(page, 'Internal Compliance Manual');
    await signOut(page);
  });

  await test.step('Data validator approves application', async () => {
    await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
    await openStage(page, 'Application Validation');
    await goToLastPage(page);
    await markAsChecked(page, 'Audited Financial Statements');
    await approve(page);
    await signOut(page);
  });

  await test.step('Finance head approves payment', async () => {
    await login(page, 'finance1@mailinator.com', 'Test@123');
    await openStage(page, 'Payment Approval');
    await approve(page);
    await signOut(page);
  });

  await test.step('Cluster head approves', async () => {
    await login(page, 'clusterhead1@mailinator.com', 'Test@123');
    await openStage(page, 'Application Approval');
    await approve(page);
    await signOut(page);
  });

  await test.step('Director approves', async () => {
    await login(page, 'director1@mailinator.com', 'Test@123');
    await openStage(page, 'Application Approval');
    await approve(page);
    await signOut(page);
  });

  await test.step('Data validator generates memo attachment', async () => {
    await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
    await openStage(page, 'Licence Memo Attachment Submission Form');
    await page.getByRole('textbox', { name: 'Enter Title' }).fill('Test Title');
    await page.getByRole('textbox', { name: 'Enter Heading' }).fill('Test Heading');
    await page.locator('.ql-editor').fill('Test Content');
    await previewAndSubmit(page, 'Licence Memo Attachment Submission Form');
    await signOut(page);
  });

  await test.step('Data validator generates memo', async () => {
    await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
    await openStage(page, 'Licence Memo Submission Form');
    await page.getByRole('textbox', { name: 'Enter Receiver' }).fill('Reciever ');
    await page.getByRole('textbox', { name: 'Enter Sender' }).fill('Sender');
    await page.getByRole('textbox', { name: 'Enter Through' }).fill('Mail');
    // pick today - the calendar opens on the current month
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    await page.locator('date-picker i').click();
    await page.getByRole('gridcell', { name: today }).click();
    await page.getByRole('textbox', { name: 'Enter Subject...' }).fill('Test Subject');
    await page.locator('.ql-editor').fill('Test');
    await page.getByRole('button', { name: '+ Add Field' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Annexure Test');
    await previewAndSubmit(page, 'Licence Memo Submission Form');
    await signOut(page);
  });

  await test.step('Cluster head approves memo and memo attachment', async () => {
    await login(page, 'clusterhead1@mailinator.com', 'Test@123');
    await openStage(page, 'Cluster Head Approval(Memo - Attachment)');
    await approve(page);
    await openStage(page, 'Cluster Head Approval(Memo)');
    await approve(page);
    await signOut(page);
  });

  await test.step('Director approves memo and memo attachment', async () => {
    await login(page, 'director1@mailinator.com', 'Test@123');
    await openStage(page, 'Approve Director(Memo - Attachment)');
    await approve(page);
    await openStage(page, 'Approve Director(Memo)');
    await approve(page);
    await signOut(page);
  });

  await test.step('Data validator uploads signed memo and memo attachment', async () => {
    await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
    await openStage(page, 'Sign and Upload (Licence Memo and Attachment)');
    await uploadFiles(page, 2);
    await signOut(page);
  });

  await test.step('Data validator uploads acknowledgement letter', async () => {
    await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
    await openStage(page, 'Acknowledge (Licence Memo and Attachment)');
    await uploadFiles(page, 2);
    await signOut(page);
  });

  await test.step('Data validator generates cover letter', async () => {
    await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
    await openStage(page, 'Cover Letter Submission Form');
    await page.getByRole('textbox', { name: 'Enter Name' }).fill('Tester');
    await page.getByRole('textbox', { name: 'Enter Designation' }).fill('CEO');
    await page.getByRole('textbox', { name: 'Enter Address of Company' }).fill('Battaramulla, Colombo');
    await page.getByRole('textbox', { name: 'Enter the Subject' }).fill('Test Subject');
    await page.locator('.ql-editor').fill('Test Letter Body');
    await previewAndSubmit(page, 'Cover Letter Submission Form');
    await signOut(page);
  });

  await test.step('Cluster head approves cover letter', async () => {
    await login(page, 'clusterhead1@mailinator.com', 'Test@123');
    await openStage(page, 'Cluster Head Approval (Cover Letter)');
    await approve(page);
    await signOut(page);
  });

  await test.step('Director approves cover letter', async () => {
    await login(page, 'director1@mailinator.com', 'Test@123');
    await openStage(page, 'Approve Director(Cover Letter)');
    await approve(page);
    await signOut(page);
  });

  await test.step('Data validator uploads signed cover letter', async () => {
    await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
    await openStage(page, 'Sign Cover Letter and Upload');
    await uploadFiles(page, 1);
  });
});

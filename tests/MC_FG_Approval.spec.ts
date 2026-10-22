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

// The license list is shared with other license types and sorted by last update, so page through it
// to the most recently updated in-progress Managing Company license that has a Final Grant process
// (a newer Managing Company license may still be in its In Principle stage).
// (The Filters / Search options are not used: their server requests often never return.)
async function findLatestManagingCompanyFinalGrant(page: Page) {
  await page.getByRole('button', { name: 'Licenses', exact: true }).click();
  const cards = page.locator('app-table-card');
  // skip finished licenses (Completed / Expired) - a status change also bumps them to the top of the list
  const licenses = cards.filter({ has: page.locator('.collapse-content').filter({ hasText: /Managing Company[\s\S]*In Progress/ }) });
  await expect(cards.first()).toBeVisible({ timeout: 60000 });
  for (let pageNo = 1; pageNo <= 10; pageNo++) {
    if (pageNo > 1) {
      const firstCardText = await cards.first().innerText();
      await page.locator('.pagination').first().getByText(String(pageNo), { exact: true }).click();
      await expect(cards.first()).not.toHaveText(firstCardText, { timeout: 60000 });
    }
    for (let i = 0; i < await licenses.count(); i++) {
      const license = licenses.nth(i);
      const licenseToggle = license.locator('i.expand-btn').first();
      if (await licenseToggle.getAttribute('class').then(c => c?.includes('collapsed'))) await licenseToggle.click();
      const processes = license.locator('app-table-card');
      await expect(processes.first()).toBeVisible();
      const finalGrant = processes.filter({ hasText: 'Final Grant' }).first();
      if (await finalGrant.count() > 0) return finalGrant;
    }
  }
  throw new Error('No in-progress Managing Company license with a Final Grant found in the first 10 pages of the license list');
}

// Open a stage of the Final Grant process of the latest Managing Company license.
// Each role only sees some of the stages, so stages are picked by name.
async function openStage(page: Page, stageName: string) {
  const finalGrant = await findLatestManagingCompanyFinalGrant(page);
  const finalGrantToggle = finalGrant.locator('i.expand-btn').first();
  await expect(finalGrantToggle).toBeVisible();
  if (await finalGrantToggle.getAttribute('class').then(c => c?.includes('collapsed'))) await finalGrantToggle.click();

  const stageMenuIcon = page.locator('i.icon-border.bi-chevron-down');
  await expect(finalGrant.locator(stageMenuIcon).first()).toBeVisible({ timeout: 60000 }); // stages load slowly
  // deepest element holding both the stage name and its menu icon = the stage row (latest one if the name repeats)
  const stageRow = finalGrant.locator('div').filter({ hasText: stageName }).filter({ has: stageMenuIcon }).last();
  if (await stageRow.count() === 0) {
    throw new Error(`Stage "${stageName}" not found. Visible stages:\n${await finalGrant.innerText()}`);
  }
  await stageRow.locator(stageMenuIcon).last().click();
  // dropdown item is " View" - an exact 'View' match would also hit the "Reviews" sidebar item
  await page.locator('a.dropdown-item:visible').filter({ hasText: /View/ }).click();
}

// The "mark as checked" icon is the extra (third) icon next to a field the validator is assigned to
async function markAsChecked(page: Page, fieldHeading: string) {
  const fieldHeader = page.getByRole('heading', { name: fieldHeading }).locator('xpath=..');
  await fieldHeader.getByRole('button').last().click();
  await page.getByRole('dialog').getByRole('button', { name: 'Mark as Checked' }).click();
  await expect(page.getByRole('dialog')).toBeHidden();
}

// Investigation remark button sits at the end of each table row
async function addRemark(page: Page, rowText: string, remark: string) {
  const row = page.getByRole('row').filter({ hasText: rowText });
  await row.locator('td.text-end app-json-form-remarks-option button').click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading', { name: 'Add Remarks' })).toBeVisible();
  // once a remark is saved the dialog only lists it (no input), e.g. when re-running this step
  const remarkBox = dialog.getByPlaceholder('Write Remarks...');
  if (await remarkBox.isVisible()) {
    await remarkBox.fill(remark);
    await dialog.getByRole('button', { name: 'Save' }).click();
    await expect(dialog.getByText(remark)).toBeVisible();
  }
  await dialog.getByRole('button', { name: 'Cancel' }).click();
  await expect(dialog).toBeHidden();
}

// Approve (Validate on commission papers) opens a confirmation dialog, then a success dialog with OK
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
  // Preview does nothing until the form has been saved and reloaded
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

test('Approve Final Grant Managing Company license', async ({ page }) => {
  test.setTimeout(900000);

  await test.step('Cluster 4 data validator marks Section C - Annexure 1 as checked', async () => {
    await login(page, 'c4datavalidator@mailinator.com', 'Test@user9');
    await openStage(page, 'Application Validation');
    await page.getByRole('button', { name: 'Next' }).click();
    await markAsChecked(page, 'Details of Affidavit by Key Management Persons and Persons Making Investment Decisions on Behalf of Unit Holders');
    await signOut(page);
  });

  await test.step('Investigations Department adds background check remarks', async () => {
    await login(page, 'iddatavalidator@mailinator.com', 'Test@user1');
    await openStage(page, 'Application Validation');
    await addRemark(page, 'Rashmika Silva', 'Background check completed - no adverse findings');
    await addRemark(page, 'Kavindu Sandeepa', 'Background check completed - no adverse findings');
    await signOut(page);
  });

  await test.step('Data validator approves application', async () => {
    await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
    await openStage(page, 'Application Validation');
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

  await test.step('Data validator generates commission paper', async () => {
    await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
    await openStage(page, 'Commission Paper Submission Form');
    await page.getByRole('textbox', { name: 'Enter Paper Number' }).fill('CP_001');
    await page.getByRole('textbox', { name: 'Enter Subject' }).fill('Test Subject');
    await page.getByRole('textbox', { name: 'Enter Originating Department' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Enter Recommended By' }).fill('CEO');
    await page.getByRole('combobox').selectOption('For Approval'); // Purpose
    const editors = page.locator('.ql-editor');
    await editors.nth(0).fill('Test Goal');
    await editors.nth(1).fill('Test Background');
    await editors.nth(2).fill('Test Regulatory Framework');
    await editors.nth(3).fill('Test assessment');
    await editors.nth(4).fill('Test recommendation');
    await editors.nth(5).fill('Test Signature');
    await page.getByRole('button', { name: '+ Add Field' }).click();
    await page.getByRole('textbox', { name: 'Enter annexure title' }).fill('Annexure 1');
    await previewAndSubmit(page, 'Commission Paper Submission Form');
    await signOut(page);
  });

  await test.step('Cluster head approves commission paper', async () => {
    await login(page, 'clusterhead1@mailinator.com', 'Test@123');
    await openStage(page, 'Cluster Head Approval (Commission Paper)');
    await approve(page);
    await signOut(page);
  });

  await test.step('Director approves commission paper', async () => {
    await login(page, 'director1@mailinator.com', 'Test@123');
    await openStage(page, 'Approve Director (Commission Paper)');
    await approve(page);
    await signOut(page);
  });

  await test.step('Data validator uploads signed commission paper', async () => {
    await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
    await openStage(page, 'Sign Commission Paper');
    await uploadFiles(page, 1);
    await signOut(page);
  });

  await test.step('Data validator uploads signed commission decision paper', async () => {
    await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
    await openStage(page, 'Commission Decision Paper');
    await uploadFiles(page, 1);
    await signOut(page);
  });

  await test.step('Data validator generates cover letter', async () => {
    await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
    await openStage(page, 'Cover Letter Submission Form');
    await page.getByRole('textbox', { name: 'Enter Name' }).fill('Sasindu Rashmika');
    await page.getByRole('textbox', { name: 'Enter Designation' }).fill('Director');
    await page.getByRole('textbox', { name: 'Enter Address of Company' }).fill('Battaramulla, Wadduwa');
    await page.getByRole('textbox', { name: 'Enter the Subject' }).fill('Test Subject');
    await page.locator('.ql-editor').first().fill('Test Body');
    await previewAndSubmit(page, 'Cover Letter Submission Form');
    await signOut(page);
  });

  await test.step('Cluster head approves cover letter', async () => {
    await login(page, 'clusterhead1@mailinator.com', 'Test@123');
    await openStage(page, 'Cluster Head Approval(Cover Letter)');
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
    await openStage(page, 'Sign Cover Letter and Certificate');
    await uploadFiles(page, 2);
  });
});

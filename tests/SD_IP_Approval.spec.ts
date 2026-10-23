import { test, expect, Page } from '@playwright/test';
import path from 'path';

test('Approve In Principal Stock Dealer license ', async ({ page }) => {
  test.setTimeout(900000); // ~15 role logins with multi-page reviews

  const filePath = path.join(__dirname, 'files', 'notification letter.pdf');
  let applicationId = ''; // e.g. '#2D3K', taken from the latest Stock Dealer application

  async function login(page: Page, email: string, password: string) {
    await page.goto('https://dev-sl-sec.corewatch.io/auth/system/console');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Log In' }).click();

    // OTP verification (fixed dev OTP) - only shown for some users
    const otpHeading = page.getByRole('heading', { name: 'Check your email' });
    const licenses = page.getByRole('button', { name: 'Licenses', exact: true });
    await expect(otpHeading.or(licenses)).toBeVisible({ timeout: 30000 });
    if (await otpHeading.isVisible()) {
      await page.getByRole('textbox').first().click();
      await page.keyboard.type('55555');
      await page.getByRole('button', { name: 'Verify' }).click();
    }
  }

  async function signOut(page: Page) {
    await page.getByRole('button', { name: 'Sign Out' }).click();
    await page.getByRole('button', { name: 'Sign Out' }).click();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  }

  // open the pending task (e.g. 'Application Validation') of our application from the Licenses list
  async function openTask(page: Page, taskName: string) {
    await page.getByRole('button', { name: 'Licenses', exact: true }).click();
    if (!applicationId) {
      const latest = page.locator('app-table-card').filter({ hasText: 'Stock Dealer' }).first();
      applicationId = (await latest.locator('.table-field').nth(1).innerText()).trim();
    }
    const application = page.locator('app-table-card').filter({ hasText: applicationId }).first();
    const task = application
      .locator('app-task-table-card')
      .filter({ hasText: taskName })
      .filter({ hasNot: page.locator('.badge', { hasText: 'Completed' }) })
      .last();

    // the first application auto-expands; expand whichever level is still collapsed
    await expect(async () => {
      if (!(await task.isVisible())) {
        const collapsed = application.locator('i.expand-btn.collapsed').first();
        if (await collapsed.isVisible()) await collapsed.click();
      }
      await expect(task).toBeVisible({ timeout: 2000 });
    }).toPass({ timeout: 30000 });

    await task.locator('i.bi-chevron-down').click();
    await page.locator('ul.dropdown-menu.show').getByRole('button', { name: 'View' }).click();
  }

  // "Mark as Checked" every field the logged-in validator is responsible for, on every page of the application
  async function markAllAsChecked(page: Page) {
    const checkButtons = page.locator('json-form-element-options button:has(path[d^="M 11.334375 5.5"])');
    await expect(page.getByRole('button', { name: 'Send Revisions' })).toBeVisible();
    while (true) {
      await page.waitForTimeout(1500);
      while (await checkButtons.count() > 0) {
        const remaining = await checkButtons.count();
        await checkButtons.first().click();
        await page.getByRole('dialog').getByRole('button', { name: 'Mark as Checked' }).click();
        await expect(checkButtons).toHaveCount(remaining - 1);
      }
      const next = page.getByRole('button', { name: 'Next' });
      if (!(await next.isVisible())) break;
      await next.click();
    }
  }

  // add an Investigation Team remark (background check feedback) for every listed person.
  // The investigations user only sees the affidavits section; while loading, the form sometimes stays
  // on blank Previous/Next steps instead, and a reload brings the section up.
  async function addInvestigationRemarks(page: Page) {
    const remarkButtons = page.locator('app-json-form-remarks-option button');
    for (let attempt = 1; attempt <= 3; attempt++) {
      if (await remarkButtons.first().waitFor({ timeout: 20000 }).then(() => true, () => false)) break;
      await page.reload();
    }
    await expect(remarkButtons.first()).toBeVisible();
    await page.waitForTimeout(1500);
    const count = await remarkButtons.count();
    for (let i = 0; i < count; i++) {
      await remarkButtons.nth(i).click();
      const dialog = page.getByRole('dialog');
      const remarkBox = dialog.getByRole('textbox', { name: 'Write Remarks...' });
      await expect(remarkBox.or(dialog.getByText('INVESTIGATION', { exact: true }))).toBeVisible();
      // once a remark is saved the dialog only lists it, so a person already remarked on is skipped
      if (await remarkBox.isVisible()) {
        await remarkBox.click();
        await remarkBox.fill('Background check completed. No adverse findings.');
        await dialog.getByRole('button', { name: 'Save' }).click();
        await expect(page.getByText('The remark has been Added')).toBeVisible();
      }
      await dialog.getByRole('button', { name: 'Cancel' }).click();
      await expect(dialog).toBeHidden();
    }
  }

  // fill a template form (memo / cover letter), Preview it and submit the generated PDF.
  // The app sometimes swallows Preview without saving, or the PDF loader never finishes;
  // reloading and filling the form again gets it going.
  async function previewAndSubmit(page: Page, fillForm: () => Promise<void>) {
    const onPdfView = () => /\/pdf-view\//.test(page.url());
    for (let attempt = 1; attempt <= 3 && !onPdfView(); attempt++) {
      await expect(page.getByRole('button', { name: 'Preview' })).toBeVisible();
      await page.waitForTimeout(2000);
      // once the form data is saved it opens read-only (no Save Draft) and only needs Preview
      if (await page.getByRole('button', { name: 'Save Draft' }).isVisible()) {
        await fillForm();
        await page.waitForTimeout(3000);
      }
      await page.getByRole('button', { name: 'Preview' }).click();
      try {
        await expect.poll(onPdfView, { timeout: 60000 }).toBe(true);
      } catch {
        await page.reload();
        await page.waitForLoadState('networkidle');
      }
    }
    expect(onPdfView()).toBe(true);
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
  }

  // upload the file to every "+ Upload Document" field on the page
  async function uploadAllDocuments(page: Page, filePath: string) {
    const fileInputs = page.locator('input[type="file"]');
    await expect(fileInputs.first()).toBeAttached();
    const count = await fileInputs.count();
    for (let i = 0; i < count; i++) {
      await fileInputs.nth(i).setInputFiles(filePath);
    }
    await expect(page.getByText(path.basename(filePath))).toHaveCount(count);
  }

  // click the action button (Approve / Submit), confirm it in the dialog, then close the success message
  async function confirmAction(page: Page, action: string) {
    await page.getByRole('button', { name: action }).click();
    await page.getByRole('dialog').getByRole('button', { name: action }).click();
    await page.getByRole('button', { name: 'OK' }).click();
  }

// Log in as cluster 4 data validator and mark as checked (Memorandum/ Articles of Association, Directors' Declarations)
  await login(page, 'c4datavalidator@mailinator.com', 'Test@user9');
  await openTask(page, 'Application Validation');
  await markAllAsChecked(page);
  await signOut(page);

// Log in as cluster 2 data validator and mark as checked (Business Model Documentation)
  await login(page, 'c2datavalidator@mailinator.com', 'Test@user9');
  await openTask(page, 'Application Validation');
  await markAllAsChecked(page);
  await signOut(page);

// Log in as investigations department and give feedback on the background checks (Directors' Declarations)
  await login(page, 'iddatavalidator@mailinator.com', 'Test@user1');
  await openTask(page, 'Application Validation');
  await addInvestigationRemarks(page);
  await signOut(page);
// Log in as cluster 1 data validator, mark as checked (all sections) and approve
  await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
  await openTask(page, 'Application Validation');
  await markAllAsChecked(page);
  await confirmAction(page, 'Approve');
  await signOut(page);

// Log in as finance head and approve payment
  await login(page, 'finance1@mailinator.com', 'Test@123');
  await openTask(page, 'Payment Approval');
  await confirmAction(page, 'Approve');
  await signOut(page);

// Log in as cluster head and approve
  await login(page, 'clusterhead1@mailinator.com', 'Test@123');
  await openTask(page, 'Application Approval');
  await confirmAction(page, 'Approve');
  await signOut(page);

// Log in as director and approve
  await login(page, 'director1@mailinator.com', 'Test@123');
  await openTask(page, 'Application Approval');
  await confirmAction(page, 'Approve');
  await signOut(page);

// Log in as data validator and generate Memo Attachment
  await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
  await openTask(page, 'Licence Memo Attachment');
  await previewAndSubmit(page, async () => {
    await page.getByRole('textbox', { name: 'Enter Title' }).click();
    await page.getByRole('textbox', { name: 'Enter Title' }).fill('Test Title');
    await page.getByRole('textbox', { name: 'Enter Heading' }).click();
    await page.getByRole('textbox', { name: 'Enter Heading' }).fill('Test Heading');
    await page.locator('.ql-editor').click();
    await page.locator('.ql-editor').fill('Test Content');
  });

// Generate Memo
  await openTask(page, 'Licence Memo Submission Form');
  await previewAndSubmit(page, async () => {
    await page.getByRole('textbox', { name: 'Enter Receiver' }).click();
    await page.getByRole('textbox', { name: 'Enter Receiver' }).fill('Reciever ');
    await page.getByRole('textbox', { name: 'Enter Sender' }).click();
    await page.getByRole('textbox', { name: 'Enter Sender' }).fill('Sender');
    await page.getByRole('textbox', { name: 'Enter Through' }).click();
    await page.getByRole('textbox', { name: 'Enter Through' }).fill('Mail');
    await page.locator('date-picker i').click();
    await page.locator('.ngb-dp-day:not(.disabled)').first().click();
    await page.getByRole('textbox', { name: 'Enter Subject...' }).click();
    await page.getByRole('textbox', { name: 'Enter Subject...' }).fill('Test Subject');
    await page.locator('.ql-editor').click();
    await page.locator('.ql-editor').fill('Test');
    if (await page.getByRole('textbox', { name: 'Name' }).count() === 0) {
      await page.getByRole('button', { name: '+ Add Field' }).click();
    }
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Annexure Test');
  });
  await signOut(page);

// Log in as cluster head and approve Memo and Memo Attachment
  await login(page, 'clusterhead1@mailinator.com', 'Test@123');
  await openTask(page, 'Cluster Head Approval(Memo - Attachment)');
  await confirmAction(page, 'Approve');
  await openTask(page, 'Cluster Head Approval(Memo)');
  await confirmAction(page, 'Approve');
  await signOut(page);

// Log in as director and approve Memo and Memo Attachment
  await login(page, 'director1@mailinator.com', 'Test@123');
  await openTask(page, 'Approve Director(Memo - Attachment)');
  await confirmAction(page, 'Approve');
  await openTask(page, 'Approve Director(Memo)');
  await confirmAction(page, 'Approve');
  await signOut(page);

// Log in as data validator and upload signed Memo and Memo Attachment
  await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
  await openTask(page, 'Sign and Upload (Licence Memo and Attachment)');
  await uploadAllDocuments(page, filePath);
  await confirmAction(page, 'Submit');

// Upload acknowledgement letter
  await openTask(page, 'Acknowledge (Licence Memo and Attachment)');
  await uploadAllDocuments(page, filePath);
  await confirmAction(page, 'Submit');

// Cover letter generation
  await openTask(page, 'Cover Letter Submission Form');
  await previewAndSubmit(page, async () => {
    await page.getByRole('textbox', { name: 'Enter Name' }).click();
    await page.getByRole('textbox', { name: 'Enter Name' }).fill('Tester');
    await page.getByRole('textbox', { name: 'Enter Designation' }).click();
    await page.getByRole('textbox', { name: 'Enter Designation' }).fill('CEO');
    await page.getByRole('textbox', { name: 'Enter Address of Company' }).click();
    await page.getByRole('textbox', { name: 'Enter Address of Company' }).fill('Battaramulla, Colombo');
    await page.getByRole('textbox', { name: 'Enter the Subject' }).click();
    await page.getByRole('textbox', { name: 'Enter the Subject' }).fill('Test Subject');
    await page.locator('.ql-editor').click();
    await page.locator('.ql-editor').fill('Test Letter Body');
  });
  await signOut(page);

// Log in as cluster head and approve cover letter
  await login(page, 'clusterhead1@mailinator.com', 'Test@123');
  await openTask(page, 'Cluster Head Approval (Cover Letter)');
  await confirmAction(page, 'Approve');
  await signOut(page);

// Log in as director and approve cover letter
  await login(page, 'director1@mailinator.com', 'Test@123');
  await openTask(page, 'Approve Director(Cover Letter)');
  await confirmAction(page, 'Approve');
  await signOut(page);

// Log in as data validator and upload signed cover letter
  await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
  await openTask(page, 'Sign Cover Letter and Upload');
  await uploadAllDocuments(page, filePath);
  await confirmAction(page, 'Submit');
});

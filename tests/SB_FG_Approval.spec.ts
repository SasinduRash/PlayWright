import { test, expect, Page } from '@playwright/test';
import path from 'path';

test('Approve Final Grant Stock Broker license ', async ({ page }) => {
  test.setTimeout(900000); // many role logins with multi-page reviews

  const filePath = path.join(__dirname, 'files', 'notification letter.pdf');
  let applicationId = ''; // e.g. '#2DBS', the latest Stock Broker request with a Final Grant in progress

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

  // expand a request / process row of the Licenses list if it is collapsed
  async function expand(row: ReturnType<Page['locator']>) {
    const toggle = row.locator('i.expand-btn').first();
    await toggle.waitFor();
    if (await toggle.evaluate(e => e.classList.contains('collapsed'))) {
      await toggle.click();
      await page.waitForTimeout(2000);
    }
  }

  // find our request in the Licenses list, going through the pages (5 requests per page, order differs per user).
  // On the first call it picks the first Stock Broker request whose Final Grant is in progress.
  async function findRequest(page: Page) {
    await page.getByRole('button', { name: 'Licenses', exact: true }).click();
    const requests = page.locator('app-table > div > div > app-table-card');
    for (let pageNo = 1; pageNo <= 15; pageNo++) {
      await expect(requests.first()).toBeVisible({ timeout: 60000 });
      await page.waitForTimeout(2000);

      if (!applicationId) {
        const stockBrokers = requests.filter({ hasText: 'Stock Broker' });
        for (let i = 0; i < await stockBrokers.count() && !applicationId; i++) {
          await expand(stockBrokers.nth(i));
          const finalGrant = stockBrokers.nth(i).locator('app-table-card').filter({ hasText: 'Final Grant' });
          if (await finalGrant.count() && (await finalGrant.first().locator('.collapse-content').first().innerText()).includes('In Progress')) {
            applicationId = (await stockBrokers.nth(i).locator('.table-field').nth(1).innerText()).trim();
          }
        }
      }
      if (applicationId) {
        const application = requests.filter({ hasText: applicationId });
        if (await application.count()) return application.first();
      }

      const nextPage = page.locator('li', { hasText: new RegExp(`^${pageNo + 1}$`) });
      if (!(await nextPage.count())) break;
      await nextPage.click();
    }
    throw new Error(applicationId ? `request ${applicationId} not found in the Licenses list` : 'no Stock Broker request with a Final Grant in progress');
  }

  // open the pending Final Grant task (e.g. 'Application Validation') of our application from the Licenses list.
  // The In Principle process has tasks with the same names, so only the Final Grant process is searched.
  async function openTask(page: Page, taskName: string) {
    const application = await findRequest(page);
    await expand(application);
    const finalGrant = application.locator('app-table-card').filter({ hasText: 'Final Grant' }).first();
    await expand(finalGrant);
    const task = finalGrant
      .locator('app-task-table-card')
      .filter({ hasText: taskName })
      .filter({ hasNot: page.locator('.badge', { hasText: 'Completed' }) })
      .last();
    await expect(task).toBeVisible({ timeout: 30000 });

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

  // add a remark of the given type (e.g. INVESTIGATION background check feedback, CPD clearance note) on every
  // row the logged-in department can remark on. The department only sees its own section; while loading, the form
  // sometimes stays on blank Previous/Next steps instead, and a reload brings the section up.
  async function addRemarks(page: Page, remarkType: string, remark: string) {
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
      await expect(remarkBox.or(dialog.getByText(remarkType, { exact: true }))).toBeVisible();
      // once a remark is saved the dialog only lists it, so a row already remarked on is skipped
      if (await remarkBox.isVisible()) {
        await remarkBox.click();
        await remarkBox.fill(remark);
        await dialog.getByRole('button', { name: 'Save' }).click();
        await expect(page.getByText('The remark has been Added')).toBeVisible();
      }
      await dialog.getByRole('button', { name: 'Cancel' }).click();
      await expect(dialog).toBeHidden();
    }
  }
  // fill a template form (e.g. commission paper / cover letter), Preview it and submit the generated PDF.
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

  // approve a generated PDF (commission paper / cover letter) - its action button is either Approve or Validate
  async function approveDocument(page: Page) {
    const approve = page.getByRole('button', { name: 'Approve', exact: true });
    const validate = page.getByRole('button', { name: 'Validate', exact: true });
    await expect(approve.or(validate)).toBeVisible({ timeout: 30000 });
    await confirmAction(page, (await approve.isVisible()) ? 'Approve' : 'Validate');
  }

// Log in as investigations department and give background check remarks on KMPs (Section C - Annexure 2)
  await login(page, 'iddatavalidator@mailinator.com', 'Test@user1');
  await openTask(page, 'Application Validation');
  await addRemarks(page, 'INVESTIGATION', 'Background check completed. No adverse findings.');
  await signOut(page);

// Log in as cluster 4 data validator and mark as checked (Section C - Annexure 2)
  await login(page, 'c4datavalidator@mailinator.com', 'Test@user9');
  await openTask(page, 'Application Validation');
  await markAllAsChecked(page);
  await signOut(page);

// Log in as cluster 2 data validator and mark as checked (Section C - Annexure 3)
  await login(page, 'c2datavalidator@mailinator.com', 'Test@user9');
  await openTask(page, 'Application Validation');
  await markAllAsChecked(page);
  await signOut(page);

// Log in as CMET division and give clearance notes on the RIAs (Section C - Annexure 6)
  await login(page, 'cluster2.u3@mailinator.com', 'Test@123');
  await openTask(page, 'Application Validation');
  await addRemarks(page, 'CPD', 'Clearance granted for the registered investment advisor.');
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

// Log in as data validator and generate commission paper
  await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
  await openTask(page, 'Commission Paper Submission Form');
  await previewAndSubmit(page, async () => {
    await page.getByRole('textbox', { name: 'Enter Paper Number' }).click();
    await page.getByRole('textbox', { name: 'Enter Paper Number' }).fill('CP_001');
    await page.getByRole('textbox', { name: 'Enter Subject' }).click();
    await page.getByRole('textbox', { name: 'Enter Subject' }).fill('Test Subject');
    await page.getByRole('textbox', { name: 'Enter Originating Department' }).click();
    await page.getByRole('textbox', { name: 'Enter Originating Department' }).fill('Supervision');
    await page.getByRole('textbox', { name: 'Enter Recommended By' }).click();
    await page.getByRole('textbox', { name: 'Enter Recommended By' }).fill('CEO');
    await page.locator('form-field-wrapper').filter({ hasText: 'Purpose' }).getByRole('combobox').selectOption({ index: 1 });
    // Strategic Goal, Background, Regulatory Framework, Assessment, Recommendation, Signature
    const sections = ['Test Goal', 'Test Background', 'Test Regulatory Framework', 'Test Assessment', 'Test Recommendation', 'Test Signature'];
    for (let i = 0; i < sections.length; i++) {
      await page.locator('.ql-editor').nth(i).click();
      await page.locator('.ql-editor').nth(i).fill(sections[i]);
    }
  });
  await signOut(page);

// Log in as cluster head and approve commission paper
  await login(page, 'clusterhead1@mailinator.com', 'Test@123');
  await openTask(page, 'Cluster Head Approval (Commission Paper)');
  await approveDocument(page);
  await signOut(page);

// Log in as director and approve commission paper
  await login(page, 'director1@mailinator.com', 'Test@123');
  await openTask(page, 'Approve Director (Commission Paper)');
  await approveDocument(page);
  await signOut(page);

// Log in as data validator and upload signed commission paper
  await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
  await openTask(page, 'Sign Commission Paper and Upload');
  await uploadAllDocuments(page, filePath);
  await confirmAction(page, 'Submit');

// Upload signed commission decision paper
  await openTask(page, 'Sign Commission Decision Paper and Upload');
  await uploadAllDocuments(page, filePath);
  await confirmAction(page, 'Submit');

// Cover letter generation
  await openTask(page, 'Cover Letter Submission Form');
  await previewAndSubmit(page, async () => {
    await page.getByRole('textbox', { name: 'Enter Name' }).click();
    await page.getByRole('textbox', { name: 'Enter Name' }).fill('Sasindu Rashmika');
    await page.getByRole('textbox', { name: 'Enter Designation' }).click();
    await page.getByRole('textbox', { name: 'Enter Designation' }).fill('Director');
    await page.getByRole('textbox', { name: 'Enter Address of Company' }).click();
    await page.getByRole('textbox', { name: 'Enter Address of Company' }).fill('Battaramulla, Wadduwa');
    await page.getByRole('textbox', { name: 'Enter the Subject' }).click();
    await page.getByRole('textbox', { name: 'Enter the Subject' }).fill('Test Subject');
    await page.locator('.ql-editor').click();
    await page.locator('.ql-editor').fill('Test Letter Body');
  });
  await signOut(page);

// Log in as cluster head and approve cover letter
  await login(page, 'clusterhead1@mailinator.com', 'Test@123');
  await openTask(page, 'Cluster Head Approval(Cover Letter)');
  await approveDocument(page);
  await signOut(page);

// Log in as director and approve cover letter
  await login(page, 'director1@mailinator.com', 'Test@123');
  await openTask(page, 'Approve Director(Cover Letter)');
  await approveDocument(page);
  await signOut(page);

// Log in as data validator and upload signed cover letter and certificate
  await login(page, 'datavalidator1@mailinator.com', 'Test@user1');
  await openTask(page, 'Sign Cover Letter and Certificate');
  await uploadAllDocuments(page, filePath);
  await confirmAction(page, 'Submit');
  await signOut(page);
});
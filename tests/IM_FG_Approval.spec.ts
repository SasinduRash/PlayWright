import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('https://dev-sl-sec.corewatch.io/bypass/int-login');

// Log as data validator 
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('datavalidator1@mailinator.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Log In' }).click();

//Navigate to licenses and approve
  await page.getByRole('button', { name: 'Licenses' }).click();
    
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .nth(1)
    .click();

  const firstPendingRow = page
    .locator('app-table-card') 
    .filter({ hasText: 'Data Validation Team' })
    .nth(1);

  // Open dropdown of FIRST pending row
  await firstPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(0)
    .click();

  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log as finance head
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('finance1@mailinator.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Log In' }).click();

// Navigate to licenses and approve
  await page.getByRole('button', { name: 'Licenses' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .nth(1)
    .click();

  const secondPendingRow = page
    .locator('app-table-card')

  await secondPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(1)
    .click();

  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log as cluster head
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('clusterhead1@mailinator.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Log In' }).click();

// Navigate to licenses and approve
  await page.getByRole('button', { name: 'Licenses' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .nth(1)
    .click();

  const thirdPendingRow = page
    .locator('app-table-card') 

  await thirdPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(2)
    .click();

  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log as director
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('director1@mailinator.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Log In' }).click();

// Navigate to licenses and approve
  await page.getByRole('button', { name: 'Licenses' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .nth(1)
    .click();

  const fourthPendingRow = page
    .locator('app-table-card') 

  await fourthPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(3)
    .click();

  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log as data validator
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('datavalidator1@mailinator.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Log In' }).click();

// Navigate to licenses and generate commission paper
  await page.getByRole('button', { name: 'Licenses' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .nth(1)
    .click();

  const fifthPendingRow = page
    .locator('app-table-card') 

  await fifthPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(4)
    .click();

  await page.getByRole('button', { name: 'View' }).click();

  // Generate Commission Paper
  await page.getByRole('textbox', { name: 'Enter Paper Number' }).click();
  await page.getByRole('textbox', { name: 'Enter Paper Number' }).fill('CP_001');
  await page.getByRole('textbox', { name: 'Enter Subject' }).click();
  await page.getByRole('textbox', { name: 'Enter Subject' }).fill('Test Subject');
  await page.getByRole('textbox', { name: 'Enter Originating Department' }).click();
  await page.getByRole('textbox', { name: 'Enter Originating Department' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Enter Recommended By' }).click();
  await page.getByRole('textbox', { name: 'Enter Recommended By' }).fill('CEO');
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).nth(1).click();
  await page.locator('.ql-editor').first().fill('Test Goal');
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).nth(1).click();
  await page.locator('.ql-editor.ql-blank').first().fill('Test Background');
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).nth(1).click();
  await page.locator('.ql-editor.ql-blank').first().fill('Test Regulatory Framework');
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).nth(1).click();
  await page.locator('.ql-editor.ql-blank').first().fill('Test assessment');
  await page.locator('.ql-editor.ql-blank').click();
  await page.locator('.ql-editor.ql-blank').fill('Test recommendation');
  await page.getByRole('textbox', { name: 'Enter annexure title' }).click();
  await page.getByRole('textbox', { name: 'Enter annexure title' }).fill('Annexure 1');
  await page.getByRole('button', { name: 'Preview' }).click();

  await page.waitForURL(/licenses\/.*\/pdf-view\/11/);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log as cluster head
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('clusterhead1@mailinator.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Log In' }).click();

// Navigate to licenses and approve commission paper
  await page.getByRole('button', { name: 'Licenses' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .nth(1)
    .click();

  const sixthPendingRow = page
    .locator('app-table-card') 

  await sixthPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(5)
    .click();

  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'Validate' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log as director
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('director1@mailinator.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Log In' }).click();

// Navigate to licenses and approve commission paper
  await page.getByRole('button', { name: 'Licenses' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .nth(1)
    .click();

  const seventhPendingRow = page
    .locator('app-table-card') 

  await seventhPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(6)
    .click();

  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'Validate' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log as data validator 
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('datavalidator1@mailinator.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Log In' }).click();

// Navigate to licenses and upload signed commission paper
  await page.getByRole('button', { name: 'Licenses' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .nth(1)
    .click();

  const eightPendingRow = page
    .locator('app-table-card') 

  await eightPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(7)
    .click();

  await page.getByRole('button', { name: 'View' }).click();

// Upload signed commission paper

  const filePath = 'C:/Users/MSI/Downloads/Sample_Report.pdf';

  await page.getByRole('img', { name: 'Upload Icon' }).click();
  await page.locator('input[type="file"]').nth(0).setInputFiles(filePath);  
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .nth(1)
    .click();

  const ninethPendingRow = page
    .locator('app-table-card') 

  await ninethPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(8)
    .click();

  await page.getByRole('button', { name: 'View' }).click();

// Upload signed commission dicision paper
  await page.getByRole('img', { name: 'Upload Icon' }).click();
  await page.locator('input[type="file"]').nth(0).setInputFiles(filePath);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .nth(1)
    .click();

  const tenthPendingRow = page
    .locator('app-table-card') 

  await tenthPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(9)
    .click();

  await page.getByRole('button', { name: 'View' }).click();

// Generate cover letter
  await page.getByRole('textbox', { name: 'Enter Name' }).click();
  await page.getByRole('textbox', { name: 'Enter Name' }).fill('Sasindu Rashmika');
  await page.getByRole('textbox', { name: 'Enter Designation' }).click();
  await page.getByRole('textbox', { name: 'Enter Designation' }).fill('Director');
  await page.getByRole('textbox', { name: 'Enter Address of Company' }).click();
  await page.getByRole('textbox', { name: 'Enter Address of Company' }).fill('Battaramulla, Wadduwa');
  await page.getByRole('textbox', { name: 'Enter the Subject' }).click();
  await page.getByRole('textbox', { name: 'Enter the Subject' }).fill('Test Subject');
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).nth(1).click();
  await page.locator('.ql-editor').first().fill('Test Body');
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).nth(1).click();
  await page.locator('.ql-editor.ql-blank').fill('Test Header');
  await page.getByRole('textbox', { name: 'Enter Objective' }).click();
  await page.getByRole('textbox', { name: 'Enter Objective' }).fill('Objective 1');
  await page.getByRole('button', { name: 'Preview' }).click();

  await page.waitForURL(/licenses\/.*\/pdf-view\/18/);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log as cluster head
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('clusterhead1@mailinator.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Log In' }).click();

// Navigate to licenses and approve cover letter
  await page.getByRole('button', { name: 'Licenses' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .nth(1)
    .click();

  const eleventhPendingRow = page
    .locator('app-table-card') 

  await eleventhPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(10)
    .click();

  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'Validate' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log as director
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('director1@mailinator.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Log In' }).click();

// Navigate to licenses and approve cover letter
  await page.getByRole('button', { name: 'Licenses' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .nth(1)
    .click();

  const twelethPendingRow = page
    .locator('app-table-card') 

  await twelethPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(11)
    .click();

  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'Validate' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log as data validator
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('datavalidator1@mailinator.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Log In' }).click();

// Navigate to licenses and upload signed cover letter
  await page.getByRole('button', { name: 'Licenses' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .nth(1)
    .click();

  const thirteenthPendingRow = page
    .locator('app-table-card') 

  await thirteenthPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(12)
    .click();

  await page.getByRole('button', { name: 'View' }).click();

  // First upload
  await page.getByRole('img', { name: 'Upload Icon' }).nth(0).click();
  await page.locator('input[type="file"]').nth(0).setInputFiles(filePath);

  // Second upload
  await page.getByRole('img', { name: 'Upload Icon' }).nth(1).click();
  await page.locator('input[type="file"]').nth(1).setInputFiles(filePath);
  
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
});
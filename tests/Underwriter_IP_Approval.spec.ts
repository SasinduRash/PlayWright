import { test, expect, Page } from '@playwright/test';

test('Approve In Principal Underwriter license ', async ({ page }) => {

// Log as cluster 4 data validator
  await page.goto('https://dev-sl-sec.corewatch.io/bypass/int-login');
//   await page.getByRole('textbox', { name: 'Email' }).click();
//   await page.getByRole('textbox', { name: 'Email' }).fill('c4datavalidator@mailinator.com');
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill('Test@user9');
//   await page.getByRole('button', { name: 'Log In' }).click();

// //Navigate to licenses and mark as checked
//   await page.getByRole('button', { name: 'Licenses' }).click();
//   await page
//     .locator('.expanded-content')
//     .locator('i.expand-btn')
//     .first()
//     .click();

  const firstPendingRow = page
    .locator('app-table-card') 
    .filter({ hasText: 'Data Validation Team' })
    .first();

//   // Open dropdown of FIRST pending row
//   await firstPendingRow
//     .locator('i.icon-border.bi-chevron-down') .nth(0)
//     .click();

//   // Click View
//   await page.getByRole('button', { name: 'View' }).click();
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
//   await page.getByRole('button', { name: 'Mark as Checked' }).click();
//   await page.locator('div:nth-child(8) > subsection > .hstack.p-4 > .vstack > .hstack > json-form-element-options > .options-wrapper > div:nth-child(2) > .icon-button').click();
//   await page.getByRole('button', { name: 'Mark as Checked' }).click();
//   await page.getByRole('button', { name: 'Sign Out' }).click();
//   await page.getByRole('button', { name: 'Sign Out' }).click();

// // // Log as cluster 2 data validator
//   await page.getByRole('textbox', { name: 'Email' }).click();
//   await page.getByRole('textbox', { name: 'Email' }).fill('c2datavalidator@mailinator.com');
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill('Test@user9');
//   await page.getByRole('button', { name: 'Log In' }).click();

// // Navigate to licenses and mark as checked
//   await page.getByRole('button', { name: 'Licenses' }).click();
//   await page
//     .locator('.expanded-content')
//     .locator('i.expand-btn')
//     .first()
//     .click();

//   // Open dropdown of FIRST pending row
//   await firstPendingRow
//     .locator('i.icon-border.bi-chevron-down') .nth(0)
//     .click();

// //   // Click View
//   await page.getByRole('button', { name: 'View' }).click();
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.locator('.icon-button.d-flex.align-items-center.p-0.ng-star-inserted').click();
//   await page.getByRole('button', { name: 'Mark as Checked' }).click();
//   await page.getByRole('button', { name: 'Sign Out' }).click();
//   await page.getByRole('button', { name: 'Sign Out' }).click();

// Log in as data validator
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('datavalidator1@mailinator.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Log In' }).click();

// Navigate to licenses and approve
  await page.getByRole('button', { name: 'Licenses' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .first()
    .click();

  // Open dropdown of FIRST pending row
  await firstPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(0)
    .click();

  // Click View
  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log in as finance head
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
    .first()
    .click();

  const SecondPendingRow = page
    .locator('app-table-card')

  // Open dropdown of FIRST pending row
  await SecondPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(1)
    .click();

  // Click View
  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log in as cluster head
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
    .first()
    .click();

  const ThirdPendingRow = page
    .locator('app-table-card')

  await ThirdPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(2)
    .click();

  // Click View
  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log in as director
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
    .first()
    .click();

  const FourthPendingRow = page
    .locator('app-table-card')

  await FourthPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(3)
    .click();

  // Click View
  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log in as data validator 
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('datavalidator1@mailinator.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Log In' }).click();

// Navigate to licenses and generate Memo Attachment
  await page.getByRole('button', { name: 'Licenses' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .first()
    .click();
  const FifthPendingRow = page
    .locator('app-table-card')

  await FifthPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(4)
    .click();

  // Click View
  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('textbox', { name: 'Enter Title' }).click();
  await page.getByRole('textbox', { name: 'Enter Title' }).fill('Test Title');
  await page.getByRole('textbox', { name: 'Enter Heading' }).click();
  await page.getByRole('textbox', { name: 'Enter Heading' }).fill('Test Heading');
  await page.locator('#editor-container').getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('.ql-editor').fill('Test Content');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Preview' }).click();
  await page.waitForURL(/licenses\/.*\/pdf-view\/11/);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

// Generate Memo
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .first()
    .click();
  const SixthPendingRow = page
    .locator('app-table-card')

  await SixthPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(5)
    .click();

  // Click View
  await page.getByRole('button', { name: 'View' }).click();

  await page.getByRole('textbox', { name: 'Enter Receiver' }).click();
  await page.getByRole('textbox', { name: 'Enter Receiver' }).fill('Reciever ');
  await page.getByRole('textbox', { name: 'Enter Sender' }).click();
  await page.getByRole('textbox', { name: 'Enter Sender' }).fill('Sender');
  await page.getByRole('textbox', { name: 'Enter Through' }).click();
  await page.getByRole('textbox', { name: 'Enter Through' }).fill('Mail');
  await page.locator('date-picker i').click();
  await page.getByLabel('Saturday, January 31,').getByText('31').click();
  await page.getByRole('textbox', { name: 'Enter Subject...' }).click();
  await page.getByRole('textbox', { name: 'Enter Subject...' }).fill('Test Subject');
  await page.locator('#editor-container').getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('.ql-editor').fill('Test');
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Annexure Test');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Preview' }).click();
  await page.waitForURL(/licenses\/.*\/pdf-view\/13/);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log in as cluster head
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('clusterhead1@mailinator.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Log In' }).click();

// Navigate to licenses and approve Memo and Memo Attachment
  await page.getByRole('button', { name: 'Licenses' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .first()
    .click();
  const SeventhPendingRow = page
    .locator('app-table-card')

  await SeventhPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(6)
    .click();

  // Click View
  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'Validate' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .first()
    .click();
  const EightthPendingRow = page
    .locator('app-table-card')

  await EightthPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(7)
    .click();

  // Click View
  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'Validate' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log in as director
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('director1@mailinator.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Log In' }).click();

// Navigate to licenses and approve Memo and Memo Attachment
  await page.getByRole('button', { name: 'Licenses' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .first()
    .click();
  const NinethPendingRow = page
    .locator('app-table-card')

  await NinethPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(8)
    .click();

  // Click View
  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'Validate' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .first()
    .click();
  const TenthPendingRow = page
    .locator('app-table-card')

  await TenthPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(9)
    .click();

  // Click View
  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'Validate' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log in as data validator
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('datavalidator1@mailinator.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Log In' }).click();

// Navigate to licenses and upload signed Memo and Memo Attachment
  await page.getByRole('button', { name: 'Licenses' }).click();
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .first()
    .click();
  const eleventhPendingRow = page
    .locator('app-table-card')

  await eleventhPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(10)
    .click();

  // Click View
  await page.getByRole('button', { name: 'View' }).click();

  const filePath = 'C:/Users/MSI/Downloads/Sample_Report.pdf';

  // First upload
  await page.getByRole('img', { name: 'Upload Icon' }).nth(0).click();
  await page.locator('input[type="file"]').nth(0).setInputFiles(filePath);

  // Second upload
  await page.getByRole('img', { name: 'Upload Icon' }).nth(1).click();
  await page.locator('input[type="file"]').nth(1).setInputFiles(filePath);

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

// Upload acknowledgement letter
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .first()
    .click();
  const tuwelthPendingRow = page
    .locator('app-table-card')

  await tuwelthPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(11)
    .click();

  // Click View
  await page.getByRole('button', { name: 'View' }).click();
  // First upload
  await page.getByRole('img', { name: 'Upload Icon' }).nth(0).click();
  await page.locator('input[type="file"]').nth(0).setInputFiles(filePath);

  // Second upload
  await page.getByRole('img', { name: 'Upload Icon' }).nth(1).click();
  await page.locator('input[type="file"]').nth(1).setInputFiles(filePath);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

// Cover letter generation
  await page
    .locator('.expanded-content')
    .locator('i.expand-btn')
    .first()
    .click();
  const ThirteenthPendingRow = page
    .locator('app-table-card')

  await ThirteenthPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(12)
    .click();

  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('textbox', { name: 'Enter Name' }).click();
  await page.getByRole('textbox', { name: 'Enter Name' }).fill('Tester');
  await page.getByRole('textbox', { name: 'Enter Designation' }).click();
  await page.getByRole('textbox', { name: 'Enter Designation' }).fill('CEO');
  await page.getByRole('textbox', { name: 'Enter Address of Company' }).click();
  await page.getByRole('textbox', { name: 'Enter Address of Company' }).fill('Battaramulla, Colombo');
  await page.getByRole('textbox', { name: 'Enter the Subject' }).click();
  await page.getByRole('textbox', { name: 'Enter the Subject' }).fill('Test Subject');
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).nth(1).click();
  await page.locator('.ql-editor').first().fill('Test Letter Body');
  await page.locator('.ql-editor.ql-blank').click();
  await page.locator('.ql-editor.ql-blank').fill('Test Header');
  await page.getByRole('textbox', { name: 'Enter Objective' }).click();
  await page.getByRole('textbox', { name: 'Enter Objective' }).fill('Objective 1');
  await page.getByRole('button', { name: '+ Add Another Field' }).click();
  await page.getByRole('row', { name: '2 ' }).getByPlaceholder('Enter Objective').click();
  await page.getByRole('row', { name: '2 ' }).getByPlaceholder('Enter Objective').fill('Objective 2');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Preview' }).click();
  await page.waitForURL(/licenses\/.*\/pdf-view\/21/);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log in as cluster head
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
    .first()
    .click();
  const FourteenthPendingRow = page
    .locator('app-table-card')

  await FourteenthPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(13)
    .click();

  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'Validate' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log in as director
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
    .first()
    .click();
  const fifteenthPendingRow = page
    .locator('app-table-card')

  await fifteenthPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(14)
    .click();

  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'Validate' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();

// Log in as data validator 
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
    .first()
    .click();
  const SixteenthPendingRow = page
    .locator('app-table-card')

  await SixteenthPendingRow
    .locator('i.icon-border.bi-chevron-down') .nth(15)
    .click();

  await page.getByRole('button', { name: 'View' }).click();
  
  await page.getByRole('img', { name: 'Upload Icon' }).click();
  await page.locator('input[type="file"]').nth(0).setInputFiles(filePath);

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
});

function first() {
  throw new Error('Function not implemented.');
}

import { Selector } from 'testcafe';
const userNameTextbox = Selector('input#txtUsername');
const copyRightText = Selector('.divCopyright.outer');
const passwordTextbox = Selector('input#txtPassword');
const loginButton = Selector('input#btnLogin');
const invalidCredentialsToastMessage = Selector('div.toast-message');
const dashboard  = Selector('li.page-title');
const accountName = Selector('a#user-dropdown>span');
const titleName = Selector('span#account-job');
const Notifications = Selector('span.noOfNotifications');
const lefthandMenu = Selector('a.collapsible-header.waves-effect.waves-orange'); 
const myInfo = Selector('a#menu_pim_viewMyDetails');
const checkBox = Selector('div.checkbox');
const saveButton = Selector('button.btn.waves-effect.waves-green')
const job = Selector('a').withAttribute('href', '#/pim/employees/13/job');
const personalTab = Selector('a').withAttribute('href', '#/pim/employees/13/personal_details');
const baseBallCheckbox = Selector('div.checkbox>input').nth(0)
const basketballCheckbox = Selector('div.checkbox>input').nth(1)
const sportSavebutton = saveButton.nth(2);
const aboutLink = Selector('a#aboutDisplayLink');
const companyName = Selector('div.col.s12>p').nth(0)
const bannerColor = Selector('customized-modal-header').style;



fixture('Getting Started')
  .page('https://orangehrm-demo-6x.orangehrmlive.com/')
   test('Testing the LoginPage', async (t) => {
      await t
      .maximizeWindow()
      //Checking the  text “2005 - 2021 OrangeHRM, Inc. All rights reserved.” at the bottom
        await t.expect(copyRightText.exists).ok()
      //Checking the username field has type “text” and password field has type “password”
        const userNameTypeValue =userNameTextbox.getAttribute('type')
        const passwordTypeValue = passwordTextbox.getAttribute('type')
        await t.expect(userNameTypeValue).contains('text',"Username Type is present as expected")
        await t.expect(passwordTypeValue).contains('password',"Password Type is present as expected")
      //Checking the  username is pre-populated with “admin” and password is pre-populated with “admin123”
        const userNamePrepopulatedValue =userNameTextbox.getAttribute('value')
        const passwordPrepopulatedValue =passwordTextbox.getAttribute('value')
        await t.expect(userNamePrepopulatedValue).contains('admin',"Prepopulated values are displying correctly")
        await t.expect(passwordPrepopulatedValue).contains('admin123',"Prepopulated values are displying correctly")
      //Checking the invalid Credentials
       await t.typeText(passwordTextbox,"admin",{replace:true});
       await t.click(loginButton)
       await t.expect(invalidCredentialsToastMessage.exists).ok()
});
test.page('https://orangehrm-demo-6x.orangehrmlive.com/')
('Testing the Dashboard Page', async (t) => {
    await t
    // Checking wether the page lands in the Dashboard after entering correct username and password
    await t.click(loginButton)
    await t.expect(dashboard.exists).ok()
    // Checking the logged in user’s name on left bar is “Jaqueline White” and title is “Global HR Manager”
    await t.wait(3000)
    const Name = await accountName.textContent;
    const title = await titleName.textContent;
    await t.expect(Name).contains('Jacqueline White',"Account Name is matching")
    await t.expect(title).contains('Global HR Manager',"Title Name is matching")
    // Checking  pending leave and scheduled recruitment events on topnav right side
    const leave = await Notifications.nth(1).textContent;
    await t.expect(leave).contains('1',"Leave count is matching")
    const scheduledRecuritmentEvents = await Notifications.nth(2).textContent;
    await t.expect(scheduledRecuritmentEvents).contains('37',"scheduledRecuritmentEvents count is matching")
    //Checking  the “Expense” menu on left navigation bar, the submenu items are “Configuration”, “Travel Requests”, “Claims” and “Reports”
    const expenseMenu = lefthandMenu.withText('Expense');
    const configuration = lefthandMenu.withText('Configuration');
    const travelRequests = lefthandMenu.withText('Travel Requests');
    const claims = lefthandMenu.withText('Claims');
    const reports = lefthandMenu.withText('Reports');
    await t.click(expenseMenu)
    var expense = [configuration, travelRequests, claims,reports];
    var i;
    for (i=0;i<expense.length;i++){
        await t.expect(expense[i].exists).ok()
 }
   //Checking “Personal Details” on the top, scroll to “Preferences” section at bottom. Ensure that “Baseball”, “BasketBall”, “Football” and “Handball” checkboxes are available.
   await t.click(myInfo)
   await t.wait(13000)
   const baseBall = checkBox.withText('Baseball');
   const basketBall = checkBox.withText('Basketball');
   const footBall = checkBox.withText('Football');
   const handball = checkBox.withText('Handball');
   var check = [baseBall, basketBall, footBall,handball];
   for (i=0;i<check.length;i++){
        await t.expect(check[i].exists).ok()
 }
   //Checking Click “Baseball” and “Basketball” check boxes, then click on “Save”. Then click “Jobs” on topnav and then again click “Personal Details” on topnav. Scroll down to “Preferences” section again and verify that “Baseball” and “Basketball” are checked.
  // await t.click(baseBallCheckbox)
  // await t.click(basketballCheckbox)
   
   await t.click(sportSavebutton)
   await t.click(job)
   await t.click(personalTab)
   await t.hover(baseBall)
   await t.expect(baseBall.checked).eql(true)
   await t.expect(basketBall.checked).eql(true)
   //Checking HR’s name on top left, then click on “About”. Ensure that the “company name” in dialog is “Company Name: OrangeHRM (Pvt) Ltd(Parallel Demo)”
   await t.click(accountName)
   await t.click(aboutLink)
   await t.expect(companyName).contains('Company Name: OrangeHRM (Pvt) Ltd(Parallel Demo)',"Company Name is matching")
   //Ensure that banner color of the dialog is “#00ac51”.
   await t.expect(bannerColor.color).eql("#00ac51", "the color must be green!");
});
const{Given, When, Then} = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const { test, expect, playwright } = require('@playwright/test');
const { firefox } = require('playwright');

Given('User is on login page', async function () {
    const browser = await firefox.launch();
    const context = await browser.newContext();
    const page = context.newPage();
    const pomanager = new POManager(page);
    const loginpage = pomanager.getLoginPage();//new LoginPage(page);
    await loginpage.goTo();
    await page.getByRole('link', { name: 'Form Authentication' }).click();
  
  });

When('User provide valid username {string} and password {string} and click on login button',async function (username, password) {
    await loginpage.validLogin(username, password);
  });

Then('User should able to see successful login',async function () {
    await expect(page).toHaveTitle(/The Internet/);
  });
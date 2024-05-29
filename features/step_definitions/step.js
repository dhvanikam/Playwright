const{Given, When, Then} = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const { expect } = require('@playwright/test');
const { firefox } = require('playwright');

Given('User is on login page', async function () {
    const browser = await firefox.launch();
    this.page = await browser.newPage();
    this.pomanager = new POManager(this.page);
    const loginpage = this.pomanager.getLoginPage();
    await loginpage.goTo();
    await loginpage.goToAuthPage();
  });

When('User provide valid username {string} and password {string} and click on login button',async function (username, password) {
    const loginpage = this.pomanager.getLoginPage();
    await loginpage.validLogin(username, password);
    console.log("when")
  });

Then('User should able to see successful login',async function () {
   await expect(this.page).toHaveTitle("The Internet");
  });
// @ts-check
const { test, expect } = require('@playwright/test');
// const { LoginPage } = require('../pageObjects/LoginPage');
// const { DropDownPage } = require('../pageObjects/DropDownPage');
const { POManager } = require('../pageObjects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../utils/loginTestData.json")));

test('has title', async function ({ page }) {
  //Navigation
  await page.goto('https://the-internet.herokuapp.com/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/The Internet/);
});

test('Basic Auth', async function ({ page }) {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');

});

test('Context Menu', async function ({ page }) {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Context Menu' }).click();
  const element = page.locator('#hot-spot');
  await element.click({ button: 'right' });
});

test('drag and drop', async function ({ page }) {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Drag and Drop' }).click();
  const columnA = page.locator('#column-a > header');
  const columnB = page.locator('#column-b > header');
  await page.locator('#column-a').dragTo(page.locator('#column-b'));
  await expect(columnA).toHaveText('B');
  await expect(columnB).toHaveText('A');
  //Non-retrying await expect(columnA).toBe('A');
});

test('DropDown', async function ({ page }) {
  const pomanager = new POManager(page);
  const loginpage = pomanager.getLoginPage(); //new LoginPage(page);
  const dropdownpage = pomanager.getDropDownPage();//new DropDownPage(page);

  await loginpage.goTo();
  // Click the drop down link.
  await page.getByRole('link', { name: 'Dropdown' }).click();
  await dropdownpage.selectFirstOption();
  await expect(dropdownpage.dropdownElement).toHaveValue("1");
});

test('Label and Textbox : Authentication', async ({ page }) => {
  // const username = "tomsmith";
  // const password = "SuperSecretPassword!";
  const pomanager = new POManager(page);
  const loginpage = pomanager.getLoginPage();//new LoginPage(page);
  await loginpage.goTo();
  // Click the Form Authentication link.
  await page.getByRole('link', { name: 'Form Authentication' }).click();
  // await page.getByLabel('Username').fill("tomsmith");
  // await page.getByLabel('Password').fill("SuperSecretPassword!");
  // await page.getByRole('button', { name: 'Login' }).click();
  await loginpage.validLogin(dataset.username, dataset.password);

  expect(page.getByRole('heading', { name: 'Secure Area', level: 2 }));
});

test('Frames', async function ({ page }) {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Frames', exact: true }).click();
  await page.getByRole('link', { name: 'Nested Frames', exact: true }).click();
  const frameTop = page.frameLocator("[name='frame-top']");
  const frameleft = frameTop.frameLocator("[name='frame-left']").locator('body');
  await expect(frameleft).toHaveText('LEFT');

  const framemiddle = frameTop.frameLocator("[name='frame-middle']").locator('body');
  await expect(framemiddle).toHaveText('MIDDLE');

  const frameright = frameTop.frameLocator("[name='frame-right']").locator('body');
  await expect(frameright).toHaveText('RIGHT');

  const frameBottom = page.frameLocator("[name='frame-bottom']").locator('body');
  await expect(frameBottom).toHaveText('BOTTOM');
});
test('A/B Testing link', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  let d1 = new Date();
  // Click the get A/B Testing link.
  await page.getByRole('link', { name: 'A/B Testing' }).click();
  // Expects page to have a heading with the name of A/B Test Variation 1.
  await expect(page.getByRole('heading', { name: 'A/B Test', level: 3 })).toBeVisible();
  //await expect(page.getByRole('heading', { level: 3 })).toHaveText('A/B Test Variation 1');
  let d2 = new Date();
  console.log(d2.getTime() - d1.getTime())
});

test('Check boxes', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  // Click the Checkboxes link.
  await page.getByRole('link', { name: 'Checkboxes' }).click();
  // Check the checkbox
  const checkboxes = page.getByRole('checkbox');
  await checkboxes.nth(0).check();
  await expect(checkboxes.nth(0)).toBeChecked();
  console.log(checkboxes.nth(0));
  await checkboxes.nth(1).check();
  await expect(checkboxes.nth(1)).toBeChecked();
  console.log(checkboxes.nth(1));

  //Using Xpath
  // const checkbox1 = page.locator('xpath=//input[@type="checkbox"][1]');
  // await checkbox1.check();
  // //Expects page to have a checkbox 1 checked
  // expect(checkbox1).toBeChecked();
  // const checkbox2 = page.locator('xpath=//input[@type="checkbox"][2]');
  // await checkbox2.check();
  // //Expects page to have a checkbox 1 checked
  // expect(checkbox2).toBeChecked();
});






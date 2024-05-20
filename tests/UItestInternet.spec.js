// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async function ({ page }) {

  //Navigation
  await page.goto('https://the-internet.herokuapp.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/The Internet/);
});

test('A/B Testing link', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');

  // Click the get A/B Testing link.
  await page.getByRole('link', { name: 'A/B Testing' }).click();

  // Expects page to have a heading with the name of A/B Test Variation 1.
  await expect(page.getByRole('heading', { name: 'A/B Test', level: 3 })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3 })).toHaveText('A/B Test Variation 1');
  // Expects page to have a text with the name of A/B Test Variation 1.
  // await expect(page.getByText('A/B Test Variation 1',{ exact: true })).toBeVisible();

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

test('Label and Textbox : Authentication', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');

  // Click the Form Authentication link.
  await page.getByRole('link', { name: 'Form Authentication' }).click();

  //
  await page.getByLabel('Username').fill("tomsmith");
  await page.getByLabel('Password').fill("SuperSecretPassword!");

  await page.getByRole('button', { name: 'Login' }).click();

  expect(page.getByRole('heading', { name: 'Secure Area', level: 2 }));

});

test('DropDown', async function ({ page }) {
  await page.goto('https://the-internet.herokuapp.com/');

  // Click the Form Authentication link.
  await page.getByRole('link', { name: 'Dropdown' }).click();

  const dropdownElement = page.locator('#dropdown');

  await dropdownElement.selectOption({ value: "1" });

  await expect(dropdownElement).toHaveValue("1");


});
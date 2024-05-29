const{Before,After,Status,AfterStep} = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const { firefox } = require('playwright');

Before({tags:"@login"},async function () {
    const browser = await firefox.launch();
    this.page = await browser.newPage();
    this.pomanager = new POManager(this.page);
  });

  AfterStep( async function ({result}) {
    if (result.status === Status.FAILED) {
     await this.page.screenshot({path: 'screenshot.png'});}
    });

  After(function () {
    console.log("End")
  });

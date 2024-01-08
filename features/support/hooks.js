const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const playwright = require('@playwright/test');
const { POManager } = require('../../pageObjects/POManager');

Before(async function () {
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
})

After(function(){
    console.log("I am at the last of execution");
})

BeforeStep(function(results){

})

AfterStep(async function(results){
    if(results.status === Status.FAILED)
    {
        await this.page.screenshot({path:'Screenshot1.png'});
    }
});
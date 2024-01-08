const {test,expect, request} = require('@playwright/test')
const {APIUtils} = require('../utils/APIUtils')

let webConext;
test.beforeAll( async({browser})=>
{   
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "amitbaranpatra@gmail.com";
    const userName = page.locator('input#userEmail');
    const password = page.locator('input#userPassword');
    const signIn = page.locator('input#login');
    await page.goto("https://rahulshettyacademy.com/client")
    console.log(await page.title());
    await userName.fill(email);
    await password.fill("Amit@2710");
    await signIn.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webConext = await browser.newContext({storageState:'state.json'});
})

test('@API Login Test',async()=>
{
    const page = await webConext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");


})

test('Check Title',async()=>
{
    const page = await webConext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const title = await page.title();
    console.log(title);

})
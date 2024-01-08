const {test,expect} = require('@playwright/test')


test.describe.configure({mode:'parallel'});
test('Playwright Special Locators test',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    //await page.pause();
    page.on('dialog',dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framePage.locator('div .text h2').textContent();
    console.log(textCheck.split(" ")[1]);

});

test('Screenshot Test',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();
    //await page.locator('#hide-textbox').click();
    //await page.screenshot({path:'screenshot.png'});
    await page.locator("#displayed-text").screenshot({path:'partialScreenShot1.png'});
    //await expect(page.locator('#displayed-text')).toBeHidden();
});

test('Visual comparision',async ({page})=>
{
    await page.goto("https://flightaware.com/");
    expect(await page.screenshot()).toMatchSnapshot('loading.png');
});
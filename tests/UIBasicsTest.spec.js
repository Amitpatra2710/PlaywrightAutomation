const {test,expect} = require('@playwright/test')

test('Browser Context Playwright test',async ({page})=>
{
    //playwright code
    //await
    //const context = await browser.newContext();
    //const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cartTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await page.locator("[id='password']").fill("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    //console.log(await cartTitles.first().textContent());
    //console.log(await cartTitles.nth(1).textContent());
    const allTitles = await cartTitles.allTextContents();
    console.log(allTitles);
    
});


test('Page Playwright test',async ({page})=>
{
   
    await page.goto("https://google.com")
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
    
});

test('UI Controls Playwright test',async ({page})=>
{
    const userName = page.locator('#username');
    const passWord = page.locator("[id='password']");
    const dropDown = page.locator('select.form-control');
    const radioBtn = page.locator('input#usertype');
    const okBtn = page.locator('button#okayBtn');
    const documentLink = page.locator('[href*=documents]');
    const signIn = page.locator("#signInBtn");
    const cartTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await passWord.fill("learning");
    await userName.fill("rahulshettyacademy");
    await dropDown.selectOption("consult");
    await radioBtn.last().click();
    console.log(await radioBtn.last().isChecked());
    await expect(radioBtn.last()).toBeChecked();
    await okBtn.click();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    //await page.pause();
    //await signIn.click();
    //await page.waitForLoadState('networkidle');
    //const allTitles = await cartTitles.allTextContents();
    //console.log(allTitles);
    
});

test('Child window handle',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator('[href*=documents]');
    const[newPage] = await Promise.all([
        context.waitForEvent('page'),//listen to any new page paending,rejected, fulfilled 
        documentLink.click(),
    //const page2 = context.waitForEvent('page');
    ])
     const text = await newPage.locator('.red').textContent();
     const arrayText = text.split('@');
     const domain =  arrayText[1].split(" ")[0]
     console.log(domain);
     await page.locator('#username').fill(domain);
     //await page.pause();
     console.log(await page.locator('#username').textContent());
    
})

test('testGoogle', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await page.getByLabel('Search', { exact: true }).click();
    await page.getByLabel('Search', { exact: true }).fill('rahulshetty');
    await page.getByText('rahulshettyacademy', { exact: true }).click();
    await page.getByRole('link', { name: 'Rahul Shetty Academy:' }).click();
    await page.getByRole('link', { name: 'Courses', exact: true }).click();
  });
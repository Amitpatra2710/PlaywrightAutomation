const {test,expect} = require('@playwright/test')

test('Client App End to End test',async ({page})=>
{
    //playwright code
    //await
    //const context = await browser.newContext();
    //const page = await context.newPage();
    const email = "amitbaranpatra@gmail.com";
    const productName = "ZARA COAT 3";
    const userName = page.locator('input#userEmail');
    const password = page.locator('input#userPassword');
    const signIn = page.locator('input#login');
    const products = page.locator('.card-body');
    const cartList = page.locator('.card-body b');
    await page.goto("https://rahulshettyacademy.com/client")
    console.log(await page.title());
    await userName.fill(email);
    await password.fill("Amit@2710");
    await signIn.click();
    //console.log(await cartList.nth(0).textContent());
    //await page.cartList.waitFor();
    await page.waitForLoadState('networkidle');
    const titles = await cartList.allTextContents();
    console.log(titles);
    const count = await products.count();
    for(let i=0; i<count;++i)
    {
        const prodName  = await products.nth(i).locator('b').textContent()
        console.log(prodName);
        if(prodName === productName)
        {

            //add the product to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    //await page.pause();
    await page.locator("[routerlink*=cart]").click();
    await page.locator("div li").first().waitFor();
    const bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator('button[type=button]').last().click();
    await page.locator("[placeholder*='Select Country']").pressSequentially('Ind');
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    for(let i=0; i<optionsCount; ++i)
    {
        const text = await dropdown.locator('button').nth(i).textContent();
        //console.log(text);
        if(text===" India")
        {
            //console.log(text);
            //click operation
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator('a[class*=btnn]').click();
    //const message = await page.locator('.hero-primary').textContent();
    await expect(page.locator('.hero-primary')).toHaveText('Thankyou for the order.');
    const orderId = await page.locator('label[class*=ng-star-inserted]').textContent();
    //console.log(orderId);
    const orderIdArr = orderId.split(" ");
    //console.log(orderIdArr);
    const acctOrderId = orderIdArr[2];
    await page.locator('button[routerlink*=myorders]').click();
    await page.locator('th[scope=row]').last().waitFor();   
    const allOrdersCount = await page.locator('th[scope=row]').count();
    console.log(allOrdersCount);
    for(let i=0; i<allOrdersCount; ++i)
    {
        const displayedorderId = await page.locator('th[scope=row]').nth(i).textContent();
         if(displayedorderId===acctOrderId)
         {
            await page.locator('tr td button[class*=primary]').nth(i).click();
            break;
         }
    }
    await page.locator('div[class*=col-text]').waitFor();
    expect(page.locator('div[class*=col-text]')).toHaveText(acctOrderId);
    //await page.pause();
});
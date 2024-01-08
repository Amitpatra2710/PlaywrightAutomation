  const {Given,When,Then} = require('@cucumber/cucumber')
  const {POManager} = require('../../pageObjects/POManager')
  const {expect} = require('@playwright/test')
  const playwright = require('@playwright/test')

  Given('a login to ecommerce application with {string} and {string}', {timeout: 100*1000}, async function (email, password) {
    // Write code here that turns the phrase above into concrete actions
    //Login Page
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(email,password);
  });

  When('Add {string} to Cart', {timeout: 100*1000}, async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const dashBoardPage = this.poManager.getDashBoardPage();
    await dashBoardPage.searchProductsAndAddToCart(productName);
    await dashBoardPage.navigateToCart();
  });

  Then('Verify {string} is displayed in the cart', {timeout: 100*1000}, async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
  });

  When('Enter Valid Details and Place the Order',{timeout: 100*1000}, async function () {
    // Write code here that turns the phrase above into concrete actions
    const orderReviewPage = this.poManager.getOrdersReviewPage();
    //await orderReviewPage.searchCountryAndSelect("Ind","India");
    //////////////////////////
    await this.page.locator("[placeholder*='Select Country']").pressSequentially('Ind');

    const dropdown = this.page.locator(".ta-results");
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
    expect(this.page.locator(".user__name [type='text']").first()).toHaveText(data.email);
    await this.page.locator('a[class*=btnn]').click();
    //const message = await page.locator('.hero-primary').textContent();
    //await expect(page.locator('.hero-primary')).toHaveText('Thankyou for the order.');
    //const orderId = await page.locator('label[class*=ng-star-inserted]').textContent();
    this.orderId = await orderReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    //await page.pause();
    await this.page.waitForLoadState('networkidle');
    //await dashboardPage.navigateToOrders();
    //await orderReviewPage.NavigateToOrdersPage();
    //await page.locator("button[routerlink*=dashboard]").click();
    await this.page.getByRole('button', { name: 'ORDERS' }).click();
    await this.page.waitForLoadState('networkidle');
  });

  Then('Verify order is present in order History',{timeout: 100*1000}, async function (string) {
    // Write code here that turns the phrase above into concrete actions
    const ordersHistoryPage = this.poManager.getOrderHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    await ordersHistoryPage.matchOrderID(this.orderId);
  });

  Given('a login to ecommerce2 application with {string} and {string}', async function (email, password) {
    // Write code here that turns the phrase above into concrete actions
    const userName = this.page.locator('#username');
    const signIn = this.page.locator("#signInBtn");
    const passwrd = this.page.locator("[id='password']");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await userName.fill(email);
    await passwrd.fill(password);
    await signIn.click();
  });

  Then('Verify Error message is displayed', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
  });
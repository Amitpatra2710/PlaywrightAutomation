const {test,expect} = require('@playwright/test')
const {customTest} = require('../utils/test-base')
const {POManager} = require('../pageObjects/POManager')
const dataset = JSON.parse(JSON.stringify(require('../utils/placeHolderTestData.json')))

for(const data of dataset){
test(`Client App End to End test for ${data.productName}`,async ({page})=>
{
    //playwright code
    //await
    //const context = await browser.newContext();
    //const page = await context.newPage();
    //const email = "amitbaranpatra@gmail.com";
    //const password = "Amit@2710";
    //const productName = "ZARA COAT 3";
    //const products = page.locator('.card-body');
    //const cartList = page.locator('.card-body b');

    //POManager Object Creation
    const poManager = new POManager(page);
    //Login Page
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(data.email,data.password);
    //console.log(await cartList.nth(0).textContent());
    //await page.cartList.waitFor();
    //DashBoard Page
    const dashBoardPage = poManager.getDashBoardPage();
    await dashBoardPage.searchProductsAndAddToCart(data.productName);
    await dashBoardPage.navigateToCart();
    //CartPage
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();
    //Order Review Page
    const orderReviewPage = poManager.getOrdersReviewPage();
    //await orderReviewPage.searchCountryAndSelect("Ind","India");
    //////////////////////////
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
    expect(page.locator(".user__name [type='text']").first()).toHaveText(data.email);
    await page.locator('a[class*=btnn]').click();
    //const message = await page.locator('.hero-primary').textContent();
    //await expect(page.locator('.hero-primary')).toHaveText('Thankyou for the order.');
    //const orderId = await page.locator('label[class*=ng-star-inserted]').textContent();
    const orderId = await orderReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    //await page.pause();
    await page.waitForLoadState('networkidle');
    //await dashboardPage.navigateToOrders();
    //await orderReviewPage.NavigateToOrdersPage();
    //await page.locator("button[routerlink*=dashboard]").click();
    await page.getByRole('button', { name: 'ORDERS' }).click();
    await page.waitForLoadState('networkidle');
    
    //await page.locator('th[scope=row]').last().waitFor();
    //Order History Page
    const ordersHistoryPage = poManager.getOrderHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    await ordersHistoryPage.matchOrderID(orderId);  
    
    //await page.pause();
})};

customTest(`Client App End to End test with coustom test`,async ({page,testDataForOrder})=>
{
    //POManager Object Creation
    const poManager = new POManager(page);
    //Login Page
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(testDataForOrder.email,testDataForOrder.password);
    //console.log(await cartList.nth(0).textContent());
    //await page.cartList.waitFor();
    //DashBoard Page
    const dashBoardPage = poManager.getDashBoardPage();
    await dashBoardPage.searchProductsAndAddToCart(testDataForOrder.productName);
    await dashBoardPage.navigateToCart();
    //CartPage
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
})
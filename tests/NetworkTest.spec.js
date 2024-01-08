const {test,expect, request} = require('@playwright/test')
const {APIUtils} = require('../utils/APIUtils')

const loginPayload = {userEmail: "amitbaranpatra@gmail.com", userPassword: "Amit@2710"};
const createOrderPayload = {orders: [{country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45"}]};
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;
test.beforeAll( async()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);
})

test('Test Faker with Intercept',async({page})=>
{
    
    page.addInitScript(value =>{
        window.localStorage.setItem('token',value);      
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    //console.log(await cartList.nth(0).textContent());
    //await page.cartList.waitFor();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route=>
    {
        //Intercepting response -> API Response ->{Playwright faker response}-> browser -> render data on front end
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayLoadOrders);
        route.fulfill(
            {
                response,
                body
            });

    });
    await page.locator('button[routerlink*=myorders]').click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());

})
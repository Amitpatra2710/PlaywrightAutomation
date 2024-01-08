const { test, expect, request } = require('@playwright/test')
const { APIUtils } = require('../utils/APIUtils')

const loginPayload = { userEmail: "amitbaranpatra@gmail.com", userPassword: "Amit@2710" };
const createOrderPayload = { orders: [{ country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45" }] };
let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);
})

test('Security test request intercept', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    //console.log(await cartList.nth(0).textContent());
    //await page.cartList.waitFor();
    await page.locator('button[routerlink*=myorders]').click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' })
    );
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator('p').last()).toHaveText("You are not authorize to view this order");
    //console.log(await page.locator(".mt-4").textContent());

})
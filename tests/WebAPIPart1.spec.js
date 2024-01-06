const {test,expect, request} = require('@playwright/test')
const {APIUtils} = require('../utils/APIUtils')

const loginPayload = {userEmail: "amitbaranpatra@gmail.com", userPassword: "Amit@2710"};
const createOrderPayload = {orders: [{country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45"}]};
let response;
test.beforeAll( async()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);
})

test.only('Place the Order',async({page})=>
{
    page.addInitScript(value =>{
        window.localStorage.setItem('token',value);      
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    //console.log(await cartList.nth(0).textContent());
    //await page.cartList.waitFor();
    await page.locator('button[routerlink*=myorders]').click();
    await page.locator('th[scope=row]').last().waitFor();   
    const allOrdersCount = await page.locator('th[scope=row]').count();
    console.log(allOrdersCount);
    for(let i=0; i<allOrdersCount; ++i)
    {
        const displayedorderId = await page.locator('th[scope=row]').nth(i).textContent();
         if(displayedorderId===response.orderId)
         {
            await page.locator('tr td button[class*=primary]').nth(i).click();
            break;
         }
    }
    await page.locator('div[class*=col-text]').waitFor();
    //await page.pause();
    expect(page.locator('div[class*=col-text]')).toHaveText(response.orderId);

})
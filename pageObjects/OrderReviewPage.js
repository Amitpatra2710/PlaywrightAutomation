const { expect } = require("@playwright/test");
class OrderReviewPage {
    constructor(page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submit = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.dashboardButtons = page.locator("button[routerlink*=dashboard]");
        this.orderTable = page.locator('th[scope=row]');

    }

    async searchCountryAndSelect(countryCode, countryName) {

        await this.country.fill(countryCode, { delay: 100 });
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }

    }

    async VerifyEmailId(username) {
        await expect(this.emailId).toHaveText(username);
    }

    async SubmitAndGetOrderId() {
        await this.submit.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        const rawOrderID = await this.orderId.textContent();
        const orderIdArr = rawOrderID.split(" ");
        const orderId = orderIdArr[2];
        return orderId;
    }

    async NavigateToOrdersPage(){
        await dashboardButtons.nth(1).click();
        await orderTable.last().waitFor();
    }
}
module.exports = { OrderReviewPage }
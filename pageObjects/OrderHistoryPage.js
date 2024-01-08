const { expect } = require("@playwright/test");
class OrderHistoryPage {
    constructor(page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderdIdDetails = page.locator(".col-text");
        this.orderHistoryLink = page.locator('button[routerlink*=myorders]');
        this.finalOrderId = page.locator('div[class*=col-text]');
    }

    async searchOrderAndSelect(orderId) {

        //await orderHistoryLink.click();
        //await this.ordersTable.waitFor();
        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (rowOrderId.includes(orderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }

    }

    async matchOrderID(acctOrderId)
    {
        await this.finalOrderId.waitFor();
        expect(this.finalOrderId).toHaveText(acctOrderId);
    }

    async getOrderId() {
        return await this.orderdIdDetails.textContent();
    }
}
module.exports={OrderHistoryPage}
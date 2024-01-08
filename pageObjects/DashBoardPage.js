class DashBoardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
        this.cart = page.locator("[routerlink*=cart]");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async searchProductsAndAddToCart(productName) {
        const titles = await this.productsText.allTextContents();
        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {
            const prodName = await this.products.nth(i).locator('b').textContent()
            console.log(prodName);
            if (prodName === productName) {

                //add the product to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
        await this.page.locator("div li").first().waitFor();
    }

    async navigateToOrders() {
        await this.orders.click();
    }
}
module.exports = { DashBoardPage }
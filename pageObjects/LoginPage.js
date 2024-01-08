class LoginPage {

    constructor(page) {
        this.page = page;
        this.userName = page.locator('input#userEmail');
        this.password = page.locator('input#userPassword');
        this.signIn = page.locator('input#login');
    }

    async goto()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

   async validLogin(email,password) {
        await this.userName.fill(email);
        await this.password.fill(password);
        await this.signIn.click();
        await this.page.waitForLoadState('networkidle');
    }

}
module.exports={LoginPage};
class LoginPage {
    constructor(page) {
        this.page = page;
        this.authlink = page.getByRole('link', { name: 'Form Authentication' });
        this.username = page.getByLabel('Username');
        this.password = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });

    }

    async goTo() {
        await this.page.goto("https://the-internet.herokuapp.com/");
    }

    async validLogin(userName, passWord) {
        
        await this.username.fill(userName);
        await this.password.fill(passWord);
        await this.loginButton.click();
    }

    async goToAuthPage(){
        await this.authlink.click();
    }
}
module.exports = { LoginPage };
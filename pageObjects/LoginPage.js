class LoginPage {
    constructor(page) {
        this.page = page;
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
}
module.exports = { LoginPage };
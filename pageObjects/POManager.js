const { LoginPage } = require('./LoginPage');
const { DropDownPage } = require('./DropDownPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dropdownPage = new DropDownPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }
    getDropDownPage() {
        return this.dropdownPage;
    }
}
module.exports = { POManager };
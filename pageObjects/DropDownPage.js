class DropDownPage{
    constructor(page){
        this.page = page;
        this.dropdownElement = page.locator('#dropdown');
    }

    async selectFirstOption(){
        await this.dropdownElement.selectOption({ value: "1" });
    }
}
module.exports = {DropDownPage};
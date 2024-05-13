import Page from "./page.ts";
import {$} from "@wdio/globals";

class ProductStoreHomePage extends Page {

    public itemCategory (category:string) {
        const elem : string = `//a[text()='${category}']`
        return $(elem);
    }

    public phoneName (phoneName:string) {
        const elem : string = `=${phoneName}`
        return  $(elem);
    }

    public priceOfPhone (phoneName:string) {
        const elem : string = `//a[text()='${phoneName}']/../following-sibling::h5`
        return $(elem);
    }

    public get cartButton () {
        return $('#cartur');
    }

    public get btnLogin () {
        const elem : string = '//a[text()=\'Log in\']'
        return $(elem);
    }

    public get btnHome () {
        const elem : string = '//a[contains(text(),\'Home\')] '
        return $(elem);
    }

    public async selectCategory (category:string) {
        await this.itemCategory(category).click()
    }

    public async getPhonePrice (phoneName:string) {
        return (await this.priceOfPhone(phoneName).getText()).replace("$", "")
    }

    public async selectPhone (phoneName:string) {
        await this.phoneName(phoneName).click()
    }

    public async openCart () {
        await this.cartButton.click()
    }

    public async openLoginPopup () {
        await this.btnLogin.waitForClickable({timeout:30000})
        await this.btnLogin.click()
    }

    public async navigateToHomePage () {
        await this.btnHome.waitForClickable({timeout:40000})
        await this.btnHome.click()
    }
}
export default new ProductStoreHomePage();
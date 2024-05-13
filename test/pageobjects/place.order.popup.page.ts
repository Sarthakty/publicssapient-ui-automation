import Page from "./page.ts";
import {$} from "@wdio/globals";

class PlaceOrderPopupPage extends Page {

    public get nameTextBox () {
        return $('#name');
    }

    public get countryTextBox () {
        return $('#country');
    }

    public get cityTextBox () {
        return $('#city');
    }

    public get creditCardTextBox () {
        return $('#card');
    }

    public get monthTextBox () {
        return $('#month');
    }

    public get yearTextBox () {
        return $('#year');
    }

    public get purchaseButton () {
        const elem : string = '//button[text()=\'Purchase\']'
        return $(elem);
    }

    public async enterName (name:string) {
        await this.nameTextBox.setValue(name)
    }

    public async enterCountry (country:string) {
        await this.countryTextBox.setValue(country)
    }

    public async enterCity (city:string) {
        await this.cityTextBox.setValue(city)
    }

    public async enterCreditCard (creditCard:number) {
        await this.creditCardTextBox.setValue(creditCard)
    }

    public async enterMonth (monthName:number) {
        await this.monthTextBox.setValue(monthName)
    }

    public async enterYear (yearName:number) {
        await this.yearTextBox.setValue(yearName)
    }

    public async purchaseItem () {
        await this.purchaseButton.waitForClickable({timeout:2000});
        await this.purchaseButton.click();
    }

}export default new PlaceOrderPopupPage();
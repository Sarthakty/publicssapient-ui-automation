import Page from "./page.ts";
import {$} from "@wdio/globals";

class ThankYouPurchasePopup extends Page {
    public get thankYouForPurchaseMessageText () {
        const a : string = 'h2*=Thank you'
        return $(a);
    }

    public get greenTickIcon () {
        return $('.sa-placeholder');
    }

    public get getEnteredData () {
        const elem : string = '//p[contains(., \'Id\')][contains(., \'Name\')]'
        return $(elem);
    }

    public async getThankYouForPurchaseMessageText () {
        let message:string[] = (await this.getEnteredData.getText()).split('\\r?\\n|\\r')
        return message[0].replace(/\s/g, "");
    }

    public async isIDNumberDisplayed(){
        let matcher:RegExp=/Id:([0-9]+)/g
        return matcher.test(await this.getThankYouForPurchaseMessageText());
    }

}
export default new ThankYouPurchasePopup();
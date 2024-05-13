import Page from "./page.ts";
import {$, browser} from "@wdio/globals";

class CartDetailsPage extends Page {

    public get placeOrderButton() {
        const elem: string = '//button[text()=\'Place Order\']'
        return $(elem);
    }

    public get totalOrderValue() {
        return $('#totalp');
    }

    public phoneTitle(phoneTitle: string) {
        const elem: string = `//th[text()=\'Title\']/../../../tbody/tr/td[text()='${phoneTitle}']`
        return $(elem);
    }

    public get deleteIcon() {
        const elem: string = '=Delete'
        return $$(elem);
    }

    /**
     * click on place order button
     */
    public async placeOrder() {
        await this.placeOrderButton.waitForClickable()
        await this.placeOrderButton.click()
    }

    /**
     * fetch total order value
     */
    public async getOrderValue() {
        let retryCount=0
        while (!await this.totalOrderValue.isDisplayed()){
            retryCount++
            await browser.pause(1000)
            if(await this.totalOrderValue.isDisplayed() || retryCount==5) break ;
        }
        return await this.totalOrderValue.getText();
    }

    /**
     * remove all added items from cart
     */
    public async removeAllItemsFromCart() {
        let retryCount=0
        while (await this.deleteIcon.length==0){
            retryCount++
            await browser.pause(1000)
            if(await this.deleteIcon.length>0 || retryCount==5) break ;
        }
        if (await this.deleteIcon.length > 0) {
            await this.deleteIcon.forEach(element => {
                element.waitForClickable({timeout: 300000})
                element.click();
            })
            await this.totalOrderValue.waitForDisplayed({reverse:true})
        }
    }
}
export default new CartDetailsPage();
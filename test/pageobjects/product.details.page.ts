import Page from "./page.ts";
import {$} from "@wdio/globals";

class ProductDetailsPage extends Page {
    public get addToCartButton () {
        const elem : string = '=Add to cart'
        return $(elem);
    }

    public async addItemToCart () {
        await this.addToCartButton.click()
        await super.acceptAlert()
    }
}
export default new ProductDetailsPage();
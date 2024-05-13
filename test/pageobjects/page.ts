import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
     * Opens a sub page of the page
     * @param path path of the sub page (e.g. /path/to/page.html)
     */
    public async open() {
        return await browser.url(<string>browser.options.baseUrl)

        // return browser.url("https://www.demoblaze.com/")
    }

    public async acceptAlert () {
        if(await browser.isAlertOpen()){
            console.log(await browser.getAlertText())
            await browser.acceptAlert()
        }
    }
}


import {$} from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPopupPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputUsername () {
        return $('#loginusername');
    }

    public get inputPassword () {
        return $('#loginpassword');
    }

    public get btnLogin () {
        const elem : string = '//button[text()=\'Log in\']'
        return $(elem);
    }

    public get txtWelcomeUser () {
        const elem : string = '//a[text()=\'Welcome standard_user\']'
        return $(elem);
    }

    /**
     * login using username and password
     */
    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
        await super.acceptAlert();
        await this.txtWelcomeUser.waitForDisplayed({timeout:30000})
    }
}

export default new LoginPopupPage();

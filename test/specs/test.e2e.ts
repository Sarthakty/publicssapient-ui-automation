
import LoginPage from '../pageobjects/login.popup.page.ts'
import ProductDetailsPage from "../pageobjects/product.details.page.ts";
import ProductStoreHomePage from "../pageobjects/product.store.home.page.ts";
import CartDetailsPage from "../pageobjects/cart.details.page.ts";
import PlaceOrderPopupPage from "../pageobjects/place.order.popup.page.ts";
import ThankYouPurchasePopupPage from "../pageobjects/thank.you.purchase.popup.page.ts";
import {PRODUCT} from "../constants/ApplicationConstants.ts";
import DATE_UTILITY from "../utilities/date.time.utils.ts";
import LoginPopupPage from "../pageobjects/login.popup.page.ts";

describe('Product purchase: ', () => {

    beforeEach ('should login with valid credentials and remove all items from cart', async () => {
        await LoginPage.open()
        await ProductStoreHomePage.openLoginPopup()
        await LoginPopupPage.login(process.env.USER_NAME,process.env.PASSWORD)
        await ProductStoreHomePage.openCart()
        await CartDetailsPage.removeAllItemsFromCart()
        await ProductStoreHomePage.navigateToHomePage()
    })

    it('select mobile phone, add to cart and successfully place order', async () => {

        await ProductStoreHomePage.selectCategory(PRODUCT.CATEGORY)
        let phonePrice= (await ProductStoreHomePage.getPhonePrice(PRODUCT.PHONE_NAME))
        await ProductStoreHomePage.selectPhone(PRODUCT.PHONE_NAME)
        await ProductDetailsPage.addItemToCart()
        await ProductStoreHomePage.openCart()
        let totalOrderValue= await CartDetailsPage.getOrderValue()
        await expect(totalOrderValue).toEqual(phonePrice)
        await expect(await CartDetailsPage.phoneTitle(PRODUCT.PHONE_NAME)).toBeDisplayed()
        await CartDetailsPage.placeOrder()
        await PlaceOrderPopupPage.enterName(PRODUCT.NAME)
        await PlaceOrderPopupPage.enterCountry(PRODUCT.COUNTRY)
        await PlaceOrderPopupPage.enterCity(PRODUCT.CITY)
        await PlaceOrderPopupPage.enterCreditCard(PRODUCT.CREDIT_CARD)
        await PlaceOrderPopupPage.enterMonth(DATE_UTILITY.getCurrentMonthName())
        await PlaceOrderPopupPage.enterYear(DATE_UTILITY.getCurrentYearName())
        await PlaceOrderPopupPage.purchaseItem()
        await expect(await ThankYouPurchasePopupPage.thankYouForPurchaseMessageText).toHaveText(PRODUCT.THANK_YOU_MESSAGE)
        await expect(await ThankYouPurchasePopupPage.greenTickIcon).toBeDisplayed()
        await expect(await ThankYouPurchasePopupPage.isIDNumberDisplayed()).toBeTruthy()
        await expect(await ThankYouPurchasePopupPage.getThankYouForPurchaseMessageText()).toContain("Amount:"+totalOrderValue+PRODUCT.USD)
        await expect(await ThankYouPurchasePopupPage.getThankYouForPurchaseMessageText()).toContain("Name:"+PRODUCT.NAME)
        await expect(await ThankYouPurchasePopupPage.getThankYouForPurchaseMessageText()).toContain("CardNumber:"+PRODUCT.CREDIT_CARD)
        await expect(await ThankYouPurchasePopupPage.getThankYouForPurchaseMessageText()).toContain("Date:"+DATE_UTILITY.getTodayDate())
    })
})


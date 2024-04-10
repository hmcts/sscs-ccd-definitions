"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdamSignInPage = void 0;
const protractor_1 = require("protractor");
const any_page_1 = require("./any.page");
const form_filler_1 = require("../helpers/form-filler");
const wait_1 = require("../enums/wait");
class IdamSignInPage extends any_page_1.AnyPage {
    formFiller = new form_filler_1.FormFiller();
    username = 'form[name="loginForm"] input#username';
    password = 'form[name="loginForm"] input#password';
    signInButton = 'form[name="loginForm"] *[type=submit]';
    async signIn(emailAddress, password) {
        await this.waitUntilLoaded();
        await this.formFiller.replaceText((0, protractor_1.$)(this.username), emailAddress);
        await this.formFiller.replaceText((0, protractor_1.$)(this.password), password);
        await (0, protractor_1.$)(this.signInButton).click();
    }
    async waitUntilLoaded() {
        await protractor_1.browser.driver.wait(protractor_1.ExpectedConditions.visibilityOf((0, protractor_1.$)(this.signInButton)), wait_1.Wait.max, 'IDAM Sign In page did not load in time');
    }
}
exports.IdamSignInPage = IdamSignInPage;
//# sourceMappingURL=idam-sign-in.page.js.map
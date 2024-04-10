"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationFlow = void 0;
const protractor_1 = require("protractor");
const idam_sign_in_page_1 = require("../pages/idam-sign-in.page");
const config_1 = __importDefault(require("config"));
const nodejs_logging_1 = require("@hmcts/nodejs-logging");
const logger = nodejs_logging_1.Logger.getLogger('authentication.flow');
const ccdWebUrl = config_1.default.get('ccd.webUrl');
class AuthenticationFlow {
    userName;
    password;
    idamSignInPage = new idam_sign_in_page_1.IdamSignInPage();
    async signOut() {
        logger.info(`Signed out of user ${this.userName}`);
        await protractor_1.browser.waitForAngularEnabled(false);
        await protractor_1.browser.driver.manage().deleteAllCookies();
        console.log(`We url to load on the browser is   ########################### ${ccdWebUrl}`);
        await protractor_1.browser.get(`${ccdWebUrl}/`);
        await this.idamSignInPage.waitUntilLoaded();
    }
    async signInAsCaseOfficer() {
        await this.signIn('caseOfficer');
    }
    async signInAsHearingCaseOfficer() {
        await this.signIn('hearingCaseOfficer');
    }
    async signInAsClerk() {
        await this.signIn('clerk');
    }
    async signInAsJudge() {
        await this.signIn('judge');
    }
    async signInAsDWPResponseWriter() {
        await this.signIn('DWPResponseWriter');
    }
    async signIn(user) {
        await this.goToSignInPage();
        this.userName = config_1.default.get(`users.${user}.user`);
        this.password = config_1.default.get(`users.${user}.password`);
        logger.info(`Signing in to user ${this.userName} with password ${this.password}`);
        await this.idamSignInPage.signIn(this.userName, this.password);
        logger.info(`Signed in to user ${this.userName}`);
    }
    async goToSignInPage() {
        await this.signOut();
        await this.idamSignInPage.waitUntilLoaded();
    }
}
exports.AuthenticationFlow = AuthenticationFlow;
//# sourceMappingURL=authentication.flow.js.map
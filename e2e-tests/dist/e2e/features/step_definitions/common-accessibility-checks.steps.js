"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const cucumber_1 = require("@cucumber/cucumber");
const authentication_flow_1 = require("../../flows/authentication.flow");
const authenticationFlow = new authentication_flow_1.AuthenticationFlow();
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
(0, cucumber_1.Given)('I go to the sign in page', async function () {
    await authenticationFlow.goToSignInPage();
    await anyCcdPage.pageHeadingContains('Sign in');
});
(0, cucumber_1.Given)('I go to {string} tab', async function (tab) {
    await anyCcdPage.clickTab(tab);
});
(0, cucumber_1.Then)('the page is accessible', async function () {
    await anyCcdPage.runAccessibility();
});
//# sourceMappingURL=common-accessibility-checks.steps.js.map
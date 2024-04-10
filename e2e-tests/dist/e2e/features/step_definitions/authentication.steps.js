"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_flow_1 = require("../../flows/authentication.flow");
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const cucumber_1 = require("@cucumber/cucumber");
const protractor_1 = require("protractor");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
const authenticationFlow = new authentication_flow_1.AuthenticationFlow();
(0, cucumber_1.Given)('I am signed in as a Case Officer', async function () {
    await authenticationFlow.signInAsCaseOfficer();
    await anyCcdPage.waitUntilLoaded();
});
(0, cucumber_1.Given)('I am signed in as a Hearing Case Officer', async function () {
    await authenticationFlow.signInAsHearingCaseOfficer();
    await anyCcdPage.waitUntilLoaded();
});
(0, cucumber_1.Given)('I am signed in as a DWPResponse Writer', async function () {
    await authenticationFlow.signInAsDWPResponseWriter();
    await anyCcdPage.waitUntilLoaded();
});
(0, cucumber_1.Given)('I am signed in as a Clerk', async function () {
    await authenticationFlow.signInAsClerk();
    await anyCcdPage.waitUntilLoaded();
});
(0, cucumber_1.Given)('I switch to be a DWPResponse Writer', async function () {
    await protractor_1.browser.sleep(100);
    const currentUrl = await protractor_1.browser.driver.getCurrentUrl();
    await authenticationFlow.signInAsDWPResponseWriter();
    await protractor_1.browser.sleep(100);
    await anyCcdPage.waitUntilLoaded();
    await anyCcdPage.get(currentUrl);
});
(0, cucumber_1.Given)('I switch to be a Case Officer', async function () {
    await protractor_1.browser.sleep(100);
    const currentUrl = await protractor_1.browser.driver.getCurrentUrl();
    await authenticationFlow.signInAsCaseOfficer();
    await protractor_1.browser.sleep(100);
    await anyCcdPage.waitUntilLoaded();
    await anyCcdPage.get(currentUrl);
});
(0, cucumber_1.Given)('I switch to be a Judge', async function () {
    await protractor_1.browser.sleep(100);
    const currentUrl = await protractor_1.browser.driver.getCurrentUrl();
    await authenticationFlow.signInAsJudge();
    await protractor_1.browser.sleep(100);
    await anyCcdPage.waitUntilLoaded();
    await anyCcdPage.get(currentUrl);
    await protractor_1.browser.sleep(5000);
});
//# sourceMappingURL=authentication.steps.js.map
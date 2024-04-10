"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const cucumber_1 = require("@cucumber/cucumber");
const chai_1 = require("chai");
const protractor_1 = require("protractor");
const nodejs_logging_1 = require("@hmcts/nodejs-logging");
const wait_1 = require("../../enums/wait");
const logger = nodejs_logging_1.Logger.getLogger('any-ccd-page.steps');
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
(0, cucumber_1.Given)('I wait {string} seconds', async function (number) {
    await protractor_1.browser.sleep(number * 1000);
});
(0, cucumber_1.Then)('I should see {string} as a case field', async function (value) {
    await anyCcdPage.clickTab('Summary');
    const titleVal = await anyCcdPage.getTitleAttribute();
    logger.info(titleVal);
    (0, chai_1.expect)(titleVal).to.contain(value);
});
(0, cucumber_1.Then)('the {string} tab is seen with {string} content', async function (tabName, tabContent) {
    await protractor_1.browser.manage().window().maximize();
    await anyCcdPage.clickTab(tabName);
    (0, chai_1.expect)(await anyCcdPage.contentContains(tabContent)).to.equal(true);
});
(0, cucumber_1.Then)('I should see uploaded file within Unprocessed correspondence tab', async function () {
    await anyCcdPage.reloadPage();
    await anyCcdPage.clickTab('Unprocessed Correspondence');
    await protractor_1.browser.sleep(wait_1.Wait.short);
    await anyCcdPage.verifyTextOnPageUsingXpath('//div/ccd-read-fixed-list-field/span', 'Other');
    await anyCcdPage.verifyTextOnPageUsingXpath('//div/ccd-read-document-field/a', 'issue1.pdf');
});
//# sourceMappingURL=any-ccd-page.steps.js.map
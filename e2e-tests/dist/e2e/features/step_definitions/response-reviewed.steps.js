"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const cucumber_1 = require("@cucumber/cucumber");
const chai_1 = require("chai");
const response_reviewed_page_1 = require("../../pages/response-reviewed.page");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
const responseReviewedPage = new response_reviewed_page_1.ResponseReviewedPage();
(0, cucumber_1.When)('I choose Requires Interlocutory Review No {string}', async function (action) {
    await anyCcdPage.scrollBar('//input[@id="isInterlocRequired_No"]');
    await anyCcdPage.clickSubmit();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains(action)).to.equal(true);
    await anyCcdPage.waitForTabsToLoad();
});
(0, cucumber_1.When)('I submit {string}', async function (action) {
    // await anyCcdPage.clickContinue();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains(action)).to.equal(true);
    await anyCcdPage.clickSubmit();
    await anyCcdPage.waitForTabsToLoad();
});
(0, cucumber_1.When)('I review the UC received Response', async function () {
    await responseReviewedPage.reviewUCResponse();
});
//# sourceMappingURL=response-reviewed.steps.js.map
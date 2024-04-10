"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const cucumber_1 = require("@cucumber/cucumber");
const chai_1 = require("chai");
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const wait_1 = require("../../enums/wait");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
(0, cucumber_1.When)('I choose to filter with benefit and issue code in workbasket filter', async function () {
    await protractor_1.browser.sleep(wait_1.Wait.long);
    await anyCcdPage.chooseOptionByText('wb-case-type', ' AAT');
    await anyCcdPage.chooseOptionContainingText('benefitCode', '002');
    await anyCcdPage.chooseOptionContainingText('issueCode', 'DD');
    await anyCcdPage.clickButton('Apply');
    await anyCcdPage.waitForSpinner();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Appeal Created')).to.equal(true);
});
(0, cucumber_1.Then)('I should see {int} cases returned in search results', async function (caseId) {
    const tot = await protractor_1.element
        .all(protractor_1.by.css('ccd-search-result:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr'))
        .count();
    (0, chai_1.expect)(tot).to.equal(caseId);
});
//# sourceMappingURL=search-filter.steps.js.map
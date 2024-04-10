"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const chai_1 = require("chai");
const protractor_1 = require("protractor");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
(0, cucumber_1.When)('I allow the appeal to proceed', async function () {
    await anyCcdPage.chooseOptionContainingText('prePostHearing', 'Pre Hearing');
    await anyCcdPage.chooseOptionContainingText('directionTypeDl', 'Appeal to Proceed');
    await anyCcdPage.clickElementById('confidentialityType-general');
    await anyCcdPage.scrollPage('//*[@id="generateNotice_Yes"]');
    await anyCcdPage.fillValues('bodyContent', 'This is a test body content');
    await anyCcdPage.fillValues('signedBy', 'This is a test signed content');
    await anyCcdPage.fillValues('signedRole', 'This is a test signed role content');
    await anyCcdPage.clickSubmit();
    await anyCcdPage.waitForElement(protractor_1.by.xpath('//span[contains(text(),"Preview Document")]'));
    await anyCcdPage.clickSubmit();
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.Then)('I should see Addition details in documents tab', async function () {
    await anyCcdPage.clickTab('Documents');
    (0, chai_1.expect)(await anyCcdPage.contentContains('Directions Notice')).to.equal(true);
    (0, chai_1.expect)(await anyCcdPage.contentContains('Addition A - Directions Notice issued on')).to.equal(true);
    (0, chai_1.expect)(await anyCcdPage.contentContains('A')).to.equal(true);
});
(0, cucumber_1.Then)('I should see {string} in documents tab', async function (notice) {
    await anyCcdPage.clickTab('Documents');
    (0, chai_1.expect)(await anyCcdPage.contentContains(notice)).to.equal(true);
});
//# sourceMappingURL=issue-directions-notice.steps.js.map
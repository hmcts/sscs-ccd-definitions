"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateListingRequirementsPage = void 0;
const protractor_1 = require("protractor");
const any_page_1 = require("./any.page");
const chai_1 = require("chai");
const any_ccd_page_1 = require("./any-ccd.page");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
class UpdateListingRequirementsPage extends any_page_1.AnyPage {
    async updateHearingChannel(video) {
        await protractor_1.browser.sleep(1500);
        (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Update Listing Requirements')).to.equal(true);
        await protractor_1.browser.sleep(1500);
        await anyCcdPage.chooseOptionContainingText('overrideFields_appellantHearingChannel', video);
        await protractor_1.browser.sleep(1500);
        await anyCcdPage.clickContinue();
    }
    async updatePOOfficerAttending(yes) {
        await protractor_1.browser.sleep(1500);
        await anyCcdPage.clickElementById(`overrideFields_poToAttend_${yes}`);
        await protractor_1.browser.sleep(1500);
        await anyCcdPage.clickContinue();
    }
    async amendReasonForUpdate() {
        (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Amend Reason')).to.equal(true);
        await protractor_1.browser.sleep(1500);
        await anyCcdPage.clickElementById('amendReasons-judgereq');
        await protractor_1.browser.sleep(1500);
        await anyCcdPage.clickSubmit();
        await protractor_1.browser.sleep(1500);
        await anyCcdPage.clickSubmit();
    }
}
exports.UpdateListingRequirementsPage = UpdateListingRequirementsPage;
//# sourceMappingURL=update-listing-requirements.page.js.map
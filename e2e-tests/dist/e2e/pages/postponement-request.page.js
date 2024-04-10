"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostponementRequestPage = void 0;
const protractor_1 = require("protractor");
const chai_1 = require("chai");
const any_page_1 = require("./any.page");
const any_ccd_page_1 = require("./any-ccd.page");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
class PostponementRequestPage extends any_page_1.AnyPage {
    async enterPostponementRequestDetails() {
        await (0, protractor_1.element)(protractor_1.by.id('postponementRequestDetails')).sendKeys('We would like to delay the hearing, since the Judge cannot attend this day.');
        await anyCcdPage.clickContinue();
        await anyCcdPage.clickContinue();
        await anyCcdPage.clickSubmit();
    }
    async actionPostponementRequest(action) {
        await anyCcdPage.chooseOptionContainingText('actionPostponementRequestSelected', action);
        if (action === 'Send to Judge') {
            await (0, protractor_1.element)(protractor_1.by.id('postponementRequestDetails')).sendKeys('We would like to delay the hearing, since the Judge cannot attend this day.');
        }
        else {
            await (0, protractor_1.element)(protractor_1.by.id('bodyContent')).sendKeys('We would like to delay the hearing, since the Judge cannot attend this day.');
            await (0, protractor_1.element)(protractor_1.by.id('reservedToJudge')).sendKeys('Reserve to judge');
            await (0, protractor_1.element)(protractor_1.by.id('signedBy')).sendKeys('Mr Penworthy');
            await (0, protractor_1.element)(protractor_1.by.id('signedRole')).sendKeys('CTSC');
            if (action === 'Grant Postponement') {
                await anyCcdPage.chooseOptionContainingText('listingOption', 'Ready to List');
            }
            await anyCcdPage.clickContinue();
            await anyCcdPage.waitForElement(protractor_1.by.xpath('//span[contains(text(),"Preview Document")]'));
        }
        await anyCcdPage.clickContinue();
        await anyCcdPage.clickSubmit();
    }
    async verifyInterlocStatus(action) {
        if (action === 'Send to Judge') {
            await anyCcdPage.clickTab('History');
            (0, chai_1.expect)(await anyCcdPage.contentContains('Review by Judge')).to.equal(true);
        }
    }
}
exports.PostponementRequestPage = PostponementRequestPage;
//# sourceMappingURL=postponement-request.page.js.map
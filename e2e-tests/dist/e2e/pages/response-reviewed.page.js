"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseReviewedPage = void 0;
const any_page_1 = require("./any.page");
const any_ccd_page_1 = require("./any-ccd.page");
const chai_1 = require("chai");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
class ResponseReviewedPage extends any_page_1.AnyPage {
    async reviewUCResponse() {
        // HMCTS review response page
        await this.isInterlocRequired('No');
        await anyCcdPage.clickContinue();
        // Elements disputed page
        (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Elements disputed')).to.equal(true);
        await anyCcdPage.clickContinue();
        // Issue codes page
        (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Issue codes')).to.equal(true);
        await anyCcdPage.clickContinue();
        // Reference appeal  page
        (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Linked appeal reference')).to.equal(true);
        await anyCcdPage.clickSubmit();
    }
    async isInterlocRequired(yesOrNo) {
        await anyCcdPage.clickElementById(`isInterlocRequired_${yesOrNo}`);
    }
}
exports.ResponseReviewedPage = ResponseReviewedPage;
//# sourceMappingURL=response-reviewed.page.js.map
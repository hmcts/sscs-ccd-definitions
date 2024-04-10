"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const cucumber_1 = require("@cucumber/cucumber");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
(0, cucumber_1.When)('I choose Requires Interlocutory Review Yes {string}', async function (action) {
    await anyCcdPage.clickElementById('isInterlocRequired_Yes');
    await anyCcdPage.chooseOptionContainingText('dwpOriginatingOffice', 'DWP PIP (1)');
    await anyCcdPage.chooseOptionContainingText('dwpPresentingOffice', 'DWP PIP (1)');
    await anyCcdPage.chooseOptionContainingText('selectWhoReviewsCase', 'Review by Judge');
    await anyCcdPage.chooseOptionContainingText('interlocReferralReason', 'Complex Case');
    await anyCcdPage.fillNote();
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.When)('I set FTA State to No action {string}', async function (action) {
    await anyCcdPage.chooseOptionContainingText('dwpState', 'No action');
    await anyCcdPage.clickSubmit();
});
//# sourceMappingURL=interloc-review.steps.js.map
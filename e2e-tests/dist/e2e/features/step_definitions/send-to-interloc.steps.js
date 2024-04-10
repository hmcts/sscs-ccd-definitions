"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
(0, cucumber_1.When)('I submit the interloc reason', async function () {
    await anyCcdPage.chooseOptionContainingText('interlocReferralReason', 'Other');
    await anyCcdPage.clickContinue();
    await anyCcdPage.fillNote();
    await anyCcdPage.clickSubmit();
    await anyCcdPage.clickSubmit();
});
//# sourceMappingURL=send-to-interloc.steps.js.map
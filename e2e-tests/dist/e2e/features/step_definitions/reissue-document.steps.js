"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const chai_1 = require("chai");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
(0, cucumber_1.When)('resend only to appellant and not to representative', async function () {
    await anyCcdPage.clickElementById('resendToAppellant_Yes');
    await anyCcdPage.clickElementById('resendToRepresentative_No');
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.Then)('the reissue document event should be seen in “History” tab', async function () {
    const events = await anyCcdPage.getHistoryEvents();
    (0, chai_1.expect)(events).to.include('Reissue document');
});
//# sourceMappingURL=reissue-document.steps.js.map
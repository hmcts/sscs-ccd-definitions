"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const chai_1 = require("chai");
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
(0, cucumber_1.Then)('the case appointee details should be listed in {string} tab', async function (tabName) {
    await anyCcdPage.clickTab(tabName);
    (0, chai_1.expect)(await anyCcdPage.contentContains('AppointeeFirstName')).to.equal(true);
    (0, chai_1.expect)(await anyCcdPage.contentContains('AppointeeLastName')).to.equal(true);
    (0, chai_1.expect)(await anyCcdPage.contentContains('KL335252C')).to.equal(true);
});
//# sourceMappingURL=provide-appointee-details.steps.js.map
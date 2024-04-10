"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const cucumber_1 = require("@cucumber/cucumber");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
(0, cucumber_1.When)('I click submit withdrawal {string}', async function (action) {
    await anyCcdPage.clickSubmit();
});
//# sourceMappingURL=withdrawal.steps.js.map
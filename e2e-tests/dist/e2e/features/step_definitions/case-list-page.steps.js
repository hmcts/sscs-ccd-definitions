"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const cucumber_1 = require("@cucumber/cucumber");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
(0, cucumber_1.When)('I go to the Case List', { timeout: 30 * 1000 }, async function () {
    await anyCcdPage.get('/list/case');
});
//# sourceMappingURL=case-list-page.steps.js.map
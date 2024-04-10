"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const cucumber_1 = require("@cucumber/cucumber");
const chai_1 = require("chai");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
(0, cucumber_1.Then)('{string} tab should contain {string} value for case management {string} field', async function (tabName, fieldValue, fieldName) {
    await anyCcdPage.clickTab(tabName);
    await anyCcdPage.getFieldValue(fieldName).then(function (actText) {
        chai_1.assert.equal(actText, fieldValue);
    });
});
//# sourceMappingURL=case-access-management.steps.js.map
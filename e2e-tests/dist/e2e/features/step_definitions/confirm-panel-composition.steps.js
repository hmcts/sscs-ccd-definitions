"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const any_ccd_form_page_1 = require("../../pages/any-ccd-form.page");
const cucumber_1 = require("@cucumber/cucumber");
const chai_1 = require("chai");
const case_details_page_1 = require("../../pages/case-details.page");
const anyCcdFormPage = new any_ccd_form_page_1.AnyCcdFormPage();
const caseDetailsPage = new case_details_page_1.CaseDetailsPage();
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
(0, cucumber_1.When)('I select {string} to include a financial panel member for hearing', async function (action) {
    await anyCcdFormPage.clickElementById(`isFqpmRequired_${action}`);
    await anyCcdFormPage.clickSubmit();
    (0, chai_1.expect)(await anyCcdFormPage.pageHeadingContains('Confirm panel composition')).to.equal(true);
    await anyCcdFormPage.scrollBar("//button[@type='submit']");
});
(0, cucumber_1.Then)('{string} tab should contain {string} value for {string} field', async function (tabName, fieldValue, fieldName) {
    await anyCcdFormPage.clickTab(tabName);
    await delay(10000);
    await caseDetailsPage.getFieldValue(fieldName).then(function (actText) {
        chai_1.assert.equal(actText, fieldValue);
    });
});
//# sourceMappingURL=confirm-panel-composition.steps.js.map
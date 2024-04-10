"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const any_ccd_form_page_1 = require("../../pages/any-ccd-form.page");
const chai_1 = require("chai");
const anyCcdPage = new any_ccd_form_page_1.AnyCcdFormPage();
(0, cucumber_1.When)('I select {string} and {string} Elements', async function (string, string2) {
    await anyCcdPage.clickElementById('elementsDisputedList-housing');
    await anyCcdPage.clickElementById('elementsDisputedList-childcare');
    await anyCcdPage.clickContinue();
});
(0, cucumber_1.When)('I add issue codes for respective elements', async function () {
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Issue codes')).to.equal(true);
    await anyCcdPage.addNewCollectionItem('Housing');
    await anyCcdPage.selectHousingIssueCode();
    await anyCcdPage.addNewCollectionItem('Childcare');
    await anyCcdPage.selectChildcareIssueCode();
    await anyCcdPage.clickContinue();
});
(0, cucumber_1.Then)('the Amend elements event should be seen in "History" tab', async function () {
    const events = await anyCcdPage.getHistoryEvents();
    (0, chai_1.expect)(events).to.include('Amend elements/issues');
});
(0, cucumber_1.Then)('I should see the choose elements and issue code within "Elements and issues" tab', async function () {
    await anyCcdPage.clickTab('Elements and issues');
    (0, chai_1.expect)(await anyCcdPage.contentContains('Housing')).to.equal(true);
    (0, chai_1.expect)(await anyCcdPage.contentContains('Childcare')).to.equal(true);
});
//# sourceMappingURL=amend-elements-issues.steps.js.map
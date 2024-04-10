"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const protractor_1 = require("protractor");
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const chai_1 = require("chai");
const wait_1 = require("../../enums/wait");
const case_details_page_1 = require("../../pages/case-details.page");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
const caseDetailsPage = new case_details_page_1.CaseDetailsPage();
(0, cucumber_1.When)('generate a letter in {string} with {string} option', async function (letterFormat, adjustmentOption) {
    await anyCcdPage.chooseOptionContainingText('reasonableAdjustmentChoice', letterFormat);
    if (adjustmentOption === 'Yes') {
        await anyCcdPage.clickElementById(`reasonableAdjustments_appellant_wantsReasonableAdjustment_${adjustmentOption}`);
        await anyCcdPage.fillValues('reasonableAdjustments_appellant_reasonableAdjustmentRequirements', 'A2');
        await anyCcdPage.clickElementById('reasonableAdjustments_representative_wantsReasonableAdjustment_No');
    }
    else if (adjustmentOption === 'No') {
        await anyCcdPage.clickElementById(`reasonableAdjustments_appellant_wantsReasonableAdjustment_${adjustmentOption}`);
        await anyCcdPage.clickElementById('reasonableAdjustments_representative_wantsReasonableAdjustment_No');
    }
    else if (adjustmentOption === 'otherPartyYes') {
        await anyCcdPage.clickElementById(`reasonableAdjustments_appellant_wantsReasonableAdjustment_No`);
        await anyCcdPage.clickElementById('reasonableAdjustments_representative_wantsReasonableAdjustment_No');
        await anyCcdPage.clickElementById(`otherParties_0_reasonableAdjustment_wantsReasonableAdjustment_Yes`);
        await anyCcdPage.fillValues('otherParties_0_reasonableAdjustment_reasonableAdjustmentRequirements', 'A2');
    }
    else if (adjustmentOption === 'otherPartyNo') {
        await anyCcdPage.clickElementById(`otherParties_0_reasonableAdjustment_wantsReasonableAdjustment_No`);
        await anyCcdPage.clickElementById('reasonableAdjustments_representative_wantsReasonableAdjustment_No');
        await anyCcdPage.clickElementById(`reasonableAdjustments_appellant_wantsReasonableAdjustment_No`);
        await anyCcdPage.clickElementById(`otherParties_0_reasonableAdjustment_wantsReasonableAdjustment_No`);
    }
    else {
        throw new Error('No adjustment option passed in test');
    }
    await anyCcdPage.clickSubmit();
    const errors = await anyCcdPage.numberOfCcdErrorMessages();
    (0, chai_1.expect)(errors).to.equal(0);
    await protractor_1.browser.sleep(wait_1.Wait.extended);
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.Then)('reasonable adjustment details are seen on the {string} tab', async function (tab) {
    await anyCcdPage.clickTab(tab);
    const reasonableAdjustment = await anyCcdPage.getFieldValue('Wants Reasonable Adjustment');
    (0, chai_1.expect)(reasonableAdjustment).to.equal('Yes');
    const formatRequirements = await anyCcdPage.getFieldValue('Alternative Format Requirements');
    (0, chai_1.expect)(formatRequirements).to.equal('A2');
});
(0, cucumber_1.Then)('reasonable adjustment details are not seen on the {string} tab', async function (tab) {
    await anyCcdPage.clickTab(tab);
    const reasonableAdjustment = await anyCcdPage.getFieldValues('Wants Reasonable Adjustment');
    (0, chai_1.expect)(reasonableAdjustment).to.not.include('Yes');
    const formatRequirements = await anyCcdPage.getFieldValues('Alternative Format Requirements');
    (0, chai_1.expect)(formatRequirements).to.not.include('A2');
});
(0, cucumber_1.Then)('Reasonable adjustment tab is seen with {string} as {string}', async function (field, value) {
    await anyCcdPage.reloadPage();
    await protractor_1.browser.manage().window().maximize();
    await anyCcdPage.clickTab('Reasonable Adjustments Letters');
    await caseDetailsPage.getFieldValue(field).then(function (actText) {
        chai_1.assert.equal(value, actText);
    });
});
(0, cucumber_1.When)('I update adjustment status to be {string}', async function (adjustmentStatusOption) {
    await anyCcdPage.chooseOptionContainingText('reasonableAdjustmentsLetters_appellant_0_reasonableAdjustmentStatus', adjustmentStatusOption);
    await anyCcdPage.scrollBar('//div/form/div/button[2]');
    await anyCcdPage.clickSubmit();
    await anyCcdPage.clickSubmit();
});
//# sourceMappingURL=reasonable-adjustments.steps.js.map
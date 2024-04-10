"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const any_ccd_form_page_1 = require("../../pages/any-ccd-form.page");
const case_details_page_1 = require("../../pages/case-details.page");
const cucumber_1 = require("@cucumber/cucumber");
const chai_1 = require("chai");
const dwpresponse_page_1 = require("../../pages/dwpresponse.page");
const config_1 = __importDefault(require("config"));
const nodejs_logging_1 = require("@hmcts/nodejs-logging");
const moment_1 = __importDefault(require("moment"));
const protractor_1 = require("protractor");
const anyCcdPage = new any_ccd_form_page_1.AnyCcdFormPage();
const caseDetailsPage = new case_details_page_1.CaseDetailsPage();
const dwpresponse = new dwpresponse_page_1.DwpResponsePage();
const logger = nodejs_logging_1.Logger.getLogger('dwp-upload-response.steps');
const formattedDate = (0, moment_1.default)().format('DD-MM-YYYY');
(0, cucumber_1.When)('I choose {string}', async function (action) {
    if (action === 'Write adjournment notice' ||
        action === 'Not listable' ||
        action === 'Update not listable' ||
        action === 'Upload hearing recording') {
        await anyCcdPage.reloadPage();
    }
    await caseDetailsPage.doNextStep(action);
    if (config_1.default.get('tests.crossBrowser')) {
        await anyCcdPage.clickNextStep();
    }
    else {
        await anyCcdPage.clickNextStep();
        (0, chai_1.expect)(await anyCcdPage.pageHeadingContains(action)).to.equal(true);
    }
});
(0, cucumber_1.When)('I upload contains further information {string} for {string}', async function (action, benefitType) {
    const dwpState = 'YES';
    await dwpresponse.uploadResponse(action, dwpState, benefitType);
    await anyCcdPage.scrollBar('//div/form/div/button[2]');
    if (benefitType === 'UC') {
        await anyCcdPage.clickElementById('elementsDisputedList-general');
        await anyCcdPage.clickContinue();
        (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Issue codes')).to.equal(true);
        await anyCcdPage.addNewCollectionItem('General');
        await anyCcdPage.selectGeneralIssueCode();
        await anyCcdPage.clickContinue();
        await anyCcdPage.clickElementById('elementsDisputedIsDecisionDisputedByOthers_No');
        await anyCcdPage.clickContinue();
        await anyCcdPage.clickElementById('jointParty_No');
        await anyCcdPage.clickContinue();
    }
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.When)('I perform upload contains further information {string} on a esa case', async function (action) {
    await dwpresponse.esaUploadResponse(action);
    await anyCcdPage.scrollBar('//div/form/div/button[2]');
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.When)('I upload only evidence and original documents', async function () {
    const dwpState = 'YES';
    const benefitType = 'PIP';
    await dwpresponse.uploadOnlyResponseAndEvidence('No', dwpState, benefitType);
    // await anyCcdPage.selectIssueCode();
    await protractor_1.browser.sleep(2000);
    await anyCcdPage.scrollBar('//div/form/div/button[2]');
});
(0, cucumber_1.When)('I upload with default issue code', async function () {
    const dwpState = 'YES';
    await dwpresponse.uploadResponse('No', dwpState, 'PIP');
    await anyCcdPage.scrollBar('//div/form/div/button[2]');
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.Then)('I should see {string} error message', async function (errMsg) {
    const errorMessages = await anyCcdPage.getCcdErrorMessages();
    logger.info(errorMessages.join('\n'));
    (0, chai_1.expect)(errorMessages.join('\n')).to.contain(errMsg);
});
(0, cucumber_1.When)('I respond to the appeal with upload contains further information {string} option', async function (action) {
    await dwpresponse.uploadResponseForChildSupport(action);
    await dwpresponse.addOtherParties();
});
(0, cucumber_1.When)('I respond to the dla appeal with upload contains further information {string} option and {string} issue code', async function (action, issueCode) {
    await dwpresponse.uploadResponseForDla(action, issueCode);
});
(0, cucumber_1.When)('I respond to the taxCredit appeal with upload contains further information {string} option and {string} issue code', async function (action, issueCode) {
    await dwpresponse.uploadResponseForTaxCredit(action, issueCode);
});
(0, cucumber_1.When)('I respond to the appeal with upload contains further information {string} option and {string} issue code', async function (action, issueCode) {
    await dwpresponse.uploadResponseForTaxCredit(action, issueCode);
});
(0, cucumber_1.When)('dwp responds requesting {string} for the uploads contains further info option', async function (action, issueCode) {
    await dwpresponse.uploadResponseForTaxCredit(action, issueCode);
});
(0, cucumber_1.When)('I upload {word} further information with disputed {word} disputed by others {word} and further info {word}', async function (benefitType, disputed, disputedByOthersYesOrNo, dwpFurtherInfoYesOrNo) {
    await dwpresponse.uploadResponseWithJointParty(benefitType, disputed, disputedByOthersYesOrNo, dwpFurtherInfoYesOrNo);
});
(0, cucumber_1.Then)('the case should be in {string} appeal status', async function (state) {
    (0, chai_1.expect)(await anyCcdPage.contentContains(state)).to.equal(true);
});
(0, cucumber_1.Then)('the case should end in {string} state', async function (state) {
    await anyCcdPage.waitForEndState(state);
});
(0, cucumber_1.Then)('FTA documents should be seen against the case', async function () {
    await anyCcdPage.clickTab('FTA Documents');
    const documentTypes = await anyCcdPage.getFieldValues('Document type');
    (0, chai_1.expect)(documentTypes).to.include('FTA evidence bundle');
    (0, chai_1.expect)(documentTypes).to.include('FTA response');
    (0, chai_1.expect)(documentTypes).to.include('AT38');
    const originalDocumentUrls = await anyCcdPage.getFieldValues('Original document Url');
    (0, chai_1.expect)(originalDocumentUrls).to.include(`FTA evidence received on ${formattedDate}.pdf`);
    (0, chai_1.expect)(originalDocumentUrls).to.include(`AT38 received on ${formattedDate}.pdf`);
});
(0, cucumber_1.Then)('FTA edited documents should be seen against the case', async function () {
    await anyCcdPage.clickTab('FTA Documents');
    const documentTypes = await anyCcdPage.getFieldValues('Document type');
    (0, chai_1.expect)(documentTypes).to.include('FTA evidence bundle');
    (0, chai_1.expect)(documentTypes).to.include('FTA response');
    const originalDocumentUrls = await anyCcdPage.getFieldValues('Original document Url');
    (0, chai_1.expect)(originalDocumentUrls).to.include(`FTA evidence received on ${formattedDate}.pdf`);
});
//# sourceMappingURL=dwp-upload-response.steps.js.map
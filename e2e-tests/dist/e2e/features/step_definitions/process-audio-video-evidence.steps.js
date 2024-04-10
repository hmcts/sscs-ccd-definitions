"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const protractor_1 = require("protractor");
const chai_1 = require("chai");
const wait_1 = require("../../enums/wait");
const case_details_page_1 = require("../../pages/case-details.page");
const any_ccd_form_page_1 = require("../../pages/any-ccd-form.page");
const dwpresponse_page_1 = require("../../pages/dwpresponse.page");
const caseDetailsPage = new case_details_page_1.CaseDetailsPage();
const anyCcdPage = new any_ccd_form_page_1.AnyCcdFormPage();
const dwpresponse = new dwpresponse_page_1.DwpResponsePage();
(0, cucumber_1.When)('I upload AV evidence and complete Upload response event for {string} case', async function (benefitType) {
    const dwpState = 'YES';
    await dwpresponse.uploadResponseWithAV(dwpState, benefitType);
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickSubmit();
    await protractor_1.browser.sleep(wait_1.Wait.long);
});
(0, cucumber_1.Then)('I should see the AV evidence after clicking the AV tab', async function () {
    await anyCcdPage.clickTab('Audio/Video evidence');
    const fieldValue = await caseDetailsPage.getFieldValue('Audio/video document url');
    (0, chai_1.expect)(fieldValue).to.equal('test_av.mp3');
});
(0, cucumber_1.Then)('I should see the RIP1 document', async function () {
    const fieldValue = await caseDetailsPage.getFieldValue('RIP 1 document');
    (0, chai_1.expect)(fieldValue).to.equal('rip1.pdf');
});
(0, cucumber_1.Then)('I should see that the AV evidence was uploaded by {string}', async function (party) {
    const fieldValue = await caseDetailsPage.getFieldValue('Audio/video party uploaded');
    (0, chai_1.expect)(fieldValue).to.equal(party);
});
(0, cucumber_1.When)('I process the AV evidence using the {string} action', async function (action) {
    await anyCcdPage.clickContinue();
    (0, chai_1.expect)(await anyCcdPage.contentContains('Selected Audio/Video Evidence Details')).to.equal(true);
    await anyCcdPage.chooseOptionContainingText('processAudioVideoAction', action);
    await (0, protractor_1.element)(protractor_1.by.id('directionNoticeContent')).sendKeys('Body test content');
    await (0, protractor_1.element)(protractor_1.by.id('signedBy')).sendKeys('Signed by test content');
    await (0, protractor_1.element)(protractor_1.by.id('signedRole')).sendKeys('Signed role test content');
    await anyCcdPage.clickContinue();
    (0, chai_1.expect)(await anyCcdPage.contentContains('Preview Document')).to.equal(true);
    await anyCcdPage.clickSubmit();
    (0, chai_1.expect)(await anyCcdPage.contentContains('Event summary (optional)')).to.equal(true);
    await protractor_1.browser.sleep(wait_1.Wait.long);
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.Then)('I {string} see the AV evidence in the FTA Documents tab', async function (assertion) {
    await anyCcdPage.clickTab('FTA Documents');
    const avVisibility = assertion === 'should';
    const documentTypeDisplayed = await caseDetailsPage.getFieldValues('Document type');
    if (avVisibility) {
        (0, chai_1.expect)(documentTypeDisplayed).to.contain('Audio document');
    }
    else {
        (0, chai_1.expect)(documentTypeDisplayed).to.not.contain('Audio document');
    }
    const audioVideoDocumentDisplayed = await caseDetailsPage.getFieldValues('Audio/video document');
    if (avVisibility) {
        (0, chai_1.expect)(audioVideoDocumentDisplayed).to.contain('test_av.mp3');
    }
    else {
        (0, chai_1.expect)(audioVideoDocumentDisplayed).to.not.contain('test_av.mp3');
    }
});
(0, cucumber_1.Then)('the bundle should include the AV evidence', async function () {
    await anyCcdPage.clickTab('Bundles');
    const folderNames = await caseDetailsPage.getFieldValues('Folder Name');
    (0, chai_1.expect)(folderNames).to.contain('Further additions');
    (0, chai_1.expect)(await anyCcdPage.contentContains('Audio/video evidence document')).to.equal(true);
    (0, chai_1.expect)(await anyCcdPage.contentContains('Addition B - DWP - RIP 1 document for A/V file: test_av.mp3')).to.equal(true);
});
(0, cucumber_1.Given)('I submit {string} as {string} in the Upload document FE event', async function (filename, type) {
    await anyCcdPage.clickAddNew();
    await anyCcdPage.chooseOptionContainingText('draftSscsFurtherEvidenceDocument_0_documentType', type);
    await anyCcdPage.uploadFile('draftSscsFurtherEvidenceDocument_0_documentLink', filename);
    await protractor_1.browser.sleep(wait_1.Wait.long);
    await anyCcdPage.clickSubmit();
    (0, chai_1.expect)(await anyCcdPage.contentContains('Event summary (optional)')).to.equal(true);
    await anyCcdPage.clickSubmit();
});
//# sourceMappingURL=process-audio-video-evidence.steps.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const any_ccd_form_page_1 = require("../../pages/any-ccd-form.page");
const cucumber_1 = require("@cucumber/cucumber");
const protractor_1 = require("protractor");
const chai_1 = require("chai");
const wait_1 = require("../../enums/wait");
const anyCcdPage = new any_ccd_form_page_1.AnyCcdFormPage();
(0, cucumber_1.Given)('I {string} confidentiality request', async function (verdict) {
    await anyCcdPage.clickElementById(`confidentialityRequestAppellantGrantedOrRefused-${verdict}ConfidentialityRequest`);
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickSubmit();
    await anyCcdPage.reloadPage();
});
(0, cucumber_1.Given)('I upload supplementary response', async function () {
    await anyCcdPage.uploadFile('dwpSupplementaryResponseDoc_documentLink', 'issue1.pdf');
    await anyCcdPage.clickContinue();
    await protractor_1.browser.sleep(wait_1.Wait.extended);
    await anyCcdPage.clickSubmit();
    await protractor_1.browser.manage().window().maximize();
});
(0, cucumber_1.Then)('I should see supplementary response in the Unprocessed Correspondence tab', async function () {
    await anyCcdPage.clickTab('Unprocessed Correspondence');
    const fieldValue = await anyCcdPage.getFieldValue('Original document URL');
    (0, chai_1.expect)(fieldValue).to.equal('issue1.pdf');
});
(0, cucumber_1.Given)('I upload a document with redacted content', async function () {
    await anyCcdPage.chooseOptionContainingText('furtherEvidenceAction', 'Issue further evidence to all parties');
    await anyCcdPage.chooseOptionContainingText('originalSender', 'Appellant (or Appointee)');
    await anyCcdPage.uploadFile('scannedDocuments_0_editedUrl', 'issue2.pdf');
    await anyCcdPage.clickSubmit();
    await anyCcdPage.clickSubmit();
    await anyCcdPage.clickIgnoreWarning();
});
(0, cucumber_1.Then)('I should see redacted content in Documents tab', async function () {
    await anyCcdPage.clickTab('Documents');
    const originalDocumentUrl = await anyCcdPage.getFieldValues('Original document URL');
    (0, chai_1.expect)(originalDocumentUrl).to.include('issue1.pdf');
    const editedDocumentUrl = await anyCcdPage.getFieldValues('Edited document URL');
    (0, chai_1.expect)(editedDocumentUrl).to.include('issue2.pdf');
    await protractor_1.browser.sleep(wait_1.Wait.extended);
});
//# sourceMappingURL=enhanced-confidentiality.steps.js.map
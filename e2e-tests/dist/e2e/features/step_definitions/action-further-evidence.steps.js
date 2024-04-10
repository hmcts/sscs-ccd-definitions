"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const chai_1 = require("chai");
const further_evidence_page_1 = require("../../pages/further-evidence.page");
const case_details_page_1 = require("../../pages/case-details.page");
const wait_1 = require("../../enums/wait");
const protractor_1 = require("protractor");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
const furtherEvidencePage = new further_evidence_page_1.FurtherEvidencePage();
const caseDetailsPage = new case_details_page_1.CaseDetailsPage();
(0, cucumber_1.When)('I fill the further evidence form with {string} and {string}', async function (actionType, requestType) {
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Action further evidence')).to.equal(true);
    await anyCcdPage.chooseOptionByValue('furtherEvidenceAction', actionType);
    await anyCcdPage.chooseOptionContainingText('originalSender', 'Appellant (or Appointee)');
    await anyCcdPage.clickAddNew();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Document Type')).to.equal(true);
    await anyCcdPage.chooseOptionContainingText('scannedDocuments_0_type', requestType);
    await anyCcdPage.uploadFile('scannedDocuments_0_url', 'issue1.pdf');
    await furtherEvidencePage.enterFileName('scannedDocuments_0_fileName', 'testfile.pdf');
    await furtherEvidencePage.enterScannedDate('20', '1', '2021');
    await anyCcdPage.clickElementById('scannedDocuments_0_includeInBundle_Yes');
    await anyCcdPage.clickSubmit();
    await protractor_1.browser.sleep(wait_1.Wait.extended);
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.When)('I fill the further evidence form with {string} invalid file', async function (testFile) {
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Action further evidence')).to.equal(true);
    await anyCcdPage.chooseOptionContainingText('furtherEvidenceAction', 'Send to Interloc - Review by Judge');
    await anyCcdPage.chooseOptionContainingText('originalSender', 'Appellant (or Appointee)');
    await anyCcdPage.clickAddNew();
    await anyCcdPage.chooseOptionContainingText('scannedDocuments_0_type', 'Confidentiality request');
    await anyCcdPage.uploadFile('scannedDocuments_0_url', `${testFile}.pdf`);
    await furtherEvidencePage.enterFileName('scannedDocuments_0_fileName', 'testfile.pdf');
    await furtherEvidencePage.enterScannedDate('20', '1', '2021');
    await anyCcdPage.clickElementById('scannedDocuments_0_includeInBundle_Yes');
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.Then)('the case should have successfully processed {string} event', async function (event) {
    const events = await caseDetailsPage.getHistoryEvents();
    (0, chai_1.expect)(events).to.include(event);
});
(0, cucumber_1.When)('I fill the direction notice form with {string}', async function (reinstatement) {
    await anyCcdPage.chooseOptionContainingText('prePostHearing', 'Pre Hearing');
    await anyCcdPage.chooseOptionContainingText('directionTypeDl', reinstatement);
    await anyCcdPage.clickElementById('confidentialityType-general');
    await caseDetailsPage.addDayItems('directionDueDate');
    await anyCcdPage.scrollPage('//*[@id="generateNotice_No"]');
    await anyCcdPage.chooseOptionContainingText('sscsInterlocDirectionDocument_documentType', 'Directions Notice');
    await anyCcdPage.uploadFile('sscsInterlocDirectionDocument_documentLink', 'issue2.pdf');
    await furtherEvidencePage.enterFileName('sscsInterlocDirectionDocument_documentFileName', 'testfile.pdf');
    await anyCcdPage.clickSubmit();
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.Then)('the case should be {string} permissions for {string}', async function (reinstatement, directionType) {
    const todayDate = new Date().toISOString().slice(0, 10);
    // await anyCcdPage.reloadPage();
    await anyCcdPage.clickTab('Appeal Details');
    const outcomeText = directionType === 'Reinstatement' ? 'Outcome' : 'outcome';
    const regText = directionType === 'Reinstatement' ? 'Registered' : 'registered';
    await caseDetailsPage.getFieldValue(`${directionType} ${outcomeText}`).then(function (actText) {
        chai_1.assert.equal(reinstatement, actText);
    });
    await caseDetailsPage.getFieldValue(`${directionType} ${regText}`).then(function (actText) {
        const date = new Date(actText);
        const actualDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
        chai_1.assert.equal(todayDate, actualDate);
    });
});
(0, cucumber_1.When)('resend evidence to appellant and FTA user', async function () {
    await anyCcdPage.clickElementById('resendToAppellant_Yes');
    await anyCcdPage.clickElementById('resendToRepresentative_No');
    await anyCcdPage.clickElementById('resendToDwp_Yes');
    await anyCcdPage.clickSubmit();
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.Then)('I see {string} and {string} event being processed successfully', async function (eventName, anotherEventName) {
    // await caseDetailsPage.reloadPage();
    const events = await caseDetailsPage.getHistoryEvents();
    (0, chai_1.expect)(events).to.include(anotherEventName);
    (0, chai_1.expect)(events).to.include(eventName);
});
(0, cucumber_1.Then)('I should still see previous uploaded file collection within documents tab', async function () {
    await anyCcdPage.reloadPage();
    await anyCcdPage.clickTab('Documents');
    const types = await anyCcdPage.getFieldValues('Type');
    (0, chai_1.expect)(types).to.include('Appellant evidence');
    const evidencesIssued = await anyCcdPage.getFieldValues('Evidence issued');
    (0, chai_1.expect)(evidencesIssued).to.include('Yes');
    const originalDocumentUrls = await anyCcdPage.getFieldValues('Original document URL');
    (0, chai_1.expect)(originalDocumentUrls).to.include('issue1.pdf');
});
//# sourceMappingURL=action-further-evidence.steps.js.map
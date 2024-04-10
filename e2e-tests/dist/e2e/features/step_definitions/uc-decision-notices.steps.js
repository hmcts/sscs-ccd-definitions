"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const protractor_1 = require("protractor");
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const joint_party_page_1 = require("../../pages/joint-party.page");
const dwpresponse_page_1 = require("../../pages/dwpresponse.page");
const any_ccd_form_page_1 = require("../../pages/any-ccd-form.page");
const issue_decision_page_1 = require("../../pages/issue-decision.page");
const case_details_page_1 = require("../../pages/case-details.page");
const further_evidence_page_1 = require("../../pages/further-evidence.page");
const nodejs_logging_1 = require("@hmcts/nodejs-logging");
const chai_1 = require("chai");
const logger = nodejs_logging_1.Logger.getLogger('uc-decision-notices.steps.ts');
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
const jointPartyPage = new joint_party_page_1.JointPartyPage();
const dwpResponse = new dwpresponse_page_1.DwpResponsePage();
const anyCcdFormPage = new any_ccd_form_page_1.AnyCcdFormPage();
const issueDecisionPage = new issue_decision_page_1.IssueDecisionPage();
const caseDetailsPage = new case_details_page_1.CaseDetailsPage();
const furtherEvidencePage = new further_evidence_page_1.FurtherEvidencePage();
(0, cucumber_1.When)('I select schedule 6 activities with <15 points and schedule 8 para 4 {string}', async function (para4Apply) {
    // await issueDecisionPage.schedule6PageFieldsAreInTheCorrectOrder(); --> Commented due to bug in ordering of fields
    await anyCcdPage.clickElementById('ucWriteFinalDecisionPhysicalDisabilitiesQuestion-mobilisingUnaided');
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickElementById('ucWriteFinalDecisionMobilisingUnaidedQuestion-mobilisingUnaided1d');
    await anyCcdPage.clickContinue();
    // await anyCcdPage.clickContinue();
    if (para4Apply === 'YES') {
        await anyCcdPage.clickElementById('doesSchedule8Paragraph4Apply_Yes');
    }
    else {
        await anyCcdPage.clickElementById('doesSchedule8Paragraph4Apply_No');
    }
    await anyCcdPage.clickContinue();
});
(0, cucumber_1.When)('I select schedule 6 activities with >=15 points', async function () {
    await issueDecisionPage.schedule6PageFieldsAreInTheCorrectOrder();
    await anyCcdPage.clickElementById('ucWriteFinalDecisionPhysicalDisabilitiesQuestion-mobilisingUnaided');
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickElementById('ucWriteFinalDecisionMobilisingUnaidedQuestion-mobilisingUnaided1a');
    await anyCcdPage.clickContinue();
});
(0, cucumber_1.When)('I select schedule 7 activities', async function () {
    await anyCcdPage.clickElementById('ucWriteFinalDecisionSchedule7ActivitiesQuestion-schedule7MobilisingUnaided');
    await anyCcdPage.clickContinue();
});
(0, cucumber_1.When)('I opt out schedule 7 activities and schedule 9 para 4 {string}', async function (para4) {
    await anyCcdPage.clickElementById('ucWriteFinalDecisionSchedule7ActivitiesApply-No');
    await anyCcdPage.clickContinue();
    if (para4 === 'YES') {
        await anyCcdPage.clickElementById('doesSchedule9Paragraph4Apply-Yes');
    }
    else {
        await anyCcdPage.clickElementById('doesSchedule9Paragraph4Apply-No');
    }
    await anyCcdPage.clickContinue();
});
(0, cucumber_1.When)('I continue writing final decision LCWA appeal', async function () {
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Bundle page')).to.equal(true);
    await issueDecisionPage.pageReference();
    await anyCcdPage.clickContinue();
});
(0, cucumber_1.When)('I continue writing final decision non LCWA appeal', async function () {
    await issueDecisionPage.pageReference();
    await anyCcdPage.clickContinue();
    await issueDecisionPage.fillSummary();
    await anyCcdPage.clickContinue();
});
(0, cucumber_1.When)('I update joint party to {string} for UC', async function (hasJointParty) {
    if (hasJointParty === 'YES') {
        await anyCcdPage.clickElementById('jointParty-Yes');
        await jointPartyPage.addJointPartyDetails();
        await anyCcdPage.clickSubmit();
    }
    const events = await caseDetailsPage.getHistoryEvents();
    (0, chai_1.expect)(events).to.include('Update to case data');
    (0, chai_1.expect)(events).to.include('Joint Party Added');
    logger.info('&&&& Joint Party Added');
});
(0, cucumber_1.When)('I update the scanned document for {string}', async function (originator) {
    await anyCcdPage.chooseOptionByValue('furtherEvidenceAction', 'sendToInterlocReviewByJudge');
    if (originator === 'Appellant') {
        await anyCcdPage.chooseOptionContainingText('originalSender', 'Appellant (or Appointee)');
    }
    else if (originator === 'JointParty') {
        await anyCcdPage.chooseOptionContainingText('originalSender', 'Joint party');
    }
    await anyCcdPage.clickAddNew();
    await anyCcdPage.chooseOptionContainingText('scannedDocuments_0_type', 'Confidentiality request');
    await dwpResponse.uploadDoc('scannedDocuments_0_url');
    await protractor_1.browser.driver.sleep(300);
    await anyCcdFormPage.setValueByElementId('scannedDocuments_0_fileName', 'test-confidentiality-file');
    await furtherEvidencePage.enterScannedDate('20', '1', '2021');
    await anyCcdPage.clickElementById('scannedDocuments_0_includeInBundle_Yes');
    await anyCcdPage.clickSubmit();
    await anyCcdPage.clickSubmit();
    await protractor_1.browser.driver.sleep(2000);
    await anyCcdPage.clickTab('History');
    (0, chai_1.expect)(await anyCcdPage.contentContains('Review by Judge')).to.equal(true);
});
(0, cucumber_1.When)('I select Granted for Appellant and Refused for Joint Party as a confidentiality', async function () {
    await anyCcdPage.clickElementById('confidentialityRequestAppellantGrantedOrRefused-grantConfidentialityRequest');
    await anyCcdPage.clickElementById('confidentialityRequestJointPartyGrantedOrRefused-refuseConfidentialityRequest');
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickSubmit();
    const events = await caseDetailsPage.getHistoryEvents();
    (0, chai_1.expect)(events).to.include('Action further evidence');
    (0, chai_1.expect)(events).to.include('Review confidentiality request');
});
(0, cucumber_1.Then)('I should see the Request outcome status for {string} to be {string}', async function (partyType, status) {
    await anyCcdPage.clickTab('Summary');
    await protractor_1.browser.driver.sleep(2000);
    await anyCcdPage.pageHeadingContains(`Confidentiality request outcome ${partyType}`);
    const fieldValue = await anyCcdPage.getFieldValue('Request outcome');
    (0, chai_1.expect)(fieldValue).to.equal(status);
});
//# sourceMappingURL=uc-decision-notices.steps.js.map
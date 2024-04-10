"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const protractor_1 = require("protractor");
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const issue_decision_page_1 = require("../../pages/issue-decision.page");
const case_details_page_1 = require("../../pages/case-details.page");
const any_ccd_form_page_1 = require("../../pages/any-ccd-form.page");
const chai_1 = require("chai");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
const issueDecisionPage = new issue_decision_page_1.IssueDecisionPage();
const caseDetailsPage = new case_details_page_1.CaseDetailsPage();
const anyCcdFormPage = new any_ccd_form_page_1.AnyCcdFormPage();
(0, cucumber_1.When)('I write a final decision of {string} appeal {string} and Support group {string} To Allowed {string}', async function (appealType, wcaAppeal, supportGroup, allowed) {
    await anyCcdPage.clickElementById('writeFinalDecisionGenerateNotice_Yes');
    await anyCcdPage.clickContinue();
    if (allowed === 'YES') {
        await anyCcdPage.clickElementById('writeFinalDecisionAllowedOrRefused-allowed');
    }
    else {
        await anyCcdPage.clickElementById('writeFinalDecisionAllowedOrRefused-refused');
    }
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickElementById('writeFinalDecisionTypeOfHearing-faceToFace');
    await anyCcdPage.clickElementById('writeFinalDecisionPresentingOfficerAttendedQuestion_Yes');
    await anyCcdPage.clickElementById('writeFinalDecisionAppellantAttendedQuestion_Yes');
    await anyCcdPage.clickContinue();
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable((0, protractor_1.element)(protractor_1.by.css('button[type=submit]'))), 5000);
    await anyCcdPage.clickContinue();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Decision date')).to.equal(true);
    await caseDetailsPage.addPastDate('writeFinalDecisionDateOfDecision');
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable((0, protractor_1.element)(protractor_1.by.css('button[type=submit]'))), 5000);
    await anyCcdPage.clickContinue();
    if (wcaAppeal === 'YES') {
        const wcaYes = `${appealType}Appeal_Yes`;
        await anyCcdPage.clickElementById(wcaYes);
    }
    else {
        const wcaNo = `${appealType}Appeal_No`;
        await anyCcdPage.clickElementById(wcaNo);
    }
    if (supportGroup === 'YES') {
        await anyCcdPage.clickElementById('supportGroupOnlyAppeal_Yes');
    }
    else {
        await anyCcdPage.clickElementById('supportGroupOnlyAppeal_No');
    }
    await anyCcdPage.clickContinue();
});
(0, cucumber_1.When)('I select schedule 2 activities with <15 points and reg 29 {string}', async function (reg29Apply) {
    await anyCcdPage.clickElementById('esaWriteFinalDecisionPhysicalDisabilitiesQuestion-consciousness');
    await anyCcdPage.clickElementById('esaWriteFinalDecisionMentalAssessmentQuestion-copingWithChange');
    await anyCcdPage.scrollBar('//div/form/div/button[2]');
    await anyCcdPage.clickElementById('esaWriteFinalDecisionConsciousnessQuestion-consciousness10c');
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickElementById('esaWriteFinalDecisionCopingWithChangeQuestion-copingWithChange14d');
    await anyCcdPage.clickContinue();
    if (reg29Apply === 'YES') {
        await anyCcdPage.clickElementById('doesRegulation29Apply_Yes');
    }
    else {
        await anyCcdPage.clickElementById('doesRegulation29Apply_No');
    }
    await anyCcdPage.clickContinue();
});
(0, cucumber_1.When)('I select schedule 2 activities with >=15 points', async function () {
    await anyCcdPage.clickElementById('esaWriteFinalDecisionPhysicalDisabilitiesQuestion-reaching');
    await anyCcdPage.clickElementById('esaWriteFinalDecisionMentalAssessmentQuestion-learningTasks');
    await anyCcdPage.scrollBar('//div/form/div/button[2]');
    await anyCcdPage.clickElementById('esaWriteFinalDecisionReachingQuestion-reaching3b');
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickElementById('esaWriteFinalDecisionLearningTasksQuestion-learningTasks11b');
    await anyCcdPage.clickContinue();
});
(0, cucumber_1.When)('I opt out schedule 3 activities and reg 35 {string}', async function (reg35Apply) {
    await anyCcdPage.clickElementById('esaWriteFinalDecisionSchedule3ActivitiesApply-No');
    await anyCcdPage.scrollBar('//div/form/div/button[2]');
    if (reg35Apply === 'YES') {
        await anyCcdPage.clickElementById('doesRegulation35Apply_Yes');
    }
    else {
        await anyCcdPage.clickElementById('doesRegulation35Apply_No');
    }
    await anyCcdPage.scrollBar('//div/form/div/button[2]');
});
(0, cucumber_1.When)('I select schedule 3 activities', async function () {
    await anyCcdPage.clickElementById('esaWriteFinalDecisionSchedule3ActivitiesQuestion-schedule3ChewingOrSwallowing');
    await anyCcdPage.clickContinue();
});
(0, cucumber_1.When)('I continue writing final decision non WCA appeal', async function () {
    await issueDecisionPage.pageReference();
    await anyCcdPage.clickContinue();
    await issueDecisionPage.fillSummary();
    await anyCcdPage.clickContinue();
});
(0, cucumber_1.When)('I continue writing final decision WCA appeal', async function () {
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Bundle page')).to.equal(true);
    await issueDecisionPage.pageReference();
    await anyCcdPage.clickContinue();
});
(0, cucumber_1.When)('I provide reasons and check answers To Allowed {string}', async function (allowed) {
    if (allowed === 'YES') {
        await anyCcdPage.clickElementById('dwpReassessTheAward-noRecommendation');
        await anyCcdPage.clickContinue();
    }
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Reasons for decision')).to.equal(true);
    await anyCcdFormPage.addNewCollectionItem('Reasons for decision');
    await anyCcdFormPage.setCollectionItemFieldValue('Reasons for decision', 0, 'Reasons for decision', 'Some Reason');
    await anyCcdPage.clickContinue();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Anything else?')).to.equal(true);
    await anyCcdPage.clickContinue();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Preview Decision Notice')).to.equal(true);
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.When)('I provide reasons and check answers for non WCA To Allowed {string}', async function (allowed) {
    await anyCcdFormPage.addNewCollectionItem('Reasons for decision');
    await anyCcdFormPage.setCollectionItemFieldValue('Reasons for decision', 0, 'Reasons for decision', 'Some Reason');
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickContinue();
    await anyCcdPage.scrollBar('//form/div/button[2]');
});
(0, cucumber_1.When)('I choose manual upload', async function () {
    await anyCcdPage.clickElementById('writeFinalDecisionGenerateNotice-No');
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickElementById('writeFinalDecisionAllowedOrRefused-allowed');
    await anyCcdPage.clickContinue();
    await issueDecisionPage.uploadDirection();
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.When)('I write a final decision of taxCredit appeal {string} and Support group {string} To Allowed {string}', async function (appealType, supportGroup, allowed) {
    await anyCcdPage.clickElementById('writeFinalDecisionGenerateNotice_Yes');
    await anyCcdPage.clickContinue();
    if (allowed === 'YES') {
        await anyCcdPage.clickElementById('writeFinalDecisionAllowedOrRefused-allowed');
    }
    else {
        await anyCcdPage.clickElementById('writeFinalDecisionAllowedOrRefused-refused');
    }
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickElementById('writeFinalDecisionTypeOfHearing-faceToFace');
    await anyCcdPage.clickElementById('writeFinalDecisionPresentingOfficerAttendedQuestion_Yes');
    await anyCcdPage.clickElementById('writeFinalDecisionAppellantAttendedQuestion_Yes');
    await anyCcdPage.clickContinue();
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable((0, protractor_1.element)(protractor_1.by.css('button[type=submit]'))), 5000);
    await anyCcdPage.clickContinue();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Decision date')).to.equal(true);
    await caseDetailsPage.addPastDate('writeFinalDecisionDateOfDecision');
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable((0, protractor_1.element)(protractor_1.by.css('button[type=submit]'))), 5000);
    await anyCcdPage.clickContinue();
    await anyCcdPage.fillValues('writeFinalDecisionPageSectionReference', 'lastpage');
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable((0, protractor_1.element)(protractor_1.by.css('button[type=submit]'))), 5000);
    await anyCcdPage.clickContinue();
    await anyCcdPage.fillValues('writeFinalDecisionDetailsOfDecision', 'summary of decision notice');
    await protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable((0, protractor_1.element)(protractor_1.by.css('button[type=submit]'))), 5000);
    await anyCcdPage.clickContinue();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Reasons for decision')).to.equal(true);
    await anyCcdFormPage.addNewCollectionItem('Reasons for decision');
    await anyCcdFormPage.setCollectionItemFieldValue('Reasons for decision', 0, 'Reasons for decision', 'Some Reason');
    await anyCcdPage.clickContinue();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Anything else?')).to.equal(true);
    await anyCcdPage.clickContinue();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Preview Decision Notice')).to.equal(true);
    await anyCcdPage.clickContinue();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Check your answers')).to.equal(true);
    await anyCcdPage.clickSubmit();
});
//# sourceMappingURL=esa-decision-notices.steps.js.map
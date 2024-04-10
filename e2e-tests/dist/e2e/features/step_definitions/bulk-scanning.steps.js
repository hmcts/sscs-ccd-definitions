"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const any_ccd_form_page_1 = require("../../pages/any-ccd-form.page");
const case_details_page_1 = require("../../pages/case-details.page");
const ni_generator_1 = require("../../helpers/ni-generator");
const dwp_office_1 = require("../../helpers/dwp-office");
const cucumber_1 = require("@cucumber/cucumber");
const chai_1 = require("chai");
const protractor_1 = require("protractor");
const ccd = __importStar(require("../../helpers/ccd"));
const en_GB_1 = require("@faker-js/faker/locale/en_GB");
const nodejs_logging_1 = require("@hmcts/nodejs-logging");
const scannedCase_1 = require("../data/scannedCase");
const incompleteScannedCase_1 = require("../data/incompleteScannedCase");
const sscs1PeuCase_1 = require("../data/sscs1PeuCase");
const wait_1 = require("../../enums/wait");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
const anyCcdFormPage = new any_ccd_form_page_1.AnyCcdFormPage();
const caseDetailsPage = new case_details_page_1.CaseDetailsPage();
const logger = nodejs_logging_1.Logger.getLogger('bulk-scanning-steps.ts');
const dwpOffice = new dwp_office_1.DwpOffice();
let caseReference = null;
async function addDataItems(benefitCode, formType) {
    const promises = [];
    const testData = formType === 'SSCSPE' ? scannedCase_1.formData : sscs1PeuCase_1.sscsPeuFormData;
    for (let i = 0; i < testData.length; i++) {
        if (testData[i].question === 'person1_nino') {
            testData[i].answer = (0, ni_generator_1.generateNINumber)();
        }
        if (scannedCase_1.formData[i].question === 'benefit_type_description') {
            scannedCase_1.formData[i].answer = benefitCode;
        }
        if (scannedCase_1.formData[i].question === 'office') {
            scannedCase_1.formData[i].answer = dwpOffice.officeCode(benefitCode);
        }
        promises.push(anyCcdFormPage.addNewOCRCollectionItem());
        promises.push(anyCcdFormPage.setCollectionItemFieldValue('Form OCR Data', i + 1, 'Key', testData[i].question));
        promises.push(anyCcdFormPage.setCollectionItemFieldValue('Form OCR Data', i + 1, 'Value (Optional)', testData[i].answer));
    }
    await Promise.all(promises);
}
async function addIncompleteDataItems() {
    const promises = [];
    for (let i = 0; i < incompleteScannedCase_1.incompleteFormData.length; i++) {
        if (incompleteScannedCase_1.incompleteFormData[i].question === 'person1_nino') {
            incompleteScannedCase_1.incompleteFormData[i].answer = (0, ni_generator_1.generateNINumber)();
        }
        promises.push(anyCcdFormPage.addNewCollectionItem('Form OCR Data'));
        promises.push(anyCcdFormPage.setCollectionItemFieldValue('Form OCR Data', i + 1, 'Key', incompleteScannedCase_1.incompleteFormData[i].question));
        promises.push(anyCcdFormPage.setCollectionItemFieldValue('Form OCR Data', i + 1, 'Value (Optional)', incompleteScannedCase_1.incompleteFormData[i].answer));
    }
    await Promise.all(promises);
}
async function checkIncompleteDataItems() {
    const promises = [];
    for (let i = 0; i < incompleteScannedCase_1.incompleteFormData.length; i++) {
        promises.push(caseDetailsPage.isCollectionItemFieldValueDisplayed('Form OCR Data', i + 1, 'Key', incompleteScannedCase_1.incompleteFormData[i].question));
    }
    const areFieldsDisplayed = await Promise.all(promises);
    areFieldsDisplayed.forEach((isFieldDisplayed) => (0, chai_1.expect)(isFieldDisplayed).to.equal(true));
}
async function enterMrnDate() {
    await caseDetailsPage.addDayItems('caseCreated');
    await anyCcdPage.chooseOptionByValue('appeal_receivedVia', '1: Paper');
    await caseDetailsPage.addDayItems('mrnDate');
}
async function enterAppellantDetails() {
    await anyCcdPage.fillValues('appeal_appellant_name_title', 'Mr');
    await anyCcdPage.fillValues('appeal_appellant_name_firstName', en_GB_1.faker.name.firstName());
    await anyCcdPage.fillValues('appeal_appellant_name_lastName', en_GB_1.faker.name.lastName());
    await anyCcdPage.fillValues('dob-day', '10');
    await anyCcdPage.fillValues('dob-month', '3');
    await anyCcdPage.fillValues('dob-year', '1988');
    await anyCcdPage.fillValues('appeal_appellant_identity_nino', (0, ni_generator_1.generateNINumber)());
}
async function enterAddressDetails() {
    await anyCcdPage.fillValues('appeal_appellant_address_line1', '1000, test');
    await anyCcdPage.fillValues('appeal_appellant_address_line2', en_GB_1.faker.address.streetAddress());
    await anyCcdPage.fillValues('appeal_appellant_address_line3', 'test');
    await anyCcdPage.fillValues('appeal_appellant_address_town', en_GB_1.faker.address.city());
    await anyCcdPage.fillValues('appeal_appellant_address_postcode', 'TS1 1ST');
}
async function enterBenefitDetails() {
    await anyCcdPage.chooseOptionByValue('appeal_appellant_role_name', '1: payingParent');
    await anyCcdPage.fillValues('appeal_benefitType_code', 'childSupport');
    await anyCcdPage.fillValues('appeal_benefitType_description', 'Child Support');
    await anyCcdPage.chooseOptionByValue('appeal_hearingType', '3: paper');
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickSubmit();
}
async function createSSCSCase() {
    await anyCcdPage.chooseOptionByValue('cc-case-type', 'Benefit');
    await anyCcdPage.chooseOptionByValue('cc-event', 'validAppealCreated');
    await anyCcdPage.clickButton('Start');
    await enterMrnDate();
    await enterAppellantDetails();
    await enterAddressDetails();
    await enterBenefitDetails();
}
(0, cucumber_1.Given)('I create an child support case', async function () {
    await anyCcdPage.clickCreateCase();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Create Case')).to.equal(true);
    await createSSCSCase();
    await caseDetailsPage.doNextStep('Admin - update event');
    await anyCcdPage.clickNextStep();
    await anyCcdPage.chooseOptionByValue('createdInGapsFrom', '1: readyToList');
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.Given)('I have a {word} bulk-scanned document with {word} fields', { timeout: 600 * 1000 }, async function (benefitCode, formType) {
    await anyCcdPage.clickCreateCase();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Create Case')).to.equal(true);
    await anyCcdFormPage.setCreateCaseFieldValue('Case type', 'SSCS Bulkscanning');
    await anyCcdPage.clickButton('Start');
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Envelope meta data')).to.equal(true);
    await caseDetailsPage.addEnvelopeDataItems('NEW_APPLICATION', '123456', 'test_po-box-jurisdiction', 'test_envelope');
    await caseDetailsPage.addDateItems('deliveryDate');
    await caseDetailsPage.addDateItems('openingDate');
    await addDataItems(benefitCode, formType);
    if (formType === 'SSCSPE') {
        await caseDetailsPage.addFormType('SSCS1PE');
    }
    else {
        await caseDetailsPage.addFormType('SSCS1PEU');
    }
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickSubmit();
    (0, chai_1.expect)(await caseDetailsPage.getAlertMessage()).to.equal('has been created');
    const fieldValue = await caseDetailsPage.getFieldValue('Event');
    (0, chai_1.expect)(fieldValue).to.equal('Create an exception record');
});
(0, cucumber_1.Given)('I have a PIP bulk-scanned document filled with incomplete fields', async function () {
    await anyCcdPage.clickCreateCase();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Create Case')).to.equal(true);
    await anyCcdFormPage.setCreateCaseFieldValue('Case type', 'SSCS Bulkscanning');
    await anyCcdPage.clickButton('Start');
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Envelope meta data')).to.equal(true);
    await caseDetailsPage.addEnvelopeDataItems('NEW_APPLICATION', '123456', 'test_po-box-jurisdiction', 'test_envelope');
    await caseDetailsPage.addDateItems('deliveryDate');
    await caseDetailsPage.addDateItems('openingDate');
    await addIncompleteDataItems();
    await caseDetailsPage.addFormType('test_form_type');
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickSubmit();
    (0, chai_1.expect)(await caseDetailsPage.getAlertMessage()).to.equal('has been created');
    const fieldValue = await caseDetailsPage.getFieldValue('Event');
    (0, chai_1.expect)(fieldValue).to.equal('Create an exception record');
    await anyCcdPage.clickTab('Form OCR');
    await checkIncompleteDataItems();
});
(0, cucumber_1.When)('I choose {string} for an incomplete application', async function (action) {
    await caseDetailsPage.doNextStep(action);
    await anyCcdPage.clickNextStep();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains(action)).to.equal(true);
    await anyCcdPage.clickContinue();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Create new case from exception')).to.equal(true);
    await anyCcdPage.clickSubmit();
    await anyCcdPage.clickIgnoreWarning();
    // expect(await anyCcdPage.pageHeadingContains('History')).to.equal(true);
});
(0, cucumber_1.When)('I choose the next step {string}', async function (action) {
    switch (action) {
        case 'Create new case from exception':
            await caseDetailsPage.doNextStep(action);
            break;
        case 'Create a bundle':
            await caseDetailsPage.doNextStep(action);
            break;
        case 'Admin - send to Ready to List':
            await caseDetailsPage.doNextStep(action);
            break;
        default:
            throw new Error(`Do not understand action "${action}"`);
    }
    await anyCcdPage.clickNextStep();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains(action)).to.equal(true);
    if (action === 'Create new case from exception') {
        await anyCcdPage.clickContinue();
        (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Create new case from exception')).to.equal(true);
    }
    await anyCcdPage.clickSubmit();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('History')).to.equal(true);
});
(0, cucumber_1.Then)('the case should be in {string} state', async function (state) {
    await anyCcdPage.waitForEndState(state);
    await protractor_1.browser.manage().window().maximize();
});
(0, cucumber_1.Then)('the {string} event should be successfully listed in the History', async function (event) {
    await caseDetailsPage.reloadPage();
    await protractor_1.browser.manage().window().maximize();
    let events = await caseDetailsPage.getHistoryEvents();
    if (events.includes(event)) {
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await caseDetailsPage.reloadPage();
        events = await caseDetailsPage.getHistoryEvents();
    }
    (0, chai_1.expect)(events).to.include(event);
});
(0, cucumber_1.Then)('the case bundle details should be listed in {string} tab', async function (tabName) {
    await anyCcdPage.clickTab(tabName);
    const switchStatus = await caseDetailsPage.getFieldValue('Stitch status');
    (0, chai_1.expect)(switchStatus).to.equal('DONE');
    const configUsed = await caseDetailsPage.getFieldValue('Config used for bundle');
    (0, chai_1.expect)(configUsed).to.equal('SSCS Bundle Original');
});
(0, cucumber_1.Then)('the {string} bundle configuration should have been used', async function (value) {
    const fieldValue = await caseDetailsPage.getFieldValues('Config used for bundle');
    (0, chai_1.expect)(fieldValue).to.include(value);
});
(0, cucumber_1.Given)('I preset up a test case', async function () {
    const ccdCreatedCase = await ccd.createCase('oral');
    caseReference = ccdCreatedCase.id;
});
(0, cucumber_1.Given)('I presetup an {string} SYA case', async function (caseType) {
    caseReference = await ccd.createSYACase(caseType);
    await protractor_1.browser.sleep(wait_1.Wait.normal);
});
(0, cucumber_1.Given)('I navigate to an existing case', async function () {
    logger.info(`the saved case id is ${caseReference}`);
    await anyCcdPage.get(`/v2/case/${caseReference}`);
    await anyCcdPage.waitForSpinner();
});
(0, cucumber_1.Given)('I complete the event', async function () {
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.When)('I choose execute CCD event {string}', async function (action) {
    switch (action) {
        case 'Create new case from exception':
            await caseDetailsPage.doNextStep(action);
            break;
        case 'Create a bundle':
            await caseDetailsPage.doNextStep(action);
            break;
        case 'Admin - send to Ready to List':
            await anyCcdPage.selectEvent(action);
            break;
        default:
            throw new Error(`Do not understand action "${action}"`);
    }
});
(0, cucumber_1.Then)('the interloc state should be in {string}', async function (interlocState) {
    await anyCcdPage.clickTab('History');
    (0, chai_1.expect)(await anyCcdPage.getFieldValue('Interlocutory review state')).to.equal(interlocState);
});
//# sourceMappingURL=bulk-scanning.steps.js.map
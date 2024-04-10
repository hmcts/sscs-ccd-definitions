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
exports.DwpResponsePage = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-shadow */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const protractor_1 = require("protractor");
const any_page_1 = require("./any.page");
const any_ccd_form_page_1 = require("./any-ccd-form.page");
const ni_generator_1 = require("../helpers/ni-generator");
const chai_1 = require("chai");
const nodejs_logging_1 = require("@hmcts/nodejs-logging");
const remote = __importStar(require("selenium-webdriver/remote"));
const wait_1 = require("../enums/wait");
const logger = nodejs_logging_1.Logger.getLogger('dwpresponse.page.ts');
const anyCcdFormPage = new any_ccd_form_page_1.AnyCcdFormPage();
class DwpResponsePage extends any_page_1.AnyPage {
    async uploadResponse(action, dwpState, benefitType) {
        await protractor_1.browser.waitForAngular();
        protractor_1.browser.setFileDetector(new remote.FileDetector());
        await protractor_1.browser.sleep(5000);
        await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
        if (action === 'YES') {
            await anyCcdFormPage.clickElementById('dwpFurtherInfo_Yes');
        }
        else {
            await anyCcdFormPage.clickElementById('dwpFurtherInfo_No');
            await anyCcdFormPage.clickElementById('dwpUCB_No');
        }
        if (dwpState === 'YES' && benefitType !== 'UC') {
            await anyCcdFormPage.chooseOptionContainingText('benefitCode', '002');
            await anyCcdFormPage.chooseOptionContainingText('issueCode', 'EC');
            await anyCcdFormPage.clickElementById('dwpUCB_No');
            await anyCcdFormPage.chooseOptionContainingText('dwpFurtherEvidenceStates', 'No action');
            await anyCcdFormPage.chooseOptionContainingText('dynamicDwpState', 'Response submitted (FTA)');
        }
        await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
    }
    async esaUploadResponse(action) {
        await protractor_1.browser.waitForAngular();
        protractor_1.browser.setFileDetector(new remote.FileDetector());
        await protractor_1.browser.sleep(5000);
        await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
        if (action === 'YES') {
            await anyCcdFormPage.clickElementById('dwpFurtherInfo_Yes');
        }
        else {
            await anyCcdFormPage.clickElementById('dwpFurtherInfo_No');
            await anyCcdFormPage.clickElementById('dwpUCB_No');
        }
        await anyCcdFormPage.chooseOptionContainingText('benefitCode', '051');
        await anyCcdFormPage.chooseOptionContainingText('issueCode', 'CB');
        await anyCcdFormPage.clickElementById('dwpUCB_No');
        await anyCcdFormPage.chooseOptionContainingText('dwpFurtherEvidenceStates', 'No action');
        await anyCcdFormPage.chooseOptionContainingText('dynamicDwpState', 'Response submitted (FTA)');
        await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
    }
    async uploadOnlyResponseAndEvidence(action, dwpState, benefitType) {
        await protractor_1.browser.waitForAngular();
        await protractor_1.browser.sleep(wait_1.Wait.long);
        protractor_1.browser.setFileDetector(new remote.FileDetector());
        await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
        if (action === 'YES') {
            await anyCcdFormPage.clickElementById('dwpFurtherInfo_Yes');
        }
        else {
            await anyCcdFormPage.clickElementById('dwpFurtherInfo_No');
            await anyCcdFormPage.clickElementById('dwpUCB_No');
        }
        if (dwpState === 'YES' && benefitType !== 'UC') {
            await anyCcdFormPage.chooseOptionContainingText('benefitCode', '002');
            await anyCcdFormPage.chooseOptionContainingText('issueCode', 'EC');
            await anyCcdFormPage.clickElementById('dwpUCB_No');
            await anyCcdFormPage.chooseOptionContainingText('dwpFurtherEvidenceStates', 'No action');
            await anyCcdFormPage.chooseOptionContainingText('dynamicDwpState', 'Response submitted (FTA)');
        }
        await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
    }
    async uploadResponseWithUcbAndPhme(dwpState, docLink, isUCB, isPHME, containsFurtherInfo) {
        await protractor_1.browser.waitForAngular();
        protractor_1.browser.setFileDetector(new remote.FileDetector());
        await protractor_1.browser.sleep(wait_1.Wait.short);
        await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
        if (isUCB) {
            await anyCcdFormPage.clickElementById('dwpUCB_Yes');
            logger.info('uploading ucb doc....');
            await protractor_1.browser.sleep(wait_1.Wait.normal);
            await anyCcdFormPage.uploadFile(docLink, 'issue3.pdf');
        }
        if (isPHME) {
            await anyCcdFormPage.chooseOptionContainingText('dwpEditedEvidenceReason', 'Potentially harmful evidence');
            logger.info('uploading edited doc....');
            await anyCcdFormPage.uploadFile('dwpEditedResponseDocument_documentLink', 'issue1.pdf');
            await protractor_1.browser.sleep(wait_1.Wait.normal);
            await anyCcdFormPage.uploadFile('dwpEditedEvidenceBundleDocument_documentLink', 'issue2.pdf');
            await protractor_1.browser.sleep(wait_1.Wait.normal);
            await anyCcdFormPage.uploadFile('appendix12Doc_documentLink', 'issue3.pdf');
        }
        if (containsFurtherInfo) {
            await anyCcdFormPage.clickElementById('dwpFurtherInfo_Yes');
        }
        else {
            await anyCcdFormPage.clickElementById('dwpFurtherInfo_No');
        }
        if (dwpState === 'YES') {
            await anyCcdFormPage.chooseOptionContainingText('dynamicDwpState', 'Response submitted (FTA)');
        }
        await anyCcdFormPage.chooseOptionContainingText('issueCode', 'EC');
        await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
    }
    async uploadResponseWithoutPhmeDocs(dwpState, isPHME, containsFurtherInfo) {
        await protractor_1.browser.waitForAngular();
        await protractor_1.browser.sleep(wait_1.Wait.long);
        protractor_1.browser.setFileDetector(new remote.FileDetector());
        await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
        if (isPHME) {
            await anyCcdFormPage.chooseOptionContainingText('dwpEditedEvidenceReason', 'Potentially harmful evidence');
        }
        if (containsFurtherInfo) {
            await anyCcdFormPage.clickElementById('dwpFurtherInfo_Yes');
        }
        else {
            await anyCcdFormPage.clickElementById('dwpFurtherInfo_No');
        }
        await anyCcdFormPage.chooseOptionContainingText('issueCode', 'EC');
        if (dwpState === 'YES') {
            await anyCcdFormPage.chooseOptionContainingText('dynamicDwpState', 'Response submitted (FTA)');
        }
        await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
    }
    async uploadDoc(docLink) {
        logger.info('uploading a single doc...');
        await protractor_1.browser.waitForAngular();
        protractor_1.browser.setFileDetector(new remote.FileDetector());
        await anyCcdFormPage.uploadFile(docLink, 'issue1.pdf');
    }
    async uploadResponseWithJointParty(benefitType, disputed, disputedByOthersYesOrNo, dwpFurtherInfoYesOrNo) {
        const dwpState = 'NO';
        await this.uploadResponse(dwpFurtherInfoYesOrNo.toUpperCase(), dwpState, benefitType);
        await anyCcdFormPage.clickContinue();
        await this.elementsDisputedPage(disputed);
        await anyCcdFormPage.clickContinue();
        await this.issueCodePage(disputed);
        await anyCcdFormPage.clickContinue();
        await this.disputedPage(disputedByOthersYesOrNo, 'reference');
        await anyCcdFormPage.clickContinue();
        await this.jointParty('Yes');
        await anyCcdFormPage.clickContinue();
        await this.jointPartyName();
        await anyCcdFormPage.clickContinue();
        await this.jointPartyIdentityDetails();
        await anyCcdFormPage.clickContinue();
        await this.jointPartyAddress('Yes');
        await anyCcdFormPage.clickContinue();
        await protractor_1.browser.sleep(2000);
        (0, chai_1.expect)(await anyCcdFormPage.pageHeadingContains('Check your answers')).to.equal(true);
        await anyCcdFormPage.clickSubmit();
        await protractor_1.browser.sleep(5000);
    }
    async uploadResponseForChildSupport(action) {
        await protractor_1.browser.waitForAngular();
        protractor_1.browser.setFileDetector(new remote.FileDetector());
        await protractor_1.browser.sleep(5000);
        await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
        await anyCcdFormPage.chooseOptionContainingText('dwpEditedEvidenceReason', 'Confidentiality');
        logger.info('uploading edited doc....');
        await anyCcdFormPage.uploadFile('dwpEditedResponseDocument_documentLink', 'issue1.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpEditedEvidenceBundleDocument_documentLink', 'issue2.pdf');
        await anyCcdFormPage.chooseOptionContainingText('benefitCode', '022');
        await anyCcdFormPage.chooseOptionContainingText('issueCode', 'CA');
        await anyCcdFormPage.clickElementById(`dwpFurtherInfo_${action}`);
        await anyCcdFormPage.chooseOptionContainingText('dynamicDwpState', 'Appeal to-be registered');
        await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
        await anyCcdFormPage.clickContinue();
    }
    async uploadResponseForTaxCredit(action, issueCode) {
        await protractor_1.browser.waitForAngular();
        (0, chai_1.expect)(await anyCcdFormPage.pageHeadingContains('Upload response')).to.equal(true);
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        const remote = require('selenium-webdriver/remote');
        protractor_1.browser.setFileDetector(new remote.FileDetector());
        await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
        await protractor_1.browser.sleep(2000);
        await anyCcdFormPage.chooseOptionByElementId('issueCode', issueCode);
        await anyCcdFormPage.clickElementById(`dwpFurtherInfo_${action}`);
        await anyCcdFormPage.chooseOptionByElementId('dynamicDwpState', 'Appeal to-be registered');
        await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
        await anyCcdFormPage.clickContinue();
        await protractor_1.browser.sleep(2000);
        (0, chai_1.expect)(await anyCcdFormPage.pageHeadingContains('Check your answers')).to.equal(true);
        await anyCcdFormPage.clickSubmit();
    }
    async uploadResponseForDla(action, issueCode) {
        await protractor_1.browser.waitForAngular();
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        (0, chai_1.expect)(await anyCcdFormPage.pageHeadingContains('Upload response')).to.equal(true);
        const remote = require('selenium-webdriver/remote');
        protractor_1.browser.setFileDetector(new remote.FileDetector());
        await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
        await protractor_1.browser.sleep(2000);
        await anyCcdFormPage.chooseOptionByElementId('issueCode', issueCode);
        await anyCcdFormPage.clickElementById(`dwpFurtherInfo_${action}`);
        await anyCcdFormPage.chooseOptionByElementId('dynamicDwpState', 'Appeal to-be registered');
        await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
        await anyCcdFormPage.clickContinue();
        await protractor_1.browser.sleep(2000);
        (0, chai_1.expect)(await anyCcdFormPage.pageHeadingContains('Check your answers')).to.equal(true);
        await anyCcdFormPage.clickSubmit();
    }
    async elementsDisputedPage(disputed) {
        await anyCcdFormPage.clickElementById(`elementsDisputedList-${disputed.toLowerCase()}`);
    }
    async issueCodePage(disputed) {
        (0, chai_1.expect)(await anyCcdFormPage.pageHeadingContains('Issue codes')).to.equal(true);
        await anyCcdFormPage.addNewCollectionItem(disputed);
        await anyCcdFormPage.chooseOptionContainingText(`elementsDisputed${disputed}_0_issueCode`, 'AD');
    }
    async disputedPage(yesOrNo, reference) {
        await anyCcdFormPage.clickElementById(`elementsDisputedIsDecisionDisputedByOthers_${yesOrNo}`);
        if (yesOrNo === 'Yes') {
            await (0, protractor_1.element)(protractor_1.by.id('elementsDisputedLinkedAppealRef')).sendKeys(reference);
        }
    }
    async jointParty(yesOrNo) {
        await anyCcdFormPage.clickElementById(`jointParty_${yesOrNo}`);
    }
    async jointPartyName() {
        (0, chai_1.expect)(await anyCcdFormPage.pageHeadingContains('Joint party name')).to.equal(true);
        await anyCcdFormPage.chooseOptionContainingText('jointPartyName_title', 'Mr');
        await (0, protractor_1.element)(protractor_1.by.id('jointPartyName_firstName')).sendKeys('Jp');
        await (0, protractor_1.element)(protractor_1.by.id('jointPartyName_lastName')).sendKeys('Party');
    }
    async jointPartyIdentityDetails() {
        (0, chai_1.expect)(await anyCcdFormPage.pageHeadingContains('Joint party identity details')).to.equal(true);
        await (0, protractor_1.element)(protractor_1.by.id('dob-day')).sendKeys('20');
        await (0, protractor_1.element)(protractor_1.by.id('dob-month')).sendKeys('12');
        await (0, protractor_1.element)(protractor_1.by.id('dob-year')).sendKeys('1980');
        const nino = (0, ni_generator_1.generateNINumber)('C');
        await (0, protractor_1.element)(protractor_1.by.id('jointPartyIdentity_nino')).sendKeys(nino);
    }
    async jointPartyAddress(yesOrNo) {
        await anyCcdFormPage.clickElementById(`jointPartyAddressSameAsAppellant_${yesOrNo}`);
    }
    async uploadResponseWithAV(dwpState, benefitType) {
        await protractor_1.browser.waitForAngular();
        protractor_1.browser.setFileDetector(new remote.FileDetector());
        await protractor_1.browser.sleep(5000);
        await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
        await anyCcdFormPage.clickAddNew();
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpUploadAudioVideoEvidence_0_rip1Document', 'rip1.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdFormPage.uploadFile('dwpUploadAudioVideoEvidence_0_documentLink', 'test_av.mp3');
        await anyCcdFormPage.clickElementById('dwpFurtherInfo_No');
        await anyCcdFormPage.clickElementById('dwpUCB_No');
        await anyCcdFormPage.chooseOptionContainingText('benefitCode', '002');
        await anyCcdFormPage.chooseOptionContainingText('issueCode', 'EC');
        await anyCcdFormPage.chooseOptionContainingText('dwpFurtherEvidenceStates', 'No action');
        await anyCcdFormPage.chooseOptionContainingText('dynamicDwpState', 'Response submitted (FTA)');
        await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
    }
    async addOtherParties() {
        await anyCcdFormPage.clickAddNew();
        await anyCcdFormPage.fillValues('otherParties_0_name_firstName', 'Other');
        await anyCcdFormPage.fillValues('otherParties_0_name_lastName', 'Tester');
        await anyCcdFormPage.fillValues('otherParties_0_address_line1', '101, test');
        await anyCcdFormPage.fillValues('otherParties_0_address_town', 'test');
        await anyCcdFormPage.fillValues('otherParties_0_address_postcode', 'TS2 2ST');
        await anyCcdFormPage.clickElementById('otherParties_0_confidentialityRequired_No');
        await anyCcdFormPage.clickElementById('otherParties_0_unacceptableCustomerBehaviour_No');
        await anyCcdFormPage.chooseOptionContainingText('otherParties_0_role_name', 'Paying parent');
        await anyCcdFormPage.clickContinue();
        await anyCcdFormPage.clickSubmit();
    }
}
exports.DwpResponsePage = DwpResponsePage;
//# sourceMappingURL=dwpresponse.page.js.map
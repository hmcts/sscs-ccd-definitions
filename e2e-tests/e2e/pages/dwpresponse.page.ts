/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-shadow */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { browser, by, element } from 'protractor';
import { AnyPage } from './any.page';
import { AnyCcdFormPage } from './any-ccd-form.page';
import { generateNINumber } from '../helpers/ni-generator';
import { expect } from 'chai';
import { Logger } from '@hmcts/nodejs-logging';

import * as remote from 'selenium-webdriver/remote';
import { Wait } from '../enums/wait';

const logger = Logger.getLogger('dwpresponse.page.ts');

const anyCcdFormPage = new AnyCcdFormPage();

export class DwpResponsePage extends AnyPage {
  async uploadResponse(action: string, dwpState: string, benefitType: string) {
    await browser.waitForAngular();
    browser.setFileDetector(new remote.FileDetector());
    await browser.sleep(5000);
    await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
    if (action === 'YES') {
      await anyCcdFormPage.clickElementById('dwpFurtherInfo_Yes');
    } else {
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

  async esaUploadResponse(action: string) {
    await browser.waitForAngular();
    browser.setFileDetector(new remote.FileDetector());
    await browser.sleep(5000);
    await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
    if (action === 'YES') {
      await anyCcdFormPage.clickElementById('dwpFurtherInfo_Yes');
    } else {
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

  async uploadOnlyResponseAndEvidence(action: string, dwpState: string, benefitType: string) {
    await browser.waitForAngular();
    await browser.sleep(Wait.long);
    browser.setFileDetector(new remote.FileDetector());
    await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
    if (action === 'YES') {
      await anyCcdFormPage.clickElementById('dwpFurtherInfo_Yes');
    } else {
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

  async uploadResponseWithUcbAndPhme(
    dwpState: string,
    docLink: string,
    isUCB: boolean,
    isPHME: boolean,
    containsFurtherInfo
  ) {
    await browser.waitForAngular();
    browser.setFileDetector(new remote.FileDetector());
    await browser.sleep(Wait.short);
    await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
    if (isUCB) {
      await anyCcdFormPage.clickElementById('dwpUCB_Yes');
      logger.info('uploading ucb doc....');
      await browser.sleep(Wait.normal);
      await anyCcdFormPage.uploadFile(docLink, 'issue3.pdf');
    }

    if (isPHME) {
      await anyCcdFormPage.chooseOptionContainingText('dwpEditedEvidenceReason', 'Potentially harmful evidence');
      logger.info('uploading edited doc....');
      await anyCcdFormPage.uploadFile('dwpEditedResponseDocument_documentLink', 'issue1.pdf');
      await browser.sleep(Wait.normal);
      await anyCcdFormPage.uploadFile('dwpEditedEvidenceBundleDocument_documentLink', 'issue2.pdf');
      await browser.sleep(Wait.normal);
      await anyCcdFormPage.uploadFile('appendix12Doc_documentLink', 'issue3.pdf');
    }

    if (containsFurtherInfo) {
      await anyCcdFormPage.clickElementById('dwpFurtherInfo_Yes');
    } else {
      await anyCcdFormPage.clickElementById('dwpFurtherInfo_No');
    }
    if (dwpState === 'YES') {
      await anyCcdFormPage.chooseOptionContainingText('dynamicDwpState', 'Response submitted (FTA)');
    }
    await anyCcdFormPage.chooseOptionContainingText('issueCode', 'EC');
    await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
  }

  async uploadResponseWithoutPhmeDocs(dwpState: string, isPHME: boolean, containsFurtherInfo: string) {
    await browser.waitForAngular();
    await browser.sleep(Wait.long);
    browser.setFileDetector(new remote.FileDetector());
    await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');

    if (isPHME) {
      await anyCcdFormPage.chooseOptionContainingText('dwpEditedEvidenceReason', 'Potentially harmful evidence');
    }

    if (containsFurtherInfo) {
      await anyCcdFormPage.clickElementById('dwpFurtherInfo_Yes');
    } else {
      await anyCcdFormPage.clickElementById('dwpFurtherInfo_No');
    }
    await anyCcdFormPage.chooseOptionContainingText('issueCode', 'EC');
    if (dwpState === 'YES') {
      await anyCcdFormPage.chooseOptionContainingText('dynamicDwpState', 'Response submitted (FTA)');
    }
    await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
  }

  async uploadDoc(docLink: string) {
    logger.info('uploading a single doc...');
    await browser.waitForAngular();
    browser.setFileDetector(new remote.FileDetector());
    await anyCcdFormPage.uploadFile(docLink, 'issue1.pdf');
  }

  async uploadResponseWithJointParty(
    benefitType: string,
    disputed: string,
    disputedByOthersYesOrNo: string,
    dwpFurtherInfoYesOrNo: string
  ) {
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
    await browser.sleep(2000);
    expect(await anyCcdFormPage.pageHeadingContains('Check your answers')).to.equal(true);
    await anyCcdFormPage.clickSubmit();
    await browser.sleep(5000);
  }

  async uploadResponseForChildSupport(action: string) {
    await browser.waitForAngular();
    browser.setFileDetector(new remote.FileDetector());
    await browser.sleep(5000);
    await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
    await anyCcdFormPage.chooseOptionContainingText('dwpEditedEvidenceReason', 'Confidentiality');
    logger.info('uploading edited doc....');
    await anyCcdFormPage.uploadFile('dwpEditedResponseDocument_documentLink', 'issue1.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpEditedEvidenceBundleDocument_documentLink', 'issue2.pdf');
    await anyCcdFormPage.chooseOptionContainingText('benefitCode', '022');
    await anyCcdFormPage.chooseOptionContainingText('issueCode', 'CA');
    await anyCcdFormPage.clickElementById(`dwpFurtherInfo_${action}`);
    await anyCcdFormPage.chooseOptionContainingText('dynamicDwpState', 'Appeal to-be registered');
    await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
    await anyCcdFormPage.clickContinue();
  }

  async uploadResponseForTaxCredit(action: string, issueCode: string) {
    await browser.waitForAngular();
    expect(await anyCcdFormPage.pageHeadingContains('Upload response')).to.equal(true);
    await browser.sleep(Wait.normal);
    const remote = require('selenium-webdriver/remote');

    browser.setFileDetector(new remote.FileDetector());
    await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');

    await browser.sleep(2000);
    await anyCcdFormPage.chooseOptionByElementId('issueCode', issueCode);
    await anyCcdFormPage.clickElementById(`dwpFurtherInfo_${action}`);
    await anyCcdFormPage.chooseOptionByElementId('dynamicDwpState', 'Appeal to-be registered');
    await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
    await anyCcdFormPage.clickContinue();
    await browser.sleep(2000);
    expect(await anyCcdFormPage.pageHeadingContains('Check your answers')).to.equal(true);
    await anyCcdFormPage.clickSubmit();
  }

  async uploadResponseForDla(action: string, issueCode: string) {
    await browser.waitForAngular();
    await browser.sleep(Wait.normal);
    expect(await anyCcdFormPage.pageHeadingContains('Upload response')).to.equal(true);
    const remote = require('selenium-webdriver/remote');

    browser.setFileDetector(new remote.FileDetector());
    await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');

    await browser.sleep(2000);
    await anyCcdFormPage.chooseOptionByElementId('issueCode', issueCode);
    await anyCcdFormPage.clickElementById(`dwpFurtherInfo_${action}`);
    await anyCcdFormPage.chooseOptionByElementId('dynamicDwpState', 'Appeal to-be registered');
    await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
    await anyCcdFormPage.clickContinue();
    await browser.sleep(2000);
    expect(await anyCcdFormPage.pageHeadingContains('Check your answers')).to.equal(true);
    await anyCcdFormPage.clickSubmit();
  }

  async elementsDisputedPage(disputed: string) {
    await anyCcdFormPage.clickElementById(`elementsDisputedList-${disputed.toLowerCase()}`);
  }

  async issueCodePage(disputed: string) {
    expect(await anyCcdFormPage.pageHeadingContains('Issue codes')).to.equal(true);
    await anyCcdFormPage.addNewCollectionItem(disputed);
    await anyCcdFormPage.chooseOptionContainingText(`elementsDisputed${disputed}_0_issueCode`, 'AD');
  }

  async disputedPage(yesOrNo: string, reference?: string) {
    await anyCcdFormPage.clickElementById(`elementsDisputedIsDecisionDisputedByOthers_${yesOrNo}`);
    if (yesOrNo === 'Yes') {
      await element(by.id('elementsDisputedLinkedAppealRef')).sendKeys(reference);
    }
  }

  async jointParty(yesOrNo: string) {
    await anyCcdFormPage.clickElementById(`jointParty_${yesOrNo}`);
  }

  async jointPartyName() {
    expect(await anyCcdFormPage.pageHeadingContains('Joint party name')).to.equal(true);
    await anyCcdFormPage.chooseOptionContainingText('jointPartyName_title', 'Mr');
    await element(by.id('jointPartyName_firstName')).sendKeys('Jp');
    await element(by.id('jointPartyName_lastName')).sendKeys('Party');
  }

  async jointPartyIdentityDetails() {
    expect(await anyCcdFormPage.pageHeadingContains('Joint party identity details')).to.equal(true);
    await element(by.id('dob-day')).sendKeys('20');
    await element(by.id('dob-month')).sendKeys('12');
    await element(by.id('dob-year')).sendKeys('1980');

    const nino = generateNINumber('C');
    await element(by.id('jointPartyIdentity_nino')).sendKeys(nino);
  }

  async jointPartyAddress(yesOrNo: string) {
    await anyCcdFormPage.clickElementById(`jointPartyAddressSameAsAppellant_${yesOrNo}`);
  }

  async uploadResponseWithAV(dwpState: string, benefitType: string) {
    await browser.waitForAngular();
    browser.setFileDetector(new remote.FileDetector());
    await browser.sleep(5000);
    await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');

    await anyCcdFormPage.clickAddNew();
    await browser.sleep(Wait.normal);
    await anyCcdFormPage.uploadFile('dwpUploadAudioVideoEvidence_0_rip1Document', 'rip1.pdf');
    await browser.sleep(Wait.normal);
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

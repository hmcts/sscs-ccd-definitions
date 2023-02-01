import { browser, by, element } from 'protractor';
import { AnyPage } from './any.page';
import { AnyCcdFormPage } from './any-ccd-form.page';
import { generateNINumber } from '../helpers/ni-generator';
import { expect } from 'chai';
import { Logger } from '@hmcts/nodejs-logging';

import * as remote from 'selenium-webdriver/remote';

const logger = Logger.getLogger('dwpresponse.page.ts');

const anyCcdFormPage = new AnyCcdFormPage();

export class DwpResponsePage extends AnyPage {
  async uploadResponse(action: string, dwpState: string, benefitType: string) {
    await browser.waitForAngular();
    browser.setFileDetector(new remote.FileDetector());
    await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
    await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
    await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
    if (action === 'YES') {
      await anyCcdFormPage.clickElementById('dwpFurtherInfo_Yes');
    } else {
      await anyCcdFormPage.clickElementById('dwpFurtherInfo_No');
      await anyCcdFormPage.clickElementById('dwpUCB_No');
    }
    if (dwpState === 'YES' && benefitType !== 'UC') {
      await anyCcdFormPage.chooseOptionContainingText('benefitCode', '001');
      await anyCcdFormPage.clickElementById('dwpUCB_No');
      await anyCcdFormPage.chooseOptionContainingText('dwpFurtherEvidenceStates', 'No action');
      await anyCcdFormPage.chooseOptionContainingText('dwpState', 'Response submitted (FTA)');
    }
    await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
  }

  async uploadOnlyResponseAndEvidence(action: string, dwpState: string, benefitType: string) {
    await browser.waitForAngular();
    browser.setFileDetector(new remote.FileDetector());
    await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
    await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
    if (action === 'YES') {
      await anyCcdFormPage.clickElementById('dwpFurtherInfo_Yes');
    } else {
      await anyCcdFormPage.clickElementById('dwpFurtherInfo_No');
      await anyCcdFormPage.clickElementById('dwpUCB_No');
    }
    if (dwpState === 'YES' && benefitType !== 'UC') {
      await anyCcdFormPage.chooseOptionContainingText('benefitCode', '001');
      await anyCcdFormPage.clickElementById('dwpUCB_No');
      await anyCcdFormPage.chooseOptionContainingText('dwpFurtherEvidenceStates', 'No action');
      await anyCcdFormPage.chooseOptionContainingText('dwpState', 'Response submitted (FTA)');
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
    await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
    await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
    await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
    if (isUCB) {
      await anyCcdFormPage.clickElementById('dwpUCB_Yes');
      logger.info('uploading ucb doc....');
      await anyCcdFormPage.uploadFile(docLink, 'issue3.pdf');
    }

    if (isPHME) {
      await anyCcdFormPage.chooseOptionContainingText('dwpEditedEvidenceReason', 'Potentially harmful evidence');
      logger.info('uploading edited doc....');
      await anyCcdFormPage.uploadFile('dwpEditedResponseDocument_documentLink', 'issue1.pdf');
      await anyCcdFormPage.uploadFile('dwpEditedEvidenceBundleDocument_documentLink', 'issue2.pdf');
      await anyCcdFormPage.uploadFile('appendix12Doc_documentLink', 'issue3.pdf');
    }

    if (containsFurtherInfo) {
      await anyCcdFormPage.clickElementById('dwpFurtherInfo_Yes');
    } else {
      await anyCcdFormPage.clickElementById('dwpFurtherInfo_No');
    }
    if (dwpState === 'YES') {
      await anyCcdFormPage.chooseOptionContainingText('dwpState', 'Response submitted (FTA)');
    }
    await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
  }

  async uploadResponseWithoutPhmeDocs(dwpState: string, isPHME: boolean, containsFurtherInfo) {
    await browser.waitForAngular();
    browser.setFileDetector(new remote.FileDetector());
    await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
    await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
    await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');

    if (isPHME) {
      await anyCcdFormPage.chooseOptionContainingText('dwpEditedEvidenceReason', 'Potentially harmful evidence');
    }

    if (containsFurtherInfo) {
      await anyCcdFormPage.clickElementById('dwpFurtherInfo_Yes');
    } else {
      await anyCcdFormPage.clickElementById('dwpFurtherInfo_No');
    }
    if (dwpState === 'YES') {
      await anyCcdFormPage.chooseOptionContainingText('dwpState', 'Response submitted (FTA)');
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
    expect(await anyCcdFormPage.pageHeadingContains('Check your answers')).to.equal(true);
    await anyCcdFormPage.clickSubmit();
  }

  async uploadResponseForChildSupport(action: string) {
    await browser.waitForAngular();
    browser.setFileDetector(new remote.FileDetector());
    await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
    await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
    await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
    await anyCcdFormPage.chooseOptionContainingText('dwpEditedEvidenceReason', 'Confidentiality');
    logger.info('uploading edited doc....');
    await anyCcdFormPage.uploadFile('dwpEditedResponseDocument_documentLink', 'issue1.pdf');
    await anyCcdFormPage.uploadFile('dwpEditedEvidenceBundleDocument_documentLink', 'issue2.pdf');
    await anyCcdFormPage.chooseOptionContainingText('benefitCode', '022');
    await anyCcdFormPage.chooseOptionContainingText('issueCode', 'AA');
    await anyCcdFormPage.clickElementById(`dwpFurtherInfo_${action}`);
    await anyCcdFormPage.chooseOptionContainingText('dwpState', 'Appeal to-be registered');
    await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
    await anyCcdFormPage.clickContinue();
  }

  async uploadResponseForTaxCredit(action: string) {
    await browser.waitForAngular();
    browser.setFileDetector(new remote.FileDetector());
    await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
    await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
    await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');
    await anyCcdFormPage.chooseOptionContainingText('issueCode', 'AA');
    await anyCcdFormPage.clickElementById(`dwpFurtherInfo_${action}`);
    await anyCcdFormPage.chooseOptionContainingText('dwpState', 'Appeal to-be registered');
    await anyCcdFormPage.clickElementById('dwpIsOfficerAttending_No');
    await anyCcdFormPage.clickContinue();
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

  async disputedPage(yesOrNo: string, reference: string) {
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
    await anyCcdFormPage.uploadFile('dwpResponseDocument_documentLink', 'issue1.pdf');
    await anyCcdFormPage.uploadFile('dwpAT38Document_documentLink', 'issue2.pdf');
    await anyCcdFormPage.uploadFile('dwpEvidenceBundleDocument_documentLink', 'issue3.pdf');

    await anyCcdFormPage.clickAddNew();
    await anyCcdFormPage.uploadFile('dwpUploadAudioVideoEvidence_0_rip1Document', 'rip1.pdf');
    await anyCcdFormPage.uploadFile('dwpUploadAudioVideoEvidence_0_documentLink', 'test_av.mp3');

    await anyCcdFormPage.clickElementById('dwpFurtherInfo_No');
    await anyCcdFormPage.clickElementById('dwpUCB_No');
    await anyCcdFormPage.chooseOptionContainingText('benefitCode', '001');
    await anyCcdFormPage.chooseOptionContainingText('dwpFurtherEvidenceStates', 'No action');
    await anyCcdFormPage.chooseOptionContainingText('dwpState', 'Response submitted (FTA)');
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

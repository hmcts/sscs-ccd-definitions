import { AnyCcdPage } from '../../pages/any-ccd.page';
import { AnyCcdFormPage } from '../../pages/any-ccd-form.page';
import { CaseDetailsPage } from '../../pages/case-details.page';
import { generateNINumber } from '../../helpers/ni-generator';
import { DwpOffice } from '../../helpers/dwp-office';
import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { browser } from 'protractor';
import * as ccd from '../../helpers/ccd';
import { faker } from '@faker-js/faker/locale/en_GB';
import { Logger } from '@hmcts/nodejs-logging';

import { formData } from '../data/scannedCase';

import { incompleteFormData } from '../data/incompleteScannedCase';

import { sscsPeuFormData } from '../data/sscs1PeuCase';
import { Wait } from '../../enums/wait';

const anyCcdPage = new AnyCcdPage();
const anyCcdFormPage = new AnyCcdFormPage();
const caseDetailsPage = new CaseDetailsPage();

const logger = Logger.getLogger('bulk-scanning-steps.ts');

const dwpOffice = new DwpOffice();
let caseReference: string = null;

async function addDataItems(benefitCode: string, formType: string): Promise<void> {
  const promises: Array<Promise<void>> = [];
  const testData = formType === 'SSCSPE' ? formData : sscsPeuFormData;
  for (let i = 0; i < testData.length; i++) {
    if (testData[i].question === 'person1_nino') {
      testData[i].answer = generateNINumber();
    }
    if (formData[i].question === 'benefit_type_description') {
      formData[i].answer = benefitCode;
    }
    if (formData[i].question === 'office') {
      formData[i].answer = dwpOffice.officeCode(benefitCode);
    }
    promises.push(anyCcdFormPage.addNewOCRCollectionItem());
    promises.push(anyCcdFormPage.setCollectionItemFieldValue('Form OCR Data', i + 1, 'Key', testData[i].question));
    promises.push(
      anyCcdFormPage.setCollectionItemFieldValue('Form OCR Data', i + 1, 'Value (Optional)', testData[i].answer)
    );
  }
  await Promise.all(promises);
}

async function addIncompleteDataItems(): Promise<void> {
  const promises: Array<Promise<void>> = [];
  for (let i = 0; i < incompleteFormData.length; i++) {
    if (incompleteFormData[i].question === 'person1_nino') {
      incompleteFormData[i].answer = generateNINumber();
    }
    promises.push(anyCcdFormPage.addNewCollectionItem('Form OCR Data'));
    promises.push(
      anyCcdFormPage.setCollectionItemFieldValue('Form OCR Data', i + 1, 'Key', incompleteFormData[i].question)
    );
    promises.push(
      anyCcdFormPage.setCollectionItemFieldValue(
        'Form OCR Data',
        i + 1,
        'Value (Optional)',
        incompleteFormData[i].answer
      )
    );
  }
  await Promise.all(promises);
}

async function checkIncompleteDataItems(): Promise<void> {
  const promises: Array<Promise<boolean>> = [];
  for (let i = 0; i < incompleteFormData.length; i++) {
    promises.push(
      caseDetailsPage.isCollectionItemFieldValueDisplayed('Form OCR Data', i + 1, 'Key', incompleteFormData[i].question)
    );
  }
  const areFieldsDisplayed: Array<boolean> = await Promise.all(promises);
  areFieldsDisplayed.forEach((isFieldDisplayed) => expect(isFieldDisplayed).to.equal(true));
}

async function enterMrnDate(): Promise<void> {
  await caseDetailsPage.addDayItems('caseCreated');
  await anyCcdPage.chooseOptionByValue('appeal_receivedVia', '1: Paper');
  await caseDetailsPage.addDayItems('mrnDate');
}

async function enterAppellantDetails(): Promise<void> {
  await anyCcdPage.fillValues('appeal_appellant_name_title', 'Mr');
  await anyCcdPage.fillValues('appeal_appellant_name_firstName', faker.name.firstName());
  await anyCcdPage.fillValues('appeal_appellant_name_lastName', faker.name.lastName());
  await anyCcdPage.fillValues('dob-day', '10');
  await anyCcdPage.fillValues('dob-month', '3');
  await anyCcdPage.fillValues('dob-year', '1988');
  await anyCcdPage.fillValues('appeal_appellant_identity_nino', generateNINumber());
}

async function enterAddressDetails(): Promise<void> {
  await anyCcdPage.fillValues('appeal_appellant_address_line1', '1000, test');
  await anyCcdPage.fillValues('appeal_appellant_address_line2', faker.address.streetAddress());
  await anyCcdPage.fillValues('appeal_appellant_address_line3', 'test');
  await anyCcdPage.fillValues('appeal_appellant_address_town', faker.address.city());
  await anyCcdPage.fillValues('appeal_appellant_address_postcode', 'TS1 1ST');
}

async function enterBenefitDetails(): Promise<void> {
  await anyCcdPage.chooseOptionByValue('appeal_appellant_role_name', '1: payingParent');
  await anyCcdPage.fillValues('appeal_benefitType_code', 'childSupport');
  await anyCcdPage.fillValues('appeal_benefitType_description', 'Child Support');
  await anyCcdPage.chooseOptionByValue('appeal_hearingType', '3: paper');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
}

async function createSSCSCase(): Promise<void> {
  await anyCcdPage.chooseOptionByValue('cc-case-type', 'Benefit');
  await anyCcdPage.chooseOptionByValue('cc-event', 'validAppealCreated');
  await anyCcdPage.clickButton('Start');

  await enterMrnDate();
  await enterAppellantDetails();
  await enterAddressDetails();
  await enterBenefitDetails();
}

Given('I create an child support case', async function () {
  await anyCcdPage.clickCreateCase();
  expect(await anyCcdPage.pageHeadingContains('Create Case')).to.equal(true);
  await createSSCSCase();

  await caseDetailsPage.doNextStep('Admin - update event');
  await anyCcdPage.clickNextStep();
  await anyCcdPage.chooseOptionByValue('createdInGapsFrom', '1: readyToList');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
});

Given(
  'I have a {word} bulk-scanned document with {word} fields',
  { timeout: 600 * 1000 },
  async function (benefitCode: string, formType: string): Promise<void> {
    await anyCcdPage.clickCreateCase();
    expect(await anyCcdPage.pageHeadingContains('Create Case')).to.equal(true);
    await anyCcdFormPage.setCreateCaseFieldValue('Case type', 'SSCS Bulkscanning');
    await anyCcdPage.clickButton('Start');

    expect(await anyCcdPage.pageHeadingContains('Envelope meta data')).to.equal(true);

    await caseDetailsPage.addEnvelopeDataItems(
      'NEW_APPLICATION',
      '123456',
      'test_po-box-jurisdiction',
      'test_envelope'
    );
    await caseDetailsPage.addDateItems('deliveryDate');
    await caseDetailsPage.addDateItems('openingDate');

    await addDataItems(benefitCode, formType);
    if (formType === 'SSCSPE') {
      await caseDetailsPage.addFormType('SSCS1PE');
    } else {
      await caseDetailsPage.addFormType('SSCS1PEU');
    }
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickSubmit();
    expect(await caseDetailsPage.getAlertMessage()).to.equal('has been created');
    const fieldValue = await caseDetailsPage.getFieldValue('Event');
    expect(fieldValue).to.equal('Create an exception record');
  }
);

Given('I have a PIP bulk-scanned document filled with incomplete fields', async function () {
  await anyCcdPage.clickCreateCase();
  expect(await anyCcdPage.pageHeadingContains('Create Case')).to.equal(true);
  await anyCcdFormPage.setCreateCaseFieldValue('Case type', 'SSCS Bulkscanning');
  await anyCcdPage.clickButton('Start');

  expect(await anyCcdPage.pageHeadingContains('Envelope meta data')).to.equal(true);

  await caseDetailsPage.addEnvelopeDataItems('NEW_APPLICATION', '123456', 'test_po-box-jurisdiction', 'test_envelope');
  await caseDetailsPage.addDateItems('deliveryDate');
  await caseDetailsPage.addDateItems('openingDate');

  await addIncompleteDataItems();
  await caseDetailsPage.addFormType('test_form_type');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();

  expect(await caseDetailsPage.getAlertMessage()).to.equal('has been created');
  const fieldValue = await caseDetailsPage.getFieldValue('Event');
  expect(fieldValue).to.equal('Create an exception record');
  await anyCcdPage.clickTab('Form OCR');
  await checkIncompleteDataItems();
});

When('I choose {string} for an incomplete application', async function (action) {
  await caseDetailsPage.doNextStep(action);
  await anyCcdPage.clickNextStep();
  expect(await anyCcdPage.pageHeadingContains(action)).to.equal(true);

  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Create new case from exception')).to.equal(true);

  await anyCcdPage.clickSubmit();
  await anyCcdPage.clickIgnoreWarning();
  // expect(await anyCcdPage.pageHeadingContains('History')).to.equal(true);
});

When('I choose the next step {string}', async function (action) {
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
  expect(await anyCcdPage.pageHeadingContains(action)).to.equal(true);

  if (action === 'Create new case from exception') {
    await anyCcdPage.clickContinue();
    expect(await anyCcdPage.pageHeadingContains('Create new case from exception')).to.equal(true);
  }
  await anyCcdPage.clickSubmit();

  expect(await anyCcdPage.pageHeadingContains('History')).to.equal(true);
});

Then('the case should be in {string} state', async function (state: string): Promise<void> {
  await anyCcdPage.waitForEndState(state);
  await browser.manage().window().maximize();
});

Then('the {string} event should be successfully listed in the History', async function (event: string) {
  await caseDetailsPage.reloadPage();
  await browser.manage().window().maximize();
  let events = await caseDetailsPage.getHistoryEvents();
  if (events.includes(event)) {
    await browser.sleep(Wait.normal);
    await caseDetailsPage.reloadPage();
    events = await caseDetailsPage.getHistoryEvents();
  }
  expect(events).to.include(event);
});

Then('the case bundle details should be listed in {string} tab', async function (tabName) {
  await anyCcdPage.clickTab(tabName);
  const switchStatus = await caseDetailsPage.getFieldValue('Stitch status');
  expect(switchStatus).to.equal('DONE');
  const configUsed = await caseDetailsPage.getFieldValue('Config used for bundle');
  expect(configUsed).to.equal('SSCS Bundle Original');
});

Then('the {string} bundle configuration should have been used', async function (value) {
  const fieldValue = await caseDetailsPage.getFieldValues('Config used for bundle');
  expect(fieldValue).to.include(value);
});

Given('I preset up a test case', async function () {
  const ccdCreatedCase = await ccd.createCase('oral');
  caseReference = ccdCreatedCase.id;
});

Given('I presetup an {string} SYA case', async function (caseType) {
  caseReference = await ccd.createSYACase(caseType);
  await browser.sleep(Wait.normal);
});

Given('I navigate to an existing case', async function () {
  logger.info(`the saved case id is ${caseReference}`);
  await anyCcdPage.get(`/v2/case/${caseReference}`);
  await anyCcdPage.waitForSpinner();
});

Given('I complete the event', async function () {
  await anyCcdPage.clickSubmit();
});

When('I choose execute CCD event {string}', async function (action) {
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

Then('the interloc state should be in {string}', async function (interlocState: string) {
  await anyCcdPage.clickTab('History');
  expect(await anyCcdPage.getFieldValue('Interlocutory review state')).to.equal(interlocState);
});

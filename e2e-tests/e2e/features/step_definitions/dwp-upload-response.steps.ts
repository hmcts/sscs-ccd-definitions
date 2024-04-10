import { AnyCcdFormPage } from '../../pages/any-ccd-form.page';
import { CaseDetailsPage } from '../../pages/case-details.page';
import { Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { DwpResponsePage } from '../../pages/dwpresponse.page';
import config from 'config';
import { Logger } from '@hmcts/nodejs-logging';
import moment from 'moment';
import { browser } from 'protractor';

const anyCcdPage = new AnyCcdFormPage();
const caseDetailsPage = new CaseDetailsPage();
const dwpresponse = new DwpResponsePage();

const logger = Logger.getLogger('dwp-upload-response.steps');

const formattedDate = moment().format('DD-MM-YYYY');

When('I choose {string}', async function (action) {
  if (
    action === 'Write adjournment notice' ||
    action === 'Not listable' ||
    action === 'Update not listable' ||
    action === 'Upload hearing recording'
  ) {
    await anyCcdPage.reloadPage();
  }
  await caseDetailsPage.doNextStep(action);
  if (config.get('tests.crossBrowser')) {
    await anyCcdPage.clickNextStep();
  } else {
    await anyCcdPage.clickNextStep();
    expect(await anyCcdPage.pageHeadingContains(action)).to.equal(true);
  }
});

When(
  'I upload contains further information {string} for {string}',
  async function (action: string, benefitType: string) {
    const dwpState = 'YES';
    await dwpresponse.uploadResponse(action, dwpState, benefitType);
    await anyCcdPage.scrollBar('//div/form/div/button[2]');
    if (benefitType === 'UC') {
      await anyCcdPage.clickElementById('elementsDisputedList-general');
      await anyCcdPage.clickContinue();
      expect(await anyCcdPage.pageHeadingContains('Issue codes')).to.equal(true);
      await anyCcdPage.addNewCollectionItem('General');
      await anyCcdPage.selectGeneralIssueCode();
      await anyCcdPage.clickContinue();
      await anyCcdPage.clickElementById('elementsDisputedIsDecisionDisputedByOthers_No');
      await anyCcdPage.clickContinue();
      await anyCcdPage.clickElementById('jointParty_No');
      await anyCcdPage.clickContinue();
    }
    await anyCcdPage.clickSubmit();
  }
);

When('I perform upload contains further information {string} on a esa case', async function (action: string) {
  await dwpresponse.esaUploadResponse(action);
  await anyCcdPage.scrollBar('//div/form/div/button[2]');
  await anyCcdPage.clickSubmit();
});

When('I upload only evidence and original documents', async function () {
  const dwpState = 'YES';
  const benefitType = 'PIP';
  await dwpresponse.uploadOnlyResponseAndEvidence('No', dwpState, benefitType);
  // await anyCcdPage.selectIssueCode();
  await browser.sleep(2000);
  await anyCcdPage.scrollBar('//div/form/div/button[2]');
});

When('I upload with default issue code', async function () {
  const dwpState = 'YES';
  await dwpresponse.uploadResponse('No', dwpState, 'PIP');
  await anyCcdPage.scrollBar('//div/form/div/button[2]');
  await anyCcdPage.clickSubmit();
});

Then('I should see {string} error message', async function (errMsg: string) {
  const errorMessages = await anyCcdPage.getCcdErrorMessages();
  logger.info(errorMessages.join('\n'));
  expect(errorMessages.join('\n')).to.contain(errMsg);
});

When(
  'I respond to the appeal with upload contains further information {string} option',
  async function (action: string) {
    await dwpresponse.uploadResponseForChildSupport(action);
    await dwpresponse.addOtherParties();
  }
);

When(
  'I respond to the dla appeal with upload contains further information {string} option and {string} issue code',
  async function (action: string, issueCode: string) {
    await dwpresponse.uploadResponseForDla(action, issueCode);
  }
);

When(
  'I respond to the taxCredit appeal with upload contains further information {string} option and {string} issue code',
  async function (action: string, issueCode: string) {
    await dwpresponse.uploadResponseForTaxCredit(action, issueCode);
  }
);

When(
  'I respond to the appeal with upload contains further information {string} option and {string} issue code',
  async function (action: string, issueCode: string) {
    await dwpresponse.uploadResponseForTaxCredit(action, issueCode);
  }
);

When(
  'dwp responds requesting {string} for the uploads contains further info option',
  async function (action: string, issueCode: string) {
    await dwpresponse.uploadResponseForTaxCredit(action, issueCode);
  }
);

When(
  'I upload {word} further information with disputed {word} disputed by others {word} and further info {word}',
  async function (benefitType, disputed, disputedByOthersYesOrNo, dwpFurtherInfoYesOrNo) {
    await dwpresponse.uploadResponseWithJointParty(
      benefitType,
      disputed,
      disputedByOthersYesOrNo,
      dwpFurtherInfoYesOrNo
    );
  }
);

Then('the case should be in {string} appeal status', async function (state: string) {
  expect(await anyCcdPage.contentContains(state)).to.equal(true);
});

Then('the case should end in {string} state', async function (state: string) {
  await anyCcdPage.waitForEndState(state);
});

Then('FTA documents should be seen against the case', async function () {
  await anyCcdPage.clickTab('FTA Documents');

  const documentTypes = await anyCcdPage.getFieldValues('Document type');
  expect(documentTypes).to.include('FTA evidence bundle');
  expect(documentTypes).to.include('FTA response');
  expect(documentTypes).to.include('AT38');

  const originalDocumentUrls = await anyCcdPage.getFieldValues('Original document Url');
  expect(originalDocumentUrls).to.include(`FTA evidence received on ${formattedDate}.pdf`);
  expect(originalDocumentUrls).to.include(`AT38 received on ${formattedDate}.pdf`);
});

Then('FTA edited documents should be seen against the case', async function () {
  await anyCcdPage.clickTab('FTA Documents');

  const documentTypes = await anyCcdPage.getFieldValues('Document type');
  expect(documentTypes).to.include('FTA evidence bundle');
  expect(documentTypes).to.include('FTA response');

  const originalDocumentUrls = await anyCcdPage.getFieldValues('Original document Url');
  expect(originalDocumentUrls).to.include(`FTA evidence received on ${formattedDate}.pdf`);
});

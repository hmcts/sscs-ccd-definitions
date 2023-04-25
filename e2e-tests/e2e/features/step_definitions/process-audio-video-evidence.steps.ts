import { Given, Then, When } from '@cucumber/cucumber';
import { by, element } from 'protractor';
import { expect } from 'chai';

import { CaseDetailsPage } from '../../pages/case-details.page';
import { AnyCcdFormPage } from '../../pages/any-ccd-form.page';
import { DwpResponsePage } from '../../pages/dwpresponse.page';

const caseDetailsPage = new CaseDetailsPage();
const anyCcdPage = new AnyCcdFormPage();
const dwpresponse = new DwpResponsePage();

When('I upload AV evidence and complete Upload response event for {string} case', async function (benefitType) {
  const dwpState = 'YES';
  await dwpresponse.uploadResponseWithAV(dwpState, benefitType);
  await anyCcdPage.selectIssueCode();
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
});

Then('I should see the AV evidence after clicking the AV tab', async function () {
  await anyCcdPage.clickTab('Audio/Video evidence');
  const fieldValue = await caseDetailsPage.getFieldValue('Audio/video document url');
  expect(fieldValue).to.equal('test_av.mp3');
});

Then('I should see the RIP1 document', async function () {
  const fieldValue = await caseDetailsPage.getFieldValue('RIP 1 document');
  expect(fieldValue).to.equal('rip1.pdf');
});

Then('I should see that the AV evidence was uploaded by {string}', async function (party) {
  const fieldValue = await caseDetailsPage.getFieldValue('Audio/video party uploaded');
  expect(fieldValue).to.equal(party);
});

When('I process the AV evidence using the {string} action', async function (action) {
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.contentContains('Selected Audio/Video Evidence Details')).to.equal(true);
  await anyCcdPage.chooseOptionContainingText('processAudioVideoAction', action);
  await element(by.id('directionNoticeContent')).sendKeys('Body test content');
  await element(by.id('signedBy')).sendKeys('Signed by test content');
  await element(by.id('signedRole')).sendKeys('Signed role test content');
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.contentContains('Preview Document')).to.equal(true);
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.contentContains('Event summary (optional)')).to.equal(true);
  await anyCcdPage.clickSubmit();
});

Then('I {string} see the AV evidence in the FTA Documents tab', async function (assertion) {
  await anyCcdPage.clickTab('FTA Documents');
  const avVisibility = assertion === 'should';
  const documentTypeDisplayed = await caseDetailsPage.getFieldValues('Document type');
  if (avVisibility) {
    expect(documentTypeDisplayed).to.contain('Audio document');
  } else {
    expect(documentTypeDisplayed).to.not.contain('Audio document');
  }
  const audioVideoDocumentDisplayed = await caseDetailsPage.getFieldValues('Audio/video document');
  if (avVisibility) {
    expect(audioVideoDocumentDisplayed).to.contain('test_av.mp3');
  } else {
    expect(audioVideoDocumentDisplayed).to.not.contain('test_av.mp3');
  }
});

Then('the bundle should include the AV evidence', async function () {
  await anyCcdPage.clickTab('Bundles');
  const folderNames = await caseDetailsPage.getFieldValues('Folder Name');
  expect(folderNames).to.contain('Further additions');
  expect(await anyCcdPage.contentContains('Audio/video evidence document')).to.equal(true);
  expect(await anyCcdPage.contentContains('Addition B - DWP - RIP 1 document for A/V file: test_av.mp3')).to.equal(
    true
  );
});

Given('I submit {string} as {string} in the Upload document FE event', async function (filename, type) {
  await anyCcdPage.clickAddNew();
  await anyCcdPage.chooseOptionContainingText('draftSscsFurtherEvidenceDocument_0_documentType', type);
  await anyCcdPage.uploadFile('draftSscsFurtherEvidenceDocument_0_documentLink', filename);
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.contentContains('Event summary (optional)')).to.equal(true);
  await anyCcdPage.clickSubmit();
});

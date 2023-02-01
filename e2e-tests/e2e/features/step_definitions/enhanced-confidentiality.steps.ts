import { AnyCcdFormPage } from '../../pages/any-ccd-form.page';
import { Given, Then } from '@cucumber/cucumber';
import { browser } from 'protractor';
import { expect } from 'chai';

const anyCcdPage = new AnyCcdFormPage();

Given('I {string} confidentiality request', async function (verdict) {
  await anyCcdPage.clickElementById(`confidentialityRequestAppellantGrantedOrRefused-${verdict}ConfidentialityRequest`);
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
  await anyCcdPage.reloadPage();
});

Given('I upload supplementary response', async function () {
  await anyCcdPage.uploadFile('dwpSupplementaryResponseDoc_documentLink', 'issue1.pdf');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
  await browser.manage().window().maximize();
});

Then('I should see supplementary response in the Unprocessed Correspondence tab', async function () {
  await anyCcdPage.clickTab('Unprocessed Correspondence');
  const fieldValue = await anyCcdPage.getFieldValue('Original document URL');
  expect(fieldValue).to.equal('issue1.pdf');
});

Given('I upload a document with redacted content', async function () {
  await anyCcdPage.uploadFile('scannedDocuments_0_editedUrl', 'issue2.pdf');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
  await anyCcdPage.clickIgnoreWarning();
});

Then('I should see redacted content in Documents tab', async function () {
  await anyCcdPage.clickTab('Documents');
  const originalDocumentUrl = await anyCcdPage.getFieldValues('Original document URL');
  expect(originalDocumentUrl).to.include('issue1.pdf');
  const editedDocumentUrl = await anyCcdPage.getFieldValues('Edited document URL');
  expect(editedDocumentUrl).to.include('issue2.pdf');
});

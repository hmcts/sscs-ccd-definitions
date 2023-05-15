import { When, Then } from '@cucumber/cucumber';
import { AnyCcdPage } from '../../pages/any-ccd.page';
import { assert, expect } from 'chai';
import { FurtherEvidencePage } from '../../pages/further-evidence.page';
import { CaseDetailsPage } from '../../pages/case-details.page';

const anyCcdPage = new AnyCcdPage();
const furtherEvidencePage = new FurtherEvidencePage();
const caseDetailsPage = new CaseDetailsPage();

When(
  'I fill the further evidence form with {string} and {string}',
  async function (actionType: string, requestType: string) {
    expect(await anyCcdPage.pageHeadingContains('Action further evidence')).to.equal(true);
    await anyCcdPage.chooseOptionByValue('furtherEvidenceAction', actionType);
    await anyCcdPage.chooseOptionContainingText('originalSender', 'Appellant (or Appointee)');
    await anyCcdPage.clickAddNew();

    expect(await anyCcdPage.pageHeadingContains('Document Type')).to.equal(true);
    await anyCcdPage.chooseOptionContainingText('scannedDocuments_0_type', requestType);
    await anyCcdPage.uploadFile('scannedDocuments_0_url', 'issue1.pdf');
    await furtherEvidencePage.enterFileName('scannedDocuments_0_fileName', 'testfile.pdf');
    await furtherEvidencePage.enterScannedDate('20', '1', '2021');
    await anyCcdPage.clickElementById('scannedDocuments_0_includeInBundle_Yes');

    await anyCcdPage.clickContinue();
    await anyCcdPage.clickSubmit();
  }
);

When('I fill the further evidence form with {string} invalid file', async function (testFile: string) {
  expect(await anyCcdPage.pageHeadingContains('Action further evidence')).to.equal(true);
  await anyCcdPage.chooseOptionByValue('furtherEvidenceAction', 'sendToInterlocReviewByJudge');
  await anyCcdPage.chooseOptionContainingText('originalSender', 'Appellant (or Appointee)');
  await anyCcdPage.clickAddNew();

  await anyCcdPage.chooseOptionContainingText('scannedDocuments_0_type', 'Confidentiality request');
  await anyCcdPage.uploadFile('scannedDocuments_0_url', `${testFile}.pdf`);
  await furtherEvidencePage.enterFileName('scannedDocuments_0_fileName', 'testfile.pdf');
  await furtherEvidencePage.enterScannedDate('20', '1', '2021');
  await anyCcdPage.clickElementById('scannedDocuments_0_includeInBundle_Yes');

  await anyCcdPage.clickContinue();
});

Then('the case should have successfully processed {string} event', async function (event: string) {
  const events = await caseDetailsPage.getHistoryEvents();
  expect(events).to.include(event);
});

When('I fill the direction notice form with {string}', async function (reinstatement) {
  await anyCcdPage.chooseOptionContainingText('directionTypeDl', reinstatement);
  await caseDetailsPage.addDayItems('directionDueDate');
  await anyCcdPage.scrollPage('//*[@id="generateNotice_No"]');
  await anyCcdPage.chooseOptionContainingText('sscsInterlocDirectionDocument_documentType', 'Directions Notice');
  await anyCcdPage.uploadFile('sscsInterlocDirectionDocument_documentLink', 'issue2.pdf');
  await furtherEvidencePage.enterFileName('sscsInterlocDirectionDocument_documentFileName', 'testfile.pdf');

  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
});

Then('the case should be {string} permissions for {string}', async function (reinstatement, directionType) {
  const todayDate = new Date().toISOString().slice(0, 10);
  // await anyCcdPage.reloadPage();
  await anyCcdPage.clickTab('Appeal Details');
  const outcomeText = directionType === 'Reinstatement' ? 'Outcome' : 'outcome';
  const regText = directionType === 'Reinstatement' ? 'Registered' : 'registered';
  await caseDetailsPage.getFieldValue(`${directionType} ${outcomeText}`).then(function (actText) {
    assert.equal(reinstatement, actText);
  });
  await caseDetailsPage.getFieldValue(`${directionType} ${regText}`).then(function (actText) {
    const date = new Date(actText);
    const actualDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    assert.equal(todayDate, actualDate);
  });
});

When('resend evidence to appellant and FTA user', async function () {
  await anyCcdPage.clickElementById('resendToAppellant_Yes');
  await anyCcdPage.clickElementById('resendToRepresentative_No');
  await anyCcdPage.clickElementById('resendToDwp_Yes');

  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
});

Then('I see {string} and {string} event being processed successfully', async function (eventName, anotherEventName) {
  // await caseDetailsPage.reloadPage();
  const events = await caseDetailsPage.getHistoryEvents();
  expect(events).to.include(anotherEventName);
  expect(events).to.include(eventName);
});

Then('I should still see previous uploaded file collection within documents tab', async function () {
  await anyCcdPage.reloadPage();
  await anyCcdPage.clickTab('Documents');
  const types = await anyCcdPage.getFieldValues('Type');
  expect(types).to.include('Appellant evidence');
  const evidencesIssued = await anyCcdPage.getFieldValues('Evidence issued');
  expect(evidencesIssued).to.include('Yes');
  const originalDocumentUrls = await anyCcdPage.getFieldValues('Original document URL');
  expect(originalDocumentUrls).to.include('issue1.pdf');
});

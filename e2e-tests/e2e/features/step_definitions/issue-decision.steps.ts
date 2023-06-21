import { When } from '@cucumber/cucumber';
import { AnyCcdPage } from '../../pages/any-ccd.page';
import { IssueDecisionPage } from '../../pages/issue-decision.page';
import { CaseDetailsPage } from '../../pages/case-details.page';
import { AnyCcdFormPage } from '../../pages/any-ccd-form.page';
import { expect } from 'chai';

const anyCcdPage = new AnyCcdPage();
const issueDecisionPage = new IssueDecisionPage();
const caseDetailsPage = new CaseDetailsPage();
const anyCcdFormPage = new AnyCcdFormPage();

When('I write a final decision generate notice no generate', async function () {
  await anyCcdPage.clickElementById('writeFinalDecisionIsDescriptorFlow_No');
  await anyCcdPage.clickElementById('writeFinalDecisionGenerateNotice_No');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('writeFinalDecisionAllowedOrRefused-allowed');
  await anyCcdPage.clickContinue();
  await issueDecisionPage.uploadDirection();
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
});

When('I write a final decision generate notice yes daily living mobility is no face to face', async function () {
  await anyCcdPage.clickElementById('writeFinalDecisionIsDescriptorFlow_No');
  await anyCcdPage.clickElementById('writeFinalDecisionGenerateNotice_Yes');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('writeFinalDecisionAllowedOrRefused-allowed');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('writeFinalDecisionTypeOfHearing-faceToFace');
  await anyCcdPage.clickElementById('writeFinalDecisionPresentingOfficerAttendedQuestion_Yes');
  await anyCcdPage.clickElementById('writeFinalDecisionAppellantAttendedQuestion_Yes');
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Panel members')).to.equal(true);
  await issueDecisionPage.addPanelMembers();
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Decision date')).to.equal(true);
  await caseDetailsPage.addDayItems('writeFinalDecisionDateOfDecision');
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Bundle page')).to.equal(true);
  await issueDecisionPage.pageReference();
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Summary of outcome decision')).to.equal(true);
  await issueDecisionPage.fillSummary();
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Reasons for decision')).to.equal(true);
  await anyCcdFormPage.addNewCollectionItem('Reasons for decision');
  await anyCcdFormPage.setCollectionItemFieldValue('Reasons for decision', 0, 'Reasons for decision', 'Some text');
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Anything else?')).to.equal(true);
  await anyCcdPage.clickContinue();
  // decision generated
  await anyCcdPage.waitForSpinner();
  expect(await anyCcdPage.pageHeadingContains('Preview Decision Notice')).to.equal(true);
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
  const errors = await anyCcdPage.numberOfCcdErrorMessages();
  expect(errors).to.equal(0);
});

When('I write a final decision generate notice yes daily living mobility is yes face to face', async function () {
  await anyCcdPage.clickElementById('writeFinalDecisionIsDescriptorFlow_Yes');
  await anyCcdPage.clickElementById('writeFinalDecisionGenerateNotice_Yes');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('writeFinalDecisionTypeOfHearing-faceToFace');
  await anyCcdPage.clickElementById('writeFinalDecisionPresentingOfficerAttendedQuestion_Yes');
  await anyCcdPage.clickElementById('writeFinalDecisionAppellantAttendedQuestion_Yes');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('pipWriteFinalDecisionDailyLivingQuestion-standardRate');
  await anyCcdPage.clickElementById('pipWriteFinalDecisionComparedToDWPDailyLivingQuestion-higher');
  await anyCcdPage.clickElementById('pipWriteFinalDecisionMobilityQuestion-standardRate');
  await anyCcdPage.clickElementById('pipWriteFinalDecisionComparedToDWPMobilityQuestion-same');
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Award dates')).to.equal(true);
  await caseDetailsPage.addDayItems('writeFinalDecisionStartDate');
  await anyCcdPage.clickElementById('writeFinalDecisionEndDateType-setEndDate');
  await caseDetailsPage.addDayItems('writeFinalDecisionEndDate');
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Panel members')).to.equal(true);
  await issueDecisionPage.addPanelMembers();
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Decision date')).to.equal(true);
  await caseDetailsPage.addDayItems('writeFinalDecisionDateOfDecision');
  await anyCcdPage.clickContinue();
  //
  // await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('pipWriteFinalDecisionDailyLivingActivitiesQuestion-preparingFood');
  await anyCcdPage.clickElementById('pipWriteFinalDecisionMobilityActivitiesQuestion-planningAndFollowing');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('pipWriteFinalDecisionPreparingFoodQuestion-preparingFood1f');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('pipWriteFinalDecisionPlanningAndFollowingQuestion-planningAndFollowing11d');
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Bundle page')).to.equal(true);
  await issueDecisionPage.pageReference();
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Reasons for decision')).to.equal(true);
  await anyCcdPage.setFinalDecisionsReasons('Add new');
  expect(await anyCcdPage.pageHeadingContains('Anything else?')).to.equal(true);
  await anyCcdPage.clickContinue();
  // decision generated
  await anyCcdPage.waitForSpinner();
  expect(await anyCcdPage.pageHeadingContains('Preview Decision Notice')).to.equal(true);
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Check your answers')).to.equal(true);
  await anyCcdPage.clickSubmit();
  const errors = await anyCcdPage.numberOfCcdErrorMessages();
  expect(errors).to.equal(0);
});

When('I see {string}', async function (notice) {
  await anyCcdPage.clickTab('Documents');
  expect(await anyCcdPage.contentContains(notice)).to.equal(true);
});

When('I test final decision', async function () {
  const caseReference = '1601983355417609';
  await anyCcdPage.get(`/case/SSCS/Benefit/${caseReference}`);
});

When('I issue a final decision generate decision no', async function () {
  await anyCcdPage.clickSubmit();
  // await anyCcdPage.clickSubmit();
  expect(await anyCcdPage.contentContains('Decision in favour of appellant')).to.equal(true);
});

When('I issue a final decision generate decision upheld', async function () {
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
  expect(await anyCcdPage.contentContains('Decision upheld')).to.equal(true);
});

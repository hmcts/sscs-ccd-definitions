import { When, Then } from '@cucumber/cucumber';
import { AnyCcdPage } from '../../pages/any-ccd.page';
import { AdjournmentPage } from '../../pages/adjournment.page';
import { expect } from 'chai';
import { Wait } from '../../enums/wait';
import { browser, element, by } from 'protractor';

const anyCcdPage = new AnyCcdPage();
const adjournmentPage = new AdjournmentPage();

When('I book a hearing', async function () {
  await anyCcdPage.clickAddNew();
  await adjournmentPage.addVenue('21', '01', '2024');
});

When('I generate an adjournment notice', async function () {
  await anyCcdPage.clickElementById('adjournCaseGenerateNotice_Yes');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCasePanelMembersExcluded-No');
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Panel members')).to.equal(true);
  await adjournmentPage.addPanelMembers();
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseTypeOfHearing-faceToFace');
  await anyCcdPage.clickContinue();

  await anyCcdPage.clickElementById('adjournCaseCanCaseBeListedRightAway_Yes');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseTypeOfNextHearing-faceToFace');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseNextHearingVenue-sameVenue');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseNextHearingListingDurationType-standardTimeSlot');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseInterpreterRequired_No');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseNextHearingDateType-firstAvailableDate');
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Reasons for adjournment')).to.equal(true);
  await adjournmentPage.setAdjournCaseReasonsText();

  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Additional directions (Optional)')).to.equal(true);
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Preview Adjournment')).to.equal(true);
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Check your answers')).to.equal(true);
  await anyCcdPage.clickSubmit();
});

When('I upload an adjournment notice and issue direction {string}', async function (issueDirection) {
  await anyCcdPage.clickElementById('adjournCaseGenerateNotice_No');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCasePanelMembersExcluded-No');
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Panel members')).to.equal(true);
  await adjournmentPage.addPanelMembers();
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById(`adjournCaseAreDirectionsBeingMadeToParties_${issueDirection}`);
  await anyCcdPage.clickContinue();
  if (issueDirection === 'Yes') {
    await anyCcdPage.clickElementById('adjournCaseDirectionsDueDateDaysOffset-14');
    await anyCcdPage.clickContinue();
  }
  await anyCcdPage.clickElementById('adjournCaseTypeOfNextHearing-faceToFace');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseNextHearingVenue-sameVenue');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseNextHearingListingDurationType-standardTimeSlot');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseInterpreterRequired_No');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseNextHearingDateType-firstAvailableDate');
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Preview Adjournment')).to.equal(true);
  await adjournmentPage.uploadAdjournmentNotice();
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Check your answers')).to.equal(true);
  await browser.sleep(Wait.extended);
  await anyCcdPage.clickSubmit();
});

When('I continue', async function () {
  await anyCcdPage.clickSubmit();
});

Then('the case should be in Hearing appeal status', async function () {
  await browser.sleep(500);
  await anyCcdPage.reloadPage();
  expect(await anyCcdPage.contentContains('Hearing')).to.equal(true);

  await browser.sleep(5000);
});

When('I generate an adjournment notice with new hearing type and duration', async function () {
  await anyCcdPage.clickElementById('adjournCaseGenerateNotice_Yes');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCasePanelMembersExcluded-Yes');
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Panel members')).to.equal(true);
  await adjournmentPage.addPanelMembers();
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseTypeOfHearing-faceToFace');
  await anyCcdPage.clickContinue();

  await anyCcdPage.clickElementById('adjournCaseCanCaseBeListedRightAway_Yes');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseTypeOfNextHearing-telephone');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseNextHearingListingDurationType-standardTimeSlot');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseInterpreterRequired_Yes');
  await anyCcdPage.chooseOptionContainingText('adjournCaseInterpreterLanguageList', 'Dutch');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseNextHearingDateType-firstAvailableDate');
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Reasons for adjournment')).to.equal(true);
  await adjournmentPage.setAdjournCaseReasonsText();

  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Additional directions (Optional)')).to.equal(true);
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Preview Adjournment')).to.equal(true);
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Check your answers')).to.equal(true);
  await anyCcdPage.clickSubmit();
});

When(
  'I generate an adjournment notice with video hearing type and non standard timeslot with session',
  async function () {
    await anyCcdPage.clickElementById('adjournCaseGenerateNotice_Yes');
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickElementById('adjournCasePanelMembersExcluded-No');
    await anyCcdPage.clickContinue();
    expect(await anyCcdPage.pageHeadingContains('Panel members')).to.equal(true);
    await adjournmentPage.addPanelMembers();
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickElementById('adjournCaseTypeOfHearing-faceToFace');
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickElementById('adjournCaseCanCaseBeListedRightAway_No');
    await anyCcdPage.clickContinue();

    await anyCcdPage.clickElementById('adjournCaseAreDirectionsBeingMadeToParties_Yes');
    await anyCcdPage.clickContinue();

    await anyCcdPage.clickElementById('adjournCaseDirectionsDueDateDaysOffset-14');
    await anyCcdPage.clickContinue();

    await anyCcdPage.clickElementById('adjournCaseTypeOfNextHearing-video');
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickElementById('adjournCaseNextHearingListingDurationType-nonStandardTimeSlot');
    await element(by.id('adjournCaseNextHearingListingDuration')).sendKeys('2');
    await anyCcdPage.chooseOptionContainingText('adjournCaseNextHearingListingDurationUnits', 'Session(s)');
    await anyCcdPage.clickContinue();

    await anyCcdPage.clickElementById('adjournCaseInterpreterRequired_No');
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickElementById('adjournCaseNextHearingDateType-firstAvailableDateAfter');
    await anyCcdPage.clickElementById('adjournCaseNextHearingDateOrPeriod-provideDate');
    await element(by.id('adjournCaseNextHearingFirstAvailableDateAfterDate-day')).sendKeys('20');
    await element(by.id('adjournCaseNextHearingFirstAvailableDateAfterDate-month')).sendKeys('10');
    await element(by.id('adjournCaseNextHearingFirstAvailableDateAfterDate-year')).sendKeys('2024');
    await anyCcdPage.clickContinue();
    expect(await anyCcdPage.pageHeadingContains('Reasons for adjournment')).to.equal(true);
    await adjournmentPage.setAdjournCaseReasonsText();

    await anyCcdPage.clickContinue();
    expect(await anyCcdPage.pageHeadingContains('Additional directions (Optional)')).to.equal(true);
    await anyCcdPage.clickContinue();
    expect(await anyCcdPage.pageHeadingContains('Preview Adjournment')).to.equal(true);
    await anyCcdPage.clickContinue();
    expect(await anyCcdPage.pageHeadingContains('Check your answers')).to.equal(true);
    await anyCcdPage.clickSubmit();
  }
);

When('I generate an adjournment notice with Paper hearing type', async function () {
  await anyCcdPage.clickElementById('adjournCaseGenerateNotice_Yes');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCasePanelMembersExcluded-Yes');
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Panel members')).to.equal(true);
  await adjournmentPage.addPanelMembers();
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseTypeOfHearing-faceToFace');
  await anyCcdPage.clickContinue();

  await anyCcdPage.clickElementById('adjournCaseCanCaseBeListedRightAway_Yes');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseTypeOfNextHearing-paper');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseNextHearingDateType-firstAvailableDate');
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Reasons for adjournment')).to.equal(true);
  await adjournmentPage.setAdjournCaseReasonsText();

  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Additional directions (Optional)')).to.equal(true);
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Preview Adjournment')).to.equal(true);
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Check your answers')).to.equal(true);
  await anyCcdPage.clickSubmit();
});

When('I generate an adjournment notice with face to face hearing type', async function () {
  await anyCcdPage.clickElementById('adjournCaseGenerateNotice_Yes');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCasePanelMembersExcluded-Yes');
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Panel members')).to.equal(true);
  await adjournmentPage.addPanelMembers();
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseTypeOfHearing-paper');
  await anyCcdPage.clickContinue();

  await anyCcdPage.clickElementById('adjournCaseCanCaseBeListedRightAway_Yes');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseTypeOfNextHearing-faceToFace');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseNextHearingVenue-sameVenue');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickContinue();

  await anyCcdPage.clickElementById('adjournCaseNextHearingListingDurationType-nonStandardTimeSlot');
  await element(by.id('adjournCaseNextHearingListingDuration')).sendKeys('2');
  await anyCcdPage.chooseOptionContainingText('adjournCaseNextHearingListingDurationUnits', 'Minutes');
  await anyCcdPage.clickContinue();

  await anyCcdPage.clickElementById('adjournCaseInterpreterRequired_No');
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickElementById('adjournCaseNextHearingDateType-firstAvailableDate');
  await anyCcdPage.clickContinue();

  expect(await anyCcdPage.pageHeadingContains('Reasons for adjournment')).to.equal(true);
  await adjournmentPage.setAdjournCaseReasonsText();

  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Additional directions (Optional)')).to.equal(true);
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Preview Adjournment')).to.equal(true);
  await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains('Check your answers')).to.equal(true);
  await anyCcdPage.clickSubmit();
});

Then('new hearing value requirements should be seen against the case', async function () {
  //  await listingRequirementsPage.verifyOverriddenHearingValues(); -> Test ignored for now due to SSCSCI-811 bug
});

Then('new hearing request must be triggered against the case', async function () {
  await anyCcdPage.clickTab('History');
  expect(await anyCcdPage.getFieldValue('Add a hearing')).to.equal('Add a hearing');
  await anyCcdPage.clickTab('Hearings');
});

Then('new hearing value requirements for video hearing type should be seen against the case', async function () {
  // await listingRequirementsPage.verifyOverriddenHearingValuesForVideoAdjourned(); -> Test ignored for now due to SSCSCI-811 bug
});

Then('new hearing value requirements for paper hearing type should be seen against the case', async function () {
  // await listingRequirementsPage.verifyOverriddenHearingValuesForPaperAdjourned(); -> Test ignored for now due to SSCSCI-811 bug
});

Then('new hearing value requirements for face to face hearing type should be seen against the case', async function () {
  // await listingRequirementsPage.verifyOverriddenHearingValuesForFaceToFaceAdjourned(); -> Test ignored for now due to SSCSCI-811 bug
});

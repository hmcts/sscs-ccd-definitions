import { Given, When, Then } from '@cucumber/cucumber';
import { HearingDetailsPage } from '../../pages/hearing-details.page';
import { AnyCcdPage } from '../../pages/any-ccd.page';
import { browser } from 'protractor';
import { Wait } from '../../enums/wait';

const anyCcdPage = new AnyCcdPage();
const hearingDetailsPage = new HearingDetailsPage();

Given('I click on Request Hearing link', async function () {
  await hearingDetailsPage.requestManualHearing();
  await hearingDetailsPage.verifyHearingStatusSummary();
});

Then('I should see a hearing request generated for the appeal', async function () {
  await hearingDetailsPage.requestAutoHearing();
  await hearingDetailsPage.verifyHearingStatusSummary();
});

Then('I click on hearing details', async function () {
  await hearingDetailsPage.viewHearingDetails();
});

Then('the venue of the hearing should be in {string}', async function (venueName: string) {
  await hearingDetailsPage.verifyHearingVenue(venueName);
});

Then('the duration of the hearing should be {string}', async function (hearingDuration: string) {
  await hearingDetailsPage.verifyHearingDuration(hearingDuration);
});

Then('the earliest hearing date should be from {string} days of hearing requested', async function (noOfDays: string) {
  const date = new Date();
  const numberOfDaysToAdd = Number(noOfDays);
  const result = date.setDate(date.getDate() + numberOfDaysToAdd);

  const additionalDate = new Date(result);
  const formattedDate = additionalDate
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .replace(/ /g, ' ');

  console.log(`Hearging start date calculated is ##################### ${formattedDate}`);

  await hearingDetailsPage.verifyHearingDate(formattedDate);
  // sleeping 30 secs for notification event to be triggered
  await browser.sleep(30000);
});

Then('I update the length of hearing to {string} hours', async function (hearingDuration: string) {
  await hearingDetailsPage.updateHearingDetails(hearingDuration);
});

Then('the hearing status should be updated to {string}', async function (hearingStatus: string) {
  await hearingDetailsPage.verifyHearingStatus(hearingStatus);
});

When(
  'I click on {string} hearing link and select {string} as cancellation reason',
  async function (cncl: string, reason: string) {
    await anyCcdPage.clickLink(cncl);
    await browser.sleep(Wait.normal);

    await anyCcdPage.clickElementById(reason);
    await anyCcdPage.clickContinue();
    await browser.sleep(5000);
  }
);

When('submit the event', async function () {
  await anyCcdPage.clickSubmit();
});

Then('the hearing status should be {string}', async function (hearingStats: string) {
  await hearingDetailsPage.requestAutoHearing();
  await hearingDetailsPage.verifyCancelHearingStatus(hearingStats);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const hearing_details_page_1 = require("../../pages/hearing-details.page");
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const protractor_1 = require("protractor");
const wait_1 = require("../../enums/wait");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
const hearingDetailsPage = new hearing_details_page_1.HearingDetailsPage();
(0, cucumber_1.Given)('I click on Request Hearing link', async function () {
    await hearingDetailsPage.requestManualHearing();
    await hearingDetailsPage.verifyHearingStatusSummary();
});
(0, cucumber_1.Then)('I should see a hearing request generated for the appeal', async function () {
    await hearingDetailsPage.requestAutoHearing();
    await hearingDetailsPage.verifyHearingStatusSummary();
});
(0, cucumber_1.Then)('I click on hearing details', async function () {
    await hearingDetailsPage.viewHearingDetails();
});
(0, cucumber_1.Then)('the venue of the hearing should be in {string}', async function (venueName) {
    await hearingDetailsPage.verifyHearingVenue(venueName);
});
(0, cucumber_1.Then)('the duration of the hearing should be {string}', async function (hearingDuration) {
    await hearingDetailsPage.verifyHearingDuration(hearingDuration);
});
(0, cucumber_1.Then)('the earliest hearing date should be from {string} days of hearing requested', async function (noOfDays) {
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
    await protractor_1.browser.sleep(30000);
});
(0, cucumber_1.Then)('I update the length of hearing to {string} hours', async function (hearingDuration) {
    await hearingDetailsPage.updateHearingDetails(hearingDuration);
});
(0, cucumber_1.Then)('the hearing status should be updated to {string}', async function (hearingStatus) {
    await hearingDetailsPage.verifyHearingStatus(hearingStatus);
});
(0, cucumber_1.When)('I click on {string} hearing link and select {string} as cancellation reason', async function (cncl, reason) {
    await anyCcdPage.clickLink(cncl);
    await protractor_1.browser.sleep(wait_1.Wait.normal);
    await anyCcdPage.clickElementById(reason);
    await anyCcdPage.clickContinue();
    await protractor_1.browser.sleep(5000);
});
(0, cucumber_1.When)('submit the event', async function () {
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.Then)('the hearing status should be {string}', async function (hearingStats) {
    await hearingDetailsPage.requestAutoHearing();
    await hearingDetailsPage.verifyCancelHearingStatus(hearingStats);
});
//# sourceMappingURL=request-hearing-details.steps.js.map
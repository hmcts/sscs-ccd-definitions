"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const hearing_recording_page_1 = require("../../pages/hearing-recording.page");
const case_details_page_1 = require("../../pages/case-details.page");
const cucumber_1 = require("@cucumber/cucumber");
const chai_1 = require("chai");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
const hearingRecordingPage = new hearing_recording_page_1.HearingRecordingPage();
const caseDetailsPage = new case_details_page_1.CaseDetailsPage();
(0, cucumber_1.When)('I upload a hearing recording', async function () {
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Hearing recording')).to.equal(true);
    await hearingRecordingPage.uploadHearingRecording();
});
(0, cucumber_1.When)('I select a hearing', async function () {
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Upload hearing recording')).to.equal(true);
    await hearingRecordingPage.selectHearing();
    await anyCcdPage.clickContinue();
});
(0, cucumber_1.Then)('the hearing recording should be in {string} tab', async function (tabName) {
    const isDisplayed = true;
    await anyCcdPage.reloadPage();
    await anyCcdPage.clickTab(tabName);
    (0, chai_1.expect)(await anyCcdPage.contentContains('recordings 1')).to.equal(isDisplayed);
    // expect(await anyCcdPage.contentContains('Recordings')).to.equal(isDisplayed);
    (0, chai_1.expect)(await anyCcdPage.contentContains('Final Hearing')).to.equal(isDisplayed);
    (0, chai_1.expect)(await anyCcdPage.contentContains('12345')).to.equal(isDisplayed);
    (0, chai_1.expect)(await anyCcdPage.contentContains('Fox Court')).to.equal(isDisplayed);
});
(0, cucumber_1.Then)('the {string} should be successfully listed in the History', async function (action) {
    const events = await caseDetailsPage.getHistoryEvents();
    (0, chai_1.expect)(events).to.include(action);
});
(0, cucumber_1.When)('I request for Hearing recording', async function () {
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Request hearing recording')).to.equal(true);
    await hearingRecordingPage.requestDwpHearingRecording();
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.When)('request for Hearing recording is {string}', async function (hearingPermission) {
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Action hearing recording request')).to.equal(true);
    await anyCcdPage.chooseOptionContainingText('selectHearingDetails', 'Fox Court 13:00:00 21 Jan 2024');
    await anyCcdPage.clickContinue();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Please review the hearing recordings')).to.equal(true);
    if (hearingPermission === 'Granted') {
        await hearingRecordingPage.grantRequestDwpHearingRecording(hearingPermission);
    }
    else if (hearingPermission === 'Refused') {
        await hearingRecordingPage.refuseAppellantHearingRecording(hearingPermission);
    }
    else {
        throw Error('Not a valid permission type');
    }
    await anyCcdPage.clickSubmit();
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.Given)('I submit {string} as Request for Hearing Recording in the Upload document FE event', async function (filename) {
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Upload document FE')).to.equal(true);
    await anyCcdPage.clickAddNew();
    await anyCcdPage.chooseOptionContainingText('draftSscsFurtherEvidenceDocument_0_documentType', 'Request for Hearing Recording');
    await anyCcdPage.uploadFile('draftSscsFurtherEvidenceDocument_0_documentLink', filename);
    await anyCcdPage.clickSubmit();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Hearing request party')).to.equal(true);
    await anyCcdPage.clickContinue();
    (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Request for hearing recording')).to.equal(true);
    await anyCcdPage.chooseOptionContainingText('requestableHearingDetails', 'Fox Court 13:00 21 Jan 2024');
    await anyCcdPage.clickSubmit();
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.Then)('the recording collection is cleared from Unprocessed correspondence tab', async function () {
    await anyCcdPage.clickTab('Unprocessed Correspondence');
    await anyCcdPage.elementNotPresent('Requested hearing recordings 1');
    await anyCcdPage.elementNotPresent('Fox Court');
});
//# sourceMappingURL=hearing-recording.steps.js.map
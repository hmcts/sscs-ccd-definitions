import { BaseStep } from "./base";
import { Page } from '@playwright/test';
import {credentials} from "../../config/config";


export class UploadHearing extends BaseStep {

    readonly page: Page;

    constructor(page){
        
        super(page);
        this.page = page;
    }

    async requestAndGrantAnHearingRecording(caseId: string) {
        
        await this.loginUserWithCaseId(credentials.caseWorker, false, caseId);
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent('Add a hearing');
        await this.addHearingPage.submitHearing();
        await this.eventNameAndDescriptionPage.confirmSubmission();


        await this.homePage.delay(3000);
        await this.homePage.chooseEvent('Hearing booked');
        await this.hearingBookedPage.submitHearingBooked();

        await this.loginUserWithCaseId(credentials.amCaseWorker,true, caseId);
        await this.homePage.delay(60000); // wait for case update to happen
        await this.homePage.chooseEvent('Upload hearing recording');
        await this.uploadRecordingPage.selectRecording();
        await this.uploadRecordingPage.chooseHearingTypeAndAddRecording();
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.homePage.navigateToTab("Hearing Recordings");
        await this.hearingRecordingsTab.verifyPageContentByKeyValue('Hearing type', 'Final Hearing');
        await this.hearingRecordingsTab.verifyPageContentByKeyValue('Hearing ID', '1234');
        await this.hearingRecordingsTab.verifyPageContentByKeyValue('Venue', 'Fox court');

        await this.loginUserWithCaseId(credentials.dwpResponseWriter,true, caseId);
        await this.homePage.chooseEvent('FTA Request hearing recording');
        await this.requestRecordingPage.selectRecordingForRequest();
        await this.eventNameAndDescriptionPage.confirmSubmission();
        

        await this.loginUserWithCaseId(credentials.amCaseWorker,true, caseId);
        await this.homePage.chooseEvent('Action hearing recording req');
        await this.actionRecordingPage.grantRecordingRequest();
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.homePage.navigateToTab('History');
        await this.verifyHistoryTabDetails('Action hearing recording req');

        await this.homePage.navigateToTab('Documents');
        await this.documentsTab.verifyPageContentByKeyValue('Hearing type', 'Final Hearing');
        await this.documentsTab.verifyPageContentByKeyValue('Hearing ID', '1234');
        await this.documentsTab.verifyPageContentByKeyValue('Venue', 'Fox court');
        await this.documentsTab.verifyTitle('Released hearing recordings 1');
        await this.documentsTab.verifyPageContentByKeyValue('Requesting Party', 'FTA');
        await this.documentsTab.verifydueDates('Date requested');
    }

    async requestAndRefuseAnHearingRecording(caseId: string) {
        
        await this.loginUserWithCaseId(credentials.caseWorker, false, caseId);
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent('Add a hearing');
        await this.addHearingPage.submitHearing();
        await this.eventNameAndDescriptionPage.confirmSubmission();


        await this.homePage.delay(3000);
        await this.homePage.chooseEvent('Hearing booked');
        await this.hearingBookedPage.submitHearingBooked();

        await this.loginUserWithCaseId(credentials.amCaseWorker,true, caseId);
        await this.homePage.delay(60000); // wait for case update to happen
        await this.homePage.chooseEvent('Upload hearing recording');
        await this.uploadRecordingPage.selectRecording();
        await this.uploadRecordingPage.chooseHearingTypeAndAddRecording();
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.homePage.navigateToTab("Hearing Recordings");
        await this.hearingRecordingsTab.verifyPageContentByKeyValue('Hearing type', 'Final Hearing');
        await this.hearingRecordingsTab.verifyPageContentByKeyValue('Hearing ID', '1234');
        await this.hearingRecordingsTab.verifyPageContentByKeyValue('Venue', 'Fox court');


        await this.homePage.chooseEvent('Upload document FE');
        await this.uploadDocumentPage.uploadFEDocument();
        await this.eventNameAndDescriptionPage.confirmSubmission();


        await this.homePage.chooseEvent('Action hearing recording req');
        await this.actionRecordingPage.refuseRecordingRequest();
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.homePage.navigateToTab('History');
        await this.verifyHistoryTabDetails('Action hearing recording req');

        await this.homePage.navigateToTab('Documents');
        await this.documentsTab.verifyPageContentNotPresentByKeyValue('Hearing type', 'Final Hearing');
        await this.documentsTab.verifyPageContentNotPresentByKeyValue('Hearing ID', '1234');
        await this.documentsTab.verifyPageContentNotPresentByKeyValue('Venue', 'Fox court');
        await this.documentsTab.verifyTitleNotPresent('Released hearing recordings 1');
        await this.documentsTab.verifyPageContentNotPresentByKeyValue('Requesting Party', 'FTA');
       
    }

}
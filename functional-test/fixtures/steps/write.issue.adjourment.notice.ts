import {Page} from '@playwright/test';
import {BaseStep} from './base';
import {credentials} from "../../config/config";
import writeFinalDecisionData from "../../pages/content/write.final.decision_en.json";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import {accessId, accessToken, getSSCSServiceToken} from "../../api/client/idam/idam.service";
import {
    performEventOnCaseForActionFurtherEvidence,
    performEventOnCaseWithUploadResponse
} from "../../api/client/sscs/factory/appeal.update.factory";
import issueDirectionTestdata from "../../pages/content/issue.direction_en.json";
import actionFurtherEvidenceTestdata from '../../pages/content/action.further.evidence_en.json';
import logger from "../../utils/loggerUtil";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";
import eventTestData from "../../pages/content/event.name.event.description_en.json";

export class WriteAndIssueAdjournmentNotice extends BaseStep {

    readonly page: Page;


    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async performAnUploadResponseOnTheCase(pipCaseId) {

        await new Promise(f => setTimeout(f, 10000)); //Delay required for the Case to be ready
        logger.info('The value of the response writer : ' + credentials.dwpResponseWriter.email)
        let responseWriterToken: string = await accessToken(credentials.dwpResponseWriter);
        let serviceToken: string = await getSSCSServiceToken();
        let responseWriterId: string = await accessId(credentials.dwpResponseWriter);
        await performEventOnCaseWithUploadResponse(responseWriterToken.trim(),
            serviceToken.trim(), responseWriterId.trim(),
            'SSCS', 'Benefit',
            pipCaseId.trim(), 'dwpUploadResponse', 'dwp');
    }

    async performLoginAndNavigateToCase(user, pipCaseId) {
        await this.loginUserWithCaseId(user, false, pipCaseId);
    }

    async performNavigateToHistoryTab() {
        await this.homePage.navigateToTab("Hearings");
    }

    async signOut() {
        await this.homePage.signOut()
    }


    async performWriteAdjournmentNotice() {

        await this.homePage.reloadPage();
        await this.homePage.chooseEvent("Write adjournment notice");

        //Generate Content Page Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyUploadOrGenerateContentPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputUploadOrGenerateContentPageData(true);
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Option For Panel Members Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyArePanelMembersExcludedPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputOptionForPanelMembersExcludedPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Panel members Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyPanelMembersPage()
        await this.writeAndIssueAdjournmentNotificationPage.inputPanelMembersPageData()
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Type of Hearing Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyTypeOfHearingPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputTypeOfHearingPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Can this case be Listed Right Away Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyCanThisCaseBeListedRightAwayPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputCanThisCaseBeListedRightAwayPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Next Hearing Format Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyNextHearingFormatPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputNextHearingFormatPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Next Hearing Venue Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyNextHearingVenuePage();
        await this.writeAndIssueAdjournmentNotificationPage.inputNextHearingVenuePageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Tribunal Direct PO to Attend Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyTribunalDirectPOToAttendPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputTribunalDirectPOToAttendPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //How Long should the next hearing be Listed Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyHowLongShouldTheNextHearingBeListedPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputHowLongShouldTheNextHearingBeListedPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Language Interpreter Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyLanguageInterpreterPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputLanguageInterpreterPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeAndIssueAdjournmentNotificationPage.verifyWhenShouldNextHearingBePage();
        await this.writeAndIssueAdjournmentNotificationPage.inputWhenShouldNextHearingBePageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeAndIssueAdjournmentNotificationPage.verifyReasonForAdjustmentPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputReasonForAdjustmentPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeAndIssueAdjournmentNotificationPage.verifyAdditionalDirectionsPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputAdditionalDirectionsPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeAndIssueAdjournmentNotificationPage.verifyPreviewDocumentPage(true);
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();

        //Check Your Answers Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyPageContentForCheckYourAnswersPage();
        await this.writeAndIssueAdjournmentNotificationPage.submit();
        await this.verifyHistoryTabDetails("Write adjournment notice");
        await this.historyTab.verifyStateOfTheAppeal('Ready to list');
    }

    async performIssueAdjournmentForAnAppeal(notListableFlag :boolean = false) {
        await this.homePage.chooseEvent("Issue adjournment notice");
        await this.writeAndIssueAdjournmentNotificationPage.verifyPreviewDocumentPage(false);
        await this.writeAndIssueAdjournmentNotificationPage.confirmSubmission();
        await this.eventNameAndDescriptionPage.verifyPageContent("Issue adjournment notice",
            false);
        await this.eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
            eventTestData.eventDescriptionInput);
        await this.eventNameAndDescriptionPage.confirmSubmission();
        await this.verifyHistoryTabDetails("Issue adjournment notice");
        if (!notListableFlag) {
            await this.historyTab.verifyStateOfTheAppeal('Ready to list');
        } else {
            await this.historyTab.verifyStateOfTheAppeal('Not listable');
        }
    }

    async performWriteAdjournmentNoticeForGenerateNoticeAndNoIssueDirections() {

        await this.homePage.reloadPage();
        await this.homePage.chooseEvent("Write adjournment notice");

        //Generate Content Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyUploadOrGenerateContentPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputUploadOrGenerateContentPageData(false);
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Option For Panel Members
        await this.writeAndIssueAdjournmentNotificationPage.verifyArePanelMembersExcludedPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputOptionForPanelMembersExcludedPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Panel members
        await this.writeAndIssueAdjournmentNotificationPage.verifyPanelMembersPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputPanelMembersPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Are you making Directions
        await this.writeAndIssueAdjournmentNotificationPage.verifyAreYouMakingDirectionsToThePartiesPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputAreYouMakingDirectionsToThePartiesPageData(false);
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Next Hearing Format
        await this.writeAndIssueAdjournmentNotificationPage.verifyNextHearingFormatPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputNextHearingFormatPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Next Hearing Venue
        await this.writeAndIssueAdjournmentNotificationPage.verifyNextHearingVenuePage();
        await this.writeAndIssueAdjournmentNotificationPage.inputNextHearingVenuePageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Tribunal Direct PO to Attend Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyTribunalDirectPOToAttendPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputTribunalDirectPOToAttendPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //How Long should the next hearing be Listed Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyHowLongShouldTheNextHearingBeListedPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputHowLongShouldTheNextHearingBeListedPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Language Interpreter Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyLanguageInterpreterPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputLanguageInterpreterPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //When Should Next Hearing Be
        await this.writeAndIssueAdjournmentNotificationPage.verifyWhenShouldNextHearingBePage();
        await this.writeAndIssueAdjournmentNotificationPage.inputWhenShouldNextHearingBePageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Preview Document Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyPreviewDocumentPage(true);
        await this.writeAndIssueAdjournmentNotificationPage.inputPreviewDocumentPageData();
        await new Promise(f => setTimeout(f, 3000)); //Delay required for the Case to be ready
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 3000)); //Delay required for the Case to be ready

        //Check Your Answers Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyPageContentForCheckYourAnswersPageNoGenerateNotice(false);
        await this.writeAndIssueAdjournmentNotificationPage.submit();
        await this.verifyHistoryTabDetails("Write adjournment notice");
        await this.historyTab.verifyStateOfTheAppeal('Ready to list');

    }

    async performWriteAdjournmentNoticeForGenerateNoticeAndYesIssueDirections() {

        await this.homePage.reloadPage();
        await this.homePage.chooseEvent("Write adjournment notice");

        //Generate Content Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyUploadOrGenerateContentPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputUploadOrGenerateContentPageData(false);
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Option For Panel Members
        await this.writeAndIssueAdjournmentNotificationPage.verifyArePanelMembersExcludedPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputOptionForPanelMembersExcludedPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Panel members
        await this.writeAndIssueAdjournmentNotificationPage.verifyPanelMembersPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputPanelMembersPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Are you making Directions
        await this.writeAndIssueAdjournmentNotificationPage.verifyAreYouMakingDirectionsToThePartiesPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputAreYouMakingDirectionsToThePartiesPageData(true);
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Direction Due Date
        await this.writeAndIssueAdjournmentNotificationPage.verifyDirectionsDueDatePage();
        await this.writeAndIssueAdjournmentNotificationPage.inputDirectionsDueDatePageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Next Hearing Format
        await this.writeAndIssueAdjournmentNotificationPage.verifyNextHearingFormatPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputNextHearingFormatPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Next Hearing Venue
        await this.writeAndIssueAdjournmentNotificationPage.verifyNextHearingVenuePage();
        await this.writeAndIssueAdjournmentNotificationPage.inputNextHearingVenuePageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Tribunal Direct PO to Attend Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyTribunalDirectPOToAttendPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputTribunalDirectPOToAttendPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //How Long should the next hearing be Listed Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyHowLongShouldTheNextHearingBeListedPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputHowLongShouldTheNextHearingBeListedPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Language Interpreter Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyLanguageInterpreterPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputLanguageInterpreterPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //When Should Next Hearing Be
        await this.writeAndIssueAdjournmentNotificationPage.verifyWhenShouldNextHearingBePage();
        await this.writeAndIssueAdjournmentNotificationPage.inputWhenShouldNextHearingBePageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Preview Document Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyPreviewDocumentPage(true);
        await this.writeAndIssueAdjournmentNotificationPage.inputPreviewDocumentPageData();
        await new Promise(f => setTimeout(f, 3000)); //Delay required for the Case to be ready
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 3000)); //Delay required for the Case to be ready

        await this.writeAndIssueAdjournmentNotificationPage.verifyPageContentForCheckYourAnswersPageNoGenerateNotice(true);
        await this.writeAndIssueAdjournmentNotificationPage.submit();
        await this.verifyHistoryTabDetails("Write adjournment notice");

    }

        async verifyOverrideListingRequirementsForAnAppeal() {
        await this.homePage.navigateToTab("Listing Requirements");
        await this.homePage.delay(1000);
        await this.listingRequirementsTab.verifyDefaultListingValuesTabVisible();
        await this.listingRequirementsTab.verifyOverridesListingValuesTabVisible();
        await this.listingRequirementsTab.verifyOverridesListingValues();
    }

    async verifyHearingsTabForTheActiveHearing() {
        await this.homePage.navigateToTab("Hearings");
        await this.hearingsTab.verifyHearingStatusSummary();
        await this.hearingsTab.clickHearingDetails();
    }
}

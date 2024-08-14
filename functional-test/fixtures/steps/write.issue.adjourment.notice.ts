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

export class WriteAndIssueAdjournmentNotice extends BaseStep {

    readonly page: Page;


    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async performWriteAndIssueAdjournmentAdjournmentNotice(pipCaseId) {

        await new Promise(f => setTimeout(f, 10000)); //Delay required for the Case to be ready
        logger.info('The value of the response writer : ' + credentials.dwpResponseWriter.email)
        let responseWriterToken: string = await accessToken(credentials.dwpResponseWriter);
        let serviceToken: string = await getSSCSServiceToken();
        let responseWriterId: string = await accessId(credentials.dwpResponseWriter);
        await performEventOnCaseWithUploadResponse(responseWriterToken.trim(),
            serviceToken.trim(), responseWriterId.trim(),
            'SSCS', 'Benefit',
            pipCaseId.trim(), 'dwpUploadResponse', 'dwp');

        await this.loginUserWithCaseId(credentials.caseWorker, false, pipCaseId);
        //await this.homePage.reloadPage();
        await this.homePage.chooseEvent("Write adjournment notice");

        //Generate Content Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyUploadOrGenerateContentPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputUploadOrGenerateContentPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Option For Panel Members
        await this.writeAndIssueAdjournmentNotificationPage.verifyArePanelMembersExcludedPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputOptionForPanelMembersExcludedPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Panel members
        await this.writeAndIssueAdjournmentNotificationPage.verifyPanelMembersPage()
        await this.writeAndIssueAdjournmentNotificationPage.inputPanelMembersPageData()
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Type of Hearing
        await this.writeAndIssueAdjournmentNotificationPage.verifyTypeOfHearingPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputTypeOfHearingPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Can this case be Listed Right Away
        await this.writeAndIssueAdjournmentNotificationPage.verifyCanThisCaseBeListedRightAwayPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputCanThisCaseBeListedRightAwayPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeAndIssueAdjournmentNotificationPage.verifyNextHearingFormatPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputNextHearingFormatPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeAndIssueAdjournmentNotificationPage.verifyNextHearingVenuePage();
        await this.writeAndIssueAdjournmentNotificationPage.inputNextHearingVenuePageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeAndIssueAdjournmentNotificationPage.verifyTribunalDirectPOToAttendPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputTribunalDirectPOToAttendPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeAndIssueAdjournmentNotificationPage.verifyHowLongShouldTheNextHearingBeListedPage();
        await this.writeAndIssueAdjournmentNotificationPage.inputHowLongShouldTheNextHearingBeListedPageData();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

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

        await this.writeAndIssueAdjournmentNotificationPage.verifyPreviewDocumentPage();
        await this.writeAndIssueAdjournmentNotificationPage.submitContinueBtn();

        //Check Your Answers Page
        await this.writeAndIssueAdjournmentNotificationPage.verifyPageContentForCheckYourAnswersPage();
    }
}

import {Page} from '@playwright/test';
import {BaseStep} from './base';
import {credentials} from "../../config/config";
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

export class WriteFinalDecision extends BaseStep {

    readonly page: Page;


    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async performWriteFinalDecisionForAPIPAppeal(pipCaseId) {

        await new Promise(f => setTimeout(f, 10000)); //Delay required for the Case to be ready
        /*logger.info('The value of the response writer : ' + credentials.dwpResponseWriter.email)
        let responseWriterToken: string = await accessToken(credentials.dwpResponseWriter);
        let serviceToken: string = await getSSCSServiceToken();
        let responseWriterId: string = await accessId(credentials.dwpResponseWriter);
        await performEventOnCaseWithUploadResponse(responseWriterToken.trim(),
            serviceToken.trim(), responseWriterId.trim(),
            'SSCS', 'Benefit',
            pipCaseId.trim(), 'dwpUploadResponse', 'dwp');*/

        await this.loginUserWithCaseId(credentials.judge, false, pipCaseId);
        //await this.homePage.reloadPage();
        await this.homePage.chooseEvent("Write final decision");

        //The Type of Appeal Page
        await this.writeFinalDecisionPage.verifyPageContentTypeOfAppealPage(true)
        await this.writeFinalDecisionPage.inputTypeOfAppealPageData();
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Allowed or Refused Page (Because we opted not in the previous page)
        await this.writeFinalDecisionPage.verifyPageContentAllowedOrRefusedPage();
        await this.writeFinalDecisionPage.chooseAllowedOrRefused("#writeFinalDecisionAllowedOrRefused-allowed");
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeFinalDecisionPage.verifyPageContentTypeOfHearingPage();
        await this.writeFinalDecisionPage.inputTypeOfHearingPageData(false)
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeFinalDecisionPage.verifyPageContentForPanelMembersPage('PIP');
        await this.writeFinalDecisionPage.inputPageContentForPanelMembersPageData('PIP');
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeFinalDecisionPage.verifyPageContentForDecisionDatePage();
        await this.writeFinalDecisionPage.submitContinueBtn();
        await this.writeFinalDecisionPage.inputTypePageContentForDecisionPageData();
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeFinalDecisionPage.verifyPageContentForBundleSectionReferencePage();
        await this.writeFinalDecisionPage.inputPageContentForBundleSectionReferencePageData();
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeFinalDecisionPage.verifyPageContentForSummaryOutcomePage();
        await this.writeFinalDecisionPage.inputPageContentForSummaryOutcomePageData();
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeFinalDecisionPage.verifyPageContentForReasonForDecisionPage();
        await this.writeFinalDecisionPage.inputPageContentForReasonForDecisionPageData();
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeFinalDecisionPage.verifyPageContentForAnythingElseDecisionPage();
        await this.writeFinalDecisionPage.inputPageContentForAnythingElsePageData();
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000));

        await this.writeFinalDecisionPage.verifyPageContentForPreviewDecisionNoticePage(true);
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000));

        await this.writeFinalDecisionPage.verifyPageContentForCheckYourAnswersPage()
        await this.writeFinalDecisionPage.confirmSubmission();
        await this.verifyHistoryTabDetails("Write final decision");
    }

    async performIssueFinalDecisionForAPIPAppeal(pipCaseId) {
        await this.homePage.chooseEvent("Issue final decision");
        await this.writeFinalDecisionPage.verifyPageContentForPreviewDecisionNoticePage(false);
        await this.writeFinalDecisionPage.confirmSubmission();
        await this.verifyHistoryTabDetails("Issue final decision");
    }
}

import { Page } from '@playwright/test';
import { BaseStep } from './base';
import {credentials} from "../../config/config";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import {accessId, accessToken, getSSCSServiceToken} from "../../api/client/idam/idam.service";
import {
    performEventOnCaseForActionFurtherEvidence,
    performEventOnCaseWithUploadResponse
} from "../../api/client/sscs/factory/appeal.update.factory";
import issueDirectionTestdata from "../../pages/content/issue.direction_en.json";
import eventTestData from "../../pages/content/event.name.event.description_en.json";
import logger from "../../utils/loggerUtil";

export class IssueDirectionsNotice extends BaseStep {
    
  readonly page : Page;
  

   constructor(page: Page) {
       super(page);
       this.page = page;
   }

    async performIssueDirectionNoticePreHearingAppealToProceed() {

        let taxCreditCaseId = await createCaseBasedOnCaseType('TAX CREDIT');
        await new Promise(f => setTimeout(f, 6000)); //Delay required for the Case to be ready
        logger.info('The value of the response writer : '+credentials.hmrcUser.email)
        let responseWriterToken: string = await accessToken(credentials.hmrcUser);
        let serviceToken: string = await getSSCSServiceToken();
        let responseWriterId: string = await accessId(credentials.hmrcUser);
        await performEventOnCaseWithUploadResponse(responseWriterToken.trim(),
            serviceToken.trim(), responseWriterId.trim(),
            'SSCS','Benefit',
            taxCreditCaseId.trim(),'dwpUploadResponse','hmrc');

        logger.info('The value of the response writer : '+credentials.amCaseWorker.email)
        let caseWorkerToken: string = await accessToken(credentials.amCaseWorker);
        let serviceTokenForCaseWorker: string = await getSSCSServiceToken();
        let caseWorkerId: string = await accessId(credentials.amCaseWorker);
        await new Promise(f => setTimeout(f, 20000)); //Delay required for the Case to be ready
        await performEventOnCaseForActionFurtherEvidence(caseWorkerToken.trim(),
            serviceTokenForCaseWorker.trim(),caseWorkerId.trim(),'SSCS','Benefit',
            taxCreditCaseId.trim(), 'uploadDocumentFurtherEvidence');

       /* await this.loginUserWithCaseId(credentials.judge, false, taxCreditCaseId);
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent("Issue directions notice");

        await this.issueDirectionPage.verifyPageContent();
        await this.issueDirectionPage.populatePreHearingAppealToProceed(
            issueDirectionTestdata.hearingType,
            'Appeal to Proceed',
            issueDirectionTestdata.docTitle);

       await this.eventNameAndDescriptionPage.verifyPageContent("Appeal withdrawn",
           true, "Direction type", "Appeal to Proceed");
        await this.eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
            eventTestData.eventDescriptionInput);
        await this.eventNameAndDescriptionPage.confirmSubmission();*/
        //await this.verifyHistoryTabDetails("Dormant");
    }
}

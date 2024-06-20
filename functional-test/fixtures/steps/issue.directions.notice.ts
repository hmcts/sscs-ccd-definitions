import { Page } from '@playwright/test';
import { BaseStep } from './base';
import {credentials} from "../../config/config";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import {accessId, accessToken, getSSCSServiceToken} from "../../api/client/idam/idam.service";
import {performEventOnCaseWithUploadResponse} from "../../api/client/sscs/factory/appeal.update.factory";
import issueDirectionTestdata from "../../pages/content/issue.direction_en.json";
import eventTestData from "../../pages/content/event.name.event.description_en.json";

export class IssueDirectionsNotice extends BaseStep {
    
  readonly page : Page;
  

   constructor(page: Page) {
       super(page);
       this.page = page;
   }

    async performIssueDirectionNoticePreHearingAppealToProceed() {

        let taxCreditCaseId = await createCaseBasedOnCaseType('TAX CREDIT');
        await new Promise(f => setTimeout(f, 10000)); //Delay required for the Case to be ready
        let responseWriterToken: string = await accessToken(credentials.dwpResponseWriter);
        let serviceToken: string = await getSSCSServiceToken();
        let responseWriterId: string = await accessId(credentials.dwpResponseWriter);
        await performEventOnCaseWithUploadResponse(responseWriterToken.trim(),
            serviceToken.trim(), responseWriterId.trim(),
            'SSCS','Benefit',
            taxCreditCaseId.trim(),'dwpUploadResponse');

        /*await this.loginUserWithCaseId(credentials.judge, false, taxCreditCaseId);
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

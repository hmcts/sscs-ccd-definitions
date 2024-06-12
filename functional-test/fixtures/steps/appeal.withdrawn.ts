import { Page } from '@playwright/test';
import { BaseStep } from './base';
import {credentials} from "../../config/config";
const eventTestData = require("../../pages/content/event.name.event.description_en.json");

export class AppealWithdrawn extends BaseStep {
    
  readonly page : Page;
  

   constructor(page: Page) {
       super(page);
       this.page = page;
   }

    async performAppealWithdrawn(caseId: string) {
        console.log("**APPEAL WITHDRAWN**")
        await this.loginUserWithCaseId(credentials.amCaseWorker,false, caseId);
        await this.homePage.chooseEvent("Appeal withdrawn");

        await this.eventNameAndDescriptionPage.verifyPageContent("Appeal withdrawn");
        await this.eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
            eventTestData.eventDescriptionInput);
        await this.eventNameAndDescriptionPage.confirmSubmission();

        //await this.verifyHistoryTabDetails("Dormant");
    }
}

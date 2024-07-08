<<<<<<< HEAD
import { Page } from '@playwright/test';
=======
import { Page, expect } from '@playwright/test';
>>>>>>> master
import { BaseStep } from './base';
import {credentials} from "../../config/config";
const eventTestData = require("../../pages/content/event.name.event.description_en.json");

export class AppealWithdrawn extends BaseStep {
<<<<<<< HEAD
    
  readonly page : Page;
  
=======

  readonly page : Page;

>>>>>>> master

   constructor(page: Page) {
       super(page);
       this.page = page;
   }

<<<<<<< HEAD
    async performAppealWithdrawn(caseId: string) {
        await this.loginUserWithCaseId(credentials.amSuperUser, false, caseId);
        await this.homePage.reloadPage();
=======
    async performAppealWithdrawn(caseId: string, loginRequired: boolean = true) {

        if(loginRequired) {
            await this.loginUserWithCaseId(credentials.amSuperUser, false ,caseId);
            await this.homePage.reloadPage(); 
        }

>>>>>>> master
        await this.homePage.chooseEvent("Appeal withdrawn");

        await this.eventNameAndDescriptionPage.verifyPageContent("Appeal withdrawn");
        await this.eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
            eventTestData.eventDescriptionInput);
        await this.eventNameAndDescriptionPage.confirmSubmission();

<<<<<<< HEAD
=======
        await expect(this.homePage.summaryTab).toBeVisible();
        await this.homePage.delay(3000);

>>>>>>> master
        await this.verifyHistoryTabDetails("Dormant");
    }
}

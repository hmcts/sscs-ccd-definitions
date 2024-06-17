import { Page } from '@playwright/test';
import eventTestData from "../../pages/content/event.name.event.description_en.json"
import { BaseStep } from './base';
import { credentials } from "../../config/config";


export class ReadyToList extends BaseStep {

  readonly page : Page;

   constructor(page: Page) {
        super(page);
        this.page = page;
   }

    async performReadyToListEvent(caseId: string): Promise<void> {

        await this.loginUserWithCaseId(credentials.amCaseWorker, false ,caseId);
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent('Ready to list');

        await this.completeReadyToListEvent();
    }

    async completeReadyToListEvent(): Promise<void> {
        await this.eventNameAndDescriptionPage.verifyPageContent("Ready to list");
        await this.eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
            eventTestData.eventDescriptionInput);
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.verifyHistoryTabDetails('With FTA', 'Ready to list', eventTestData.eventDescriptionInput);
    }
}
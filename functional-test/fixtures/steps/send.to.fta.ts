import { Page } from '@playwright/test';
import { BaseStep } from './base';

const eventTestData = require("../../pages/content/event.name.event.description_en.json");

export class SendToFTA extends BaseStep {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async performSendToFTA(caseId: string) {
        await this.loginAsSuperUserWithCaseId(caseId);
        await this.homePage.chooseEvent('Admin - send to With FTA');
        await this.eventNameAndDescriptionPage.verifyPageContent("Admin - send to With FTA");
        await this.eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
            eventTestData.eventDescriptionInput);
        await this.eventNameAndDescriptionPage.confirmSubmission();
        await this.verifyHistoryTabDetails('With FTA', 'Admin - send to With FTA', 'Event Description for Automation Verification');
    }

}
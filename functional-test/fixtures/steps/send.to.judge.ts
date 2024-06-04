import { Page } from '@playwright/test';
import eventTestData from "../../pages/content/event.name.event.description_en.json";
import { SendToJudgePage } from '../../pages/send.to.judge.page';
import { BaseStep } from './base';

export class SendToJudge extends BaseStep {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async performSendToJudge() {

        let sendToJudgePage = new SendToJudgePage(this.page);

        await this.loginAsSuperUserWithoutCaseId(undefined, "TAX CREDIT");
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent('Send to Judge');

        await sendToJudgePage.verifyPageContent();
        await sendToJudgePage.selectHearingType();
        await sendToJudgePage.inputData();
        await sendToJudgePage.selectInterlocutoryReviewState();
        await sendToJudgePage.confirmSubmission();

        await this.eventNameAndDescriptionPage.verifyPageContent('Send to Judge');
        await this.eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
            eventTestData.eventDescriptionInput);
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.verifyHistoryTabDetails('With FTA', 'Send to Judge', eventTestData.eventDescriptionInput);
    }
}

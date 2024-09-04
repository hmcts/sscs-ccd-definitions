import {Page} from '@playwright/test';
import {BaseStep} from './base';
import {credentials} from '../../config/config';
import eventTestData from "../../pages/content/event.name.event.description_en.json";


export class SendToValid extends BaseStep {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async performSendToValid(caseId: string) {

        await this.loginUserWithCaseId(credentials.amSuperUser, false, caseId);
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent('Admin - send to Valid');

        await this.eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
            eventTestData.eventDescriptionInput);
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.verifyHistoryTabDetails("Valid Appeal", 'Admin - send to Valid', '-');
    }
}

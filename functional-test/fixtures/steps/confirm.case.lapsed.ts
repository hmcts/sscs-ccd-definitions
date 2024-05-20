import { Page } from '@playwright/test';
import { BaseStep } from './base';
const eventTestData = require("../../pages/content/event.name.event.description_en.json");

export class ConfirmCaseLapsed extends BaseStep {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async performConfirmCaseLapsed() {

        await this.loginAsCaseworkerUser('CHILDSUPPORT');
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent('Confirm lapsed');

        //Params are passed to this page as this is a common page to be reused.
        await this.eventNameAndDescriptionPage.verifyPageContent('Confirm lapsed',false, null, null);
        await this.eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
            eventTestData.eventDescriptionInput);
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.verifyHistoryTab(null, 'Confirm lapsed', 'Event Description for Automation Verification');
    }

}

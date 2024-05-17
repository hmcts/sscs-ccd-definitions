import { Page } from '@playwright/test';
import { BaseStep } from './base';
const sendToAdminData = require("../../pages/content/send.to.admin_en.json");
const eventTestData = require("../../pages/content/event.name.event.description_en.json");


export class SendToAdmin extends BaseStep {

    readonly page: Page;


    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async performSendToAdmin() {

        await this.loginAsCaseworkerUser(null, 'TAX CREDIT');
        await this.homePage.chooseEvent('Send to admin');

        //Params are passed to this page as this is a common page to be reused.
        await this.textAreaPage.verifyPageContent(sendToAdminData.sendToAdminCaption,
            sendToAdminData.sendToAdminHeading,
            sendToAdminData.sendToAdminFieldLabel);
        await this.textAreaPage.inputData(sendToAdminData.sendToAdminInput);
        await this.textAreaPage.confirmSubmission();

        //Params are passed to this page as this is a common page to be reused.
        await this.eventNameAndDescriptionPage.verifyPageContent('Send to admin',true,
            sendToAdminData.sendToAdminFieldLabel, sendToAdminData.sendToAdminInput);
        await this.eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
            eventTestData.eventDescriptionInput);
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.verifyHistoryTab(null, 'Send to admin', 'Event Description for Automation Verification');
    }

}

import { Page } from '@playwright/test';
import { HomePage } from '../../pages/common/homePage';
import createCaseBasedOnCaseType from "../../api/client/appeal.type.factory";
import informationReceivedData from "../../pages/content/information.received_en.json"
import { History } from '../../pages/tabs/history';
import { InformationReceivedPage } from "../../pages/information.received.page";
import eventTestData from "../../pages/content/event.name.event.description_en.json";
import { EventNameEventDescriptionPage } from "../../pages/common/event.name.event.description";

export class InformationReceived {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async createCase(caseType: string) {
        var taxCreditCaseId = await createCaseBasedOnCaseType(caseType);
        return taxCreditCaseId;
    }

    async performInformationReceivedEvent() {

        let homePage = new HomePage(this.page);
        let informationReceivedPage = new InformationReceivedPage(this.page);
        let eventNameAndDescriptionPage = new EventNameEventDescriptionPage(this.page);

        await informationReceivedPage.verifyPageContent();
        await informationReceivedPage.selectReviewState(informationReceivedData.informationReceivedReviewStateSelectValue);
        await informationReceivedPage.confirmSubmission();

        await eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
            eventTestData.eventDescriptionInput);
        await eventNameAndDescriptionPage.confirmSubmission();

        let historyTab = new History(this.page);
        await homePage.navigateToTab("History");
        await historyTab.verifyPageContentByKeyValue('Event', 'Information received');
        await historyTab.verifyPageContentByKeyValue('Summary', 'Event Summary for Automation');
        await historyTab.verifyPageContentByKeyValue('Comment', 'Event Description for Automation Verification');
        await historyTab.verifyEventRecorded("Information received");
    }

}

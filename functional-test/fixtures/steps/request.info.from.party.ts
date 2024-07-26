import { Page, expect } from '@playwright/test';
import requestInfo from "../../pages/content/request.info.from.party_en.json";
import eventTestData from "../../pages/content/event.name.event.description_en.json";
import { BaseStep } from './base';

export class RequestInfoFromParty extends BaseStep {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async performRequestInfoFromPartyEvent() {

        await this.requestInfoFromPartyPage.verifyPageContent();
        await this.requestInfoFromPartyPage.chooseRequestInfoFromCaseParty();
        await this.requestInfoFromPartyPage.selectPartyToRequestInfoFrom(requestInfo.requestInfoPartySelectionDropdownValue);
        await this.page.getByRole('button', { name: 'Add new' }).click();

        await this.requestInfoFromPartyPage.inputRequestDetails(requestInfo.requestInfoDetailsToRequestInput);
        await this.requestInfoFromPartyPage.inputDateOfRequest();
        await this.requestInfoFromPartyPage.chooseResponseRequired();
        await this.requestInfoFromPartyPage.inputDueDate();
        await this.page.getByRole('button', { name: 'Continue' }).click();

        await expect(this.page.locator('form.check-your-answers h2.heading-h2')).toHaveText('Check your answers');
        await this.eventNameAndDescriptionPage.verifyPageContent(requestInfo.requestInfoCaption);
        await this.eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
            eventTestData.eventDescriptionInput);
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await expect(this.homePage.summaryTab).toBeVisible();
        await this.homePage.delay(3000);
        await this.verifyHistoryTabDetails('Information requested', requestInfo.requestInfoCaption, eventTestData.eventDescriptionInput);
    }
}
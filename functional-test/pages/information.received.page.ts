import { Page } from '@playwright/test';
import informationReceivedData from "./content/information.received_en.json"
import { WebAction } from '../common/web.action';

let webAction: WebAction;

export class InformationReceivedPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webAction = new WebAction(this.page);
    }

    async verifyPageContent() {
        await webAction.verifyPageLabel('span.govuk-caption-l', informationReceivedData['information-received-caption']); //Captor Text
        await webAction.verifyPageLabel('h1.govuk-heading-l', informationReceivedData['information-received-heading']); //Heading Text
        await webAction.verifyPageLabel('label[for="interlocReviewState"]', informationReceivedData['information-received-field-label']); //Field Label
    }

    async selectReviewState(option: string): Promise<void> {
        await webAction.chooseOptionByLabel('#interlocReviewState', option);
        // await this.page.selectOption('#interlocReviewState', option);
    }

    async confirmSubmission(): Promise<void> {
        await webAction.clickButton('Submit');
    }
}

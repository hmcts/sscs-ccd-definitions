import {expect, Locator, Page} from '@playwright/test';
import {WebActions} from '../common/webActions'
import eventTestData from "./content/event.name.event.description_en.json";

let webActions: WebActions;

export class EventNameEventDescriptionPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async verifyPageContent() {

        await webActions.verifyPageLabel('.govuk-heading-l', eventTestData.addNoteEvent); //Heading Text
        await webActions.verifyPageLabel('[for=\'field-trigger-summary\']', eventTestData["event-summary-label"]); //Field Label
        //await webActions.verifyPageLabel('.form-hint', eventTestData["event-summary-guidance-text"]); //Guidance Text

        await webActions.verifyPageLabel('[for=\'field-trigger-description\']', eventTestData["event-summary-description"]); //Field Label
    }

    async inputData(): Promise<void> {
        await webActions.inputField('#field-trigger-summary', eventTestData["event-summary-input"]);
        await webActions.inputField('#field-trigger-description', eventTestData["event-description-input"]);
    }

    async confirmSubmission(): Promise<void> {
        await webActions.clickButton('Submit');
    }

}

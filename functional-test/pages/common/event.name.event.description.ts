import {Page} from '@playwright/test';
import {WebAction} from '../../common/web.action'
import eventTestData from "../content/event.name.event.description_en.json";

let webActions: WebAction;

export class EventNameEventDescriptionPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifyPageContent(headingValue: string, checkYourAnswersFlag: boolean = false, key?: string, value?: string) {

        await webActions.verifyPageLabel('.govuk-heading-l', headingValue); //Heading Text
        if (checkYourAnswersFlag) {
            await webActions.verifyPageLabel('.heading-h2', eventTestData["event-summary-check-your-answers-heading"]); //Check your answers Text.
            await webActions.verifyPageLabel('.check-your-answers > .text-16', eventTestData["event-summary-check-the-information-text"]);
            await webActions.verifyPageLabel('.case-field-label > .text-16', key);
            await webActions.verifyPageLabel('ccd-read-text-area-field > span', value);
        }
        await webActions.verifyPageLabel('[for=\'field-trigger-summary\']', eventTestData["event-summary-label"]); //Field Label
        //await webActions.verifyPageLabel('.form-hint', eventTestData["event-summary-guidance-text"]); //Guidance Text
        await webActions.verifyPageLabel('[for=\'field-trigger-description\']', eventTestData["event-summary-description"]); //Field Label
    }

    async inputData(eventSummary: string, eventDescription: string): Promise<void> {
        await webActions.inputField('#field-trigger-summary', eventSummary);
        await webActions.inputField('#field-trigger-description', eventDescription);
    }

    async confirmSubmission(): Promise<void> {
        await this.page.waitForTimeout(3000);
        await webActions.clickSubmitButton();
    }

}
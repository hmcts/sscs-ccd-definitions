import {Page} from '@playwright/test';
import {WebAction} from '../common/web.action'
// import addNoteTestData from "./content/add.note_en.json";


let webActions: WebAction;

export class EvidenceReminderPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifyPageContent() {
        await webActions.verifyPageLabel('.govuk-caption-l', 'Evidence reminder'); //Captor Text
        await webActions.verifyPageLabel('.govuk-heading-l', 'Evidence reminder'); //Heading Text
        await webActions.verifyPageLabel('label[for="field-trigger-summary"]', 'Event summary (optional)'); //Field Trigger Summary
        await webActions.verifyPageLabel('.form-hint', 'A few words describing the purpose of the event.');
        await webActions.verifyPageLabel('label[for="field-trigger-description"]', 'Event description (optional)');
    }

    async evidenceReminder(summary: string, description: string): Promise<void>{
        await webActions.inputField('input#field-trigger-summary', summary);
        await webActions.inputField('input#field-trigger-description', description);
    }

    async confirmSubmission(): Promise<void> {
        await webActions.clickButton('Submit');
    }
}
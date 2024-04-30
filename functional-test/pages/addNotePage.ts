import {Page} from '@playwright/test';
import {WebActions} from '../common/webActions'
import addNoteTestData from "./content/add.note_en.json";


let webActions: WebActions;

export class AddNotePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async verifyPageContent() {
        await webActions.verifyPageLabel('.govuk-caption-l', 'Add a note'); //Captor Text
        await webActions.verifyPageLabel('.govuk-heading-l', 'Add a case note'); //Heading Text
        await webActions.verifyPageLabel('.form-label', 'Enter note'); //Field Label
    }

    async inputData(): Promise<void> {
        await webActions.inputField('#tempNoteDetail', addNoteTestData.noteSummaryValue);
    }

    async confirmSubmission(): Promise<void> {
        await webActions.clickButton('Submit');
    }

}

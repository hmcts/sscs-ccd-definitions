import {expect, Locator, Page} from '@playwright/test';
import {WebActions} from '../lib/webActions'

let webActions: WebActions;

export class AddNotePage {

    readonly page: Page;
    readonly textDetailsField: Locator;
    readonly submitButton: Locator;


    constructor(page: Page) {
        this.page = page;
        /*this.textDetailsField = page.locator('#tempNoteDetail');
        this.submitButton = page.getByRole('button', {name: 'Submit'});*/

        webActions = new WebActions(this.page);

    }

    async verifyPageContent() {
        await webActions.verifyPageLabel('.govuk-caption-l', 'Add a note'); //Captor Text
        await webActions.verifyPageLabel('.govuk-heading-l', 'Add a case note'); //Heading Text
        await webActions.verifyPageLabel('.form-label', 'Enter note'); //Field Label
    }

x
    async inputData(elementData: string): Promise<void> {
        await webActions.inputField('#tempNoteDetail', elementData);
    }

    async confirmSubmission(): Promise<void> {
        await webActions.clickButton('[type=\'submit\']');
    }

}

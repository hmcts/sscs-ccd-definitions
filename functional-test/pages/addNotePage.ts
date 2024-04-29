import { expect, Locator, Page } from '@playwright/test';
import { WebActions } from '../lib/webActions'

let webActions: WebActions;

export class AddNotePage {

    readonly page: Page;
    readonly textDetailsField: Locator;
    readonly submitButton: Locator;
    
    
    constructor(page: Page) {
        this.page = page;
        this.textDetailsField = page.locator('#tempNoteDetail');
        this.submitButton = page.getByRole('button', {name: 'Submit'});
       
        webActions = new WebActions(this.page);

    }

    async submitNote(noteSummary: string): Promise<void> {
        await this.textDetailsField.fill(noteSummary);
        await this.submitButton.click();
    }

    async confirmSubmission(): Promise<void> {
        await this.submitButton.click();
    }
 
}
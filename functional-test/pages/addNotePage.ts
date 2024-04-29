import { expect, Locator, Page } from '@playwright/test';
import { WebActions } from '../lib/webActions'

let webActions: WebActions;

export class AddNotePage {

    readonly page: Page;
    readonly textDetailsField: string;
    readonly submitButton: Locator;
    
    
    constructor(page: Page) {
        this.page = page;
        this.textDetailsField = '#tempNoteDetail';
       
        webActions = new WebActions(this.page);
    }

    async submitNote(noteSummary: string): Promise<void> {
        await webActions.fillText(this.textDetailsField, noteSummary);
        await webActions.clickButton('Submit');
    }

    async confirmSubmission(): Promise<void> {
        await webActions.clickButton('Submit');
    }
 
}
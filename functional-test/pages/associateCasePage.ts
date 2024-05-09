import { expect, Locator, Page } from '@playwright/test';
import { WebAction } from '../common/web.action';

let webAction: WebAction;

export class AssociateCasePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webAction = new WebAction(this.page);
    }

    async verifyPageContent(casereference : string) {
        await webAction.verifyPageLabel('.govuk-caption-l', 'Associate case'); //Captor Text
        await webAction.verifyPageLabel('.govuk-heading-l', 'Associate cases'); //Heading Text
        await webAction.verifyPageLabel('#linkedCasesBoolean legend span', 'Has related appeal(s)'); //Field Label
        await webAction.verifyPageLabel('label[for="linkedCasesBoolean_Yes"]', 'Yes');
        await webAction.verifyPageLabel('label[for="linkedCasesBoolean_No"]', 'No');
    }

    async associateCase(caseNumber: string): Promise<void> {
        await webAction.clickButton("Add new");
        await webAction.inputField('input#associatedCase_0_0', caseNumber);
        await webAction.clickRadioButton('No');
        await webAction.clickButton("Continue");
    }

    async associateNonExistentCase(caseNumber: string): Promise<void> {
        await webAction.clickButton("Add new");
        await webAction.inputField('input#associatedCase_0_0', caseNumber);
        await webAction.clickRadioButton('#linkedCasesBoolean_No');
        await webAction.clickButton("Continue");
    }

    async confirmSubmission(): Promise<void> {
        await webAction.clickButton('Submit');
    }

    async verifyInputErrorMessage(caseNumber: string) {
        let errorMessageText = (await this.page.locator("div.form-group span.error-message").textContent()).trim();
        expect(errorMessageText).toEqual(`${caseNumber} does not correspond to an existing CCD case.`)
    }

    async cancelEvent(): Promise<void> {
        await webAction.clickLink("Cancel");
    }
 
}
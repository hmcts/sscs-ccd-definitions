import { expect, Locator, Page } from '@playwright/test';

export class WebActions {

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async chooseOptionByLabel(elementId: string, labelText: string) {
        await this.page.locator(elementId).selectOption({label: labelText});
    }

    async clickNextStepButton(elementId: string): Promise<void> {
        await this.page.click(elementId);
    }

    async fillText(elementId: string, inputText: string): Promise<void> {
        await this.page.fill(elementId, inputText);
    }

    async clickButton(elementName: string): Promise<void> {
        await this.page.getByRole('button', {name: elementName}).click();
    }
}
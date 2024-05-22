import { expect, Locator, Page } from '@playwright/test';

export class WebActions {

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async chooseOptionByLabel(elementId: string, labelText: string) {
        this.page.locator(elementId).selectOption({label: labelText});
    }

    async clickNextStepButton(elementId: string): Promise<void> {
        this.page.click(elementId);
    }
}
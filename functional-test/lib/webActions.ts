import { expect, Locator, Page } from '@playwright/test';

export class WebActions {

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async chooseOptionByLabel(elementLocator: string, labelText: string) {
        await this.page.locator(elementLocator).selectOption({label: labelText});
    }

    async verifyPageLabel(elementLocator: string, labelText: string) {
        await expect(this.page.locator(elementLocator)).toHaveText(labelText);
    }

    async inputField (elementLocator: string, inputValue: string) {
        await this.page.fill(elementLocator, inputValue);
    }

    async clickButton(elementLocator: string): Promise<void> {
        // await this.page.click(elementLocator);
        await this.page.getByRole('button', { name: elementLocator}).click();
    }

    async clickNextStepButton(elementId: string): Promise<void> {
        await this.page.click(elementId);
    }
}

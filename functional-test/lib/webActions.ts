import { expect, Page } from '@playwright/test';
import logger from '../utils/loggerUtil';

export class WebActions {

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async chooseOptionByLabel(elementLocator: string, labelText: string) {
        await this.page
         .locator(elementLocator)
         .selectOption({label: labelText})
         .catch((error) => {
            logger.error(`Select box field is not present: ${error}`);
         });
    }

    async verifyPageLabel(elementLocator: string, labelText: string) {
        await expect(this.page.locator(elementLocator))
         .toHaveText(labelText)
         .catch((error) => {
            logger.error(`Element to verify assertion is not present: ${error}`);
         });
    }

    async inputField (elementLocator: string, inputValue: string) {
        await this.page
         .fill(elementLocator, inputValue)
         .catch((error) => {
            logger.error(`Input field is not present: ${error}`);
         });
    }

    async clickButton(elementLocator: string): Promise<void> {
        await this.page
         .getByRole('button', { name: elementLocator})
         .click()
         .catch((error) => {
            logger.error(`Button element is not present: ${error}`);
         });
    }

    async clickNextStepButton(elementId: string): Promise<void> {
        await this.page
         .click(elementId)
         .catch((error) => {
            logger.error(`Next step submit button is not present: ${error}`);
         });
    }
}

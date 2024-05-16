import { expect, Page } from '@playwright/test';
import logger from '../utils/loggerUtil';

export class WebAction {

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

    async verifyPageLabel(elementLocator: string, labelText: string | string[]) {
        await expect(this.page.locator(elementLocator))
         .toHaveText(labelText)
         .catch((error) => {
            logger.error(`Assertion failed due to: ${error}`);
         });
    }

    async verifyTextVisibility(labelText: string) {
        await expect(this.page.getByText(labelText))
         .toBeVisible()
         .catch((error) => {
            logger.error(`Test not visible due to: ${error}`);
         });
    }

    async verifyElementVisibility(elementlocator: string) {
        await expect(this.page.locator(elementlocator))
         .toBeVisible()
         .catch((error) => {
            logger.error(`Element not visible due to: ${error}`);
         });
    }

    async inputField(elementLocator: string, inputValue: string) {
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

    async clickRadioButton(elementLocator: string): Promise<void> {
        await this.page
         .getByRole('radio', { name: elementLocator})
         .click()
         .catch((error) => {
            logger.error(`Radio button element is not present: ${error}`);
         });
    }

    async clickElementById(elementLocator: string): Promise<void> {
        await this.page
         .locator(elementLocator)
         .click()
         .catch((error) => {
            logger.error(`Radio button element is not present: ${error}`);
         });
    }

    async clickLink(elementLocator: string): Promise<void> {
        await this.page
            .getByRole('link', { name: elementLocator})
            .click()
            .catch((error) => {
                logger.error(`Link element is not present: ${error}`);
            });
    }

    async clickNextStepButton(elementId: string): Promise<void> {
        await this.page
         .click(elementId)
         .catch((error) => {
            logger.error(`Next step submit button is not present: ${error}`);
         });
    }

    async uploadFile(elementId: string, fileName: string): Promise<void> {
        await this.page
           .locator(elementId)
           .setInputFiles(`functional-test/data/file/${fileName}`)
           .catch((error) => {
            logger.error(`File upload element is not present: ${error}`);
         });
    }
}

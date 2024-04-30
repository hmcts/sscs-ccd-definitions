import {expect, Locator, Page} from '@playwright/test';
import {WebActions} from '../lib/webActions';
import logger from '../utils/loggerUtil';

let webActions: WebActions;

export class HomePage {

    readonly page: Page;
    readonly summaryTab: Locator;
    readonly notePadTab: Locator;
    readonly submitNextStepButton: string;
    readonly nextStepDropDown: string;
    readonly eventTitle: Locator;


    constructor(page: Page) {
        this.page = page;
        this.summaryTab = page.locator('//div[contains(text(), "Summary")]');
        this.notePadTab = page.locator('//div[contains(text(), "Notepad")]');
        this.nextStepDropDown = '#next-step';
        this.submitNextStepButton = '//button[@type="submit"]';
        this.eventTitle = page.locator('h1.govuk-heading-l');

        webActions = new WebActions(this.page);

    }

    async goToHomePage(caseId: string): Promise<void> {
        await this.page.goto(`/cases/case-details/${caseId}`);
        await expect(this.summaryTab)
            .toBeVisible()
            .catch((error) => {
                logger.error(`Element to verify assertion is not present: ${error}`);
            });
    }

    async chooseEvent(eventName: string): Promise<void> {

        await webActions.chooseOptionByLabel(this.nextStepDropDown, eventName);
        await webActions.clickNextStepButton(this.submitNextStepButton);
        await expect(this.eventTitle).toHaveText('Add a case note');
    }

    async verifyTabContent(fieldLabel: string, fieldValue: string): Promise<void> {
        await expect(this.notePadTab).toBeVisible();
        await this.notePadTab.click();
        await expect(this.page
            .locator(`//*[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`))
            .toBeVisible()
            .catch((error) => {
                logger.error(`Element to verify assertion is not present: ${error}`);
            });
    }
}

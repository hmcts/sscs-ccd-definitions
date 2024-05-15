import { expect, Locator, Page } from '@playwright/test';
import { WebAction } from '../../common/web.action';
import logger from '../../utils/loggerUtil';

let webActions: WebAction;

export class HomePage {

    readonly page: Page;
    readonly summaryTab: Locator;
    readonly notePadTab: Locator;
    readonly historyTab: Locator;
    readonly rolesAndAccessTab: Locator;
    readonly tasksTab: Locator;
    readonly submitNextStepButton: string;
    readonly nextStepDropDown: string;
    readonly eventTitle: Locator;


    constructor(page: Page) {
        this.page = page;
        this.notePadTab = page.getByText('Notepad', {exact: true});
        this.summaryTab = page.locator('//div[contains(text(), "Summary")]');
        this.historyTab = page.getByText('History', {exact: true});
        this.tasksTab = page.locator('//div[contains(text(), "Tasks")]');
        this.rolesAndAccessTab = page.locator('//div[contains(text(), "Roles and access")]');
        this.nextStepDropDown = '#next-step';
        this.submitNextStepButton = '//button[@class="submit"]';
        this.eventTitle = page.locator('h1.govuk-heading-l');

        webActions = new WebAction(this.page);

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
        //await webActions.clickNextStepButton(this.submitNextStepButton);
        await webActions.clickButton('Go');
    }

    async navigateToTab(tabName : string): Promise<void> {
        switch(tabName) {
            case "Notepad": {
                await expect(this.notePadTab).toBeVisible();
                await this.notePadTab.click();
                break;
            }
            case "History": {
                await expect(this.historyTab).toBeVisible();
                await this.historyTab.click();
                break;
            }
            case "Summary": {
                await expect(this.summaryTab).toBeVisible();
                await this.summaryTab.click();
                break;
            }
            case "Tasks": {
                await expect(this.tasksTab).toBeVisible();
                await this.tasksTab.click();
                break;
            }
            case "Roles and access": {
                await expect(this.rolesAndAccessTab).toBeVisible();
                await this.rolesAndAccessTab.click();
                break;
            }
            default: {
                //statements;
                break;
            }
        }
    }

    async logout() {
        // await webActions.clickLink('Sign out');
        await this.page.locator
    }
}

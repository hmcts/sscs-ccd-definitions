import {expect, Locator, Page} from '@playwright/test';
import {WebActions} from '../../common/webActions'

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
        this.notePadTab = page.locator('//div[contains(text(), "Notepad_")]');
        this.nextStepDropDown = '#next-step';
        this.submitNextStepButton = '//button[@type="submit"]';
        this.eventTitle = page.locator('h1.govuk-heading-l');

        webActions = new WebActions(this.page);

    }

    async goToHomePage(caseId: string): Promise<void> {
        await this.page.goto(`/cases/case-details/${caseId}`);
        await expect(this.summaryTab).toBeVisible();
    }

    async chooseEvent(eventName: string): Promise<void> {

        await webActions.chooseOptionByLabel(this.nextStepDropDown, eventName);
        await webActions.clickNextStepButton(this.submitNextStepButton);
    }

    async navigateToTab(): Promise<void> {
        await expect(this.notePadTab).toBeVisible();
        await this.notePadTab.click();
    }
}

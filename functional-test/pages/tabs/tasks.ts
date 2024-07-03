import { expect, Page } from '@playwright/test';
import { WebAction } from '../../common/web.action'
import { HomePage } from '../../pages/common/homePage';
import { timeouts } from '../../config/config';

let webActions: WebAction;

export class Tasks {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifyTaskIsDisplayed(taskName: string) {

        let homePage = new HomePage(this.page);
        let taskVisible = false;

        const startTime = Date.now();
        const timeout = timeouts.maxTimeout;

        while (Date.now() - startTime < timeout) {
            taskVisible = await this.page.isVisible(`//exui-case-task[./*[normalize-space()='${taskName}']]`);
            if (taskVisible) {
                break;
            }
            await homePage.navigateToTab('Summary');
            await homePage.delay(1000);
            await homePage.navigateToTab('Tasks');
            await homePage.delay(timeouts.shortTimeout);
        }

        if (!taskVisible) {
            throw new Error(`Task "${taskName}" is not displayed within ${timeout / 1000} seconds.`);
        }
    }

    async verifyTaskIsHidden(taskName: string) {

        let homePage = new HomePage(this.page);
        let taskVisible = true;

        await homePage.navigateToTab('Tasks');

        const startTime = Date.now();
        const timeout = timeouts.maxTimeout;

        while (Date.now() - startTime < timeout) {
            taskVisible = await this.page.isVisible(`//exui-case-task[./*[normalize-space()='${taskName}']]`);
            if (!taskVisible) {
                break;
            }
            await homePage.navigateToTab('Summary');
            await homePage.delay(1000);
            await homePage.navigateToTab('Tasks');
            await homePage.delay(timeouts.shortTimeout);
        }

        if (taskVisible) {
            throw new Error(`Task "${taskName}" is still displayed after waiting for ${timeout / 1000} seconds.`);
        }
    }

    async verifyTaskIsAssigned(taskName: string) {
        let selector = `//exui-case-task[./*[normalize-space()='${taskName}']]//a[normalize-space()='Reassign task']`;
        await expect(this.page.locator(selector)).toBeVisible();
    }

    async clickCancelTask(taskName: string) {
        await this.page
            .locator(`//exui-case-task[./*[normalize-space()='${taskName}']]//a[normalize-space()='Cancel task']`).click();
    }

    async selfAssignTask(taskName: string) {
        let selector = `//exui-case-task[./*[normalize-space()='${taskName}']]//a[normalize-space()='Assign to me']`;
        await this.page.locator(selector).click();
        await expect(this.page.locator(selector)).toBeHidden();
    }

    async clickAssignTask(taskName: string) {
        await (this.page
            .locator(`//exui-case-task[./*[normalize-space()='${taskName}']]//a[normalize-space()='Assign task']`)).click();
    }

    async verifyPageContentByKeyValue(taskName: string, fieldLabel: string, fieldValue: string) {
        await expect(this.page
            .locator(`//exui-case-task[./*[normalize-space()='${taskName}']]//*[normalize-space()='${fieldLabel}']/../dd[normalize-space()="${fieldValue}"]`)).toBeVisible();
    }

    async verifyPriortiy(taskName: string, expectedPriority: string) {
        let displayedPriority = (await this.page.locator(`//exui-case-task[./*[normalize-space()='${taskName}']]//exui-priority-field`).textContent()).trim();
        expect(displayedPriority).toBe(expectedPriority);
    }

    async verifyManageOptions(taskName: string, options: string[]) {
        let selector = `//exui-case-task[./*[normalize-space()='${taskName}']]//div[.//span[normalize-space()='Manage']]/dd/a`;

        const availableOptions = await this.page.$$eval(selector, (elements) =>
            elements.map((element) => element.textContent.trim())
        );

        expect(availableOptions).toMatchObject(options);
    }

    async verifyNextStepsOptions(taskName: string, options: string[]) {
        let selector = `//exui-case-task[./*[normalize-space()='${taskName}']]//div[.//span[normalize-space()='Next steps']]/dd//a`;

        const availableOptions = await this.page.$$eval(selector, (elements) =>
            elements.map((element) => element.textContent.trim())
        );

        expect(availableOptions).toMatchObject(options);
    }

    async verifyNextStepNavigation(nextStepLink: string, expectedPageTitle: string) {
        let homePage = new HomePage(this.page);

        await webActions.clickLink(nextStepLink);

        let pageTitle = await this.page.locator('h1.govuk-heading-l').textContent();
        expect(pageTitle).toEqual(expectedPageTitle);

        await webActions.clickLink('Cancel')
        await homePage.navigateToTab('Tasks');
    }

    async clickNextStepLink(linkText: string) {
        await webActions.clickLink(linkText);
    }

    async assignTaskToCtscUser(taskName: string, userEmail: string) {
        await this.clickAssignTask(taskName);
        await this.page.getByRole('radio', { name: 'CTSC' }).click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await this.page.locator('#inputSelectPerson').fill('SSCS ctscadmin');
        await expect(this.page.locator('div.mat-autocomplete-panel.mat-autocomplete-visible')).toBeVisible();
        await this.page.locator(`//mat-option/span[contains(text(), '${userEmail.toLowerCase()}')]`).click();
        await expect(this.page.locator('//mat-option')).toBeHidden();
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await expect(this.page.locator(`h1.govuk-heading-l:has-text('Check your answers')`)).toBeVisible();
        await expect(this.page.locator('//td[normalize-space()=\'SSCS ctscadmin\']')).toBeVisible();
        await this.page.getByRole('button', { name: 'Assign' }).click();

        await expect(this.page.locator('//h2[normalize-space()=\'Active tasks\']')).toBeVisible();
        let task = this.page.locator(`//exui-case-task[./*[normalize-space()='${taskName}']]`);
        await expect(task.getByRole('link', { name: 'Assign task' })).toBeHidden();
    }

    async cancelTask(taskName: string) {
        await this.clickCancelTask(taskName);
        await expect(this.page.locator('h1.govuk-heading-xl')).toHaveText('Cancel a task');
        await expect(this.page.locator(`exui-task-field:has-text('${taskName}')`)).toBeVisible();
        await this.page.getByRole('button', { name: 'Cancel task' }).click();
        await expect(this.page.locator('//h2[normalize-space()=\'Active tasks\']')).toBeVisible();
    }
}

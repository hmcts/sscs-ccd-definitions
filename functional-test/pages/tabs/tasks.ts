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
        const startTime = Date.now();
        const timeout = timeouts.maxTimeout;

        let homePage = new HomePage(this.page);
        let taskVisible = false;

        while (Date.now() - startTime < timeout) {
            taskVisible = await this.page.isVisible(`//exui-case-task[./*[normalize-space()='${taskName}']]`);
            if (taskVisible) {
                break;
            }
            await homePage.navigateToTab('Summary');
            await homePage.navigateToTab('Tasks');
            await this.page.waitForTimeout(timeouts.shortTimeout);
        }

        if (!taskVisible) {
            throw new Error(`Task "${taskName}" is not displayed within ${timeout / 1000} seconds.`);
        }
    }

    async verifyTaskIsHidden(taskName: string) {
        let selector = `//exui-case-task[./*[normalize-space()='${taskName}']]`;
        await expect(this.page.locator(selector)).toBeHidden();
    }

    async verifyTaskIsAssigned(taskName: string) {
        let selector = `//exui-case-task[./*[normalize-space()='${taskName}']]//a[normalize-space()='Reassign task']`;
        await expect(this.page.locator(selector)).toBeVisible();
    }

    async cancelTask(taskName: string) {
        await this.page
            .locator(`//exui-case-task[./*[normalize-space()='${taskName}']]//a[normalize-space()='Cancel task']`).click();
    }

    async selfAssignTask(taskName: string) {
        await this.page
            .locator(`//exui-case-task[./*[normalize-space()='${taskName}']]//a[normalize-space()='Assign to me']`).click();
    }

    async AssignTask(taskName: string) {
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
}

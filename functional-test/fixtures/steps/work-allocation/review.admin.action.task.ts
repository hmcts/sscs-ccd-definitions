import { expect, Page } from '@playwright/test';
import { HomePage } from '../../../pages/common/homePage';
import { Tasks } from "../../../pages/tabs/tasks";
import { WebAction } from '../../../common/web.action'
import task from '../../../pages/content/review.admin.task_en.json';

let webActions: WebAction;

export class ReviewAdminActionTask {

    readonly page : Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifyUnassignedTaskDetails() {
        let tasksTab = new Tasks(this.page);

        await tasksTab.verifyPriortiy(task.name, task.priority);
        await tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);
    }

    async verifyUnassignedTaskDetailsForCaseAllocator() {
        let tasksTab = new Tasks(this.page);

        await tasksTab.verifyPriortiy(task.name, task.priority);
        await tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await tasksTab.verifyManageOptions(task.name, task.unassignedManageOptionsForCaseAllocator);
    }

    async verifyAssignedTaskDetails() {
        let tasksTab = new Tasks(this.page);

        await tasksTab.verifyPriortiy(task.name, task.priority);
        await tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedTo);
        await tasksTab.verifyManageOptions(task.name, task.assignedManageOptions);
        await tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptions)
    }

    async verifyPageTitle(title: string) {
        let pageTitle = await this.page.locator('h1.govuk-heading-l').textContent();
        expect(pageTitle).toEqual(title);
    }

    async verifyNextSteps() {
        let homePage = new HomePage(this.page);

        await webActions.clickLink(task.sendToInterloc.link);
        await this.verifyPageTitle(task.sendToInterloc.eventTitle);
        await webActions.clickLink('Cancel')
        await homePage.navigateToTab('Tasks');

        // await webActions.clickLink(task.sendCaseToTcw.link);
        // await this.verifyPageTitle(task.sendCaseToTcw.eventTitle);
        // await webActions.clickLink('Cancel')
        // await homePage.navigateToTab('Tasks');
    }

    async selectNextStep(linkText: string) {
        await webActions.clickLink(linkText);
    }
}
import { Page } from '@playwright/test';
import { HomePage } from '../../pages/common/homePage';
import { Tasks } from "../../pages/tabs/tasks";
import { WebAction } from '../../common/web.action'

let webActions: WebAction;

export class TaskActions {

    readonly page : Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async goToHomePage(caseId: string) {
        let homePage = new HomePage(this.page);
        homePage.goToHomePage(caseId);
    }

    async verifyTaskDisplayed(taskName: string) {
        let homePage = new HomePage(this.page);
        let tasksTab = new Tasks(this.page);

        await homePage.navigateToTab("Tasks");
        await tasksTab.verifyTaskIsDisplayed(taskName);
    }

    async cancelTask(taskName: string) {
        let homePage = new HomePage(this.page);
        let tasksTab = new Tasks(this.page);

        await homePage.navigateToTab("Tasks");
        await tasksTab.cancelTask(taskName);
        await tasksTab.verifyTaskIsHidden(taskName);
    }

    async verifyTaskIsRemoved(taskName: string) {
        let homePage = new HomePage(this.page);
        let tasksTab = new Tasks(this.page);

        await homePage.navigateToTab("Tasks");
        await tasksTab.verifyTaskIsHidden(taskName);
    }

    async assignTaskToSelf(taskName: string) {
        let homePage = new HomePage(this.page);
        let tasksTab = new Tasks(this.page);

        await homePage.navigateToTab("Tasks");
        await tasksTab.selfAssignTask(taskName);
        await tasksTab.verifyTaskIsAssigned(taskName)
    }
}
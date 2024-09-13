import { test, expect, Page } from '@playwright/test';
import { WebAction } from '../../../common/web.action'
import task from '../../../pages/content/update.hearing.details.task_en.json';
import { BaseStep } from '../base';
import { credentials } from '../../../config/config'
import { ListingError } from '../listing.error';
import { ReadyToList } from '../ready.to.list';
import { VoidCase } from '../void.case';
const eventTestData = require("../../../pages/content/event.name.event.description_en.json");


let webActions: WebAction;

export class UpdateHearingDetailsTask extends BaseStep {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
        webActions = new WebAction(this.page);
    }

    // Event created to trigger Hearing Today event from next steps dropdown menu:
    private async goToHearingTodayEvent(page: Page, caseId: string) {
        await this.loginUserWithCaseId(credentials.amCaseWorkerWithCaseAllocatorRole, true, caseId);
        await this.homePage.chooseEvent("Hearing Today");
    }

    async taskCreation(caseId: string) {
        //creating the task
        await this.goToHearingTodayEvent(this.page, caseId);
        await webActions.clickSubmitButton();
        await this.homePage.delay(3000);
        await webActions.clickSubmitButton();

        // Verifying History tab + end state
        await this.verifyHistoryTabDetails("Hearing Today");
        await this.historyTab.verifyPageContentByKeyValue('End state', 'With FTA');
        await this.historyTab.verifyPageContentByKeyValue('Event', 'Hearing Today');
       
        await this.homePage.clickSignOut();
    }

    async verifyTCWWithoutLORoleCanViewAndAssignTask(caseId: string) {
        //checking task is created
        await this.homePage.delay(3000);
        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
        await this.homePage.delay(2000);

        test.setTimeout(250000);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await expect(this.page.getByRole('row', { name: 'Next steps' })).not.toBeVisible();
        await this.homePage.clickSignOut();
    }

    async verifyTCWWithLORoleCanViewAndAssignTask(caseId: string) {
        //checking task is there
        await this.homePage.delay(3000);
        await this.loginUserWithCaseId(credentials.hearingCentreAdmin, true, caseId);
        await this.homePage.delay(2000);

        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await this.tasksTab.selfAssignTask(task.name);
    
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedTo);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptions);
        await this.tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptions);
    }
}
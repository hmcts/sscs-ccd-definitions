import { Page, expect } from '@playwright/test';
import { WebAction } from '../../../common/web.action'
import task from '../../../pages/content/review.bf.date.task_en.json';
import { BaseStep } from '../base';
import { credentials } from '../../../config/config';
import dateUtilsComponent from '../../../utils/DateUtilsComponent';
import { MarkCaseAsUrgent } from '../mark-case.as.urgent';


let webActions: WebAction;

export class ReviewBFDateTask extends BaseStep {

    readonly page : Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifyCtscAdminAsAllocatedCaseWorkerCanViewTheAutomaticallyAssignedReviewBFDateTask(caseId: string) {
        
        // CTSC Admin with case allocator role assigns case to another CTSC Admin
        await this.loginUserWithCaseId(credentials.amCaseWorkerWithCaseAllocatorRole, false, caseId);
        await this.homePage.navigateToTab('Roles and access');
        await this.rolesAndAccessTab.allocateCtscRole(credentials.amCaseWorker.email);

        // CTSC Team leader performs direction due today event
        await this.performDirectionDueTodayEvent(caseId);

        // Review BF Date task is automatically assigned to allocated CTSC Admin
        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
    }

    async verifyCtscAdminAsAllocatedCaseWorkerCanCompleteTheAssignedReviewBFDateTask(caseId: string) {

        // Verify CTSC Admin as allocated caseworker can complete the assigned Review BF Date task
        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);

        // CTSC Admin verifies assigned task details
        await this.tasksTab.verifyPriortiy(task.name, task.priority);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedTo);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptions);
        await this.tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptions);

        // Verify navigation for Send to Interloc and Send case to TCW next step options
        await this.tasksTab.verifyNextStepNavigation(task.sendToInterloc.link, task.sendToInterloc.eventTitle);
        await this.tasksTab.verifyNextStepNavigation(task.sendCaseToTCW.link, task.sendCaseToTCW.eventTitle);

        // Select Information recieved next step and complete the event
        await this.tasksTab.clickNextStepLink(task.amendDueDate.link);

        await this.completeAmendDueDateEvent();

        // Verify task is removed from the tasks list within Tasks tab
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    async verifyReviewBFDateTaskIsCancelledAutomaticallyWhenTheCaseIsMarkedAsUrgent(caseId: string) {

        // CTSC Team leader performs direction due today event
        await this.performDirectionDueTodayEvent(caseId);

        // Verify CTSC Admin can view the unassigned Review BF Date task
        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
        await this.homePage.navigateToTab('Tasks')
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);

        // CTSC Administrator self assigns task and verifies assigned task details
        await this.tasksTab.selfAssignTask(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedTo);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptions);

        // CTSC Admin marks case as urgent
        let markCaseAsUrgent = new MarkCaseAsUrgent(this.page);
        await markCaseAsUrgent.performMarkCaseAsUrgent(caseId, false);

        // Verify task is removed from the tasks list within Tasks tab
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    async performDirectionDueTodayEvent(caseId: string) {
        await this.loginUserWithCaseId(credentials.amSuperUser, true, caseId);
        await this.homePage.chooseEvent('Direction Due Today');

        await expect(this.page.locator('span.govuk-caption-l')).toHaveText('Direction Due Today');
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await expect(this.page.locator('span.govuk-caption-l')).toBeHidden();
        await this.page.getByRole('button', { name: 'Submit' }).click();
        
        await expect(this.homePage.summaryTab).toBeVisible();
        await this.homePage.delay(3000);

        // Navigate to History Tab and Verify event is listed
        await this.verifyHistoryTabDetails('With FTA', 'Direction Due Today');
    }

    async completeAmendDueDateEvent() {

        await expect(this.page.locator('span.govuk-caption-l')).toHaveText('Amend due date');

        let date = dateUtilsComponent.rollDateToCertainWeeks(1);
        await this.page.locator('#directionDueDate-day').fill(String(date.getDate()).padStart(2, '0'));
        await this.page.locator('#directionDueDate-month').fill(String(date.getMonth() + 1).padStart(2, '0'));
        await this.page.locator('#directionDueDate-year').pressSequentially(String(date.getFullYear()));
        await expect(this.page.locator('fieldset span.error-message')).toBeHidden();
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await expect(this.page.locator('span.govuk-caption-l')).toBeHidden();
        await this.page.getByRole('button', { name: 'Submit' }).click();

        await expect(this.homePage.summaryTab).toBeVisible();
        await this.homePage.delay(3000);
        await this.verifyHistoryTabDetails('With FTA', 'Amend due date');
    }
}
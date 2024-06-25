import { Page } from '@playwright/test';
import { WebAction } from '../../../common/web.action'
import task from '../../../pages/content/review.incomplete.appeal.task_en.json';
import { BaseStep } from '../base';
import { credentials } from '../../../config/config';
import { VoidCase } from '../void.case';
import { RequestInfoFromParty } from '../request.info.from.party';


let webActions: WebAction;

export class ReviewIncompleteAppealTask extends BaseStep {

    readonly page : Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifyCtscAdminWithoutCaseAllocatorRoleCanViewReviewIncompleteAppealTask(caseId: string) {

        // Verify CTSC Admin can view the unassigned Review Incomplete Appeal task
        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPriortiy(task.name, task.priority);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);
    }

    async verifyCtscAdminWithCaseAllocatorRoleCanViewAndAssignReviewIncompleteAppealTask(caseId: string) {

        /* Login as CTSC Administrator with case allocator role and view the 
           unassigned Review Incomplete Appeal task and assign it to another CTSC Admin */
        await this.loginUserWithCaseId(credentials.amCaseWorkerWithCaseAllocatorRole, true, caseId);
        await this.homePage.navigateToTab('Tasks')
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPriortiy(task.name, task.priority);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptionsForCaseAllocator);
        await this.tasksTab.assignTaskToCtscUser(task.name, credentials.amCaseWorker.email);
    }

    async verifyCtscAdminAsAnAssignedUserForReviewIncompleteAppealTaskCanViewAndCompleteTheTask(caseId: string) {

        // Login as CTSC Administrator and view the unassigned Review Incomplete Appeal task
        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
        await this.homePage.navigateToTab('Tasks')
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedTo);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptions);
        await this.tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptions);

        // Select Ready to list next step and complete the event
        await this.tasksTab.clickNextStepLink(task.requestInformationFromParty.link);

        let requestInfoFromParty = new RequestInfoFromParty(this.page)
        await requestInfoFromParty.performRequestInfoFromPartyEvent();

        // Verify task is removed from the tasks list within Tasks tab
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    async verifyReviewIncompleteAppealTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId: string) {

        let voidCase = new VoidCase(this.page);

         // Verify CTSC Admin can view the unassigned Review Incomplete Appeal task
        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
        await this.homePage.navigateToTab('Tasks')
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);

        // CTSC Administrator self assigns task and verifies assigned task details
        await this.tasksTab.selfAssignTask(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedTo);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptions);
        await this.tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptions);

        // CTSC Administrator voids the case
        await voidCase.performVoidCase(caseId, false);

        // Verify task is removed from the tasks list within Tasks tab
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }
}
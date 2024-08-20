import { expect, Page } from '@playwright/test';
import task from '../../../pages/content/review.noncompliant.appeal.task_en.json';
import { BaseStep } from '../base';
import { credentials } from '../../../config/config';
import { VoidCase } from '../void.case';
import issueDirectionTestdata from "../../../pages/content/issue.direction_en.json";
import eventTestData from "../../../pages/content/event.name.event.description_en.json";
import { SendToAdmin } from '../send.to.admin';


export class ReviewNonCompliantAppealTask extends BaseStep {

    readonly page : Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async verifyTcwCanViewTheUnassignedReviewNonCompliantAppealTask(caseId: string) {

        // Verify TCW can view the unassigned Review Non compliant Appeal task
        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPriortiy(task.name, task.priority);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);
    }

    async verifyTcwWithCaseAllocatorRoleCanViewAndAssignReviewNonCompliantAppealTask(caseId: string) {

        // Login as TCW with case allocator role, view and assign Review Non Compliant Appeal task to another TCW
        await this.loginUserWithCaseId(credentials.amSeniorTribunalCaseWorkerWithCaseAllocatorRole, false, caseId);
        await this.homePage.navigateToTab('Tasks')
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPriortiy(task.name, task.priority);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptionsForCaseAllocator);
        await this.tasksTab.assignTaskToTcwUser(task.name, credentials.amTribunalCaseWorker.email);
    }

    async verifyTcwCanViewAndCompleteTheAssignedReviewNonCompliantAppealTask(caseId: string) {

        // Login as Tcw and view the assigned Review Non compliant Appeal task
        await this.loginUserWithCaseId(credentials.amTribunalCaseWorker, false, caseId);
        await this.homePage.navigateToTab('Tasks')
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedTo);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptions);
        await this.tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptions);

        // Select send to admin next step and complete the event
        await this.tasksTab.clickNextStepLink(task.sendToAdmin.link);

        let sendToAdmin = new SendToAdmin(this.page)
        await sendToAdmin.comepleteSendToAdmin();

        // Verify task is removed from the tasks list within Tasks tab
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    async verifyReviewNonCompliantAppealTaskCanBeCompletedBySendingCaseToJudge(caseId: string) {

        // Verify TCW can view the unassigned Review Non compliant Appeal task
        await this.loginUserWithCaseId(credentials.amTribunalCaseWorker, false, caseId);
        await this.homePage.navigateToTab('Tasks')
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);

        // TCW self assigns Review Non compliant Appeal task
        await this.tasksTab.selfAssignTask(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedTo);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptions);

        // Select Send to Judge next step and complete the event
        await this.tasksTab.clickNextStepLink(task.sendToJudge.link);
        await this.sendToJudgePage.verifyPageContent();
        await this.sendToJudgePage.selectHearingType();
        await this.sendToJudgePage.inputData();
        await this.sendToJudgePage.selectInterlocutoryReviewState();
        await this.sendToJudgePage.confirmSubmission();

        await this.eventNameAndDescriptionPage.verifyPageContent('Send to Judge');
        await this.eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
            eventTestData.eventDescriptionInput);
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await expect(this.homePage.summaryTab).toBeVisible();
        await this.homePage.delay(3000);
        await this.verifyHistoryTabDetails("Send to Judge");

        // Verify task is removed from the tasks list within Tasks tab
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    async verifyReviewNonCompliantAppealTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId: string) {

        // Verify TCW can view the unassigned Review Non compliant Appeal task
        await this.loginUserWithCaseId(credentials.amTribunalCaseWorker, false, caseId);
        await this.homePage.navigateToTab('Tasks')
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);

        // TCW self assigns Review Non compliant Appeal task
        await this.tasksTab.selfAssignTask(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedTo);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptions);

        // TCW voids the case
        let voidCase = new VoidCase(this.page);
        await voidCase.performVoidCase(caseId, false);

        // Verify task is removed from the tasks list within Tasks tab
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }
}
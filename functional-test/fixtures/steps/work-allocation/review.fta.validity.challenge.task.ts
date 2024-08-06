import { Page, expect } from '@playwright/test';
import { WebAction } from '../../../common/web.action'
import task from '../../../pages/content/review.fta.validity.challenge.task_en.json';
import { BaseStep } from '../base';
import { credentials } from '../../../config/config';
import { VoidCase } from '../void.case';
import { SendToAdmin } from '../send.to.admin';
import { send } from 'process';


let webActions: WebAction;

export class ReviewFTAValidityChallengeTask extends BaseStep {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async createReviewFTAValidityChallengeTask(caseId: string) {
        // Creating the task as FTA user
        await this.loginUserWithCaseId(credentials.dwpResponseWriter, true, caseId);
        await this.goToChallengeValidityEvent(this.page, caseId);
        await this.challengeValidityPage.performChallengeValidity(caseId);
        // verify FTA documents tab after submitting the event
        await this.homePage.navigateToTab("FTA Documents");
        await this.homePage.delay(1000);
        await this.challengeValidityPage.verifyFTADocumentsTab;
    }

    async verifyReviewFTAValidityChallengeTaskisCreated(caseId: string) {
        // Verifying that task is created
        await this.loginUserWithCaseId(credentials.amCaseWorkerWithCaseAllocatorRole, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPriortiy(task.name, task.priority);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);
    }

    async assignReviewFTAValidityChallengeTask(caseId: string) {
        //view unassigned task
        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);
        
        //assing to self + check manage options
        await this.tasksTab.selfAssignTask(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedTo);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptions);
        await this.tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptions);
    }

    async assignReviewFTAValidityChallengeTaskWithoutLegalRole(caseId: string) {
        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);
    }
    
    async cancelReviewFTAValidityChallengeTaskByCancelLink(caseId: string) {
        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId); // cancelling task via cancel link
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.cancelTask;
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    async cancelReviewFTAValidityChallengeTaskByEvent(caseId: string) {

        let voidCase = new VoidCase(this.page);

        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
        await voidCase.performVoidCase; // performing 'Void case' event to cancel the task

        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    async completeReviewFTAValidityChallengeTaskByMarkAsDone(caseId: string) {
        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.assignTaskToCtscUser(task.name, credentials.amCaseWorker.email);
        await this.tasksTab.markTheTaskAsDone;

        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    async completeReviewFTAValidityChallengeTaskByEvent(caseId: string) {

        let sendToAdmin = new SendToAdmin(this.page);

        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
        await sendToAdmin.performSendToAdmin; // performing 'Send to admin' event to complete the task
        await this.homePage.navigateToTab('Tasks');

        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    // Event created to trigger Challenge validity event from next steps dropdown menu:
    private async goToChallengeValidityEvent(page: Page, caseId: string) {
        await this.loginUserWithCaseId(credentials.dwpResponseWriter, true, caseId);
        await this.homePage.chooseEvent("Challenge validity");
    }
}
import { test, expect, Page } from '@playwright/test';
import { WebAction } from '../../../common/web.action'
import task from '../../../pages/content/judge.review.postponement.request.task_en.json';
import { BaseStep } from '../base';
import { credentials } from "../../../config/config";
import eventTestData from "../../../pages/content/event.name.event.description_en.json";
import { VoidCase } from '../void.case';
import { SendToAdmin } from '../send.to.admin';
import issueDirectionTestdata from "../../../pages/content/issue.direction_en.json";


let webActions: WebAction;

export class JudgeReviewPostponementRequestTask extends BaseStep {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
        webActions = new WebAction(this.page);
    }


    async allocateCaseToJudgeInterlocRole(caseId: string) {
        // CTSC Admin with case allocator role allocates case to Interloc Judge
        await this.loginUserWithCaseId(credentials.amSuperUser, false, caseId);
        await expect(this.homePage.summaryTab).toBeVisible();
        await this.homePage.delay(3000);
        await this.homePage.navigateToTab('Roles and access');
        await this.rolesAndAccessTab.allocateInterlocutoryJudge(credentials.judge.email);
    }

    async checkManageOptionsJudgeWithInterlocRoleReviewPostponementTask(caseId: string) {
        await this.loginUserWithCaseId(credentials.judge, true, caseId);
        test.setTimeout(250000); //waiting for the Task to appear
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);
        //assign to self
        // await this.tasksTab.selfAssignTask(task.name);
        // await this.tasksTab.verifyPageContentByKeyValue(task.nameJudge, 'Assigned to', task.assignedToJudge);
        // await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptions);
        // await this.tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptionsJudge);
        // await this.tasksTab.reassignTaskToTcwUser(task.nameJudge, credentials.amTribunalCaseWorker.email);
        // await this.tasksTab.clickUnassignTask(task.name);
        await this.homePage.clickSignOut();
    }

    async checkManageOptionsSalariedJudgeWithoutInterlocRoleReviewPostponementTask(caseId: string) {
        await this.loginUserWithCaseId(credentials.salariedJudge, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        //await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await expect(this.page.getByRole('row', { name: 'Next steps' })).not.toBeVisible();
        await this.homePage.clickSignOut();
    }

    async checkManageOptionsFeepaidJudgeWithoutInterlocRoleReviewPostponementTask(caseId: string) {
        await this.loginUserWithCaseId(credentials.salariedJudge, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        //await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await expect(this.page.getByRole('row', { name: 'Next steps' })).not.toBeVisible();
        await this.homePage.clickSignOut();
    }

    async ctscAdminCancelsReviewPostponementTask(caseId: string) {
        await this.loginUserWithCaseId(credentials.caseWorker, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptionsCTSC);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await this.tasksTab.cancelTask(task.name);
        await this.homePage.delay(3000);
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    //The tests below are expected to fail IF the task takes too long to be completed i.e disappear from the Tasks tab  

    async salariedJudgeCompletesReviewPostponementTaskByIssueDirectionEvent(caseId: string) {
        await this.loginUserWithCaseId(credentials.caseWorker, false, caseId);
        test.setTimeout(250000);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name); //making sure task is there before attempting to complete it
        await this.homePage.delay(2000);
        await this.homePage.clickSignOut();
        //performing the required event Issue Direction
        await this.loginUserWithCaseId(credentials.judge, false, caseId);
        await new Promise(f => setTimeout(f, 12000)); //Delay required for the Case to be ready
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent("Issue directions notice");

        await this.issueDirectionPage.verifyPageContent();
        await this.issueDirectionPage.populatePostHearingESAAppealToProceed(
            issueDirectionTestdata.postHearingType,
            'Appeal to Proceed',
            issueDirectionTestdata.docTitle);

        await this.eventNameAndDescriptionPage.verifyPageContent("Issue directions notice",
            true, "Direction type");
        await this.eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
            eventTestData.eventDescriptionInput);
        await this.eventNameAndDescriptionPage.confirmSubmission();
        await this.verifyHistoryTabDetails("Issue directions notice");

        //checking if tasks is automatically completed
        await this.homePage.delay(8000);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    async feepaidJudgeCompletesReviewPostponementTaskByWriteFinalDecisionEvent(caseId: string) { 
        await this.loginUserWithCaseId(credentials.judge, false, caseId);
        //performing required event
        await this.homePage.delay(2000);
        await this.homePage.chooseEvent("Issue final decision");
        await this.writeFinalDecisionPage.verifyPageContentForPreviewDecisionNoticePage(false);
        await this.writeFinalDecisionPage.confirmSubmission();
        await this.verifyHistoryTabDetails("Issue final decision");
        //checking if tasks is automatically completed
        await this.homePage.delay(8000);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }
    
    // async tcwCompletesReviewPostponementTaskByReviewConfidentialityEvent(caseId: string) {
    //     await this.loginUserWithCaseId(credentials.judge, false, caseId);
    //     //performing required event
    //     //Review confidentiality test is in progress, update this once ticket is done
    //     //checking if tasks is automatically completed
    //     await this.homePage.delay(8000);
    //     await this.homePage.navigateToTab('Tasks');
    //     await this.tasksTab.verifyTaskIsHidden(task.name);
    // }
}
import { test, expect, Page } from '@playwright/test';
import { WebAction } from '../../../common/web.action'
import task from '../../../pages/content/judge.review.postponement.request.task_en.json';
import { BaseStep } from '../base';
import { credentials } from "../../../config/config";
import eventTestData from "../../../pages/content/event.name.event.description_en.json";
import { VoidCase } from '../void.case';
import { SendToAdmin } from '../send.to.admin';


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
}


// COMPLETION and CANCELLATION scenarios are on HOLD since a bug was found where the completed/cancelled task doesn't disappear 
// from the case, issue raise on SSCSSI-369  
    
//     async cancelByEventReviewPostponementTask(caseId: string) { 

//         let voidCase = new VoidCase(this.page);

//         await this.createPostponementRequestTask(caseId);
//         //await this.homePage.clickSignOut();
//         //await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
//         await voidCase.performVoidCase; // performing 'Void case' event to cancel the task
//         await this.homePage.delay(8000);
//         await this.tasksTab.verifyTaskIsHidden(task.name);
//     }

//     async completeByEventReviewPostponementTask(caseId: string, grantRequest: string = 'Grant Postponement') { 

//         let sendToAdmin = new SendToAdmin(this.page);

//         await this.createPostponementRequestTask(caseId);
//         //await this.homePage.clickSignOut();
//         //await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);

//         //await sendToAdmin.performSendToAdmin; // performing 'Send to admin' event to complete the task

//         await this.loginUserWithCaseId(credentials.caseWorker, false, caseId);
//         test.setTimeout(400000);
//         await this.homePage.navigateToTab('Tasks');
//         await this.tasksTab.verifyTaskIsDisplayed(task.name); //making sure task is there before attempting to complete it
//         await this.homePage.delay(2000);
//         //await this.homePage.reloadPage();
//         await this.homePage.delay(2000);
//         await this.homePage.reloadPage();
//         await this.homePage.chooseEvent('Action Postponement Request');

//         await this.postponementPage.verifyPageContentActionPostponementRequestPage(grantRequest);
//         await this.postponementPage.inputPostponementActionRequestPageData(grantRequest);
//         await this.postponementPage.submitBtn();
//         await this.postponementPage.verifyPageContentActionPostponementRequestDocumentPage();
//         await this.postponementPage.submitBtn();
//         await this.homePage.delay(2000);

//         //Could not Verify the Event Name and Description Page as the Event Summary Page Label is defined Differently.
//         //await this.eventNameAndDescriptionPage.verifyPageContent("Action Postponement Request", false)
//         if (grantRequest != 'Send to Judge') {
//             await this.eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
//                 eventTestData.eventDescriptionInput);
//             await this.eventNameAndDescriptionPage.submitBtn();
//             await this.homePage.delay(2000);
//         }

//         await this.homePage.navigateToTab("History");
//         await this.historyTab.verifyPageContentByKeyValue('Event', 'Postponement Granted');
//         //await this.historyTab.verifyEventCompleted('Action Postponement Request');
//         //await performAppealDormantOnCase(pipCaseId);


//         await this.homePage.delay(8000);
//         await this.homePage.navigateToTab('Tasks');

//         await this.tasksTab.verifyTaskIsHidden(task.name);
//     }
// }

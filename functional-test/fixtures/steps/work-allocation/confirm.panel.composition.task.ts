import { test, expect, Page } from '@playwright/test';
import { BaseStep } from './../base';
import { credentials } from "../../../config/config";
import task from '../../../pages/content/prepare.for.hearing.task_en.json';
import eventTestData from "../../../pages/content/event.name.event.description_en.json";
import issueDirectionTestdata from "../../../pages/content/issue.direction_en.json";
import { VoidCase } from "./../void.case";
import { StepsHelper } from "../../../helpers/stepsHelper";
import { UploadResponse } from "../../steps/upload.response"


export class ConfirmPanelCompositionTask extends BaseStep {

    readonly page: Page;

    constructor(page) {

        super(page);
        this.page = page;
    }

    //COMMENTING Code commented out as the hearing judge credentials from confluence not matching to preview enviroment credentials

    // async allocateCaseToInterlocutoryJudge(caseId: string) {

    //     // CTSC Admin with case allocator role allocates case to Interlocutory Judge
    //     await this.loginUserWithCaseId(credentials.amSuperUser, false, caseId);
    //     await expect(this.homePage.summaryTab).toBeVisible();
    //     await this.homePage.delay(3000);
    //     await this.homePage.navigateToTab('Roles and access');
    //     await this.rolesAndAccessTab.allocateInterlocutoryJudge(credentials.salariedJudge.email);
    // }

    async createConfirmPanelCompositionTask(caseId) {
        await this.homePage.clickSignOut();

        //ADD bits to upload response with benefit code 022 or 023 or 024 or 025 or 026 or 028, then task will be created
    }

    async verifyTaskAndAssign(caseId) {
        // verify if task is created
        await this.homePage.clickSignOut();
        await this.loginUserWithCaseId(credentials.salariedJudge, false, caseId);
        test.setTimeout(450000);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPriortiy(task.name, task.priority);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptionsForCaseAllocator);
        await this.homePage.clickSignOut();
        //assign to self
     }
   
    async salariedJudgeCannotReassign(caseId) {
        // verify if task is created
        await this.homePage.clickSignOut();
        await this.loginUserWithCaseId(credentials.salariedJudge, false, caseId);
        test.setTimeout(450000);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPriortiy(task.name, task.priority);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptionsForCaseAllocator);
        await this.homePage.clickSignOut();
    }

    async feepaidJudgeCannotReassign(caseId) {
        // verify if task is created
        await this.homePage.clickSignOut();
        await this.loginUserWithCaseId(credentials.feePaidJudge, false, caseId);
        test.setTimeout(450000);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPriortiy(task.name, task.priority);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptionsForCaseAllocator);
        await this.homePage.clickSignOut();
    }
    
    async cancelTask(caseId) { 
        // CTSC Admin voids the case
        let voidCase = new VoidCase(this.page);
        await voidCase.performVoidCase(caseId);

        // Verify task is removed from the tasks list within Tasks tab
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    async completeByIssueDirection(caseId) {
        //  Interloc Judge self assigns the task
        await this.homePage.clickSignOut();
        await this.loginUserWithCaseId(credentials.salariedJudge, false, caseId);
        test.setTimeout(250000);
        await this.tasksTab.selfAssignTask(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedTo);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptionsForJudge);
        await this.tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptions);
       
        //performing Issue direction to complete task
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

        // Verify task is removed from the tasks list within Tasks tab
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    async completeByFinalDecisionEvent(caseId) {
        //add Final decision event to complete task
    }

    async completeByReviewConfidentiality(caseId) { 
        //add Review confidentiality event to complete task
    }
}
import { Page } from '@playwright/test';
import { WebAction } from '../../../common/web.action'
import task from '../../../pages/content/review.confidentiality.request.task_en.json';
import amendInterlocReviewStateData from "../../../pages/content/amend.interloc.review.state_en.json";
import dateUtilsComponent from '../../../utils/DateUtilsComponent';
import { BaseStep } from '../base';
import { credentials } from '../../../config/config';
import { SendToAdmin } from "../send.to.admin";
import { VoidCase } from '../void.case';
import { RequestInfoFromParty } from '../request.info.from.party';


let webActions: WebAction;

export class ReviewConfidentialityRequestTask extends BaseStep {

    readonly page : Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifySalariedJudgeCanViewTheUnassignedReviewConfidentialityRequestTask(caseId: string) {

        // Verify Review Confidentiality Request - Judge task is displayed to the Salaried Judge
        await this.loginUserWithCaseId(credentials.salariedJudge, false, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 
           'Task created', dateUtilsComponent.formatDateToSpecifiedDateFormat(new Date()));
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);
   }

    async verifySalariedJudgeCanCompleteTheUnassignedReviewConfidentialityRequestTask(caseId: string) {

        // Verify Salaried Judge self assigns the task
        await this.loginUserWithCaseId(credentials.salariedJudge, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.selfAssignTask(task.name);
        
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToSalariedJudge);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptionsForSalariedJudge);
        await this.tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptions);

        // Select Send to Admin next step and complete the event
        await this.tasksTab.clickNextStepLink(task.sendToAdmin.link);

        let sendToAdmin = new SendToAdmin(this.page);
        await sendToAdmin.comepleteSendToAdmin();

        // Verify task is removed from the tasks list within Tasks tab
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    async verifySalariedJudgeCanReassignTheReviewConfidentialityRequestTaskToTcw(caseId: string): Promise<void> {

        // Verify Salaried Judge self assigns the task
        await this.loginUserWithCaseId(credentials.salariedJudge, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.selfAssignTask(task.name);
        
        await this.tasksTab.reassignTaskToTcwUser(task.name, credentials.amTribunalCaseWorker.email);
    }

    async verifyFeePaidJudgeCanViewTheUnassignedReviewConfidentialityRequestTask(caseId: string) {

        // Verify Review Confidentiality Request - Judge task is displayed to the Fee-Paid Judge
        await this.loginUserWithCaseId(credentials.feePaidJudge, false, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 
           'Task created', dateUtilsComponent.formatDateToSpecifiedDateFormat(new Date()));
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);
   }

    async verifyFeePaidJudgeCanCompleteTheUnassignedReviewConfidentialityRequestTask(caseId: string) {

        // Fee-Paid Judge self assigns the task
        await this.loginUserWithCaseId(credentials.feePaidJudge, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.selfAssignTask(task.name);
        
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToFeePaidJudge);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptionsForFeePaidJudge);
        await this.tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptions);

        // Select Send to Admin next step and complete the event
        await this.tasksTab.clickNextStepLink(task.sendToAdmin.link);

        let sendToAdmin = new SendToAdmin(this.page);
        await sendToAdmin.comepleteSendToAdmin();

        // Verify task is removed from the tasks list within Tasks tab
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    async verifyTcwCanCompleteTheAssignedReviewConfidentialityRequestTask(caseId: string): Promise<void> {

        // Verify TCW can see the assigned Review Confidentiality Request - Judge task
        await this.loginUserWithCaseId(credentials.amTribunalCaseWorker, false, caseId);
        await this.homePage.navigateToTab('Tasks');
        
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToTCW);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptionsForTCW);
        await this.tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptions);

        // Select Amend Interloc review state next step and complete the event
        await this.tasksTab.clickNextStepLink(task.amendInterlocReviewState.link);

        await this.amendInterlocReviewStatePage.verifyPageContent();
        await this.amendInterlocReviewStatePage.selectReviewState(amendInterlocReviewStateData.interlocReviewStateSelectValue);
        await this.amendInterlocReviewStatePage.confirmSelection();
        await this.amendInterlocReviewStatePage.confirmSubmission();

        // Verify task is removed from the tasks list within Tasks tab
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    async verifySalariedJudgeCanCompleteTheReviewConfidentialityRequestTaskManually(caseId: string): Promise<void> {

        // Verify Salaried Judge self assigns the task
        await this.loginUserWithCaseId(credentials.salariedJudge, false, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.selfAssignTask(task.name);
        
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToSalariedJudge);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptionsForSalariedJudge);
        await this.tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptions);

        // Judge selects to mark the task as done
        await this.tasksTab.markTheTaskAsDone(task.name);

        // Verify task is removed from the tasks list within Tasks tab
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    async verifySalariedJudgeCanViewAndSelfAssignTheReviewConfidentialityRequestTask(caseId: string): Promise<void> {

        // Verify Review Confidentiality Request - Judge task is displayed to the Salaried Judge
        await this.verifySalariedJudgeCanViewTheUnassignedReviewConfidentialityRequestTask(caseId);
        await this.tasksTab.selfAssignTask(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToSalariedJudge);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptionsForSalariedJudge);
        await this.tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptions);
    }

    async verifyReviewConfidentialityRequestTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId: string): Promise<void> {

        // CTSC Admin voids the case
        let voidCase = new VoidCase(this.page);
        await voidCase.performVoidCase(caseId);

        // Verify task is removed from the tasks list within Tasks tab
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }
}
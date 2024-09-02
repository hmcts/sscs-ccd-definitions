import { BaseStep } from './base';
import { Page, expect } from '@playwright/test';
import { credentials } from "../../config/config";
import task from '../../pages/content/write.decision.judge.task_en.json';
import dateUtilsComponent from '../../utils/DateUtilsComponent';
import { WriteFinalDecision } from './write.final.decision';
import { VoidCase } from './void.case';


export class WriteDecisionJudgeTask extends BaseStep {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async verifyJudgeCanViewAndCompleteTheUnassignedWriteDecisionJudgeTask(caseId: string): Promise<void> {

        // Verify Salaried Judge can view the unassigned task
        await this.loginUserWithCaseId(credentials.salariedJudge, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 
            'Task created', dateUtilsComponent.formatDateToSpecifiedDateFormat(new Date()));
         await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
         await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptionsForSalariedJudge);

        // Salaried Judge self assigns the task
        await this.tasksTab.selfAssignTask(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToSalariedJudge);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptionsForSalariedJudge);
        await this.tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptions);

        // Select write final decision next step and complete the event
        await this.tasksTab.clickNextStepLink(task.writeFinalDecision.link);
        await this.writeFinalDecisionPage.verifyPageContentTypeOfAppealPage(true);
        await this.writeFinalDecisionPage.inputTypeOfAppealPageData(false, true); //No Awards but Generate Notice
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        //Allowed or Refused Page (Because we opted not in the previous page)
        await this.writeFinalDecisionPage.verifyPageContentAllowedOrRefusedPage();
        await this.writeFinalDecisionPage.chooseAllowedOrRefused("#writeFinalDecisionAllowedOrRefused-allowed");
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeFinalDecisionPage.verifyPageContentTypeOfHearingPage();
        await this.writeFinalDecisionPage.inputTypeOfHearingPageData(false)
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeFinalDecisionPage.verifyPageContentForPanelMembersPage('PIP');
        await this.writeFinalDecisionPage.inputPageContentForPanelMembersPageData('PIP');
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeFinalDecisionPage.verifyPageContentForDecisionDatePage();
        await this.writeFinalDecisionPage.inputTypePageContentForDecisionPageData();
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeFinalDecisionPage.verifyPageContentForBundleSectionReferencePage();
        await this.writeFinalDecisionPage.inputPageContentForBundleSectionReferencePageData();
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeFinalDecisionPage.verifyPageContentForSummaryOutcomePage();
        await this.writeFinalDecisionPage.inputPageContentForSummaryOutcomePageData();
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeFinalDecisionPage.verifyPageContentForReasonForDecisionPage();
        await this.writeFinalDecisionPage.inputPageContentForReasonForDecisionPageData();
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000)); //Delay required for the Case to be ready

        await this.writeFinalDecisionPage.verifyPageContentForAnythingElseDecisionPage();
        await this.writeFinalDecisionPage.inputPageContentForAnythingElsePageData();
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000));

        await this.writeFinalDecisionPage.verifyPageContentForPreviewDecisionNoticePage(true);
        await this.writeFinalDecisionPage.submitContinueBtn();
        await new Promise(f => setTimeout(f, 1000));

        await this.writeFinalDecisionPage.verifyPageContentForCheckYourAnswersPage();
        await this.writeFinalDecisionPage.confirmSubmission();
        await this.verifyHistoryTabDetails("Write final decision");
       
        // Verify task is removed from the tasks list within Tasks tab
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

    async verifyWriteDecisionJudgeTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId: string): Promise<void> {

        // CTSC Admin voids the case
        let voidCase = new VoidCase(this.page);
        await voidCase.performVoidCase(caseId);

        // Verify task is removed from the tasks list within Tasks tab
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }

}

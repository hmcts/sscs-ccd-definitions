import { test, expect, Page } from '@playwright/test';
import { WebAction } from '../../../common/web.action'
import task from '../../../pages/content/postponement.request_en.json';
import { BaseStep } from '../base';
import { credentials } from "../../../config/config";
import eventTestData from "../../../pages/content/event.name.event.description_en.json";
import { VoidCase } from '../void.case';
import { SendToAdmin } from '../send.to.admin';


let webActions: WebAction;

export class ReviewPostponementRequestTask extends BaseStep {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async createPostponementRequestTask(caseId: string) {

        // Add hearing, Hearing Booked for the PIP case
        await this.loginUserWithCaseId(credentials.caseWorker, false, caseId);
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent('Add a hearing');
        await this.addHearingPage.submitHearing('Hearing has been Listed');
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.homePage.delay(3000);
        await this.homePage.chooseEvent('Hearing booked');
        await this.hearingBookedPage.submitHearingBooked();

        // Postponement Request
        await this.homePage.delay(2000);
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent('Postponement request');
        await this.postponementPage.verifyPageContentPostponementDetailsPage();
        await this.postponementPage.inputPostponementDetailsOfPageData();
        await this.postponementPage.submitContinueBtn();
        await this.postponementPage.verifyPageContentPreviewPostponementDocumentPage();
        await this.postponementPage.submitBtn();
        await this.eventNameAndDescriptionPage.verifyPageContent("Postponement request", false)
        await this.eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
            eventTestData.eventDescriptionInput);
        await this.eventNameAndDescriptionPage.confirmSubmission();
        await this.verifyHistoryTabDetails("Postponement request");
        await this.historyTab.verifyPageContentByKeyValue('End state', 'Hearing');
        await this.historyTab.verifyPageContentByKeyValue('Event', 'Postponement request');

        // Verify Documents tab for the new pdf
        await this.homePage.navigateToTab('Documents');
        await this.documentsTab.verifyPageContentByKeyValue('Type', 'Postponement request');
        await this.documentsTab.verifyPageContentByKeyValue('File name', 'Postponement Request.pdf');
        await this.homePage.clickSignOut();
    }
  
    async checkPostponementRequestTaskManageOptions(caseId: string) {
        // verify if task is created
        await this.loginUserWithCaseId(credentials.amTribunalCaseWorker, false, caseId);
        test.setTimeout(850000);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPriortiy(task.name, task.priority);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);
        await this.homePage.clickSignOut();
    }

    async checkManageOptionsWithoutRoleReviewPostponementTask(caseId: string) {
        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await expect(this.page.getByRole('row', { name: 'Next steps' })).not.toBeVisible();
        await this.homePage.clickSignOut();
    }

    async assignReviewPostponementTask(caseId: string) {
        await this.loginUserWithCaseId(credentials.amTribunalCaseWorker, true, caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);
        // check manage options + assign to self + reassign
        await this.tasksTab.selfAssignTask(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedTo);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptions);
        await this.tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptionsTCW);
        await this.tasksTab.reassignTaskToTcwUser;
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

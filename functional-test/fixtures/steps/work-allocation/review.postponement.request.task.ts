import { Page } from '@playwright/test';
import { WebAction } from '../../../common/web.action'
import task from '../../../pages/content/review.listing.error.task_en.json';
import { BaseStep } from '../base';
import { credentials } from "../../../config/config";

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
        await this.addHearingPage.submitHearing();
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.homePage.delay(3000);
        await this.homePage.chooseEvent('Hearing booked');
        await this.hearingBookedPage.submitHearingBooked();
        await this.homePage.clickSignOut();

        // Postponement Request
        await this.postponementRequestPage.verifyPageContent();
        await this.postponementRequestPage.enterPostponementRequestDetails();

        // Verify History tab for event completion
        await this.verifyHistoryTabDetails("Postponement request");
        await this.historyTab.verifyPageContentByKeyValue('End state', 'Hearing');
        await this.historyTab.verifyPageContentByKeyValue('Event', 'Postponement request');

        // Verify Documents tab for the new pdf
        await this.homePage.navigateToTab('Documents');
        await this.documentsTab.verifyPageContentByKeyValue('Type', 'Postponement request');
        await this.documentsTab.verifyPageContentByKeyValue('File name', 'Postponement Request.pdf');

        // Verify Task is created
        await this.tasksTab.verifyTaskIsDisplayed('Review postponement request - LO'); // double-check UI task name
    }
  
    async checkPostponementRequestTaskManageOptions(caseId: string) { }

    async assignReviewPostponementTask(caseId: string) { }

    async checkReassignReviewPostponementTask(caseId: string) { }

    async checkManageOptionsWithoutRoleReviewPostponementTask(caseId: string) { }

    async cancelByLinkReviewPostponementTask(caseId: string) { }

    async cancelByEventReviewPostponementTask(caseId: string) { }

    async completeByLinkReviewPostponementTask(caseId: string) { }

    async completeByEventReviewPostponementTask(caseId: string) { }
    
}

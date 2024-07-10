import {Page} from '@playwright/test';
import {WebAction} from '../common/web.action';

let webActions: WebAction;

export class IssueDirectionPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifyPageContent() {
        await webActions.verifyPageLabel('h1.govuk-heading-l', 'Issue direction'); 
    }

    async selectHearingOption(optionVal: string) {
        await webActions.chooseOptionByLabel('#prePostHearing', optionVal);
    }

    async selectDirectionType(optionVal: string) {
        await webActions.chooseOptionByLabel('#directionTypeDl', optionVal);
    }

    async chooseRecipients() {
        await webActions.clickElementById("#confidentialityType-general");
    }

    async enterDirectionDueDate() {
        await webActions.inputField('#directionDueDate-day', '21');
        await webActions.inputField('#directionDueDate-month', '12');
        await webActions.inputField('#directionDueDate-year', '2025');
    }

    async chooseNoticeType() {
        await webActions.clickElementById('#generateNotice_Yes');
    }

    async enterNoticeContent() {
        await webActions.inputField('#bodyContent', 'Test body content');
        await webActions.inputField('#signedBy', 'Tester');
        await webActions.inputField('#signedRole', 'Test');
    }

    async submitContinueBtn(): Promise<void> {
        await webActions.clickButton("Continue");
    }

    async verifyDocumentTitle(expText: string) {
        await webActions.verifyTextVisibility(expText);
    }

    async confirmSubmission(): Promise<void> {
        await webActions.clickSubmitButton();
    }

    async clickAddNewButton(): Promise<void> {
        await webActions.clickButton('Add new');
    }

    async submitIssueDirection(hearingOption: string, directionType: string, docTitle: string): Promise<void> {
        await this.verifyPageContent();
        await this.selectHearingOption(hearingOption);
        await this.selectDirectionType(directionType);
        await this.chooseRecipients();
        await this.chooseNoticeType();
        await this.enterDirectionDueDate();
        await this.enterNoticeContent();
        
        await this.confirmSubmission();

        await this.verifyDocumentTitle(docTitle);
        await this.confirmSubmission();
    }

}
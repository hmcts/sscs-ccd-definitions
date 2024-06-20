import {Page} from '@playwright/test';
import {WebAction} from '../common/web.action';
import issueDirectionsNoticeData from "./content/issue.direction_en.json";

let webActions: WebAction;

export class IssueDirectionPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifyPageContent() {
        await webActions.verifyPageLabel('.govuk-caption-l', issueDirectionsNoticeData.eventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', issueDirectionsNoticeData.eventNameHeading);
        await webActions.verifyPageLabel('[for=\'prePostHearing\'] > .form-label', issueDirectionsNoticeData.prepostHearingLabel);
        await webActions.verifyPageLabel('[for=\'directionTypeDl\'] > .form-label', issueDirectionsNoticeData.directionTypeLabel);
        await webActions.verifyPageLabel('[for=\'confidentialityType-general\']', issueDirectionsNoticeData.sendToAllPartiesLabel);
        await webActions.verifyPageLabel('[for=\'confidentialityType-confidential\']', issueDirectionsNoticeData.selectSpecificRecipientsLabel);
        await webActions.verifyPageLabel('#directionDueDate legend > .form-label', issueDirectionsNoticeData.dueDateLabel);
        await webActions.verifyPageLabel('[for=\'directionDueDate-day\']', issueDirectionsNoticeData.dayLabel);
        await webActions.verifyPageLabel('[for=\'directionDueDate-month\']', issueDirectionsNoticeData.monthLabel);
        await webActions.verifyPageLabel('[for=\'directionDueDate-year\']', issueDirectionsNoticeData.yearLabel);
        await webActions.verifyPageLabel('.form-label[_ngcontent-ng-c823086951]', issueDirectionsNoticeData.reservedToInterlocLabel);
        await webActions.verifyPageLabel('#generateNotice legend > .form-label', issueDirectionsNoticeData.generateNoticeLabel);
        await webActions.verifyPageLabel('[for=\'generateNotice_Yes\']', issueDirectionsNoticeData.yesNoticeLabel);
        await webActions.verifyPageLabel('[for=\'generateNotice_No\']', issueDirectionsNoticeData.noNoticeLabel);

    }

    async selectHearingOption(optionVal: string) {
        await webActions.chooseOptionByLabel('#prePostHearing', optionVal);
    }

    async selectDirectionType(optionVal: string) {
        await webActions.chooseOptionByLabel('#directionTypeDl', optionVal);
    }

    async chooseRecipients(optionVal: string) {
        await webActions.clickElementById(optionVal);
    }

    async enterDirectionDueDate() {
        await webActions.inputField('#directionDueDate-day', '21');
        await webActions.inputField('#directionDueDate-month', '12');
        await webActions.inputField('#directionDueDate-year', '2025');
    }

    async chooseNoticeType(optionVal: string) {
        await webActions.clickElementById(optionVal);
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
        await this.chooseRecipients('#confidentialityType-general');
        await this.chooseNoticeType('#generateNotice_Yes');
        await this.enterDirectionDueDate();
        await this.enterNoticeContent();

        await this.confirmSubmission();

        await this.verifyDocumentTitle(docTitle);
        await this.confirmSubmission();
    }

    async populatePreHearingAppealToProceed(hearingOption: string, directionType: string, docTitle: string): Promise<void> {
        await this.selectHearingOption(hearingOption);
        await this.selectDirectionType(directionType);
        await this.chooseRecipients('#confidentialityType-general');
        await this.chooseNoticeType('#generateNotice_Yes');
        await this.enterDirectionDueDate();
        await this.enterNoticeContent();
        await this.confirmSubmission();
        await this.verifyDocumentTitle(docTitle);
        await this.confirmSubmission();
    }
}

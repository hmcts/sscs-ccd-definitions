import { Page } from '@playwright/test';
import { WebAction } from '../common/web.action';
const uploadResponseTestdata = require('../pages/content/upload.response_en.json');

let webActions: WebAction;

export class UploadResponsePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifyPageContent(casereference : string) {
        await webActions.verifyPageLabel('.govuk-caption-l', 'Upload response'); //Captor Text
        //await webActions.verifyPageLabel('h1', casereference+": Bloggs"); //Captor Text
       /* await webActions.verifyPageLabel('h2', 'FTA Response'); //Section heading
        await webActions.verifyPageLabel('h2', 'AT38 (Optional)'); //Section heading
        await webActions.verifyPageLabel('h2', 'FTA Evidence bundle'); //Section heading
        await webActions.verifyPageLabel('h2', 'Audio/Video Evidence'); //Section heading */
        await webActions.isLinkClickable('Cancel');
    }

    async uploadDocs(): Promise<void> {
        await webActions.uploadFileUsingAFileChooser('#dwpResponseDocument_documentLink', uploadResponseTestdata.testfileone);
        await this.page.waitForTimeout(7000);
        await webActions.uploadFileUsingAFileChooser('#dwpAT38Document_documentLink', uploadResponseTestdata.testfiletwo);
        await this.page.waitForTimeout(7000);
        await webActions.uploadFileUsingAFileChooser('#dwpEvidenceBundleDocument_documentLink', uploadResponseTestdata.testfilethree);
        await this.page.waitForTimeout(7000);
    }

    async uploadPartialDocs(): Promise<void> {
        await webActions.uploadFileUsingAFileChooser('#dwpResponseDocument_documentLink', uploadResponseTestdata.testfileone);
        await this.page.waitForTimeout(7000);
        await webActions.uploadFileUsingAFileChooser('#dwpEvidenceBundleDocument_documentLink', uploadResponseTestdata.testfilethree);
        await this.page.waitForTimeout(7000);
    }

    async verifyDocMissingErrorMsg(): Promise<void>{
        //await webActions.screenshot();
        await webActions.verifyElementVisibility('#errors');
        await webActions.verifyTextVisibility('AT38 document is missing');
    }

    async selectIssueCode(issueCode: string): Promise<void> {
        await webActions.chooseOptionByLabel('#issueCode', issueCode);
    }

    async selectEvidenceReason(optionVal: string): Promise<void> {
        await webActions.chooseOptionByLabel('#dwpEditedEvidenceReason', optionVal);
    }

    async chooseAssistOption(optionVal: string): Promise<void> {
        await webActions.clickElementById(`#dwpFurtherInfo_${optionVal}`);
    }

    async selectElementDisputed(optionVal: string): Promise<void> {
        await webActions.verifyPageLabel('h1.govuk-heading-l', 'Elements disputed'); //Heading Text
        await webActions.clickElementById(`#elementsDisputedList-${optionVal}`);
    }

    async clickAddNewButton(): Promise<void> {
        await webActions.clickButton('Add new');
    }

    async selectUcIssueCode(issueCode: string): Promise<void> {
        await webActions.verifyPageLabel('h1.govuk-heading-l', 'Issue codes'); //Heading Text
        await webActions.chooseOptionByLabel('#elementsDisputedChildElement_0_issueCode', issueCode);
    }

    async chooseDisputeOption(optionVal: string):Promise<void> {
        await webActions.verifyPageLabel('h1.govuk-heading-l', 'Disputed'); //Heading Text
        await webActions.clickElementById(`#elementsDisputedIsDecisionDisputedByOthers_${optionVal}`);
    }

    async isJPOnTheCase(optionVal: string):Promise<void> {
        await webActions.verifyPageLabel('h1.govuk-heading-l', 'Joint party'); //Heading Text
        await webActions.clickElementById(`#jointParty_${optionVal}`);
    }

    async continueSubmission(): Promise<void> {
        await webActions.clickButton('Continue');
    }

}

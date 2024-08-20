import { expect, Page } from '@playwright/test';
import { WebAction } from '../common/web.action';
import task from "./content/review.fta.validity.challenge.task_en.json";


let webAction: WebAction;

export class ChallengeValidityPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webAction = new WebAction(this.page);
    }

    async verifyPageContent() {
        await webAction.verifyPageLabel('.govuk-caption-l', task.eventHeading); //Above heading Text
        await webAction.isLinkClickable('Cancel');
    }

    async performChallengeValidity(fileName: string) {
        // uploading pdf document
        await webAction.uploadFileUsingAFileChooser('input#dwpChallengeValidityDocument_documentLink', 'testfile1.pdf');
        await this.delay(5000);
        // selecting FTA state
        await this.page.locator('#dwpState').selectOption('34: UnRegistered');
        // submitting event
        await webAction.clickButton("Continue");
        await webAction.clickButton("Submit");
    }

    async verifyFTADocumentsTab() {
        await expect(this.page.getByText('FTA Documents')).toBeVisible();
        await expect(this.page
            .locator(`//*[normalize-space()="Document type"]/../..//td[normalize-space()="${task.documentType}"]`)).toBeVisible();
        await expect(this.page
            .locator(`//*[normalize-space()="Document file name"]/../..//td[normalize-space()="${task.documentFileName}"]`)).toBeVisible();
    }

    async cancelEvent(): Promise<void> {
        await webAction.clickLink("Cancel");
    }

    async confirmSubmission(): Promise<void> {
        await webAction.clickSubmitButton();
    }

    async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
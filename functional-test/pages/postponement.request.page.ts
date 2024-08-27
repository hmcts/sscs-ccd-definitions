import { Page } from '@playwright/test';
import { WebAction } from '../common/web.action';
import postponementRequestEventData from '../../functional-test/pages/content/postponement.request_en.json'

let webAction: WebAction;

export class PostponementRequestPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webAction = new WebAction(this.page);
    }

    async verifyPageContent() {
        await webAction.verifyPageLabel('.govuk-caption-l', postponementRequestEventData.postponementRequestHeading);
        await webAction.isLinkClickable('Cancel');
    }

    async enterPostponementRequestDetails() {
        await this.page.locator('#postponementRequestDetails').fill(postponementRequestEventData.postponementRequestDetails);
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await webAction.clickButton("Submit");
    }
}
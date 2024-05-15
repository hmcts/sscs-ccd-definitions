import { expect, Locator, Page } from '@playwright/test';
import { credentials } from '../../config/config';
import { WebAction } from '../../common/web.action'

let webActions: WebAction;

export class LoginPage {

    readonly page: Page;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('h3');
        webActions = new WebAction(this.page);

    }

    async goToLoginPage(): Promise<void> {
        await this.page.goto("/");
    }

    async goToCase(caseId: string): Promise<void> {
        await this.page.goto(`/cases/case-details/${caseId}`);
    }

    async verifySuccessfulLogin(userDetails: any): Promise<void> {
        await webActions.inputField('#username', userDetails.email);
        await webActions.inputField('#password', userDetails.password);
        await webActions.clickButton('Sign in');
        await expect(this.pageTitle).toHaveText('My work');
    }
}

import { expect, Locator, Page } from '@playwright/test';
import { credentials } from '../../config/config';
import { WebAction } from '../../common/web.action'

let webActions: WebAction;

export class LoginPage {

    readonly page: Page;
    readonly pageTitle: Locator;
    readonly mainPageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('h3');
        this.mainPageTitle = page.locator('h1');
        webActions = new WebAction(this.page);

    }

    async goToLoginPage(): Promise<void> {
        await this.page.goto("/");
    }

    async goToCase(caseId: string): Promise<void> {
        await this.page.goto(`/cases/case-details/${caseId}`);
    }

    async verifySuccessfulLoginForCaseworker(isLoggedIn?: boolean): Promise<void> {
        if(isLoggedIn) await this.page.context().clearCookies();
        await webActions.inputField('#username', credentials.caseWorker.email);
        await webActions.inputField('#password', credentials.caseWorker.password);
        await webActions.clickButton('Sign in');
        await expect(this.pageTitle).toHaveText('My work');
    }

    async verifySuccessfulLoginForDWPResponseWriter(isLoggedIn?: boolean): Promise<void> {
        if(isLoggedIn) await this.page.context().clearCookies();
        await webActions.inputField('#username', credentials.dwpResponseWriter.email);
        await webActions.inputField('#password', credentials.dwpResponseWriter.password);
        await webActions.clickButton('Sign in');
        await expect(this.mainPageTitle).toHaveText('Case list');
    }
}

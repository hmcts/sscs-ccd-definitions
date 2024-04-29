import { expect, Locator, Page } from '@playwright/test';
import { credentials } from '../config/config';
import { WebActions } from '../lib/webActions'

let webActions: WebActions;

export class LoginPage {

    readonly page: Page;
    readonly userName: string;
    readonly passWord: string;
    readonly loginBtn: Locator;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('h1');

        webActions = new WebActions(this.page);

    }

    async goToLoginPage(): Promise<void> {
        await this.page.goto("/");
    }

    async goToCase(caseId: string): Promise<void> {
        await this.page.goto(`/cases/case-details/${caseId}`);
    }

    async verifySuccessfulLoginForCaseworker(expTitle: string): Promise<void> {
        await webActions.inputField('#username', credentials.caseWorker.email);
        await webActions.inputField('#password', credentials.caseWorker.password);
        await webActions.clickButton('Sign in');
        await expect(this.pageTitle).toHaveText(expTitle);
    }
}

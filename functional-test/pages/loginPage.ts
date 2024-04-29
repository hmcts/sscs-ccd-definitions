import { expect, Locator, Page } from '@playwright/test';
import {credentials} from '../config/config';

export class LoginPage {

    readonly page: Page;
    readonly userName: Locator;
    readonly passWord: Locator;
    readonly loginBtn: Locator;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('#username');
        this.passWord = page.locator('#password');
        this.loginBtn = page.getByRole('button', {name: 'Sign in'});
        this.pageTitle = page.locator('h1');

    }

    async goToLoginPage(): Promise<void> {
        await this.page.goto("/");
    }

    async goToCase(caseId: string): Promise<void> {
        await this.page.goto(`/cases/case-details/${caseId}`);
    }

    async verifySuccessfulLoginForCaseworker(expTitle: string): Promise<void> {
        await this.userName.fill(credentials.caseWorker.email);
        await this.passWord.fill(credentials.caseWorker.password);
        await this.loginBtn.click();
        await expect(this.pageTitle).toHaveText(expTitle);
    }
}

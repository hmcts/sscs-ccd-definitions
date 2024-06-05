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

    async delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
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

    async verifySuccessfulLoginForHMRCUser(isLoggedIn?: boolean): Promise<void> {
        if(isLoggedIn) await this.page.context().clearCookies();
        await webActions.inputField('#username', credentials.hmrcUser.email);
        await webActions.inputField('#password', credentials.hmrcUser.password);
        await webActions.clickButton('Sign in');
        await expect(this.mainPageTitle).toHaveText('Case list');
    }

    async verifySuccessfulLoginForAMCaseworker(isLoggedIn?: boolean): Promise<void> {
        if(isLoggedIn) await this.page.context().clearCookies();
        await webActions.inputField('#username', credentials.amCaseWorker.email);
        await webActions.inputField('#password', credentials.amCaseWorker.password);
        await webActions.clickButton('Sign in');
    }

    async verifySuccessfulLoginForJudge(isLoggedIn?: boolean): Promise<void> {
        if(isLoggedIn) await this.page.context().clearCookies();
        await webActions.inputField('#username', credentials.judge.email);
        await webActions.inputField('#password', credentials.judge.password);
        await webActions.clickButton('Sign in');
    }

    async verifySuccessfulLoginForAMCaseworkerWithCaseAllocatorRole(isLoggedIn?: boolean): Promise<void> {
        if(isLoggedIn) await this.page.context().clearCookies();
        await webActions.inputField('#username', credentials.amCaseWorkerWithCaseAllocatorRole.email);
        await webActions.inputField('#password', credentials.amCaseWorkerWithCaseAllocatorRole.password);
        await webActions.clickButton('Sign in');
        await expect(this.pageTitle).toHaveText('My work');
    }

    async verifySuccessfulLoginForSuperUser(isLoggedIn?: boolean): Promise<void> {
        if(isLoggedIn) await this.page.context().clearCookies();
        await webActions.inputField('#username', credentials.superUser.email);
        await webActions.inputField('#password', credentials.superUser.password);
        await webActions.clickButton('Sign in');
        await expect(this.pageTitle).toHaveText('My work');
    }

    async verifySuccessfulLoginForUser(user, isLoggedIn?: boolean): Promise<void> {
        if(isLoggedIn) await this.page.context().clearCookies();
        await webActions.inputField('#username', user.email);
        await webActions.inputField('#password', user.password);
        await webActions.clickButton('Sign in');
        await expect(this.pageTitle).toHaveText('My work');
    }
}

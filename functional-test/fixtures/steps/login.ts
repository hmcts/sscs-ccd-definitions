import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/common/loginPage';

export class Login {

    readonly page : Page;

    constructor(page: Page) {
        this.page = page;
    }

    async loginAs(userDetails: any) {
        let loginPage = new LoginPage(this.page);
        await loginPage.goToLoginPage();
        await loginPage.verifySuccessfulLogin(userDetails);
    }
}
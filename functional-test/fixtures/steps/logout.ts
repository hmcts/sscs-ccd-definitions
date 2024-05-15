import { Page } from '@playwright/test';
import { WebAction } from '../../common/web.action';

let webActions: WebAction;

export class Logout {

    readonly page : Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async logout() {
        await this.page.getByText("Sign out").click();
    }
}
import { Page } from '@playwright/test';

export class Logout {

    readonly page : Page;

    constructor(page: Page) {
        this.page = page;
    }

    async logout() {
        await this.page.getByText("Sign out").click();
    }
}
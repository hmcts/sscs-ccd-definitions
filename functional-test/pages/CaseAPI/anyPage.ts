import { Page } from 'playwright';

export class AnyPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async get(uri: string) {
        await this.page.goto(uri);
    }

    async getWithoutWaitingForAngular(uri: string) {
        await this.page.goto(uri);
    }
}

import {expect, Page} from '@playwright/test';
import {WebActions} from '../../common/webActions'


let webActions: WebActions;

export class NotePadTab {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async verifyPageContentByKeyValue(fieldLabel: string, fieldValue: string) {
        await expect(this.page
            .locator(`//*[normalize-space()=“${fieldLabel}“]/../..//td[normalize-space()=“${fieldValue}“]`)).toBeVisible();
    }
}

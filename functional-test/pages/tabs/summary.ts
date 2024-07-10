import { expect, Page } from '@playwright/test';
import { WebAction } from '../../common/web.action'

let webActions: WebAction;

export class Summary {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifyPageContentByKeyValue(fieldLabel: string, fieldValue: string) {
        await expect(this.page
            .locator(`//*[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`)).toBeVisible();
    }

    async verifyFieldHiddenInPageContent(fieldLabel: string) {
        await expect(this.page
            .locator(`//*[normalize-space()="${fieldLabel}"]`)).toBeHidden();
    }

    async verifyPageContentLinkTextByKeyValue(fieldLabel: string, fieldValue: string) {
        let text = await this.page.locator(`//*[normalize-space()="${fieldLabel}"]/../..//td//a`).textContent();
        expect(text).toEqual(fieldValue);
    }

    async verifyPresenceOfText(fieldValue: string) {
        await webActions.screenshot();
        let text = await this.page.locator(`//div/markdown/p[contains(text(),"${fieldValue}")]`).textContent()
        expect(text).toContain(fieldValue); // TODO An exact match is not done as there is Text from Upper nodes of the Dom Tree Appearing.
    }

    /*async verifyPresenceOfText(fieldValue: string): Promise<void>{
        await webActions.verifyTextVisibility(fieldValue);
    }*/
}

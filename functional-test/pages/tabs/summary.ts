import { expect, Page } from '@playwright/test';
import { WebAction } from '../../common/web.action';
import dateUtilsComponent from '../../utils/DateUtilsComponent';

let webAction: WebAction;

export class Summary {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webAction = new WebAction(this.page);
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
        await webAction.screenshot();
        let text = await this.page.locator(`//div/markdown/p[contains(text(),"${fieldValue}")]`).textContent()
        expect(text).toContain(fieldValue); // TODO An exact match is not done as there is Text from Upper nodes of the Dom Tree Appearing.
    }

    async verifyPresenceOfTitle(fieldValue: string) {
        let text = await this.page.locator(`//div/markdown/h2[contains(text(),"${fieldValue}")]`).textContent()
        expect(text).toContain(fieldValue); // TODO An exact match is not done as there is Text from Upper nodes of the Dom Tree Appearing.
    }

    async verifyAttributeValue(expTitleText: string) {
        let imgEle = await this.page.locator('//div/markdown/h2/img');
        let actTitleText = await imgEle.getAttribute('title');
        
        expect(actTitleText).toEqual(expTitleText);
    }

    async verifyTitleNotPresent(fieldLabel: string) {
        await expect(this.page
            .locator(`//div/markdown/h2[contains(text(),"${fieldLabel}")]`)).not.toBeVisible();
    }

    async verifyTotElemensOnPage(fieldLabel: string, fieldValue: string) {
        await webAction.verifyTotalElements(`//*[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`, 2);
    }

    async verifydueDates(reqField: string){
        const dueDate = new Date();
        dueDate.setDate(new Date().getDate());
        let fomattedDueDate = dateUtilsComponent.formatDateToSpecifiedDateShortFormat(dueDate);
        await this.verifyPageContentByKeyValue(reqField, fomattedDueDate);
    }

    /*async verifyPresenceOfText(fieldValue: string): Promise<void>{
        await webActions.verifyTextVisibility(fieldValue);
    }*/
}

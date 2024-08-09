import {expect, Page} from '@playwright/test';
import {WebAction} from '../../common/web.action';
import dateUtilsComponent from '../../utils/DateUtilsComponent';


let webActions: WebAction;

export class AudioVideoEvidence {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifyPageContentByKeyValue(fieldLabel: string, fieldValue: string) {
        await expect(this.page
            .locator(`//*[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`).first()).toBeVisible();
    }

    async verifyPageContentNotPresentByKeyValue(fieldLabel: string, fieldValue: string) {
        await expect(this.page
            .locator(`//*[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`).first()).not.toBeVisible();
    }

    async verifyTitle(fieldLabel: string) {
        await expect(this.page
            .locator(`//span[normalize-space()="${fieldLabel}"]`)).toBeVisible();
    }

    async verifyTitleNotPresent(fieldLabel: string) {
        await expect(this.page
            .locator(`//span[normalize-space()="${fieldLabel}"]`)).not.toBeVisible();
    }

    async verifydueDates(reqField: string){
        const dueDate = new Date();
        dueDate.setDate(new Date().getDate());
        let fomattedDueDate = dateUtilsComponent.formatDateToSpecifiedDateShortFormat(dueDate);
        this.verifyPageContentByKeyValue(reqField, fomattedDueDate);
    }
}

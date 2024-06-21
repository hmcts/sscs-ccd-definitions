import { expect, Page } from '@playwright/test';
import { WebAction } from '../../common/web.action';
import dateUtilsComponent from '../../utils/DateUtilsComponent';


let webActions: WebAction;

export class AppealDetails {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifyAppealDetailsPageContentByKeyValue(fieldLabel: string, fieldValue: string): Promise<void> {
        await expect(this.page
            .locator(`//*[normalize-space()="${fieldLabel}"]/../td[normalize-space()="${fieldValue}"]`)).toBeVisible();
    }

    async verifyFTADueDateOnAppealDetails() {
        const ftaDueDate = new Date();
        ftaDueDate.setDate(new Date().getDate() + 28);
        let formattedDate = dateUtilsComponent.formatDateToSpecifiedDateShortFormat(ftaDueDate);
        this.verifyAppealDetailsPageContentByKeyValue('FTA response due date', formattedDate);
    }

    async verifydueDates(reqField: string){
        const dueDate = new Date();
        dueDate.setDate(new Date().getDate());
        let fomattedDueDate = dateUtilsComponent.formatDateToSpecifiedDateShortFormat(dueDate);
        this.verifyAppealDetailsPageContentByKeyValue(reqField, fomattedDueDate);
    }
}

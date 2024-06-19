import { expect, Page } from '@playwright/test';
import { WebAction } from '../../common/web.action'


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

    async verifyAppealDetailsPageContentByKeyValueForASpan(fieldLabel: string, fieldValue: string): Promise<void> {
        await expect(this.page
            .locator(`//*[normalize-space()="${fieldLabel}"]/..//span//span[normalize-space()="${fieldValue}"]`)).toBeVisible();
    }
    async verifyFTADueDateOnAppealDetails() {
        const ftaDueDate = new Date();
        ftaDueDate.setDate(new Date().getDate() + 28);
        let formattedDate = ftaDueDate.toLocaleDateString('en-UK', { day: '2-digit', month: 'short', year: 'numeric' });
        this.verifyAppealDetailsPageContentByKeyValue('FTA response due date', formattedDate);
    }

    async verifyUrgHearingReqDueDateOnAppealDetails() {
        const urgHearingDueDate = new Date();
        urgHearingDueDate.setDate(new Date().getDate());
        let formattedDate = urgHearingDueDate.toLocaleDateString('en-UK', { day: '2-digit', month: 'short', year: 'numeric' });
        this.verifyAppealDetailsPageContentByKeyValue('Urgent hearing registered', formattedDate);
    }
}

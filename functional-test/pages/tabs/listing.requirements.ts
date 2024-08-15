import {expect, Page} from '@playwright/test';
import {WebAction} from '../../common/web.action';


let webActions: WebAction;

export class ListingRequirements {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }


    async verifyContentByKeyValueForASpan(fieldLabel: string, fieldValue: string): Promise<void> {
        await expect(this.page
            .locator(`//*[normalize-space()="${fieldLabel}"]/..//span//span[normalize-space()="${fieldValue}"]`).first()).toBeVisible();
    }

    async verifyContentNotPresent(fieldLabel: string, fieldValue: string): Promise<void> {
        await expect(this.page
            .locator(`//*[normalize-space()="${fieldLabel}"]/..//span//span[normalize-space()="${fieldValue}"]`).first()).not.toBeVisible();
    }

    async verifyDefaultListingValuesTabVisible(): Promise<void> {
        await webActions.verifyPageLabel('#case-viewer-field-read--defaultListingValues [_ngcontent-ng-c1436485853] > div > [_nghost-ng-c142448239] > [_ngcontent-ng-c142448239] > ccd-read-complex-field > [_nghost-ng-c3159966179] > .complex-panel > .complex-panel-title .text-16', "Default Listing Values");
    }

    async verifyOverridesListingValuesTabVisible(): Promise<void> {
        await webActions.verifyPageLabel('#case-viewer-field-read--overrideFields [_ngcontent-ng-c1436485853] > div > [_nghost-ng-c142448239] > [_ngcontent-ng-c142448239] > ccd-read-complex-field > [_nghost-ng-c3159966179] > .complex-panel > .complex-panel-title .text-16', "Overrides Listing Values");
    }

    async verifyOverridesListingValues(): Promise<void> {
        await this.verifyContentByKeyValueForASpan('Duration of the hearing','165');
        await this.verifyContentByKeyValueForASpan('Is an interpreter wanted?','Yes');
        await this.verifyContentByKeyValueForASpan('Appellant\'s Hearing Channel','Face To Face');
        await this.verifyContentByKeyValueForASpan('Hearing Route','List Assist');
        await this.verifyContentByKeyValueForASpan('Hearing State','Create Hearing');
        await this.verifyContentByKeyValueForASpan('Are Panel Members Excluded?','Yes');
    }
}

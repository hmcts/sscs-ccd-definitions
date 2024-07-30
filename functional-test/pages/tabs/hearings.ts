import {expect, Page} from '@playwright/test';
import {WebAction} from '../../common/web.action';
import dateUtilsComponent from '../../utils/DateUtilsComponent';


let webActions: WebAction;

export class Hearings {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifyPageContentByKeyValue(fieldLabel: string, fieldValue: string) {
        await expect(this.page
            .locator(`//*[normalize-space()="${fieldLabel}"]/../div/div[normalize-space()="${fieldValue}"]`).first()).toBeVisible();
    }

    async verifyVenueListForPaperCase(fieldLabel: string, venueTotal: number) {
        await webActions.verifyTotalElements(`//*[normalize-space()='${fieldLabel}']/../div/div/ul/li`, venueTotal);
    }

    async verifyHearingStatusSummary() {
        await webActions.verifyTextVisibility("WAITING TO BE LISTED");
        await webActions.verifyTextVisibility("Substantive");
        await webActions.verifyTextVisibility("View or edit");
        await webActions.isLinkClickable("Cancel");
    }

    async clickHearingDetails() {
        await webActions.clickLink('View or edit');
    }

    async verifyExpHearingDateIsGenerated(noOfDays: string) {
        const hearingBookedDate = new Date();
        const numberOfDaysToAdd = Number(noOfDays);

        hearingBookedDate.setDate(new Date().getDate() + numberOfDaysToAdd);
        let formattedDate = dateUtilsComponent.formatDateToSpecifiedDateFormat(hearingBookedDate);
        await webActions.verifyTextVisibility(formattedDate);
    }

    // async verifyHearingDetails() {
    //     await webActions.verifyTextVisibility('Cardiff Social Security And Child Support Tribunal');
    //     await webActions.verifyTextVisibility('1 Hour');
    // }

//     async verifyPageContentNotPresentByKeyValue(fieldLabel: string, fieldValue: string) {
//         await expect(this.page
//             .locator(`//*[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`).first()).not.toBeVisible();
//     }

//     async verifyTitle(fieldLabel: string) {
//         await expect(this.page
//             .locator(`//span[normalize-space()="${fieldLabel}"]`)).toBeVisible();
//     }

//     async verifyTitleNotPresent(fieldLabel: string) {
//         await expect(this.page
//             .locator(`//span[normalize-space()="${fieldLabel}"]`)).not.toBeVisible();
//     }

//     async verifydueDates(reqField: string){
//         const dueDate = new Date();
//         dueDate.setDate(new Date().getDate());
//         let fomattedDueDate = dateUtilsComponent.formatDateToSpecifiedDateShortFormat(dueDate);
//         this.verifyPageContentByKeyValue(reqField, fomattedDueDate);
//     }
 }

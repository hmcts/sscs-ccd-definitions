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
        await this.verifyAppealDetailsPageContentByKeyValue('FTA response due date', formattedDate);
    }

    async verifydueDates(reqField: string){
        const dueDate = new Date();
        dueDate.setDate(new Date().getDate());
        let fomattedDueDate = dateUtilsComponent.formatDateToSpecifiedDateShortFormat(dueDate);
        await this.verifyAppealDetailsPageContentByKeyValue(reqField, fomattedDueDate);
    }

    async verifyAppealDetailsAppointeeDetails(appointeeData) {
        await this.verifyAppealDetailsPageContentByKeyValue(appointeeData.firstNameTextFieldLabel, appointeeData.firstNameValue);
        await this.verifyAppealDetailsPageContentByKeyValue(appointeeData.lastNameTextFieldLabel, appointeeData.lastNameValue);
        await this.verifyAppealDetailsPageContentByKeyValue(appointeeData.dateOfBirthTextFieldLabel, appointeeData.dobFormattedValue);
        await this.verifyAppealDetailsPageContentByKeyValue(appointeeData.nationalInsuranceNumberTextFieldLabel,  appointeeData.ninoValue);
        await this.verifyAppealDetailsPageContentByKeyValue(appointeeData.addressLine1TextFieldLabel, appointeeData.streetAddressValue1);
        await this.verifyAppealDetailsPageContentByKeyValue(appointeeData.addressLine2TextFieldLabelNoOptional, appointeeData.streetAddressValue2);
        await this.verifyAppealDetailsPageContentByKeyValue(appointeeData.townTextFieldLabel, appointeeData.townValue);
        await this.verifyAppealDetailsPageContentByKeyValue(appointeeData.countyTextFieldLabel, appointeeData.countyValue);
        await this.verifyAppealDetailsPageContentByKeyValue(appointeeData.postcodeTextFieldLabel, appointeeData.postcodeValue);
        await this.verifyAppealDetailsPageContentByKeyValue(appointeeData.contactNumberTextFieldLabelNoOptional, appointeeData.phoneValue);
        await this.verifyAppealDetailsPageContentByKeyValue(appointeeData.mobileNumberTextFieldLabelNoOptional, appointeeData.mobileValue);
        await this.verifyAppealDetailsPageContentByKeyValue(appointeeData.contactEmailTextFieldLabelNoOptional, appointeeData.emailValue);
    }
}

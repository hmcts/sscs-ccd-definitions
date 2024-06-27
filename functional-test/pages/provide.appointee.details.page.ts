import { Page } from '@playwright/test';
import { WebAction } from '../common/web.action';


let webAction: WebAction;

export class ProvideAppointeeDetailsPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webAction = new WebAction(this.page);
    }

    async verifyPageContent(heading: string) {
        await webAction.verifyPageLabel('h1.govuk-heading-l', heading); //Page heading
        await webAction.isLinkClickable('Cancel');
    }

    async verifyDropDownElementNotVisble(labelText: string): Promise<void> {
        await this.page.locator('#next-step').click();

        // Check if the labelText is visible in the expanded dropdown
        const isLabelVisible = await this.page.locator(`text=${labelText}`).isVisible();
        
        if (isLabelVisible) {
            throw new Error(`Label text "${labelText}" is visible in the dropdown options.`);
        }
    }

    async verifyAndPopulateAppointeeDetailsPage(contentData){
        await webAction.verifyPageLabel('//h2[.=\'Appointee details\']', contentData.appointeeDetailsSectionHeading);
        await webAction.verifyPageLabel('//h2[.=\'Identity\']', contentData.identitySectionHeading);
        await webAction.verifyPageLabel('//h2[.=\'Address Details\']', contentData.addressDetailsSectionHeading);
        await webAction.verifyPageLabel('//h2[.=\'Contact Details\']', contentData.contactDetailsSectionHeading);

        await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_name_title\'] > .form-label', contentData.titleTextFieldLabel);
        await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_name_firstName\'] > .form-label', contentData.firstNameTextFieldLabel);
        await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_name_lastName\'] > .form-label', contentData.lastNameTextFieldLabel);
        await webAction.verifyPageLabel('#appeal_appellant_appointee_identity_identity legend > .form-label', contentData.dateOfBirthTextFieldLabel);
        await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_identity_nino\'] > .form-label', contentData.nationalInsuranceNumberTextFieldLabel);
        await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_address_line1\'] > .form-label', contentData.addressLine1TextFieldLabel);
        await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_address_line2\'] > .form-label', contentData.addressLine2TextFieldLabel);
        await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_address_town\'] > .form-label', contentData.townTextFieldLabel);
        await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_address_county\'] > .form-label', contentData.countyTextFieldLabel);
        await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_address_postcode\'] > .form-label', contentData.postcodeTextFieldLabel);

        await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_contact_phone\'] > .form-label', contentData.contactNumberTextFieldLabel);
        await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_contact_mobile\'] > .form-label', contentData.mobileNumberTextFieldLabel);
        await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_contact_email\'] > .form-label', contentData.contactEmailTextFieldLabel);

        await webAction.typeField('#appeal_appellant_appointee_name_title', 'Mr');
        await webAction.typeField('#appeal_appellant_appointee_name_firstName', 'Automation');
        await webAction.typeField('#appeal_appellant_appointee_name_lastName', 'Tester');
        await webAction.typeField('#appeal_appellant_appointee_identity_identity #dob-day', '1');
        await webAction.typeField('#appeal_appellant_appointee_identity_identity #dob-month', '06');
        await webAction.typeField('#appeal_appellant_appointee_identity_identity #dob-year', '1975');
        await webAction.typeField('#appeal_appellant_appointee_identity_nino', 'WX564421C');

        await webAction.typeField('#appeal_appellant_appointee_address_address ccd-field-write:nth-of-type(1) .form-control', '50 Egerton Gate,');
        await webAction.typeField('#appeal_appellant_appointee_address_address ccd-field-write:nth-of-type(2) .form-control', 'SBH');
        await webAction.typeField("#appeal_appellant_appointee_address_town", 'Swansea');
        await webAction.typeField('#appeal_appellant_appointee_address_county', 'Bucks');
        await webAction.typeField('#appeal_appellant_appointee_address_postcode', 'NK5 7LL');
        await webAction.typeField('#appeal_appellant_appointee_contact_phone', '+44 7818411015');
        await webAction.typeField('#appeal_appellant_appointee_contact_mobile', '+44 7818411015');
        await webAction.typeField('#appeal_appellant_appointee_contact_email', 'test_xxx@hmcts.net');
    }

    async chooseAssistOption(optionVal: string): Promise<void> {
        await webAction.clickElementById(`#appeal_appellant_isAppointee_${optionVal}`);
    }

    async continueSubmission(): Promise<void> {
        await webAction.clickButton('Continue');
    }

}

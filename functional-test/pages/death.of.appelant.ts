import {Page} from '@playwright/test';
import {WebAction} from '../common/web.action';
import deathOfAnAppellant from "./content/death.of.an.appellant_en.json";

let webAction: WebAction;

export class DeathOfAppellantPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webAction = new WebAction(this.page);
    }

    async verifyPageContent() {
        await webAction.verifyPageLabel('.govuk-heading-l', deathOfAnAppellant.deathOfAppellantHeading); //Heading Text
        await webAction.verifyPageLabel('//span[.=\'Date of appellant death\']', deathOfAnAppellant.dateOfAppellantDeathTextFieldLabel); //Field Label
        await webAction.verifyPageLabel('[for=\'dateOfAppellantDeath-day\']', deathOfAnAppellant.dayAppellantDeathTextFieldLabel);
        await webAction.verifyPageLabel('[for=\'dateOfAppellantDeath-month\']', deathOfAnAppellant.monthAppellantDeathTextFieldLabel);
        await webAction.verifyPageLabel('[for=\'dateOfAppellantDeath-year\']', deathOfAnAppellant.yearAppellantDeathTextFieldLabel);
        await webAction.verifyPageLabel('//h2[.=\'Appeal\']', deathOfAnAppellant.appealSectionHeading);
        await webAction.verifyPageLabel('//h2[.=\'Appellant Details\']', deathOfAnAppellant.appellantDetailsSectionHeading);
    }

    async populateDeathOfAppellantPageData(yesNoOption: string) {

        //The Appointee is selected first as there is an issue with the date.
        await webAction.clickElementById(`#appeal_appellant_isAppointee_${yesNoOption}`);
        await webAction.inputField('#dateOfAppellantDeath-day', '01');
        await webAction.inputField('#dateOfAppellantDeath-month', '06');
        await webAction.inputField('#dateOfAppellantDeath-year', '2003');

        if (yesNoOption === 'Yes') {

            //Verify Section Headings and Field Labels for the Appointee Details (Name, Identify, Address Details, Contact Details)
            await webAction.verifyPageLabel('//h2[.=\'Appointee details\']', deathOfAnAppellant.appointeeDetailsSectionHeading);
            await webAction.verifyPageLabel('//h2[.=\'Identity\']', deathOfAnAppellant.identitySectionHeading);
            await webAction.verifyPageLabel('//h2[.=\'Address Details\']', deathOfAnAppellant.addressDetailsSectionHeading);
            await webAction.verifyPageLabel('//h2[.=\'Contact Details\']', deathOfAnAppellant.contactDetailsSectionHeading);

            await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_name_title\'] > .form-label', deathOfAnAppellant.titleTextFieldLabel);
            await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_name_firstName\'] > .form-label', deathOfAnAppellant.firstNameTextFieldLabel);
            await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_name_lastName\'] > .form-label', deathOfAnAppellant.lastNameTextFieldLabel);
            await webAction.verifyPageLabel('#appeal_appellant_appointee_identity_identity legend > .form-label', deathOfAnAppellant.dateOfBirthTextFieldLabel);
            await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_identity_nino\'] > .form-label', deathOfAnAppellant.nationalInsuranceNumberTextFieldLabel);
            await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_address_line1\'] > .form-label', deathOfAnAppellant.addressLine1TextFieldLabel);
            await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_address_line2\'] > .form-label', deathOfAnAppellant.addressLine2TextFieldLabel);
            await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_address_town\'] > .form-label', deathOfAnAppellant.townTextFieldLabel);
            await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_address_county\'] > .form-label', deathOfAnAppellant.countyTextFieldLabel);
            await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_address_postcode\'] > .form-label', deathOfAnAppellant.postcodeTextFieldLabel);

            await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_contact_phone\'] > .form-label', deathOfAnAppellant.contactNumberTextFieldLabel);
            await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_contact_mobile\'] > .form-label', deathOfAnAppellant.mobileNumberTextFieldLabel);
            await webAction.verifyPageLabel('[for=\'appeal_appellant_appointee_contact_email\'] > .form-label', deathOfAnAppellant.contactEmailTextFieldLabel);

            await webAction.inputField('#appeal_appellant_appointee_name_title', 'Mr');
            await webAction.inputField('#appeal_appellant_appointee_name_firstName', 'Automation');
            await webAction.inputField('#appeal_appellant_appointee_name_lastName', 'Tester');
            await webAction.inputField('#appeal_appellant_appointee_identity_identity #dob-day', '1');
            await webAction.inputField('#appeal_appellant_appointee_identity_identity #dob-month', '06');
            await webAction.inputField('#appeal_appellant_appointee_identity_identity #dob-year', '1975');
            await webAction.inputField('#appeal_appellant_appointee_identity_nino', 'WX564421C');

            await webAction.inputField('#appeal_appellant_appointee_address_address ccd-field-write:nth-of-type(1) .form-control', '50 Egerton Gate,');
            await webAction.inputField('#appeal_appellant_appointee_address_address ccd-field-write:nth-of-type(2) .form-control', 'SBH');
            await webAction.inputField("#appeal_appellant_appointee_address_town", 'Swansea');
            await webAction.inputField('#appeal_appellant_appointee_address_county', 'Bucks');
            await webAction.inputField('#appeal_appellant_appointee_address_postcode', 'NK5 7LL');
            await webAction.inputField('#appeal_appellant_appointee_contact_phone', '+44 7818411015');
            await webAction.inputField('#appeal_appellant_appointee_contact_mobile', '+44 7818411015');
            await webAction.inputField('#appeal_appellant_appointee_contact_email', 'test_xxx@hmcts.net');

        }
    }

    async populateDeathOfAppellantDateInvalidFormat(yesNoOption: string) {
        await webAction.clickElementById(`#appeal_appellant_isAppointee_${yesNoOption}`);
        await webAction.inputField('#dateOfAppellantDeath-day', '01');
        await webAction.inputField('#dateOfAppellantDeath-month', 'AUG');
        await webAction.inputField('#dateOfAppellantDeath-year', '2028');
    }

    async populateDeathOfAppellantDateInTheFuture(yesNoOption: string) {
        await webAction.clickElementById(`#appeal_appellant_isAppointee_${yesNoOption}`);
        await webAction.inputField('#dateOfAppellantDeath-day', '01');
        await webAction.inputField('#dateOfAppellantDeath-month', '08');
        await webAction.inputField('#dateOfAppellantDeath-year', '2028');
    }

    async confirmSubmission(): Promise<void> {
        await this.page.waitForTimeout(3000);
        await webAction.clickSubmitButton();
    }

    async signOut(): Promise<void> {
        await webAction.clickElementById("//a[contains(.,'Sign out')]");
    }

    async verifyDeathDateNotBeIntheFutureErrorMsg(): Promise<void> {
        await webAction.verifyTextVisibility('Date of appellant death must not be in the future');
    }

    async verifyDeathDateNotValidErrorMsg(): Promise<void> {
        await webAction.verifyTextVisibility('Date of appellant death is not valid');
    }

    async reloadPage() {
        await this.page.reload({timeout: 13000, waitUntil: 'load'});
    }
}

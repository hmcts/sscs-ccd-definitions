import { expect, Page } from '@playwright/test';
import { WebAction } from '../common/web.action';
import addUpdateOtherPartyData from "./content/update.other.party.data_en.json";


let webAction: WebAction;

export class updateOtherPartyDataPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webAction = new WebAction(this.page);
    }

    async verifyPageContent() {
        await webAction.verifyPageLabel('.govuk-caption-l', addUpdateOtherPartyData.updateOtherPartyDataHeading); //Above heading Text
        await webAction.isLinkClickable('Cancel');
    }

    // Applying other party data for the Mandatory fields only
    async applyOtherPartyData() {
        const buttonAddNew = this.page.getByRole('button').and(this.page.getByTitle('Add New'));
        await buttonAddNew.click(); //fields should be expanded here
        await this.page.getByText("First Name");
        await this.page.locator('#otherParties_0_name_firstName').fill(addUpdateOtherPartyData.updateOtherPartyDataFirstName);
        await this.page.locator('#otherParties_0_name_lastName').fill(addUpdateOtherPartyData.updateOtherPartyDataLastName);
        await this.page.locator('#otherParties_0_address_line1').fill(addUpdateOtherPartyData.updateOtherPartyDataAddressLine);
        await this.page.locator('#otherParties_0_address_town').fill(addUpdateOtherPartyData.updateOtherPartyDataAddressTown);
        await this.page.locator('#otherParties_0_address_postcode').fill(addUpdateOtherPartyData.updateOtherPartyDataAddressPostCode);
        await this.page.locator('#otherParties_0_confidentialityRequired_No').click();
        await this.page.locator('#otherParties_0_unacceptableCustomerBehaviour_No').click();

        await webAction.clickButton("Submit");
    }

    async cancelEvent(): Promise<void> {
        await webAction.clickLink("Cancel");
    }

    async confirmSubmission(): Promise<void> {
        await webAction.clickSubmitButton();
    }
}
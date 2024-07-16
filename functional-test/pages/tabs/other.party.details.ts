import { expect, Page } from '@playwright/test';
import { WebAction } from '../../common/web.action'
import { HomePage } from '../common/homePage';
import addUpdateOtherPartyData from "../../pages/content/update.other.party.data_en.json"
import addUpdateSubscriptionData from "../content/update.subscription.data_en.json"

let webActions: WebAction;

export class OtherPartyDetails {

    readonly page: Page;
    protected homePage: HomePage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
        webActions = new WebAction(this.page);
    }

    async verifyPageContentByKeyValue(fieldLabel: string, fieldValue: string) {
        // await expect(this.page
        //    .locator(`//*[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`)).toBeVisible();
        await expect(this.page.locator('xpath=//span[.="Other parties 1"]')).toContainText("Other parties 1"); // heading of the tab content for party 1
        await expect(this.page
            .locator(`//*[normalize-space()="First Name"]/../..//td[normalize-space()="${addUpdateOtherPartyData.updateOtherPartyDataFirstName}"]`)).toBeVisible();
        await expect(this.page
            .locator(`//*[normalize-space()="Last Name"]/../..//td[normalize-space()="${addUpdateOtherPartyData.updateOtherPartyDataLastName}"]`)).toBeVisible();
        await expect(this.page
            .locator(`//*[normalize-space()="Address Line 1"]/../..//td[normalize-space()="${addUpdateOtherPartyData.updateOtherPartyDataAddressLine}"]`)).toBeVisible();
        await expect(this.page
            .locator(`//*[normalize-space()="Town"]/../..//td[normalize-space()="${addUpdateOtherPartyData.updateOtherPartyDataAddressTown}"]`)).toBeVisible();
        await expect(this.page
            .locator(`//*[normalize-space()="Postcode"]/../..//td[normalize-space()="${addUpdateOtherPartyData.updateOtherPartyDataAddressPostCode}"]`)).toBeVisible();
        await expect(this.page
            .locator(`//*[normalize-space()="Confidentiality Required"]/../..//td[normalize-space()="${addUpdateOtherPartyData.updateOtherPartyDataAddressConfidentiality}"]`)).toBeVisible();
        await expect(this.page
            .locator(`//*[normalize-space()="Unacceptable Customer Behaviour"]/../..//td[normalize-space()="${addUpdateOtherPartyData.updateOtherPartyDataAddressBehaviour}"]`)).toBeVisible();
        await expect(this.page
            .locator(`//*[normalize-space()="Role"]/../..//td[normalize-space()="${addUpdateOtherPartyData.updateOtherPartyDataAddressRole}"]`)).toBeVisible();
    }

    async verifyTabDetails(fieldLabel: string, fieldValue: string) {
        // await expect(this.page
        //    .locator(`//*[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`)).toBeVisible();
        await expect(this.page.locator('xpath=//span[.="Other party subscription"]')).toContainText("Other party subscription"); // heading of the tab content for other party subscription
        await expect(this.page
            .locator(`//*[normalize-space()="Track Your Appeal Number"]/../..//td[normalize-space()="${addUpdateSubscriptionData.updateSubscriptionTrackYAotherParty}"]`)).toBeVisible();
        await expect(this.page
            .locator(`//*[normalize-space()="Email Address"]/../..//td[normalize-space()="${addUpdateSubscriptionData.updateSubscriptionEmailotherParty}"]`)).toBeVisible();
        await expect(this.page
            .locator(`//*[normalize-space()="Mobile Number"]/../..//td[normalize-space()="${addUpdateSubscriptionData.updateSubscriptionMobileNumberotherParty}"]`)).toBeVisible();
    }
}
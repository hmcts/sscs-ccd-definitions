import { expect, Page } from '@playwright/test';
import { WebAction } from '../common/web.action';
import addUpdateSubscriptionData from "./content/update.subscription.data_en.json";


let webAction: WebAction;

export class UpdateSubscriptionPage {  //updated class

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webAction = new WebAction(this.page);
    }

    async verifyPageContent() {
        await webAction.verifyPageLabel('.govuk-caption-l', addUpdateSubscriptionData.updateSubscriptionHeading); //Above heading Text
        await webAction.isLinkClickable('Cancel');
}

    // Applying subscription Yes to email + sms
    async applySubscription() {
        // Appellant
        await this.page.locator('#subscriptions_appellantSubscription_wantSmsNotifications_Yes').click();
        await this.page.locator('#subscriptions_appellantSubscription_tya').fill(addUpdateSubscriptionData.updateSubscriptionTrackYAappellant);
        await this.page.locator('#subscriptions_appellantSubscription_email').fill(addUpdateSubscriptionData.updateSubscriptionEmailappellant);
        await this.page.locator('#subscriptions_appellantSubscription_mobile').fill(addUpdateSubscriptionData.updateSubscriptionMobileNumberappellant);
        await this.page.locator('#subscriptions_appellantSubscription_subscribeEmail_Yes').click();
        await this.page.locator('#subscriptions_appellantSubscription_subscribeSms_Yes').click();
        // Representative
        await this.page.locator('#subscriptions_representativeSubscription_wantSmsNotifications_Yes').click();
        await this.page.locator('#subscriptions_representativeSubscription_tya').fill(addUpdateSubscriptionData.updateSubscriptionTrackYArepresentative);
        await this.page.locator('#subscriptions_representativeSubscription_email').fill(addUpdateSubscriptionData.updateSubscriptionEmailrepresentative);
        await this.page.locator('#subscriptions_representativeSubscription_mobile').fill(addUpdateSubscriptionData.updateSubscriptionMobileNumberrepresentative);
        await this.page.locator('#subscriptions_representativeSubscription_subscribeEmail_Yes').click();
        await this.page.locator('#subscriptions_representativeSubscription_subscribeSms_Yes').click();
        // Appointee
        await this.page.locator('#subscriptions_appointeeSubscription_wantSmsNotifications_Yes').click();
        await this.page.locator('#subscriptions_appointeeSubscription_tya').fill(addUpdateSubscriptionData.updateSubscriptionTrackYAappointee);
        await this.page.locator('#subscriptions_appointeeSubscription_email').fill(addUpdateSubscriptionData.updateSubscriptionEmailappointee);
        await this.page.locator('#subscriptions_appointeeSubscription_mobile').fill(addUpdateSubscriptionData.updateSubscriptionMobileNumberappointee);
        await this.page.locator('#subscriptions_appointeeSubscription_subscribeEmail_Yes').click();
        await this.page.locator('#subscriptions_appointeeSubscription_subscribeSms_Yes').click();
        // Joint Party
        await this.page.locator('#subscriptions_jointPartySubscription_wantSmsNotifications_Yes').click();
        await this.page.locator('#subscriptions_jointPartySubscription_tya').fill(addUpdateSubscriptionData.updateSubscriptionTrackYAjointParty);
        await this.page.locator('#subscriptions_jointPartySubscription_email').fill(addUpdateSubscriptionData.updateSubscriptionEmailjointParty);
        await this.page.locator('#subscriptions_jointPartySubscription_mobile').fill(addUpdateSubscriptionData.updateSubscriptionMobileNumberjointParty);
        await this.page.locator('#subscriptions_jointPartySubscription_subscribeEmail_Yes').click();
        await this.page.locator('#subscriptions_jointPartySubscription_subscribeSms_Yes').click();
        // Supporter
        await this.page.locator('#subscriptions_supporterSubscription_wantSmsNotifications_Yes').click();
        await this.page.locator('#subscriptions_supporterSubscription_tya').fill(addUpdateSubscriptionData.updateSubscriptionTrackYAsupportParty);
        await this.page.locator('#subscriptions_supporterSubscription_email').fill(addUpdateSubscriptionData.updateSubscriptionEmailsupportParty);
        await this.page.locator('#subscriptions_supporterSubscription_mobile').fill(addUpdateSubscriptionData.updateSubscriptionMobileNumbersupportParty);
        await this.page.locator('#subscriptions_supporterSubscription_subscribeEmail_Yes').click();
        await this.page.locator('#subscriptions_supporterSubscription_subscribeSms_Yes').click();

        await webAction.clickButton("Submit");
    }

    // async applySubscriptionChildSupport() {
    //     // Appellant
    //     await this.page.locator('#subscriptions_appellantSubscription_wantSmsNotifications_Yes').click();
    //     await this.page.locator('#subscriptions_appellantSubscription_tya').fill(addUpdateSubscriptionData.updateSubscriptionTrackYAappellant);
    //     await this.page.locator('#subscriptions_appellantSubscription_email').fill(addUpdateSubscriptionData.updateSubscriptionEmailappellant);
    //     await this.page.locator('#subscriptions_appellantSubscription_mobile').fill(addUpdateSubscriptionData.updateSubscriptionMobileNumberappellant);
    //     await this.page.locator('#subscriptions_appellantSubscription_subscribeEmail_Yes').click();
    //     await this.page.locator('#subscriptions_appellantSubscription_subscribeSms_Yes').click();
    //     // Representative
    //     await this.page.locator('#subscriptions_representativeSubscription_wantSmsNotifications_Yes').click();
    //     await this.page.locator('#subscriptions_representativeSubscription_tya').fill(addUpdateSubscriptionData.updateSubscriptionTrackYArepresentative);
    //     await this.page.locator('#subscriptions_representativeSubscription_email').fill(addUpdateSubscriptionData.updateSubscriptionEmailrepresentative);
    //     await this.page.locator('#subscriptions_representativeSubscription_mobile').fill(addUpdateSubscriptionData.updateSubscriptionMobileNumberrepresentative);
    //     await this.page.locator('#subscriptions_representativeSubscription_subscribeEmail_Yes').click();
    //     await this.page.locator('#subscriptions_representativeSubscription_subscribeSms_Yes').click();
    //     // Appointee
    //     await this.page.locator('#subscriptions_appointeeSubscription_wantSmsNotifications_Yes').click();
    //     await this.page.locator('#subscriptions_appointeeSubscription_tya').fill(addUpdateSubscriptionData.updateSubscriptionTrackYAappointee);
    //     await this.page.locator('#subscriptions_appointeeSubscription_email').fill(addUpdateSubscriptionData.updateSubscriptionEmailappointee);
    //     await this.page.locator('#subscriptions_appointeeSubscription_mobile').fill(addUpdateSubscriptionData.updateSubscriptionMobileNumberappointee);
    //     await this.page.locator('#subscriptions_appointeeSubscription_subscribeEmail_Yes').click();
    //     await this.page.locator('#subscriptions_appointeeSubscription_subscribeSms_Yes').click();
    //     // Joint Party
    //     await this.page.locator('#subscriptions_jointPartySubscription_wantSmsNotifications_Yes').click();
    //     await this.page.locator('#subscriptions_jointPartySubscription_tya').fill(addUpdateSubscriptionData.updateSubscriptionTrackYAjointParty);
    //     await this.page.locator('#subscriptions_jointPartySubscription_email').fill(addUpdateSubscriptionData.updateSubscriptionEmailjointParty);
    //     await this.page.locator('#subscriptions_jointPartySubscription_mobile').fill(addUpdateSubscriptionData.updateSubscriptionMobileNumberjointParty);
    //     await this.page.locator('#subscriptions_jointPartySubscription_subscribeEmail_Yes').click();
    //     await this.page.locator('#subscriptions_jointPartySubscription_subscribeSms_Yes').click();
    //     // Supporter
    //     await this.page.locator('#subscriptions_supporterSubscription_wantSmsNotifications_Yes').click();
    //     await this.page.locator('#subscriptions_supporterSubscription_tya').fill(addUpdateSubscriptionData.updateSubscriptionTrackYAsupportParty);
    //     await this.page.locator('#subscriptions_supporterSubscription_email').fill(addUpdateSubscriptionData.updateSubscriptionEmailsupportParty);
    //     await this.page.locator('#subscriptions_supporterSubscription_mobile').fill(addUpdateSubscriptionData.updateSubscriptionMobileNumbersupportParty);
    //     await this.page.locator('#subscriptions_supporterSubscription_subscribeEmail_Yes').click();
    //     await this.page.locator('#subscriptions_supporterSubscription_subscribeSms_Yes').click();
    //     // Other Party
    //     await this.page.locator('#otherParties > .panel > .write-collection-add-item__top').click();  //clicking 'Add New' button to expand other parties fields
    //     //await expect.stringContaining('Other party subscription (Optional)').toBeVisible();
    //     await this.page.locator('#otherParties_0_otherPartySubscription_wantSmsNotifications_Yes').click();
    //     await this.page.locator('#otherParties_0_otherPartySubscription_tya').fill(addUpdateSubscriptionData.updateSubscriptionTrackYAotherParty);
    //     await this.page.locator('#otherParties_0_otherPartySubscription_email').fill(addUpdateSubscriptionData.updateSubscriptionEmailotherParty);
    //     await this.page.locator('#otherParties_0_otherPartySubscription_mobile').fill(addUpdateSubscriptionData.updateSubscriptionMobileNumberotherParty);
    //     await this.page.locator('#otherParties_0_otherPartySubscription_subscribeEmail_Yes').click();
    //     await this.page.locator('#otherParties_0_otherPartySubscription_subscribeSms_Yes').click();
    //     // // Other Party appointee
        // await this.page.locator('#otherParties_0_otherPartyAppointeeSubscription_wantSmsNotifications_Yes').click();
        // await this.page.locator('#otherParties_0_otherPartyAppointeeSubscription_tya').fill(addUpdateSubscriptionData.updateSubscriptionTrackYAotherPartyAppointee);
        // await this.page.locator('#otherParties_0_otherPartyAppointeeSubscription_email').fill(addUpdateSubscriptionData.updateSubscriptionEmailotherPartyAppointee);
        // await this.page.locator('#otherParties_0_otherPartyAppointeeSubscription_mobile').fill(addUpdateSubscriptionData.updateSubscriptionMobileNumberotherPartyAppointee);
        // await this.page.locator('#otherParties_0_otherPartyAppointeeSubscription_subscribeEmail_Yes').click();
        // await this.page.locator('#otherParties_0_otherPartyAppointeeSubscription_subscribeSms_Yes').click();
        // // Other Party representative
        // await this.page.locator('#otherParties_0_otherPartyRepresentativeSubscription_wantSmsNotifications_Yes').click();
        // await this.page.locator('#otherParties_0_otherPartyRepresentativeSubscription_tya').fill(addUpdateSubscriptionData.updateSubscriptionTrackYAotherPartyRepresentative);
        // await this.page.locator('#otherParties_0_otherPartyRepresentativeSubscription_email').fill(addUpdateSubscriptionData.updateSubscriptionEmailotherPartyRepresentative);
        // await this.page.locator('#otherParties_0_otherPartyRepresentativeSubscription_mobile').fill(addUpdateSubscriptionData.updateSubscriptionMobileNumberotherPartyRepresentative);
        // await this.page.locator('#otherParties_0_otherPartyRepresentativeSubscription_subscribeEmail_Yes').click();
        // await this.page.locator('#otherParties_0_otherPartyRepresentativeSubscription_subscribeSms_Yes').click();

    //     await webAction.clickButton("Submit");
    // }

    async cancelEvent(): Promise<void> {
        await webAction.clickLink("Cancel");
    }

    async confirmSubmission(): Promise<void> {
        await webAction.clickSubmitButton();
    }
}
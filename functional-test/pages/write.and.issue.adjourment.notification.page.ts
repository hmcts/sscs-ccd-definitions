import {Page} from '@playwright/test';
import {WebAction} from '../common/web.action';
import writeAdjournmentNoticeData from "./content/write.adjournment.notice_en.json";
import DateUtilsComponent from "../utils/DateUtilsComponent";
import {triggerAsyncId} from 'async_hooks';

let webActions: WebAction;

export class WriteAndIssueAdjourmentNotificationPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifyUploadOrGenerateContentPage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeAdjournmentNoticeData.writeAdjournmentNoticeEventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.uploadOrGenerateANoticeEventNamePageHeading);
        await webActions.verifyPageLabel('span.form-label', writeAdjournmentNoticeData.generateNoticeLabel);
    }

    async inputUploadOrGenerateContentPageData() {
        await webActions.clickElementById('#adjournCaseGenerateNotice_Yes');
    }

    async verifyArePanelMembersExcludedPage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeAdjournmentNoticeData.writeAdjournmentNoticeEventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.arePanelMembersExcludedEventNamePageHeading);
        await webActions.verifyPageLabel('span.form-label', writeAdjournmentNoticeData.arePanelMembersExcludedLabel);
        await webActions.verifyPageLabel('[for=\'adjournCasePanelMembersExcluded-Yes\']', writeAdjournmentNoticeData.yesLabel);
        await webActions.verifyPageLabel('[for=\'adjournCasePanelMembersExcluded-No\']', writeAdjournmentNoticeData.noLabel);
        await webActions.verifyPageLabel('[for=\'adjournCasePanelMembersExcluded-Reserved\']', writeAdjournmentNoticeData.reservedLabel);
    }

    async inputOptionForPanelMembersExcludedPageData(){
        await webActions.clickElementById('#adjournCasePanelMembersExcluded-Yes');
    }

    async verifyPanelMembersPage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeAdjournmentNoticeData.writeAdjournmentNoticeEventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.panelMembersPageHeading);
        await webActions.verifyPageLabel('[for=\'adjournCasePanelMember1\'] > .form-label', writeAdjournmentNoticeData.nameOfDisabilityQualifiedPanelMemberDQPMLabel);
        await webActions.verifyPageLabel('[for=\'adjournCasePanelMember2\'] > .form-label', writeAdjournmentNoticeData.nameOfMedicallyQualifiedPanelMemberMQPMLabel);
        await webActions.verifyPageLabel('[for=\'adjournCasePanelMember3\'] > .form-label', writeAdjournmentNoticeData.otherLabel);
    }

    async inputPanelMembersPageData() {
        await webActions.inputField('[field_id=\'adjournCasePanelMember1\'] .mat-autocomplete-trigger', writeAdjournmentNoticeData.nameOfDisabilityQualifiedPanelMemberInput);
        await webActions.inputField('[field_id=\'adjournCasePanelMember2\'] .mat-autocomplete-trigger', writeAdjournmentNoticeData.nameOfMedicallyQualifiedPanelMemberInput);
        await webActions.inputField('[field_id=\'adjournCasePanelMember3\'] .mat-autocomplete-trigger', writeAdjournmentNoticeData.otherPanelMemberInput);
    }

    async verifyTypeOfHearingPage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeAdjournmentNoticeData.writeAdjournmentNoticeEventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.typeOfHearingPageHeading);
        await webActions.verifyPageLabel('span.form-label', writeAdjournmentNoticeData.whatTypeOfHearingWasHeld);
        await webActions.verifyPageLabel('[for=\'adjournCaseTypeOfHearing-paper\']', writeAdjournmentNoticeData.paperLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseTypeOfHearing-video\']', writeAdjournmentNoticeData.videoLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseTypeOfHearing-telephone\']', writeAdjournmentNoticeData.telephoneLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseTypeOfHearing-faceToFace\']', writeAdjournmentNoticeData.faceToFaceLabel);
    }

    async inputTypeOfHearingPageData(){
        await webActions.clickElementById('#adjournCaseTypeOfHearing-paper');
    }

    async verifyCanThisCaseBeListedRightAwayPage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeAdjournmentNoticeData.writeAdjournmentNoticeEventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.canThisCaseBeListedRightAwayPageHeading);
        await webActions.verifyPageLabel('span.form-label', writeAdjournmentNoticeData.canThisCaseBeListedRightAwayLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseCanCaseBeListedRightAway_Yes\']', writeAdjournmentNoticeData.yesLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseCanCaseBeListedRightAway_No\']', writeAdjournmentNoticeData.noLabel);
    }

    async inputCanThisCaseBeListedRightAwayPageData() {
        await webActions.clickElementById('#adjournCaseCanCaseBeListedRightAway_Yes');
    }

    async verifyNextHearingFormatPage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeAdjournmentNoticeData.writeAdjournmentNoticeEventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.nextHearingFormatPageHeading);
        await webActions.verifyPageLabel('span.form-label', writeAdjournmentNoticeData.confirmTheFormatOfTheNextHearingLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseTypeOfNextHearing-paper\']', writeAdjournmentNoticeData.paperLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseTypeOfNextHearing-video\']', writeAdjournmentNoticeData.videoLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseTypeOfNextHearing-telephone\']', writeAdjournmentNoticeData.telephoneLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseTypeOfNextHearing-faceToFace\']', writeAdjournmentNoticeData.faceToFaceLabel);
    }

    async inputNextHearingFormatPageData() {
        await webActions.clickElementById('#adjournCaseTypeOfNextHearing-faceToFace');
    }

    async verifyNextHearingVenuePage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeAdjournmentNoticeData.writeAdjournmentNoticeEventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.nextHearingVenuePageHeading);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingVenue\'] > .form-label', writeAdjournmentNoticeData.whereShouldNextHearingBeListedLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingVenue-somewhereElse\']', writeAdjournmentNoticeData.somewhereElseLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingVenue-sameVenue\']', writeAdjournmentNoticeData.sameVenueLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingVenueSelected\'] > .form-label', writeAdjournmentNoticeData.specifyTheVenue);
    }

    async inputNextHearingVenuePageData() {
        await webActions.clickElementById('#adjournCaseNextHearingVenue-somewhereElse');
        await webActions.chooseOptionByLabel('#adjournCaseNextHearingVenueSelected','Cardiff Civil Justice Centre, 2 Park Street, Cardiff, South Wales, CF10 1ET');
    }

    async verifyTribunalDirectPOToAttendPage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeAdjournmentNoticeData.writeAdjournmentNoticeEventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.tribunalDirectPOToAttendPageHeading);
        await webActions.verifyPageLabel('span.form-label', writeAdjournmentNoticeData.tribunalDirectPOToAttendLabel);
        await webActions.verifyPageLabel('[for=\'tribunalDirectPoToAttend_Yes\']', writeAdjournmentNoticeData.yesLabel);
        await webActions.verifyPageLabel('[for=\'tribunalDirectPoToAttend_No\']', writeAdjournmentNoticeData.noLabel);
    }

    async inputTribunalDirectPOToAttendPageData() {
        await webActions.clickElementById('#tribunalDirectPoToAttend_Yes');
    }

    async verifyHowLongShouldTheNextHearingBeListedPage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeAdjournmentNoticeData.writeAdjournmentNoticeEventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.howLongShouldTheNextHearingBeListedForPageHeading);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingListingDurationType\'] > .form-label', writeAdjournmentNoticeData.tribunalDirectPOToAttendLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingListingDurationType-nonStandardTimeSlot\']', writeAdjournmentNoticeData.nonStandardTimeSlotLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingListingDurationType-standardTimeSlot\']', writeAdjournmentNoticeData.standardTimeSlotLabel);
    }

    async inputHowLongShouldTheNextHearingBeListedPageData() {
        await webActions.clickElementById('#adjournCaseNextHearingListingDurationType-nonStandardTimeSlot');
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingListingDuration\'] > .form-label', writeAdjournmentNoticeData.durationLengthLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingListingDurationUnits\'] > .form-label', writeAdjournmentNoticeData.minutesOrSessionsLabel);
        await webActions.inputField('#adjournCaseNextHearingListingDuration', writeAdjournmentNoticeData.durationLengthInput);
        await webActions.chooseOptionByLabel('#adjournCaseNextHearingListingDurationUnits', writeAdjournmentNoticeData.minutesOrSessionsInput);
    }


    async chooseAllowedOrRefused(optionVal: string) {
        await webActions.clickElementById(optionVal);
    }

    async submitContinueBtn(): Promise<void> {
        await webActions.clickButton("Continue");
    }

    async confirmSubmission(): Promise<void> {
        await this.page.waitForTimeout(3000);
        await webActions.clickSubmitButton();
        await this.page.waitForTimeout(3000);
    }
}

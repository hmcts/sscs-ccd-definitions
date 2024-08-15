import {Page} from '@playwright/test';
import {WebAction} from '../common/web.action';
import writeAdjournmentNoticeData from "./content/write.adjournment.notice_en.json";
import DateUtilsComponent from "../utils/DateUtilsComponent";
import {triggerAsyncId} from 'async_hooks';
import writeFinalDecisionData from "./content/write.final.decision_en.json";

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
        await webActions.chooseOptionByLabel('#adjournCaseNextHearingVenueSelected',writeAdjournmentNoticeData.hearingVenueSelectedInput);
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
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingListingDurationType\'] > .form-label', writeAdjournmentNoticeData.howLongShouldTheNextHearingBeListedForLabel);
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

    async verifyLanguageInterpreterPage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeAdjournmentNoticeData.writeAdjournmentNoticeEventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.languageInterpreterPageHeading);
        await webActions.verifyPageLabel('.inline > legend > .form-label', writeAdjournmentNoticeData.isAnInterpreterRequiredForHearingLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseInterpreterRequired_Yes\']', writeAdjournmentNoticeData.yesLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseInterpreterRequired_No\']', writeAdjournmentNoticeData.noLabel);
    }

    async inputLanguageInterpreterPageData() {
        await webActions.clickElementById('#adjournCaseInterpreterRequired_Yes');
        await webActions.verifyPageLabel('[for=\'adjournCaseInterpreterLanguageList\'] > .form-label', writeAdjournmentNoticeData.whatLanguageDoTheyNeedToSpeakLabel);
        await webActions.chooseOptionByLabel('#adjournCaseInterpreterLanguageList', writeAdjournmentNoticeData.languageOptionInput);
    }

    async verifyWhenShouldNextHearingBePage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeAdjournmentNoticeData.writeAdjournmentNoticeEventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.whenShouldNextHearingBePageHeading);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingDateType\'] > .form-label', writeAdjournmentNoticeData.whenShouldNextHearingBeLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingDateType-dateToBeFixed\']', writeAdjournmentNoticeData.dateToBeFixedLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingDateType-firstAvailableDateAfter\']', writeAdjournmentNoticeData.firstAvailableDateAfterLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingDateType-firstAvailableDate\']', writeAdjournmentNoticeData.firstAvailableDateLabel);
    }

    async inputWhenShouldNextHearingBePageData() {
        await webActions.clickElementById('#adjournCaseNextHearingDateType-firstAvailableDateAfter');
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingDateOrPeriod\'] > .form-label', writeAdjournmentNoticeData.provideDateOrPeriodLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingDateOrPeriod-providePeriod\']', writeAdjournmentNoticeData.providePeriodLabel);
        await webActions.verifyPageLabel('#adjournCaseNextHearingFirstAvailableDateAfterDate legend > .form-label', writeAdjournmentNoticeData.provideDateLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingFirstAvailableDateAfterDate-day\']', writeAdjournmentNoticeData.dayLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingFirstAvailableDateAfterDate-month\']', writeAdjournmentNoticeData.monthLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingFirstAvailableDateAfterDate-year\']', writeAdjournmentNoticeData.yearLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseTime_adjournCaseNextHearingFirstOnSession-firstOnSession\']', writeAdjournmentNoticeData.listFirstOnTheSessionLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseTime_adjournCaseNextHearingSpecificTime\'] > .form-label', writeAdjournmentNoticeData.provideTimeLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseTime_adjournCaseNextHearingSpecificTime-pm\']', writeAdjournmentNoticeData.PMLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseTime_adjournCaseNextHearingSpecificTime-am\']', writeAdjournmentNoticeData.AMLabel);
        await webActions.clickElementById('#adjournCaseNextHearingDateOrPeriod-providePeriod');
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingFirstAvailableDateAfterPeriod\'] > .form-label', writeAdjournmentNoticeData.providePeriodLabel);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingFirstAvailableDateAfterPeriod-90\']', writeAdjournmentNoticeData["90DaysLabel"]);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingFirstAvailableDateAfterPeriod-42\']', writeAdjournmentNoticeData["42DaysLabel"]);
        await webActions.verifyPageLabel('[for=\'adjournCaseNextHearingFirstAvailableDateAfterPeriod-28\']', writeAdjournmentNoticeData["28DaysLabel"]);
        await webActions.clickElementById('#adjournCaseNextHearingFirstAvailableDateAfterPeriod div:nth-of-type(1) > .form-control');
        await webActions.clickElementById('#adjournCaseTime_adjournCaseNextHearingFirstOnSession-firstOnSession');
        await webActions.clickElementById('#adjournCaseTime_adjournCaseNextHearingSpecificTime-am');
    }

    async verifyReasonForAdjustmentPage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeAdjournmentNoticeData.writeAdjournmentNoticeEventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.reasonsForAdjournmentPageHeading);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.reasonsForAdjournmentLabel);
    }

    async inputReasonForAdjustmentPageData() {
        await webActions.clickButton('Add new');
        await webActions.inputField('#adjournCaseReasons_value',writeAdjournmentNoticeData.reasonsForAdjournmentInput);
    }

    async verifyAdditionalDirectionsPage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeAdjournmentNoticeData.writeAdjournmentNoticeEventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.additionalDirectionsPageHeading);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.additionalDirectionsLabel);
    }

    async inputAdditionalDirectionsPageData() {
        await webActions.clickButton('Add new');
        await webActions.inputField('#adjournCaseAdditionalDirections_value',writeAdjournmentNoticeData.additionalDirectionsInput);
    }

    async verifyPreviewDocumentPage(writeAdjournmentNotification = true) {
        if (writeAdjournmentNotification === true) {
            await webActions.verifyPageLabel('.govuk-caption-l', writeAdjournmentNoticeData.writeAdjournmentNoticeEventNameCaptor);
            await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.previewAdjournmentPageHeading);
        } else {
            await webActions.verifyPageLabel('.govuk-caption-l', writeAdjournmentNoticeData.issueAdjournmentNoticeEventNameCaptor);
            await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.previewAdjournmentPageHeadingNotice);
        }
        await webActions.verifyPageLabel('.form-label', writeAdjournmentNoticeData.previewAdjournmentLabel);
        await webActions.verifyPageLabel('.form-hint', writeAdjournmentNoticeData.allDocumentsMustBePDFFormatted);
    }

    async verifyPageContentForCheckYourAnswersPage() {

        await webActions.verifyPageLabel('h1.govuk-heading-l', writeAdjournmentNoticeData.checkYourAnswersPageHeading);
        await webActions.verifyPageLabel('.heading-h2', writeAdjournmentNoticeData.checkYourAnswersSectionHeading);
        await webActions.verifyPageLabel('.check-your-answers > [_ngcontent-ng-c645309043] > .text-16', writeAdjournmentNoticeData.checkTheInformationBelowCarefullyLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(1) > .valign-top > .text-16',writeAdjournmentNoticeData.generateNoticeLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(1) > .form-cell .text-16',writeAdjournmentNoticeData.yesLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(2) > .valign-top > .text-16',writeAdjournmentNoticeData.arePanelMembersExcludedLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(2) > .form-cell .text-16',writeAdjournmentNoticeData.yesLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(3) > .valign-top > .text-16',writeAdjournmentNoticeData.whatTypeOfHearingWasHeld);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(3) > .form-cell .text-16',writeAdjournmentNoticeData.paperLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(4) > .valign-top > .text-16',writeAdjournmentNoticeData.canThisCaseBeListedRightAwayLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(4) > .form-cell .text-16',writeAdjournmentNoticeData.yesLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(5) > .valign-top > .text-16',writeAdjournmentNoticeData.confirmTheFormatOfTheNextHearingLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(5) > .form-cell .text-16',writeAdjournmentNoticeData.faceToFaceLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(6) > .valign-top > .text-16',writeAdjournmentNoticeData.whereShouldNextHearingBeListedLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(6) > .form-cell .text-16',writeAdjournmentNoticeData.somewhereElseLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(7) > .valign-top > .text-16',writeAdjournmentNoticeData.specifyTheVenue);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(7) > .form-cell .text-16',writeAdjournmentNoticeData.hearingVenueSelectedInput);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(8) > .valign-top > .text-16',writeAdjournmentNoticeData.tribunalDirectPOToAttendWithoutOptionalLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(8) > .form-cell .text-16',writeAdjournmentNoticeData.yesLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(9) > .valign-top > .text-16',writeAdjournmentNoticeData.howLongShouldTheNextHearingBeListedForLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(9) > .form-cell .text-16',writeAdjournmentNoticeData.nonStandardTimeSlotLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(10) > .valign-top > .text-16',writeAdjournmentNoticeData.durationLengthLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(10) > .form-cell .text-16',writeAdjournmentNoticeData.durationLengthInput);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(11) > .valign-top > .text-16',writeAdjournmentNoticeData.minutesOrSessionsLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(11) > .form-cell .text-16',writeAdjournmentNoticeData.minutesOrSessionsInput);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(12) > .valign-top > .text-16',writeAdjournmentNoticeData.isAnInterpreterRequiredForHearingWithoutOptionalLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(12) > .form-cell .text-16',writeAdjournmentNoticeData.yesLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(13) > .valign-top > .text-16',writeAdjournmentNoticeData.whatLanguageDoTheyNeedToSpeakWithoutOptionalLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(13) > .form-cell .text-16',writeAdjournmentNoticeData.languageOptionInput);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(14) > .valign-top > .text-16',writeAdjournmentNoticeData.whenShouldNextHearingBeLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(14) > .form-cell .text-16',writeAdjournmentNoticeData.firstAvailableDateAfterLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(15) > .valign-top > .text-16',writeAdjournmentNoticeData.provideDateOrPeriodLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(15) > .form-cell .text-16',writeAdjournmentNoticeData.providePeriodLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(16) > .valign-top > .text-16',writeAdjournmentNoticeData.providePeriodLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(16) > .form-cell .text-16',writeAdjournmentNoticeData["90DaysLabel"]);

        await webActions.verifyPageLabel('td[_ngcontent-ng-c4245273148]',writeAdjournmentNoticeData.listFirstOnTheSessionLabel);
        await webActions.verifyPageLabel('tbody[_ngcontent-ng-c3159966179] > tr:nth-of-type(2) > #complex-panel-simple-field-label > .text-16',writeAdjournmentNoticeData.provideTimeWithoutOptionalLabel);
        await webActions.verifyPageLabel('tbody[_ngcontent-ng-c3159966179] ccd-read-fixed-radio-list-field > .text-16',writeAdjournmentNoticeData.AMLabel);

        /*await webActions.verifyPageLabel('.form-table tr:nth-of-type(17) > .valign-top > .text-16',writeAdjournmentNoticeData.reasonsForAdjournmentLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(17) > .form-cell .text-16',writeAdjournmentNoticeData.reasonsForAdjournmentInput);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(18) > .valign-top > .text-16',writeAdjournmentNoticeData.additionalDirectionsLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(18) > .form-cell .text-16',writeAdjournmentNoticeData.additionalDirectionsInput);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(19) > .valign-top > .text-16',writeAdjournmentNoticeData.previewAdjournmentLabel);
        */
    }

        async chooseAllowedOrRefused(optionVal: string) {
        await webActions.clickElementById(optionVal);
    }

    async submitContinueBtn(): Promise<void> {
        await webActions.clickButton("Continue");
    }

    async submit(): Promise<void> {
        await webActions.clickButton("Submit");
    }

    async confirmSubmission(): Promise<void> {
        await this.page.waitForTimeout(3000);
        await webActions.clickSubmitButton();
        await this.page.waitForTimeout(3000);
    }
}

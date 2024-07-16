import {Page} from '@playwright/test';
import {WebAction} from '../common/web.action';
import writeFinalDecisionData from "./content/write.final.decision_en.json";
import DateUtilsComponent from "../utils/DateUtilsComponent";

let webActions: WebAction;

export class WriteFinalDecisionPages {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifyPageContentTypeOfAppealPage(dailyLivingFlag = false) {
        await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.typeOfAppealPageHeading);
        await webActions.verifyPageLabel('#writeFinalDecisionGenerateNotice legend > .form-label', writeFinalDecisionData.generateNoticeLabel);
        await webActions.verifyPageLabel('[for=\'writeFinalDecisionGenerateNotice_Yes\']', writeFinalDecisionData.yesLabel);
        await webActions.verifyPageLabel('[for=\'writeFinalDecisionGenerateNotice_No\']', writeFinalDecisionData.noLabel);

        if (dailyLivingFlag === true) {
            await webActions.verifyPageLabel('#writeFinalDecisionIsDescriptorFlow legend > .form-label', writeFinalDecisionData.isThisAwardAboutDailyLivingLabel);
            await webActions.verifyPageLabel('[for=\'writeFinalDecisionIsDescriptorFlow_Yes\']', writeFinalDecisionData.yesLabel);
            await webActions.verifyPageLabel('[for=\'writeFinalDecisionIsDescriptorFlow_No\']', writeFinalDecisionData.noLabel);
        }
    }

    async inputTypeOfAppealPageData(awardDailyLiving = false, generateNotice = true) {
        if (awardDailyLiving === true) {
            await webActions.clickElementById("#writeFinalDecisionIsDescriptorFlow_Yes");
        } else {
            await webActions.clickElementById("#writeFinalDecisionIsDescriptorFlow_No");
        }
        if (generateNotice === true) {
            await webActions.clickElementById("[for='writeFinalDecisionGenerateNotice_Yes']");
        } else {
            await webActions.clickElementById("[for='writeFinalDecisionGenerateNotice_No']");
        }
    }

    async verifyPageContentAllowedOrRefusedPage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.allowedRefusedPageHeading);
        await webActions.verifyPageLabel('span.form-label', writeFinalDecisionData.isTheAppealLabel);
        await webActions.verifyPageLabel('[for=\'writeFinalDecisionAllowedOrRefused-allowed\']', writeFinalDecisionData.allowedLabel);
        await webActions.verifyPageLabel('[for=\'writeFinalDecisionAllowedOrRefused-refused\']', writeFinalDecisionData.refusedLabel);

    }

    async verifyPageContentTypeOfHearingPage(otherPartyRequiredFlag = false) {
        await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.typeOfHearingPageHeading);
        await webActions.verifyPageLabel('[for=\'writeFinalDecisionTypeOfHearing\'] > .form-label', writeFinalDecisionData.whatTypeOfHearingWasHeldLabel);
        await webActions.verifyPageLabel('[for=\'writeFinalDecisionTypeOfHearing-faceToFace\']', writeFinalDecisionData.faceToFaceLabel);
        await webActions.verifyPageLabel('[for=\'writeFinalDecisionTypeOfHearing-telephone\']', writeFinalDecisionData.telephoneLabel);
        await webActions.verifyPageLabel('[for=\'writeFinalDecisionTypeOfHearing-video\']', writeFinalDecisionData.videoLabel);
        await webActions.verifyPageLabel('[for=\'writeFinalDecisionTypeOfHearing-paper\']', writeFinalDecisionData.paperLabel);
        await webActions.verifyPageLabel('[for=\'writeFinalDecisionTypeOfHearing-triage\']', writeFinalDecisionData.triageLabel);
        await webActions.clickElementById("#writeFinalDecisionTypeOfHearing-faceToFace");
        await webActions.verifyPageLabel('#writeFinalDecisionPresentingOfficerAttendedQuestion legend > .form-label', writeFinalDecisionData.didAPresentingOfficerLabel);
        await webActions.verifyPageLabel('#writeFinalDecisionPresentingOfficerAttendedQuestion legend > .form-label', writeFinalDecisionData.didAPresentingOfficerLabel);
        await webActions.verifyPageLabel('#writeFinalDecisionAppellantAttendedQuestion legend > .form-label', writeFinalDecisionData.didTheAppellantAttendTheHearing);
        await webActions.verifyPageLabel('.error-spacing', writeFinalDecisionData.otherPartySectionHeading);
        if (otherPartyRequiredFlag === true) {
            await webActions.verifyPageLabel('.case-field__label', writeFinalDecisionData.otherPartyNameLabel);
            await webActions.verifyPageLabel("[_nghost-ng-c2096613220][_ngcontent-ng-c3895825752] legend > .form-label", writeFinalDecisionData.otherPartyAttendTheHearingLabel);
        }

    }

    async inputTypeOfHearingPageData(otherPartyInputRequired = false) {
        await webActions.clickElementById("#writeFinalDecisionPresentingOfficerAttendedQuestion_Yes");
        await webActions.clickElementById("#writeFinalDecisionAppellantAttendedQuestion_No");
        if (otherPartyInputRequired === true) {
            await webActions.clickElementById("[_nghost-ng-c2096613220][_ngcontent-ng-c3895825752] div:nth-of-type(2) > .form-control");
        }
    }

    async verifyPageContentForPanelMembersPage(appealType = 'PIP') {
        await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.panelMembersPageHeading);
        if (appealType === 'PIP') {
            await webActions.verifyPageLabel('[for=\'writeFinalDecisionDisabilityQualifiedPanelMemberName\'] > .form-label', writeFinalDecisionData.nameOfDisabilityQualifiedPanelMemberDQPMLabel);
            await webActions.verifyPageLabel('[for=\'writeFinalDecisionMedicallyQualifiedPanelMemberName\'] > .form-label', writeFinalDecisionData.nameOfMedicallyQualifiedPanelMemberMQPMLabel);
        }
    }

    async inputPageContentForPanelMembersPageData(appealType = 'PIP') {
        if (appealType === 'PIP') {
            await webActions.inputField("#writeFinalDecisionDisabilityQualifiedPanelMemberName", writeFinalDecisionData.nameOfDisabilityQualifiedPanelMemberInput);
            await webActions.inputField("#writeFinalDecisionMedicallyQualifiedPanelMemberName", writeFinalDecisionData.nameOfMedicallyQualifiedPanelMemberInput);
        }
    }

    async verifyPageContentForDecisionDatePage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.decisionDatePageHeading);
        await webActions.verifyPageLabel('span.form-label', writeFinalDecisionData.dateOfFTADecisionLabel);
        await webActions.verifyPageLabel('[for=\'writeFinalDecisionDateOfDecision-day\']', writeFinalDecisionData.dayLabel);
        await webActions.verifyPageLabel('[for=\'writeFinalDecisionDateOfDecision-month\']', writeFinalDecisionData.monthLabel);
        await webActions.verifyPageLabel('[for=\'writeFinalDecisionDateOfDecision-year\']', writeFinalDecisionData.yearLabel);
    }

    async inputTypePageContentForDecisionPageData() {
        await webActions.typeField("#writeFinalDecisionDateOfDecision-day", "11");
        await webActions.typeField("#writeFinalDecisionDateOfDecision-month", "07");
        await webActions.typeField("#writeFinalDecisionDateOfDecision-year", "2024");
    }

    async verifyPageContentForBundleSectionReferencePage() {

        await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.bundleSectionPreferenceHeading);
        await webActions.verifyPageLabel('.form-label', writeFinalDecisionData.whatIsTheLastPageInTheTribunalBundleLabel);
        await webActions.verifyPageLabel('.form-hint', writeFinalDecisionData.whatIsTheLastPageInTheTribunalBundleGuidanceText);
    }

    async inputPageContentForBundleSectionReferencePageData() {
        await webActions.inputField("#writeFinalDecisionPageSectionReference", writeFinalDecisionData.lastPageInTheTribunalBundleInput);
    }

    async verifyPageContentForSummaryOutcomePage() {

        await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.summaryOfOutcomePageHeading);
        await webActions.verifyPageLabel('.form-label', writeFinalDecisionData.summaryOfOutcomeLabel);
    }

    async inputPageContentForSummaryOutcomePageData() {
        await webActions.inputField("#writeFinalDecisionDetailsOfDecision", writeFinalDecisionData.summaryOfOutcomeInput)
    }

    async verifyPageContentForReasonForDecisionPage() {

        await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.reasonsForDecisionPageHeading);
        await webActions.verifyPageLabel('.heading-h2', writeFinalDecisionData.reasonsForDecisionPageHeading);
        await webActions.clickButton("Add new");
    }

    async inputPageContentForReasonForDecisionPageData() {
        await webActions.inputField("#writeFinalDecisionReasons_value", writeFinalDecisionData.reasonsForDecisionInput)
    }

    async verifyPageContentForAnythingElseDecisionPage() {

        await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.anythingElsePageHeading);
        await webActions.verifyPageLabel('.form-label', writeFinalDecisionData.anythingElseLabel);
    }

    async inputPageContentForAnythingElsePageData() {
        await webActions.inputField("#writeFinalDecisionAnythingElse", writeFinalDecisionData.anythingElseInput)
    }

    async verifyPageContentForPreviewDecisionNoticePage(writeFinalDecisionEventFlag = true) {
        if (writeFinalDecisionEventFlag) {
            await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        } else {
            await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        }
        await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.previewDecisionNoticePageHeading);
        await webActions.verifyPageLabel('.form-label', writeFinalDecisionData.previewDecisionNoticeLabel);
        await webActions.verifyPageLabel('.form-hint', writeFinalDecisionData.previewDecisionNoticeGuidanceText);
    }

    async verifyPageContentForCheckYourAnswersPage() {
        //await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor); // No Captor on this Page.
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.checkYourAnswersPageHeading);
        await webActions.verifyPageLabel('.heading-h2', writeFinalDecisionData.checkYourAnswersSectionHeading);
        await webActions.verifyPageLabel('.check-your-answers > [_ngcontent-ng-c645309043] > .text-16', writeFinalDecisionData.checkYourInformationCarefullyLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(3) > .valign-top > .text-16', writeFinalDecisionData.isThisAwardAboutDailyLivingLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(3) > .form-cell .text-16', writeFinalDecisionData.noLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(4) > .valign-top > .text-16', writeFinalDecisionData.generateNoticeLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(4) > .form-cell .text-16', writeFinalDecisionData.yesLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(5) > .valign-top > .text-16', writeFinalDecisionData.isTheAppealLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(5) > .form-cell .text-16', writeFinalDecisionData.allowedLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(6) > .valign-top > .text-16', writeFinalDecisionData.whatTypeOfHearingWasHeldLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(7) > .valign-top > .text-16', writeFinalDecisionData.didAPresentingOfficerLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(8) > .valign-top > .text-16', writeFinalDecisionData.didTheAppellantAttendTheHearing);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(9) > .valign-top > .text-16', writeFinalDecisionData.checkYourAnswersNameOfDisabilityQualifiedPanelMemberDQPMLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(10) > .valign-top > .text-16', writeFinalDecisionData.checkYourAnswersNameOfMedicallyQualifiedPanelMemberMQPMLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(11) > .valign-top > .text-16', writeFinalDecisionData.dateOfFTADecisionLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(12) > .valign-top > .text-16', writeFinalDecisionData.whatIsTheLastPageInTheTribunalBundleLabel);
        //await webActions.verifyPageLabel('.form-table tr:nth-of-type(14) > .valign-top > .text-16', writeFinalDecisionData.checkYourAnswersShowTheFinalDecisionOutcomeLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(14) > .valign-top > .text-16', writeFinalDecisionData.summaryOfOutcomeLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(15) > .valign-top > .text-16', writeFinalDecisionData.reasonsForDecisionLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(16) > .valign-top > .text-16', writeFinalDecisionData.checkYourAnswersAnythingElse);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(17) > .valign-top > .text-16', writeFinalDecisionData.previewDecisionNoticeLabel);
    }

    async verifyPageContentForCheckYourAnswersPageForAwardsCriteria() {
        //await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor); // No Captor on this Page.
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.checkYourAnswersPageHeading);
        await webActions.verifyPageLabel('.heading-h2', writeFinalDecisionData.checkYourAnswersSectionHeading);
        await webActions.verifyPageLabel('.check-your-answers > [_ngcontent-ng-c645309043] > .text-16', writeFinalDecisionData.checkYourInformationCarefullyLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(3) > .valign-top > .text-16', writeFinalDecisionData.isThisAwardAboutDailyLivingLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(3) > .form-cell .text-16', writeFinalDecisionData.yesLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(4) > .valign-top > .text-16', writeFinalDecisionData.generateNoticeLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(4) > .form-cell .text-16', writeFinalDecisionData.yesLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(5) > .valign-top > .text-16', writeFinalDecisionData.whatTypeOfHearingWasHeldLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(5) > .form-cell .text-16', writeFinalDecisionData.faceToFaceLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(6) > .valign-top > .text-16', writeFinalDecisionData.didAPresentingOfficerLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(6) > .form-cell .text-16', writeFinalDecisionData.yesLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(7) > .valign-top > .text-16', writeFinalDecisionData.didTheAppellantAttendTheHearing);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(7) > .form-cell .text-16', writeFinalDecisionData.noLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(8) > .valign-top > .text-16', writeFinalDecisionData.whatAreYouConsideringAwardingForDailyLivingLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(8) > .form-cell .text-16', writeFinalDecisionData.standardRateLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(9) > .valign-top > .text-16', writeFinalDecisionData.howWouldThisNewAwardCompareToTheOriginalFTAAwardForDailyLiving);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(9) > .form-cell .text-16', writeFinalDecisionData.sameLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(10) > .valign-top > .text-16', writeFinalDecisionData.whatAreYouConsideringAwardingForMobilityLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(10) > .form-cell .text-16', writeFinalDecisionData.enhancedRateLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(11) > .valign-top > .text-16', writeFinalDecisionData.howWouldThisNewAwardCompareToTheOriginalFTAAwardForMobility);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(11) > .form-cell .text-16', writeFinalDecisionData.higherLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(12) > .valign-top > .text-16', writeFinalDecisionData.startDateLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(13) > .valign-top > .text-16', writeFinalDecisionData.doesThisAwardHaveAnEndDateLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(13) > .form-cell .text-16', writeFinalDecisionData.setEndDateLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(14) > .valign-top > .text-16', writeFinalDecisionData.endDateLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(15) > .valign-top > .text-16', writeFinalDecisionData.nameOfDisabilityQualifiedPanelMemberDQPMWithoutOptionalLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(15) > .form-cell .text-16', writeFinalDecisionData.nameOfDisabilityQualifiedPanelMemberInput);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(16) > .valign-top > .text-16', writeFinalDecisionData.nameOfMedicallyQualifiedPanelMemberMQPMWithoutOptionalLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(16) > .form-cell .text-16', writeFinalDecisionData.nameOfMedicallyQualifiedPanelMemberInput);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(17) > .valign-top > .text-16', writeFinalDecisionData.dateOfFTADecisionLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(18) > .valign-top > .text-16', writeFinalDecisionData.dailyLivingLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(18) > .form-cell .text-16', writeFinalDecisionData.takingNutritionLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(19) > .valign-top > .text-16', writeFinalDecisionData.mobilityNonOptionalLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(19) > .form-cell .text-16', writeFinalDecisionData.movingAroundLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(20) > .valign-top > .text-16', writeFinalDecisionData.takingNutritionLabel);
        //await webActions.verifyPageLabel('.form-table tr:nth-of-type(20) > .form-cell .text-16', writeFinalDecisionData.takingNutritionLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(21) > .valign-top > .text-16', writeFinalDecisionData.movingAroundLabel);
        //await webActions.verifyPageLabel('.form-table tr:nth-of-type(21) > .form-cell .text-16', writeFinalDecisionData.takingNutritionLabel);

        await webActions.verifyPageLabel('.form-table tr:nth-of-type(22) > .valign-top > .text-16', writeFinalDecisionData.whatIsTheLastPageInTheTribunalBundleLabel);
        await webActions.verifyPageLabel('.form-table tr:nth-of-type(22) > .form-cell .text-16', writeFinalDecisionData.lastPageInTheTribunalBundleInput);

        await webActions.verifyPageLabel('tr:nth-of-type(23) > .valign-top > .text-16', writeFinalDecisionData.reasonsForDecisionLabel);
        await webActions.verifyPageLabel('tr:nth-of-type(23) > td:nth-of-type(1) span:nth-of-type(1)', writeFinalDecisionData.reasonsForDecisionInput);

        await webActions.verifyPageLabel('tr:nth-of-type(24) > .case-field-label', writeFinalDecisionData.anythingElsePageHeading);
        await webActions.verifyPageLabel('tr:nth-of-type(24) [_ngcontent-ng-c142448239]', writeFinalDecisionData.anythingElseInput);

        await webActions.verifyPageLabel('tr:nth-of-type(25) > .valign-top > .text-16', writeFinalDecisionData.previewDecisionNoticeLabel);


    }

    async verifyAndInputPageContentForTypeOfAwardPage() {

        await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.typeOfAwardPageHeading);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionDailyLivingQuestion\'] > .form-label', writeFinalDecisionData.whatAreYouConsideringAwardingForDailyLivingLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionDailyLivingQuestion-notConsidered\']', writeFinalDecisionData.notConsideredLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionDailyLivingQuestion-standardRate\']', writeFinalDecisionData.standardRateLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionDailyLivingQuestion-enhancedRate\']', writeFinalDecisionData.enhancedRateLabel);
        await webActions.clickElementById("#pipWriteFinalDecisionDailyLivingQuestion-standardRate");

        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionComparedToDWPDailyLivingQuestion\'] > .form-label', writeFinalDecisionData.howWouldThisNewAwardCompareToTheOriginalFTAAwardForDailyLiving);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionComparedToDWPDailyLivingQuestion-higher\']', writeFinalDecisionData.higherLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionComparedToDWPDailyLivingQuestion-same\']', writeFinalDecisionData.sameLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionComparedToDWPDailyLivingQuestion-lower\']', writeFinalDecisionData.lowerLabel);
        await webActions.clickElementById("#pipWriteFinalDecisionComparedToDWPDailyLivingQuestion-same");

        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionMobilityQuestion\'] > .form-label', writeFinalDecisionData.whatAreYouConsideringAwardingForMobilityLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionMobilityQuestion-notConsidered\']', writeFinalDecisionData.notConsideredLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionMobilityQuestion-standardRate\']', writeFinalDecisionData.standardRateLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionMobilityQuestion-enhancedRate\']', writeFinalDecisionData.enhancedRateLabel);
        await webActions.clickElementById("#pipWriteFinalDecisionMobilityQuestion-enhancedRate");

        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionComparedToDWPMobilityQuestion\'] > .form-label', writeFinalDecisionData.howWouldThisNewAwardCompareToTheOriginalFTAAwardForMobility   );
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionComparedToDWPMobilityQuestion-higher\']', writeFinalDecisionData.higherLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionComparedToDWPMobilityQuestion-same\']', writeFinalDecisionData.sameLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionComparedToDWPMobilityQuestion-lower\']', writeFinalDecisionData.lowerLabel);
        await webActions.clickElementById("#pipWriteFinalDecisionComparedToDWPMobilityQuestion-higher");

    }

    async verifyAndInputPageContentForAwardDatesPage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.awardDatesPageHeading);
        await webActions.verifyPageLabel('#writeFinalDecisionStartDate legend > .form-label', writeFinalDecisionData.startDateLabel);
        await webActions.verifyPageLabel("[for='writeFinalDecisionStartDate-day']", writeFinalDecisionData.dayLabel);
        await webActions.verifyPageLabel("[for='writeFinalDecisionStartDate-month']", writeFinalDecisionData.monthLabel);
        await webActions.verifyPageLabel("[for='writeFinalDecisionStartDate-year']", writeFinalDecisionData.yearLabel);
        await webActions.verifyPageLabel("[for='writeFinalDecisionEndDateType'] > .form-label", writeFinalDecisionData.doesThisAwardHaveAnEndDateLabel);
        await webActions.verifyPageLabel("[for='writeFinalDecisionEndDateType-setEndDate']", writeFinalDecisionData.setEndDateLabel);
        await webActions.verifyPageLabel("[for='writeFinalDecisionEndDateType-indefinite']", writeFinalDecisionData.indefiniteAwardLabel);
        await webActions.verifyPageLabel("[for='writeFinalDecisionEndDateType-na']", writeFinalDecisionData.notApplicableNoAwardLabel);
        await webActions.clickElementById("#writeFinalDecisionEndDateType-setEndDate");
        await webActions.verifyPageLabel('#writeFinalDecisionEndDate legend > .form-label', writeFinalDecisionData.endDateLabel);
        await webActions.verifyPageLabel('[for=\'writeFinalDecisionEndDate-day\']', writeFinalDecisionData.dayLabel);
        await webActions.verifyPageLabel('[for=\'writeFinalDecisionEndDate-month\']', writeFinalDecisionData.monthLabel);
        await webActions.verifyPageLabel('[for=\'writeFinalDecisionEndDate-year\']', writeFinalDecisionData.yearLabel);
    }

    async inputPageContentForAwardDatesPageData() {
        await webActions.typeField("#writeFinalDecisionStartDate-day", '01');
        await webActions.typeField("#writeFinalDecisionStartDate-month", '07');
        await webActions.typeField("#writeFinalDecisionStartDate-year", '2024');

        await webActions.typeField("#writeFinalDecisionEndDate-day", '30');
        await webActions.typeField("#writeFinalDecisionEndDate-month", '07');
        await webActions.typeField("#writeFinalDecisionEndDate-year", '2024');
    }

    async verifyPageContentForSelectActivitiesPage() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.selectActivitiesPageHeading);
        await webActions.verifyPageLabel('#pipWriteFinalDecisionDailyLivingActivitiesQuestion legend > .form-label', writeFinalDecisionData.dailyActivitiesLabel);
        await webActions.verifyPageLabel('#pipWriteFinalDecisionDailyLivingActivitiesQuestion .form-hint', writeFinalDecisionData.selectAllThatApplyGuidanceText);
        await webActions.verifyPageLabel("[for='pipWriteFinalDecisionDailyLivingActivitiesQuestion-preparingFood']", writeFinalDecisionData.preparingFoodLabel);
        await webActions.verifyPageLabel("[for='pipWriteFinalDecisionDailyLivingActivitiesQuestion-takingNutrition']", writeFinalDecisionData.takingNutritionLabel);
        await webActions.verifyPageLabel("[for='pipWriteFinalDecisionDailyLivingActivitiesQuestion-managingTherapy']", writeFinalDecisionData.managingTherapyOrMonitoringHealthConditionLabel);
        await webActions.verifyPageLabel("[for='pipWriteFinalDecisionDailyLivingActivitiesQuestion-washingAndBathing']", writeFinalDecisionData.washingAndBathingLabel);
        await webActions.verifyPageLabel("[for='pipWriteFinalDecisionDailyLivingActivitiesQuestion-managingToiletNeeds']", writeFinalDecisionData.managingToiletNeedsOrIncontinenceLabel);
        await webActions.verifyPageLabel("[for='pipWriteFinalDecisionDailyLivingActivitiesQuestion-dressingAndUndressing']", writeFinalDecisionData.dressingAndUndressingLabel);
        await webActions.verifyPageLabel("[for='pipWriteFinalDecisionDailyLivingActivitiesQuestion-communicating']", writeFinalDecisionData.communicatingVerballyLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionDailyLivingActivitiesQuestion-readingUnderstanding\']', writeFinalDecisionData.readingAndUnderstandingSignsSymbolsAndWordsLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionDailyLivingActivitiesQuestion-engagingWithOthers\']', writeFinalDecisionData.engagingWithOtherPeopleF2FLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionDailyLivingActivitiesQuestion-budgetingDecisions\']', writeFinalDecisionData.makingBudgetingDecisionsLabel);
        await webActions.verifyPageLabel('#pipWriteFinalDecisionMobilityActivitiesQuestion legend > .form-label', writeFinalDecisionData.mobilityLabel);
        await webActions.verifyPageLabel('#pipWriteFinalDecisionMobilityActivitiesQuestion .form-hint', writeFinalDecisionData.selectAllThatApplyGuidanceText);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionMobilityActivitiesQuestion-planningAndFollowing\']', writeFinalDecisionData.planningAndFollowingJourneysLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionMobilityActivitiesQuestion-movingAround\']', writeFinalDecisionData.movingAroundLabel);
    }

    async inputPageContentForSelectActivitiesPageData() {
        await webActions.clickElementById("#pipWriteFinalDecisionDailyLivingActivitiesQuestion-takingNutrition");
        await webActions.clickElementById("#pipWriteFinalDecisionMobilityActivitiesQuestion-movingAround");
    }

    async verifyPageContentForDailyLivingNutrition() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.dailyLivingTakingNutritionPageHeading);
        await webActions.verifyPageLabel('span.form-label', writeFinalDecisionData.takingNutritionLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionTakingNutritionQuestion-takingNutrition2a\']', writeFinalDecisionData.canTakeNutritionLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionTakingNutritionQuestion-takingNutrition2b\']', writeFinalDecisionData.needsEitherLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionTakingNutritionQuestion-takingNutrition2c\']', writeFinalDecisionData.needsATherapeuticLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionTakingNutritionQuestion-takingNutrition2d\']', writeFinalDecisionData.needsPromptingLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionTakingNutritionQuestion-takingNutrition2e\']', writeFinalDecisionData.needsAssistanceLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionTakingNutritionQuestion-takingNutrition2f\']', writeFinalDecisionData.cannotConveyFoodAndDrinkLabel);
    }

    async inputPageContentForDailyLivingNutritionPageData() {
        await webActions.clickElementById("div:nth-of-type(6) > .form-control");
    }

    async verifyPageContentForMovingAround() {
        await webActions.verifyPageLabel('.govuk-caption-l', writeFinalDecisionData.eventNameCaptor);
        await webActions.verifyPageLabel('h1.govuk-heading-l', writeFinalDecisionData.mobilityActivitiesPageHeading);
        await webActions.verifyPageLabel('span.form-label', writeFinalDecisionData.movingAroundLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionMovingAroundQuestion-movingAround12a\']', writeFinalDecisionData.canStandAndThenMoveMoreThan200mLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionMovingAroundQuestion-movingAround12b\']', writeFinalDecisionData.canStandAndThenMoveMoreThan50mLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionMovingAroundQuestion-movingAround12c\']', writeFinalDecisionData.canStandAndThenMoveMoreThan20mLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionMovingAroundQuestion-movingAround12d\']', writeFinalDecisionData.canStandAndThenMoveWithAid20mTo50mLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionMovingAroundQuestion-movingAround12e\']', writeFinalDecisionData.canStandAndThenMoveWithAid1mTo20mLabel);
        await webActions.verifyPageLabel('[for=\'pipWriteFinalDecisionMovingAroundQuestion-movingAround12f\']', writeFinalDecisionData.canStandAndThenMoveEitherAidedOrUnaidedLabel);
    }

    async inputPageContentForMovingAroundPageData() {
        await webActions.clickElementById("div:nth-of-type(6) > .form-control");
    }

    async chooseAllowedOrRefused(optionVal: string) {
        await webActions.clickElementById(optionVal);
    }

    async submitContinueBtn(): Promise<void> {
        await webActions.clickButton("Continue");
    }

    async verifyDocumentTitle(expText: string) {
        await webActions.verifyTextVisibility(expText);
    }

    async confirmSubmission(): Promise<void> {
        await this.page.waitForTimeout(3000);
        await webActions.clickSubmitButton();
        await this.page.waitForTimeout(3000);
    }
}

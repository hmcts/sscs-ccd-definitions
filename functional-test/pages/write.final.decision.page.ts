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

    async inputTypeOfAppealPageData() {
        await webActions.clickElementById("#writeFinalDecisionIsDescriptorFlow_No");
        await webActions.clickElementById("[for='writeFinalDecisionGenerateNotice_Yes']");
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
        await webActions.inputField("#writeFinalDecisionDateOfDecision-day", "11");
        await webActions.inputField("#writeFinalDecisionDateOfDecision-month", "07");
        await webActions.inputField("#writeFinalDecisionDateOfDecision-year", "2024");
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
    async chooseAllowedOrRefused(optionVal: string) {
        await webActions.clickElementById(optionVal);
    }

    async chooseGenerateNotice(optionVal: string) {
        await webActions.clickElementById(optionVal);
    }

    async enterNoticeContent(generateNoticeFlag) {
        if (!generateNoticeFlag) {
            await webActions.chooseOptionByLabel('#sscsInterlocDirectionDocument_documentType', 'Directions Notice');
            await webActions.uploadFileUsingAFileChooser('#sscsInterlocDirectionDocument_documentLink', 'testfile1.pdf');
            await webActions.delay(3000);
            await webActions.inputField('#documentDateAdded-day', '01');
            await webActions.inputField('#documentDateAdded-month', '01');
            await webActions.inputField('#documentDateAdded-year', '2028');
            await webActions.inputField('#sscsInterlocDirectionDocument_documentFileName', 'testfile1.pdf');
        } else {
            await webActions.inputField('#bodyContent', 'Test body content');
            await webActions.inputField('#signedBy', 'Tester');
            await webActions.inputField('#signedRole', 'Test');
        }
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

    async verifyErrorMsg(pageLevelErrorMessages, specificRecipientsErrorMessages, generateNoticeYesErrorMessages): Promise<void> {

        //await webActions.verifyElementVisibility('#errors');
        if (pageLevelErrorMessages) {
            await webActions.verifyTextVisibility('Pre or post hearing? is required');
            await webActions.verifyTextVisibility('Field is required');
            await webActions.verifyTextVisibility('Generate notice is required');
        }
        if (specificRecipientsErrorMessages === true) {
            await webActions.verifyTextVisibility('Pre or post hearing? is required');
            await webActions.verifyTextVisibility('FTA is required');
            await webActions.verifyTextVisibility('Representative is required');
            await webActions.verifyTextVisibility('Appellant or Appointee is required');
        }

        if (generateNoticeYesErrorMessages === true) {
            await webActions.verifyTextVisibility('Pre or post hearing? is required');
            await webActions.verifyTextVisibility('FTA is required');
            await webActions.verifyTextVisibility('Representative is required');
            await webActions.verifyTextVisibility('Appellant or Appointee is required');
            await webActions.verifyTextVisibility('Body content is required');
            await webActions.verifyTextVisibility('Signed by is required');
            await webActions.verifyTextVisibility('Signed role is required');
        }
    }
}

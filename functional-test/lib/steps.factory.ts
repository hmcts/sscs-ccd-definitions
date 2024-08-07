import { test as stepsFactory } from '@playwright/test';
import { Note } from '../fixtures/steps/note';
import { ConfirmCaseLapsed } from '../fixtures/steps/confirm.case.lapsed';
import { EvidenceReminder } from '../fixtures/steps/evidence.reminder';
import { AssociateCase } from '../fixtures/steps/associate-case';
import { SendToAdmin } from '../fixtures/steps/send.to.admin';
import { InformationReceived } from '../fixtures/steps/information.received';
import { ReviewAdminActionTask } from '../fixtures/steps/work-allocation/review.admin.action.task'
import { SendToJudge } from '../fixtures/steps/send.to.judge';
import { UploadResponse } from '../fixtures/steps/upload.response';
import { ListingError } from "../fixtures/steps/listing.error";
import { ReviewListingErrorTask } from '../fixtures/steps/work-allocation/review.listing.error.task'
import { SendToDormant } from '../fixtures/steps/send.to.dormant';
import { VoidCase } from '../fixtures/steps/void.case';
import { StrikeOutCase } from '../fixtures/steps/strike.out.case';
import { SendToFTA } from '../fixtures/steps/send.to.fta';
import { ReadyToList } from '../fixtures/steps/ready.to.list';
import { AppealWithdrawn } from '../fixtures/steps/appeal.withdrawn';
import { RequestTimeExtension } from '../fixtures/steps/request.time.extension';
import { CreateBundle } from '../fixtures/steps/create.bundle';
import { UrgentHearing } from '../fixtures/steps/urgent.hearing';
import { ReviewIncompleteAppealTask } from '../fixtures/steps/work-allocation/review.incomplete.appeal.task';
import { RequestInfoFromParty } from '../fixtures/steps/request.info.from.party';
import { Reinstatement } from '../fixtures/steps/reinstatement';
import { AppealDormant } from '../fixtures/steps/appeal.dormant';
import { ProvideAppointeeDetails } from '../fixtures/steps/provide.appointee.details';
import { UploadHearing } from "../fixtures/steps/upload.hearing";
import { DeathOfAnAppelant } from "../fixtures/steps/death.of.an.appelant";
import { LinkCase } from "../fixtures/steps/link-case";
import { ReviewBFDateTask } from '../fixtures/steps/work-allocation/review.bf.date.task';
import { SupplementaryResponse } from '../fixtures/steps/supplementary.response';
import { UploadDocumentFurtherEvidence } from '../fixtures/steps/upload.document.further.evidence';
import { UpdateLanguagePreference } from '../fixtures/steps/update.language.preference';
import { ReviewPHE } from '../fixtures/steps/review.phe';
import { IssueDirectionsNotice } from "../fixtures/steps/issue.directions.notice";
import { UpdateUCB } from "../fixtures/steps/update.ucb";
import { UpdateSubscription } from '../fixtures/steps/update.subscription'


type MyStepsFixtures = {
    addNoteSteps: Note
    associateCaseSteps: AssociateCase
    confirmCaseLapsedSteps: ConfirmCaseLapsed
    evidenceReminderSteps: EvidenceReminder
    informationReceivedSteps: InformationReceived
    sendToAdminSteps: SendToAdmin
    sendToJudgeSteps: SendToJudge
    reviewAdminActionTaskSteps: ReviewAdminActionTask
    reviewListingErrorTaskSteps: ReviewListingErrorTask
    reviewIncompleteAppealTaskSteps: ReviewIncompleteAppealTask
    listingErrorSteps: ListingError
    uploadResponseSteps: UploadResponse
    sendToFTASteps: SendToFTA
    sendToDormantSteps: SendToDormant
    voidCaseSteps: VoidCase
    appealWithdrawnSteps: AppealWithdrawn
    strikeOutCaseSteps: StrikeOutCase
    readyToListSteps: ReadyToList
    requestTimeExtensionSteps: RequestTimeExtension
    createBundleSteps: CreateBundle
    urgentHearingSteps: UrgentHearing
    requestInfoFromPartySteps: RequestInfoFromParty
    reinstatementSteps: Reinstatement
    appealDormantSteps: AppealDormant
    deathOfAppellant : DeathOfAnAppelant
    linkACaseSteps: LinkCase
    provideAppointeeDetailsSteps: ProvideAppointeeDetails
    uploadHearingSteps: UploadHearing
    reviewBFDateTaskSteps: ReviewBFDateTask
    supplementaryResponseSteps: SupplementaryResponse
    uploadDocumentFurtherEvidenceSteps: UploadDocumentFurtherEvidence
    updateLanguagePreferenceSteps: UpdateLanguagePreference
    reviewPHESteps: ReviewPHE
    issueDirectionsNoticeSteps: IssueDirectionsNotice
    updateUCBSteps: UpdateUCB
    updateSubscriptionSteps: UpdateSubscription
};

export const test =  stepsFactory.extend<MyStepsFixtures>({
    addNoteSteps:async ({page}, use) => {
        const addNoteSteps = new Note(page);
        await use(addNoteSteps);
    },
    associateCaseSteps:async ({page}, use) => {
        const associateCaseSteps = new AssociateCase(page);
        await use(associateCaseSteps);
    },
    confirmCaseLapsedSteps:async ({page}, use) => {
        const confirmCaseLapsedSteps = new ConfirmCaseLapsed(page);
        await use(confirmCaseLapsedSteps);
    },
    evidenceReminderSteps:async ({page}, use) => {
        const evidenceReminderSteps = new EvidenceReminder(page);
        await use(evidenceReminderSteps);
    },
    informationReceivedSteps:async ({ page }, use) => {
        const informationReceivedSteps = new InformationReceived(page);
        await use(informationReceivedSteps);
    },
    sendToAdminSteps:async ({ page }, use) => {
        const sendToAdminSteps = new SendToAdmin(page);
        await use(sendToAdminSteps);
    },
    readyToListSteps:async ({ page }, use) => {
        const readyToListSteps = new ReadyToList(page);
        await use(readyToListSteps);
    },
    reviewAdminActionTaskSteps:async ({ page }, use) => {
        const reviewAdminActionTaskSteps = new ReviewAdminActionTask(page);
        await use(reviewAdminActionTaskSteps);
    },
    reviewListingErrorTaskSteps:async ({ page }, use) => {
        const reviewListingErrorTaskSteps = new ReviewListingErrorTask(page);
        await use(reviewListingErrorTaskSteps);
    },
    reviewIncompleteAppealTaskSteps:async ({ page }, use) => {
        const reviewIncompleteAppealTaskSteps = new ReviewIncompleteAppealTask(page);
        await use(reviewIncompleteAppealTaskSteps);
    },
    sendToJudgeSteps:async ({page}, use) => {
        const sendToJudgeSteps = new SendToJudge(page);
        await use(sendToJudgeSteps);
    },
    uploadResponseSteps:async ({page}, use) => {
        const uploadResponseSteps = new UploadResponse(page);
        await use(uploadResponseSteps);
    },
    sendToFTASteps:async ({page}, use) => {
        const sendToFTASteps = new SendToFTA(page);
        await use(sendToFTASteps);
    },
    sendToDormantSteps:async ({page}, use) => {
        const sendToDormantSteps = new SendToDormant(page);
        await use(sendToDormantSteps);
    },
    voidCaseSteps:async ({page}, use) => {
        const voidCaseSteps = new VoidCase(page);
        await use(voidCaseSteps);
    },
    strikeOutCaseSteps:async ({page}, use) => {
        const strikeOutCaseSteps = new StrikeOutCase(page);
        await use(strikeOutCaseSteps);
    },
    listingErrorSteps:async ({page}, use) => {
        const listingErrorSteps = new ListingError(page);
        await use(listingErrorSteps);
    },
    appealWithdrawnSteps:async ({page}, use) => {
        const appealWithdrawnSteps = new AppealWithdrawn(page);
        await use(appealWithdrawnSteps);
    },
    requestTimeExtensionSteps:async ({page}, use) => {
        const requestTimeExtensionSteps = new RequestTimeExtension(page);
        await use(requestTimeExtensionSteps);
    },
    createBundleSteps:async ({page}, use) => {
        const createBundleSteps = new CreateBundle(page);
        await use(createBundleSteps);
    },
    urgentHearingSteps:async ({page}, use) => {
        const urgentHearingSteps = new UrgentHearing(page);
        await use(urgentHearingSteps);
    },
    issueDirectionsNoticeSteps:async ({page}, use) =>{
        const issueDirectionsNoticeSteps = new IssueDirectionsNotice(page);
        await use(issueDirectionsNoticeSteps);
    },
    reinstatementSteps:async ({page}, use) =>{
        const reinstatementSteps = new Reinstatement(page);
        await use(reinstatementSteps);
    },
    appealDormantSteps:async ({page}, use) => {
        const appealDormantSteps = new AppealDormant(page);
        await use(appealDormantSteps);
    },
    deathOfAppellant:async ({page}, use) => {
        const deathOfAppellantSteps = new DeathOfAnAppelant(page);
        await use(deathOfAppellantSteps);
    },    
     linkACaseSteps:async ({page}, use)=> {
        const linkACaseSteps = new LinkCase(page);
        await use(linkACaseSteps)
    },
    provideAppointeeDetailsSteps:async ({page}, use)=>{
        const provideAppointeeDetailsSteps = new ProvideAppointeeDetails(page);
        await use(provideAppointeeDetailsSteps)
    },
    uploadHearingSteps:async ({page}, use) =>{
        const uploadHearingSteps = new UploadHearing(page);
        await use(uploadHearingSteps);
    },
    requestInfoFromPartySteps:async ({page}, use) => {
        const requestInfoFromPartySteps = new RequestInfoFromParty(page);
        await use(requestInfoFromPartySteps);
    },
    reviewBFDateTaskSteps:async ({ page }, use) => {
        const reviewBFDateTaskSteps = new ReviewBFDateTask(page);
        await use(reviewBFDateTaskSteps);
    },
    supplementaryResponseSteps:async ({ page }, use) => {
        const supplementaryResponseSteps = new SupplementaryResponse(page);
        await use(supplementaryResponseSteps);
    },
    uploadDocumentFurtherEvidenceSteps:async ({ page }, use) => {
        const uploadDocumentFurtherEvidenceSteps = new UploadDocumentFurtherEvidence(page);
        await use(uploadDocumentFurtherEvidenceSteps);
    },
    updateLanguagePreferenceSteps:async ({ page }, use) => {
        const updateLanguagePreferenceSteps = new UpdateLanguagePreference(page);
        await use(updateLanguagePreferenceSteps);
    },
    reviewPHESteps:async ({ page }, use) => {
        const reviewPHESteps = new ReviewPHE(page);
        await use(reviewPHESteps);
    },
    updateUCBSteps:async ({ page }, use) => {
        const updateUCBSteps = new UpdateUCB(page);
        await use(updateUCBSteps);
    },
    updateSubscriptionSteps: async ({ page }, use) => {
        const updateSubscriptionSteps = new UpdateSubscription(page);
        await use(updateSubscriptionSteps);
    }
})

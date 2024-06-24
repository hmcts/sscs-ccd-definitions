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
import { Reinstatement } from '../fixtures/steps/reinstatement';
import { AppealDormant } from '../fixtures/steps/appeal.dormant';
import {DeathOfAnAppelant} from "../fixtures/steps/death.of.an.appelant";



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
    reinstatementSteps: Reinstatement
    appealDormantSteps: AppealDormant
    deathOfAppellant : DeathOfAnAppelant
};

export const test =  stepsFactory.extend<MyStepsFixtures>({
    addNoteSteps:async ({page}, use) => {
        const addNoteSteps = new Note(page);
        await use(addNoteSteps);
    },
    associateCaseSteps:async ({ page }, use) => {
        const associateCaseSteps = new AssociateCase(page);
        await use(associateCaseSteps);
    },
    confirmCaseLapsedSteps:async ({ page }, use) => {
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
    sendToDormantSteps:async ({page}, use) =>{
        const sendToDormantSteps = new SendToDormant(page);
        await use(sendToDormantSteps);
    },
    voidCaseSteps:async ({page}, use) =>{
        const voidCaseSteps = new VoidCase(page);
        await use(voidCaseSteps);
    },
    strikeOutCaseSteps:async ({page}, use) =>{
        const strikeOutCaseSteps = new StrikeOutCase(page);
        await use(strikeOutCaseSteps);
    },
    listingErrorSteps:async ({page}, use) =>{
        const listingErrorSteps = new ListingError(page);
        await use(listingErrorSteps);
    },
    appealWithdrawnSteps:async ({page}, use) =>{
        const appealWithdrawnSteps = new AppealWithdrawn(page);
        await use(appealWithdrawnSteps);
    },
    requestTimeExtensionSteps:async ({page}, use) =>{
        const requestTimeExtensionSteps = new RequestTimeExtension(page);
        await use(requestTimeExtensionSteps);
    },
    createBundleSteps:async ({page}, use) =>{
        const createBundleSteps = new CreateBundle(page);
        await use(createBundleSteps);
    },
    urgentHearingSteps:async ({page}, use) =>{
        const urgentHearingSteps = new UrgentHearing(page);
        await use(urgentHearingSteps);
    },
    reinstatementSteps:async ({page}, use) =>{
        const reinstatementSteps = new Reinstatement(page);
        await use(reinstatementSteps);
    },
    appealDormantSteps:async ({page}, use) =>{
        const appealDormantSteps = new AppealDormant(page);
        await use(appealDormantSteps);
    },
    deathOfAppellant:async ({page}, use) =>{
        const deathOfAppellantSteps = new DeathOfAnAppelant(page);
        await use(deathOfAppellantSteps);
    }
})

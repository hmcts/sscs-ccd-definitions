import { test as stepsFactory } from '@playwright/test';
import { Note } from '../fixtures/steps/note';
import { ConfirmCaseLapsed } from '../fixtures/steps/confirm.case.lapsed';
import { EvidenceReminder } from '../fixtures/steps/evidence.reminder';
import { AssociateCase } from '../fixtures/steps/associate-case';
import { SendToAdmin } from '../fixtures/steps/send.to.admin';
import { SendToJudge } from '../fixtures/steps/send.to.judge';
import { UploadResponse } from '../fixtures/steps/upload.response';
import {ListingError} from "../fixtures/steps/listing.error";
import { SendToDormant } from '../fixtures/steps/send.to.dormant';
import {use} from "chai";


type MyStepsFixtures = {
    addNoteSteps: Note
    associateCaseSteps: AssociateCase
    confirmCaseLapsedSteps: ConfirmCaseLapsed
    evidenceReminderSteps: EvidenceReminder
    sendToAdminSteps: SendToAdmin
    sendToJudgeSteps: SendToJudge
    uploadResponseSteps: UploadResponse
    listingErrorSteps: ListingError
    sendToDormantSteps: SendToDormant
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
    sendToAdminSteps:async ({page}, use) => {
        const sendToAdminSteps = new SendToAdmin(page);
        await use(sendToAdminSteps);
    },
    sendToJudgeSteps:async ({page}, use) => {
        const sendToJudgeSteps = new SendToJudge(page);
        await use(sendToJudgeSteps);
    },
    uploadResponseSteps:async ({page}, use) => {
        const uploadResponseSteps = new UploadResponse(page);
        await use(uploadResponseSteps);
    },
    sendToDormantSteps:async ({page}, use) =>{
        const sendToDormantSteps = new SendToDormant(page);
        await use(sendToDormantSteps)
    },
    listingErrorSteps:async ({page}, use) =>{
        const listingErrorSteps = new ListingError(page);
        await use(listingErrorSteps)
}
})



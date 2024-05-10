import { test as stepsFactory } from '@playwright/test';
import { Note } from '../fixtures/steps/note';
import { ConfirmCaseLapsed } from '../fixtures/steps/confirm.case.lapsed';
import { EvidenceReminder } from '../fixtures/steps/evidence.reminder';
import { SendToAdmin } from '../fixtures/steps/send.to.admin';


type MyFixtures = {
    addNoteSteps: Note
    confirmCaseLapsedSteps: ConfirmCaseLapsed
    evidenceReminderSteps: EvidenceReminder
    sendToAdminSteps: SendToAdmin
};

export const test =  stepsFactory.extend<MyFixtures>({
    addNoteSteps:async ({page}, use) => {
        const addNoteSteps = new Note(page);
        await use(addNoteSteps);
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
})

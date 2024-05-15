import { test as stepsFactory } from '@playwright/test';
import { Note } from '../fixtures/steps/note';
import { ConfirmCaseLapsed } from '../fixtures/steps/confirm.case.lapsed';
import { EvidenceReminder } from '../fixtures/steps/evidence.reminder';
import { AssociateCase } from '../fixtures/steps/associate-case';
import { SendToAdmin } from '../fixtures/steps/send.to.admin';
import { InformationReceived } from '../fixtures/steps/information.received';
import { TaskActions } from '../fixtures/steps/task.actions';
import { ReviewAdminActionTask } from '../fixtures/steps/work-allocation/review.admin.action.task'
import { Login } from '../fixtures/steps/login';
import { Logout } from '../fixtures/steps/logout';
import { RolesAndAccess } from '../fixtures/steps/roles.and.access';


type MyFixtures = {
    addNoteSteps: Note
    associateCaseSteps: AssociateCase
    confirmCaseLapsedSteps: ConfirmCaseLapsed
    evidenceReminderSteps: EvidenceReminder
    loginSteps: Login
    logoutSteps: Logout
    rolesAndAccessSteps: RolesAndAccess
    sendToAdminSteps: SendToAdmin
    taskSteps: TaskActions
    reviewAdminActionTaskSteps: ReviewAdminActionTask
    informationReceivedSteps: InformationReceived
};

export const test =  stepsFactory.extend<MyFixtures>({
    addNoteSteps:async ({ page }, use) => {
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
    loginSteps:async ({ page }, use) => {
        const loginSteps = new Login(page);
        await use(loginSteps);
    },
    logoutSteps:async ({ page }, use) => {
        const logoutSteps = new Logout(page);
        await use(logoutSteps);
    },
    rolesAndAccessSteps:async ({ page }, use) => {
        const rolesAndAccessSteps = new RolesAndAccess(page);
        await use(rolesAndAccessSteps);
    },
    sendToAdminSteps:async ({ page }, use) => {
        const sendToAdminSteps = new SendToAdmin(page);
        await use(sendToAdminSteps);
    },
    taskSteps:async ({ page }, use) => {
        const taskSteps = new TaskActions(page);
        await use(taskSteps);
    },
    reviewAdminActionTaskSteps:async ({ page }, use) => {
        const reviewAdminActionTaskSteps = new ReviewAdminActionTask(page);
        await use(reviewAdminActionTaskSteps);
    },
})

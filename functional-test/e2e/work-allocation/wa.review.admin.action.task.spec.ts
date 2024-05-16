import { test } from "../../lib/steps.factory";
import { credentials } from '../../config/config';
import task  from '../../pages/content/review.admin.task_en.json';

test.describe.skip('WA - Review Admin action task tests', () => {

    test("As a CSTC Admin without case allocator role, review admin action task", async ({
        loginSteps,
        logoutSteps,
        reviewAdminActionTaskSteps,
        sendToAdminSteps,
        taskSteps }) => {

        // Below step ensures test timeout is extended to allow enough time for task creation
        test.slow();

        let caseReference = await sendToAdminSteps.createCase('PIP');

        // Login as Judge and complete Send to Admin event to trigger Review Admin Action task
        await sendToAdminSteps.performSendToAdmin(caseReference, credentials.nationalJudge);
        await taskSteps.verifyTaskDisplayed(task.name);
        await logoutSteps.logout();

        // Login as CTSC Administrator and view the unassigned Review Admin Action task
        await loginSteps.loginAs(credentials.ctscAdministrator);
        await taskSteps.goToHomePage(caseReference);
        await taskSteps.verifyTaskDisplayed(task.name);
        await reviewAdminActionTaskSteps.verifyUnassignedTaskDetails();
    });

    test("As a CSTC Admin with case allocator role, review admin action task", async ({
        loginSteps,
        logoutSteps,
        reviewAdminActionTaskSteps,
        sendToAdminSteps,
        taskSteps }) => {

        test.slow();

        let caseReference = await sendToAdminSteps.createCase('PIP');

        // Login as Judge and complete Send to Admin event to trigger Review Admin Action task
        await sendToAdminSteps.performSendToAdmin(caseReference, credentials.nationalJudge);
        await taskSteps.verifyTaskDisplayed(task.name);
        await logoutSteps.logout();

        // Login as CTSC Administrator with case allocator role and view the unassigned Review Admin Action task
        await loginSteps.loginAs(credentials.ctscAdministratorWithCaseAllocatorRole);
        await taskSteps.goToHomePage(caseReference);
        await taskSteps.verifyTaskDisplayed(task.name);
        await reviewAdminActionTaskSteps.verifyUnassignedTaskDetailsForCaseAllocator();
    });

    test("As a CSTC Administrator, complete review admin action task", async ({
        informationReceivedSteps,
        loginSteps,
        logoutSteps,
        reviewAdminActionTaskSteps,
        sendToAdminSteps,
        taskSteps }) => {

        test.slow();

        let caseReference = await sendToAdminSteps.createCase('PIP');

        // Login as Judge and complete Send to Admin event to trigger Review Admin Action task
        await sendToAdminSteps.performSendToAdmin(caseReference, credentials.nationalJudge);
        await taskSteps.verifyTaskDisplayed(task.name);
        await logoutSteps.logout();

        // Login as CTSC Administrator and view the unassigned Review Admin Action task
        await loginSteps.loginAs(credentials.ctscAdministrator);
        await taskSteps.goToHomePage(caseReference);
        await taskSteps.verifyTaskDisplayed(task.name);

        // CTSC Administrator self assigns task and verifies assigned task details
        await taskSteps.assignTaskToSelf(task.name);
        await reviewAdminActionTaskSteps.verifyAssignedTaskDetails();
        await reviewAdminActionTaskSteps.verifyNextSteps();

        // Select Information recieved next step and complete the event
        await reviewAdminActionTaskSteps.selectNextStep(task.informationReceived.link);
        await informationReceivedSteps.performInformationReceivedEvent();

        // Verify task is removed from the tasks list in Tasks tab
        await taskSteps.verifyTaskIsRemoved(task.name);
    });
});





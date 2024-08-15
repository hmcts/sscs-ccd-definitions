import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";


let caseId : string;

test.describe.serial('WA - Abate(TCW) FTA not Provided Appointee Details task initiation', {tag: '@work-allocation'}, async() => {

    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Allocate case to legal ops role, perform update not listable event", async ({ ftaNotProvidedAppointeeDetailsSteps , updateNotListableSteps }) => {
        
        await ftaNotProvidedAppointeeDetailsSteps.allocateCaseToLegalOpsRole(caseId);
        await updateNotListableSteps.performUpdateNotListableDirectionNotFulfilledAbateTCW(caseId);
    });

    test("As a TCW can view the auto assigned Abate FTA not Provided Appointee Details task", async ({ ftaNotProvidedAppointeeDetailsSteps }) => {
        test.slow();
        await ftaNotProvidedAppointeeDetailsSteps.verifyTcwWithoutCaseAllocatorRoleCanViewReviewAbateFtaNotProvidedAppointeeDetailsTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant",async () => {
        //  await performAppealDormantOnCase(caseId);
    });
});

test.describe.serial('WA - Abate(TCW) FTA not Provided Appointee Details task completion tests', {tag: '@work-allocation'}, async() => {

    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Allocate case to legal ops role and perform Send to interloc event", async ({ updateNotListableSteps }) => {
        
        await updateNotListableSteps.performUpdateNotListableDirectionNotFulfilledAbateTCW(caseId);
    });

    test("As a TCW with case allocator role, assign Abate FTA not Provided Appointee Details task to another TCW", async ({
        ftaNotProvidedAppointeeDetailsSteps}) => {

        test.slow();
        await ftaNotProvidedAppointeeDetailsSteps.verifyTcwWithCaseAllocatorRoleCanViewAndAssignAbateFtaNotProvidedAppointeeDetailsTask(caseId);
    });

    test("As a TCW, view and complete the assigned Abate FTA not Provided Appointee Details task", async ({
        ftaNotProvidedAppointeeDetailsSteps}) => {

        test.slow();
        await ftaNotProvidedAppointeeDetailsSteps.verifyTcwAsAnAssignedUserForAbateFtaNotProvidedAppointeeDetailsTaskCanViewAndCompleteTheTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant",async () => {
        //  await performAppealDormantOnCase(caseId);
    });
});

test.describe.serial('WA - Abate(TCW) FTA not Provided Appointee Details task automatic cancellation when case is void', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Review Abate FTA not Provided Appointee Details task is cancelled automatically when case is void", async ({ updateNotListableSteps , ftaNotProvidedAppointeeDetailsSteps }) => {
        
        await updateNotListableSteps.performUpdateNotListableDirectionNotFulfilledAbateTCW(caseId);
        test.slow();
        await ftaNotProvidedAppointeeDetailsSteps.verifyAbateFtaNotProvidedAppointeeDetailsTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        // await performAppealDormantOnCase(caseId);
    });
});


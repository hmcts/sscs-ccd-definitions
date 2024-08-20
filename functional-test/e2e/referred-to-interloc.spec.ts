import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";


let caseId : string;

test.describe.serial('WA - Referred to Interloc task initiation', {tag: '@work-allocation'}, async() => {

    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Allocate case to legal ops role and perform Send to interloc event", async ({ sendToInterlocSteps , referredToInterlocSteps }) => {
        
        await referredToInterlocSteps.allocateCaseToLegalOpsRole(caseId);
        await sendToInterlocSteps.performSendToInterlocReferralReason(caseId);
    });

    test("As a TCW can view the auto assigned Referred to Interloc task", async ({ referredToInterlocSteps }) => {
        test.slow();
        await referredToInterlocSteps.verifyTcwWithoutCaseAllocatorRoleCanViewReviewReferredToInterlocTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant",async () => {
         await performAppealDormantOnCase(caseId);
    });
});

test.describe.serial('WA - Referred to Interloc task completion tests', {tag: '@work-allocation'}, async() => {

    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Allocate case to legal ops role and perform Send to interloc event", async ({ sendToInterlocSteps }) => {
        
        await sendToInterlocSteps.performSendToInterlocReferralReason(caseId);
    });

    test("As a TCW with case allocator role, assign Referred to Interloc task to another TCW", async ({
        referredToInterlocSteps}) => {

        test.slow();
        await referredToInterlocSteps.verifyTcwWithCaseAllocatorRoleCanViewAndAssignReferredToInterlocTask(caseId);
    });

    test("As a TCW, view and complete the assigned Referred to Interloc task", async ({
        referredToInterlocSteps}) => {

        test.slow();
        await referredToInterlocSteps.verifyTcwAsAnAssignedUserForReferredToInterlocTaskCanViewAndCompleteTheTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant",async () => {
         await performAppealDormantOnCase(caseId);
    });
});

test.describe.serial('WA - Referred to Interloc task automatic cancellation when case is void', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Review Referred to Interloc task is cancelled automatically when case is void", async ({ sendToInterlocSteps , referredToInterlocSteps }) => {
        
        await sendToInterlocSteps.performSendToInterlocReferralReason(caseId);
        test.slow();
        await referredToInterlocSteps.verifyReferredToInterlocTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});


import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

test.describe.serial('WA - Review Information Requested CTSC task initiation and completion tests', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Create case and complete request info from party event", async ({requestInfoFromPartySteps}) => {
        caseId = await createCaseBasedOnCaseType('PIP');
        // caseId = '1720620972246088';
        await requestInfoFromPartySteps.performRequestInfoFromPartyEvent(caseId);
    });

    test("As a CSTC Admin without case allocator role, Review Information Requested Task", async ({
        requestInfoFromPartySteps}) => {

        test.slow();
        await requestInfoFromPartySteps.verifyCtscAdminWithoutCaseAllocatorRoleCanViewReviewInformationRequestedTask(caseId);
    });

    test("As a CSTC Admin with case allocator role, assign Review Information Requested to another CTSC admin", async ({
        requestInfoFromPartySteps }) => {

        test.slow();
        await requestInfoFromPartySteps.verifyCtscAdminWithCaseAllocatorRoleCanViewAndAssignReviewInformationRequestedTask(caseId);
    });

    test("As a CSTC Admin, view and complete the assigned Review Information Requested CTSC task", async ({
        requestInfoFromPartySteps }) => {

        test.slow();
        await requestInfoFromPartySteps.verifyCtscAdminAsAnAssignedUserForReviewInformationRequestedTaskCanViewAndCompleteTheTask(caseId);
    });

    // test.afterAll("Case has to be set to Dormant", async () => {
    //     await performAppealDormantOnCase(caseId);
    // });
});

test.describe('WA - Review Information Requested CTSC task automatic cancellation when case is void', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Case has to be Created", async ({requestInfoFromPartySteps}) => {
        caseId = await createCaseBasedOnCaseType('PIPINCOMPLETE');
        await requestInfoFromPartySteps.performRequestInfoFromPartyEvent(caseId);
    });

    test("Review Information Requested task is cancelled automatically when case is void", async ({
        requestInfoFromPartySteps}) => {

        test.slow();
        
        await requestInfoFromPartySteps.verifyReviewInformationRequestedTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId);
    });

    // test.afterAll("Case has to be set to Dormant", async () => {
    //     await performAppealDormantOnCase(caseId);
    // });
});
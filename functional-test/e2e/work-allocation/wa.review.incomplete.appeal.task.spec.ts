import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";

test.describe.serial('WA - Review Incomplete Appeal CTSC task initiation and completion tests', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIPINCOMPLETE');
    });

    test("As a CSTC Admin without case allocator role, review Incomplete Appeal task", async ({
        reviewIncompleteAppealTaskSteps}) => {

        test.slow();
        await reviewIncompleteAppealTaskSteps.verifyCtscAdminWithoutCaseAllocatorRoleCanViewReviewIncompleteAppealTask(caseId);
    });

    test("As a CSTC Admin with case allocator role, assign Incomplete Appeal task to another CTSC admin", async ({
        reviewIncompleteAppealTaskSteps }) => {

        test.slow();
        await reviewIncompleteAppealTaskSteps.verifyCtscAdminWithCaseAllocatorRoleCanViewAndAssignReviewIncompleteAppealTask(caseId);
    });

    test("As a CSTC Admin, view and complete the assigned Review Incomplete Appeal CTSC task", async ({
        reviewIncompleteAppealTaskSteps }) => {

        test.slow();
        await reviewIncompleteAppealTaskSteps.verifyCtscAdminAsAnAssignedUserForReviewIncompleteAppealTaskCanViewAndCompleteTheTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});

test.describe('WA - Review Incomplete Appeal CTSC task automatic cancellation when case is void', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIPINCOMPLETE');
    });

    test("Review Incomplete Appeal task is cancelled automatically when case is void", async ({
        reviewIncompleteAppealTaskSteps}) => {

        test.slow();
        await reviewIncompleteAppealTaskSteps.verifyReviewIncompleteAppealTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});
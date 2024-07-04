import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";

test.describe.serial('WA - Review BF Date CTSC task initiation and completion tests', {
    tag: '@work-allocation'
}, async () => {

    let caseId : string;

    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("CTSC Admin as allocated case worker, views the review BF date task", async ({
        reviewBFDateTaskSteps }) => {

        test.slow();
        await reviewBFDateTaskSteps.verifyCtscAdminAsAllocatedCaseWorkerCanViewTheAutomaticallyAssignedReviewBFDateTask(caseId);
    });

    test("CTSC Admin as allocated case worker, completes the review BF date task", async ({
        reviewBFDateTaskSteps }) => {

        test.slow();
        await reviewBFDateTaskSteps.verifyCtscAdminAsAllocatedCaseWorkerCanCompleteTheAssignedReviewBFDateTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});

test.describe('WA - Review BF Date CTSC task automatic cancellation when case is marked as urgent', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;
    
    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Review BF Date task is cancelled automatically when case is marked as urgent", async ({
        reviewBFDateTaskSteps}) => {

        test.slow();
        await reviewBFDateTaskSteps.verifyReviewBFDateTaskIsCancelledAutomaticallyWhenTheCaseIsMarkedAsUrgent(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});
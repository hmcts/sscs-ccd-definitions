import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";

let caseId : string;

test.describe.serial('WA - Review BF Date CTSC task initiation and completion tests', {
    tag: '@work-allocation'
}, async () => {

    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("CSTC Admin as allocated case worker, view the review BF date task", async ({
        reviewBFDateTaskSteps }) => {

        test.slow();
        await reviewBFDateTaskSteps.verifyCtscAdminAsAllocatedCaseWorkerCanViewTheAutomaticallyAssignedReviewBFDateTask(caseId);
    });

    test("CSTC Admin as allocated case worker, complete the review BF date task", async ({
        reviewBFDateTaskSteps }) => {

        test.slow();
        await reviewBFDateTaskSteps.verifyCtscAdminAsAllocatedCaseWorkerCanCompleteTheAssignedReviewBFDateTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});

test.describe('WA - Review BF Date CTSC task automatic cancellation when appeal is withdrawn', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;
    
    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Review BF Date task is cancelled automatically when appeal is withdrawn", async ({
        reviewBFDateTaskSteps}) => {

        test.slow();
        await reviewBFDateTaskSteps.verifyReviewBFDateTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});
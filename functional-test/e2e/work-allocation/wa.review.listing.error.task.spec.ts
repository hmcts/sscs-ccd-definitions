import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";

test.describe.serial('WA - Review Listing Error CTSC task initiation and completion tests', () => {

    let caseId : string;
    
    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("As a CSTC Admin without case allocator role, review listing error task", async ({
        reviewListingErrorTaskSteps}) => {

        // Below step ensures test timeout is extended to allow enough time for task creation
        test.slow();
        await reviewListingErrorTaskSteps.verifyCtscAdminWithoutCaseAllocatorRoleCanViewReviewListingErrorTask(caseId);
    });

    test("As a CSTC Admin with case allocator role, review listing error task", async ({
        reviewListingErrorTaskSteps }) => {

        test.slow();
        await reviewListingErrorTaskSteps.verifyCtscAdminWithCaseAllocatorRoleCanViewReviewListingErrorTask(caseId);
    });

    test("As a CSTC Administrator, complete listing error task", async ({
        reviewListingErrorTaskSteps }) => {

        test.slow();
        await reviewListingErrorTaskSteps.verifyCtscAdminWithoutCaseAllocatorRoleCanCompleteReviewListingErrorTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant",async () => {
        await performAppealDormantOnCase(caseId);
    });
});

test.describe('WA - Review Listing Error CTSC task automatic cancellation when case is void', () => {

    let caseId : string;
    
    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Review listing error task is cancelled automatically when case is void", async ({
        reviewListingErrorTaskSteps}) => {

        test.slow();
        await reviewListingErrorTaskSteps.verifyReviewListingErrorTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId);
    });

    test.afterAll("Case has to be set to Dormant",async () => {
        await performAppealDormantOnCase(caseId);
    });
});




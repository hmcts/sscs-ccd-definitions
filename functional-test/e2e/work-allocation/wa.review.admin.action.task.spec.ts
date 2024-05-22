import { test } from "../../lib/steps.factory";

test.describe('WA - Review Admin action task tests', async () => {

    test("As a CSTC Admin without case allocator role, review admin action task", async ({
        reviewAdminActionTaskSteps }) => {

        // Below step ensures test timeout is extended to allow enough time for task creation
        test.slow();

        await reviewAdminActionTaskSteps.verifyCtscAdminWithoutCaseAllocatorRoleCanViewReviewAdminActionTask();
    });

    test("As a CSTC Admin with case allocator role, review admin action task", async ({
        reviewAdminActionTaskSteps }) => {

        test.slow();

        await reviewAdminActionTaskSteps.verifyCtscAdminWithCaseAllocatorRoleCanViewReviewAdminActionTask();
    });

    test("As a CSTC Administrator, complete review admin action task", async ({
        reviewAdminActionTaskSteps }) => {

        test.slow();

        await reviewAdminActionTaskSteps.verifyCtscAdminWithoutCaseAllocatorRoleCanCompleteReviewAdminActionTask();
    });
});





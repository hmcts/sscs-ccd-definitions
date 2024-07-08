import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";


test.describe.serial('WA - Review Admin action task tests', {
    tag: '@work-allocation'
}, async () => {

    let caseId : string;

    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("As a CSTC Admin without case allocator role, review admin action task", async ({
        reviewAdminActionTaskSteps }) => {

        // Below step ensures test timeout is extended to allow enough time for task creation
        test.slow();

        await reviewAdminActionTaskSteps.verifyCtscAdminWithoutCaseAllocatorRoleCanViewReviewAdminActionTask(caseId);
    });

    test("As a CSTC Admin with case allocator role, review admin action task", async ({
        reviewAdminActionTaskSteps }) => {

        test.slow();

        await reviewAdminActionTaskSteps.verifyCtscAdminWithCaseAllocatorRoleCanViewReviewAdminActionTask(caseId);
    });

    test("As a CSTC Administrator, complete review admin action task", async ({
        reviewAdminActionTaskSteps }) => {

        test.slow();

        await reviewAdminActionTaskSteps.verifyCtscAdminWithoutCaseAllocatorRoleCanCompleteReviewAdminActionTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});
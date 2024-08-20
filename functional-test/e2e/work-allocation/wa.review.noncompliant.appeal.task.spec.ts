import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";

test.describe.serial('WA - Review Non Compliant Appeal LO task initiation and completion tests', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Create non compliant case", async () => {
        caseId = await createCaseBasedOnCaseType('PIPNONCOMPLIANT');
    });

    test("As a TCW with case allocator role, assign the Review Non Compliant Appeal task to another TCW", async ({
        reviewNonCompliantAppealTaskSteps }) => {

        test.slow();
        await reviewNonCompliantAppealTaskSteps.verifyTcwWithCaseAllocatorRoleCanViewAndAssignReviewNonCompliantAppealTask(caseId);
    });

    test("As a TCW, view and complete the assigned Review Non Compliant Appeal LO task", async ({
        reviewNonCompliantAppealTaskSteps }) => {

        test.slow();
        await reviewNonCompliantAppealTaskSteps.verifyTcwCanViewAndCompleteTheAssignedReviewNonCompliantAppealTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});

test.describe('WA - Complete Review Non Compliant Appeal task by sending case to Judge', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Create non compliant case", async () => {
        caseId = await createCaseBasedOnCaseType('PIPNONCOMPLIANT');
    });

    test("As a TCW, view and complete the unassigned Review Non Compliant Appeal task by sending case to Judge", async ({
        reviewNonCompliantAppealTaskSteps }) => {

        test.slow();
        await reviewNonCompliantAppealTaskSteps.verifyReviewNonCompliantAppealTaskCanBeCompletedBySendingCaseToJudge(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});

test.describe('WA - Review Non Compliant Appeal LO task automatic cancellation when case is void', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Create non compliant case", async () => {
        caseId = await createCaseBasedOnCaseType('PIPNONCOMPLIANT');
    });

    test("Review Non Compliant Appeal task is cancelled automatically when case is void", async ({
        reviewNonCompliantAppealTaskSteps}) => {

        test.slow();
        await reviewNonCompliantAppealTaskSteps.verifyReviewNonCompliantAppealTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});
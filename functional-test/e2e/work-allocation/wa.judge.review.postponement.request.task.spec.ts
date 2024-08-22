import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";


//UPDATE TAG BEFORE PUSHING
test.describe.serial('WA - Judge Review postponement request - Judge task initiation and reviewing tests', {
    tag: '@wip'
}, async () => {

    let caseId: string;

    test.beforeAll("Create case", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("TCW with Legal-caseworker role, create 'Review postponement request - TCW' task", async ({
        reviewPostponementRequestTaskSteps }) => {

        test.slow();
        await reviewPostponementRequestTaskSteps.createPostponementRequestTask(caseId);
        await reviewPostponementRequestTaskSteps.checkPostponementRequestTaskManageOptions(caseId);
    })

    test("Judge with Interloc judge role, checks assign functionality for the 'Review postponement request' task", async ({
        judgeReviewPostponementRequestTaskSteps }) => {

        test.slow();
        await judgeReviewPostponementRequestTaskSteps.allocateCaseToJudgeInterlocRole(caseId);
        await judgeReviewPostponementRequestTaskSteps.checkManageOptionsJudgeWithInterlocRoleReviewPostponementTask(caseId);
    })

    test("Salaried Judge without Interloc judge role, check if can't reassign 'Review postponement request' task", async ({
        judgeReviewPostponementRequestTaskSteps }) => {

        test.slow();
        await judgeReviewPostponementRequestTaskSteps.checkManageOptionsSalariedJudgeWithoutInterlocRoleReviewPostponementTask(caseId);
    })

    test("Fee paid Judge without Interloc judge role, check if can't reassign 'Review postponement request' task", async ({
        judgeReviewPostponementRequestTaskSteps }) => {

        test.slow();
        await judgeReviewPostponementRequestTaskSteps.checkManageOptionsFeepaidJudgeWithoutInterlocRoleReviewPostponementTask(caseId);
    })

    test("CTSC with Admin role, cancels the 'Review postponement request' task", async ({
        judgeReviewPostponementRequestTaskSteps }) => {

        test.slow();
        await judgeReviewPostponementRequestTaskSteps.ctscAdminCancelsReviewPostponementTask(caseId);
    })

    // test.afterAll("Case has to be set to Dormant", async () => {
    //     await performAppealDormantOnCase(caseId);
    // });
})

// COMPLETION and CANCELLATION scenarios are on HOLD since a bug was found where the completed/cancelled task doesn't disappear 
// from the case, issue raise on SSCSSI-369
import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";
import { WriteFinalDecision } from "../../fixtures/steps/write.final.decision";


test.describe.serial('WA - Judge Review postponement request - Judge task initiation and reviewing tests', {
    tag: '@work-allocation'
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

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
})

//The tests below are expected to fail IF the task takes too long to be completed i.e disappear from the Tasks tab  

test.describe.serial('WA - Judge Review postponement request - Judge task completion tests', {
    tag: '@work-allocation'
}, async () => {

    let caseId: string;

    test.beforeAll("Create case", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Salaried Judge completes the 'Review postponement request' task by using Issue Direction event", async ({
        judgeReviewPostponementRequestTaskSteps, reviewPostponementRequestTaskSteps }) => {

        test.slow();
        await reviewPostponementRequestTaskSteps.createPostponementRequestTask(caseId);
        await reviewPostponementRequestTaskSteps.checkPostponementRequestTaskManageOptions(caseId);
        await judgeReviewPostponementRequestTaskSteps.salariedJudgeCompletesReviewPostponementTaskByIssueDirectionEvent(caseId);
    })

    test("Fee paid Judge completes the 'Review postponement request' task by using the Write Final Decision event", async ({
        judgeReviewPostponementRequestTaskSteps, reviewPostponementRequestTaskSteps }) => {

        test.slow();
        await reviewPostponementRequestTaskSteps.createPostponementRequestTask(caseId);
        await reviewPostponementRequestTaskSteps.checkPostponementRequestTaskManageOptions(caseId);
        await judgeReviewPostponementRequestTaskSteps.feepaidJudgeCompletesReviewPostponementTaskByWriteFinalDecisionEvent(caseId);
    })

    // test("TCW completes the 'Review postponement request' task by using the Review Confidentiality event", async ({
    //     judgeReviewPostponementRequestTaskSteps, reviewPostponementRequestTaskSteps }) => {

    //     test.slow();
    //     await reviewPostponementRequestTaskSteps.createPostponementRequestTask(caseId);
    //     await reviewPostponementRequestTaskSteps.checkPostponementRequestTaskManageOptions(caseId);
    //     await judgeReviewPostponementRequestTaskSteps.tcwCompletesReviewPostponementTaskByReviewConfidentialityEvent(caseId);
    // })

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
})
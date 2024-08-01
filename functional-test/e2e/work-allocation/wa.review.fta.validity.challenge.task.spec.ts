import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";

// CHANGE TAG BEFORE PUSHING
test.describe.serial('WA - Review FTA Validity Challenge task initiation, cancelling and completion tests', {
    tag: '@wip'
}, async () => {

    let caseId: string;

    test.beforeAll("Case with Challenge validity event ran has to be Created", async ({ ReviewFTAValidityChallengeSteps }) => {
        caseId = await createCaseBasedOnCaseType('PIP');
        await ReviewFTAValidityChallengeSteps.createReviewFTAValidityChallengeTask(caseId);
    });

    test("As a TCW with legal-caseworker role, I want to view that the 'Review FTA Validity Challenge' task is created", async ({
        ReviewFTAValidityChallengeSteps }) => {

        test.slow();
        await ReviewFTAValidityChallengeSteps.verifyReviewFTAValidityChallengeTaskisCreated(caseId);
    });

    test("As a TCW with legal-caseworker role, I want to assign 'Review FTA Validity Challenge' task to myself or other user", async ({
        ReviewFTAValidityChallengeSteps }) => {

        test.slow();
        await ReviewFTAValidityChallengeSteps.assignReviewFTAValidityChallengeTask(caseId);
    });

    // test("As a TCW without legal-caseworker role, I want to attempt to assign the 'Review FTA Validity Challenge' task to other user", async ({
    //     ReviewFTAValidityChallengeSteps }) => {

    //     test.slow();
    //     await ReviewFTAValidityChallengeSteps.assignReviewFTAValidityChallengeTaskWithoutLegalRole(caseId);
    // });

    test("As a TCW with legal-caseworker role, I want to cancel the 'Review FTA Validity Challenge' task", async ({
        ReviewFTAValidityChallengeSteps }) => {

        test.slow();
        await ReviewFTAValidityChallengeSteps.cancelReviewFTAValidityChallengeTask(caseId);
    });

    test("As a TCW with legal-caseworker role, I want to complete the 'Review FTA Validity Challenge' task", async ({
        ReviewFTAValidityChallengeSteps }) => {

        test.slow();
        await ReviewFTAValidityChallengeSteps.completeReviewFTAValidityChallengeTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
})



// TCW with legal-caseworker role to check assign functionality

// TCW without legal-caseworker role to check if they can't re-assign to anyone else

// TCW cancel task

// TCW complete task
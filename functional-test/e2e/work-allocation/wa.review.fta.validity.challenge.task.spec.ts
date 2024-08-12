import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";

// CHANGE TAG BEFORE PUSHING
test.describe.serial('WA - Review FTA Validity Challenge task initiation, cancelling and completion tests', {
    tag: '@wip'
}, async () => {

    let caseId: string;

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("As a TCW with legal-caseworker role, I want to create and view that the 'Review FTA Validity Challenge' task", async ({
        ReviewFTAValidityChallengeSteps }) => {

        test.slow();
        //test.setTimeout(20000);
        await ReviewFTAValidityChallengeSteps.createReviewFTAValidityChallengeTask(caseId); // create task by running Challenge validity event on the case
        test.setTimeout(240000);
        await ReviewFTAValidityChallengeSteps.verifyReviewFTAValidityChallengeTaskisCreated(caseId);
    });

    test("As a TCW with legal-caseworker role, I want to assign 'Review FTA Validity Challenge' task to myself or other user", async ({
        ReviewFTAValidityChallengeSteps }) => {

        test.slow();
        await ReviewFTAValidityChallengeSteps.assignReviewFTAValidityChallengeTask(caseId);
    });

        // CHECK IN THE UI ONCE WA is back
    test("As a TCW without legal-caseworker role, I want to attempt to assign the 'Review FTA Validity Challenge' task to other user", async ({
        ReviewFTAValidityChallengeSteps }) => {

        test.slow();
        await ReviewFTAValidityChallengeSteps.assignReviewFTAValidityChallengeTaskWithoutLegalRole(caseId);
    });

    test("As a TCW with legal-caseworker role, I want to cancel the 'Review FTA Validity Challenge' task via Cancel link", async ({
        ReviewFTAValidityChallengeSteps }) => {

        test.slow();
        await ReviewFTAValidityChallengeSteps.cancelReviewFTAValidityChallengeTaskByCancelLink(caseId);
    });

    test("As a TCW with legal-caseworker role, I want to cancel the 'Review FTA Validity Challenge' task via Event completion", async ({
        ReviewFTAValidityChallengeSteps }) => {

        test.slow();
        await ReviewFTAValidityChallengeSteps.cancelReviewFTAValidityChallengeTaskByEvent(caseId);
    });

    test("As a TCW with legal-caseworker role, I want to complete the 'Review FTA Validity Challenge' task via Mark as done link", async ({
        ReviewFTAValidityChallengeSteps }) => {

        test.slow();
        await ReviewFTAValidityChallengeSteps.completeReviewFTAValidityChallengeTaskByMarkAsDone(caseId);
    });

    test("As a TCW with legal-caseworker role, I want to complete the 'Review FTA Validity Challenge' task via Event completion", async ({
        ReviewFTAValidityChallengeSteps }) => {

        test.slow();
        await ReviewFTAValidityChallengeSteps.completeReviewFTAValidityChallengeTaskByEvent(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
})

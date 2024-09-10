import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";


test.describe.serial('WA - Review Confidentiality Request Judge task initiation and completion tests by Salaried Judge', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Create case", async () => {
        caseId = await createCaseBasedOnCaseType('UC');
    });

    test("Grant Confidentiality request", async ({ uploadResponseSteps, enhancedConfidentialitySteps }) => {
        test.slow();
        await uploadResponseSteps.performUploadResponseOnAUniversalCreditWithJP(caseId);
        await enhancedConfidentialitySteps.requestConfidentialityForJP();
    });

    test("As a Salaried Judge, view the Review Confidentiality Request - Judge task", async ({
        reviewConfidentialityRequestTaskSteps }) => {

        test.slow();
        await reviewConfidentialityRequestTaskSteps.verifySalariedJudgeCanViewTheUnassignedReviewConfidentialityRequestTask(caseId);
    });

    test("As a Salaried Judge, complete the Review Confidentiality Request - Judge task", async ({
        reviewConfidentialityRequestTaskSteps }) => {
        test.slow();
        await reviewConfidentialityRequestTaskSteps.verifySalariedJudgeCanCompleteTheUnassignedReviewConfidentialityRequestTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
})


test.describe.serial('WA - Review Confidentiality Request Judge task initiation and completion tests by Fee-Paid Judge', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Create case", async () => {
        caseId = await createCaseBasedOnCaseType('UC');
    });

    test("Grant Confidentiality request", async ({ uploadResponseSteps, enhancedConfidentialitySteps }) => {
        test.slow();
        await uploadResponseSteps.performUploadResponseOnAUniversalCreditWithJP(caseId);
        await enhancedConfidentialitySteps.requestConfidentialityForJP();
    });

    test("As a Fee-Paid Judge, view the Review Confidentiality Request - Judge task", async ({
        reviewConfidentialityRequestTaskSteps }) => {

        test.slow();
        await reviewConfidentialityRequestTaskSteps.verifyFeePaidJudgeCanViewTheUnassignedReviewConfidentialityRequestTask(caseId);
    });

    test("As a Fee-Paid Judge, complete the Review Reinstatement Request - Judge task", async ({
        reviewConfidentialityRequestTaskSteps }) => {

        test.slow();
        await reviewConfidentialityRequestTaskSteps.verifyFeePaidJudgeCanCompleteTheUnassignedReviewConfidentialityRequestTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
})


test.describe.serial('WA - Review Confidentiality Request Judge task - Reassign to TCW tests', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Create case", async () => {
        caseId = await createCaseBasedOnCaseType('UC');
    });

    test("Grant Confidentiality request", async ({ uploadResponseSteps, enhancedConfidentialitySteps }) => {
        test.slow();
        await uploadResponseSteps.performUploadResponseOnAUniversalCreditWithJP(caseId);
        await enhancedConfidentialitySteps.requestConfidentialityForJP();
    });

    test("As a Judge, view the Review Confidentiality Request - Judge task", async ({
        reviewConfidentialityRequestTaskSteps }) => {

        test.slow();
        await reviewConfidentialityRequestTaskSteps.verifySalariedJudgeCanViewTheUnassignedReviewConfidentialityRequestTask(caseId);
    });

    test("As a Judge, assign the Review Confidentiality Request task to Tribunal Caseworker", async ({
        reviewConfidentialityRequestTaskSteps }) => {

        test.slow();
        await reviewConfidentialityRequestTaskSteps.verifySalariedJudgeCanReassignTheReviewConfidentialityRequestTaskToTcw(caseId);
    });

    test("As a Tribunal Caseworker, complete the Review Confidentiality Request task ", async ({
        reviewConfidentialityRequestTaskSteps }) => {

        test.slow();
        await reviewConfidentialityRequestTaskSteps.verifyTcwCanCompleteTheAssignedReviewConfidentialityRequestTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
})

test.describe.serial('WA - Judge completes Review Confidentiality Request task manually', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Create case", async () => {
        caseId = await createCaseBasedOnCaseType('UC');
    });

    test("Grant Confidentiality request", async ({ uploadResponseSteps, enhancedConfidentialitySteps }) => {
        test.slow();
        await uploadResponseSteps.performUploadResponseOnAUniversalCreditWithJP(caseId);
        await enhancedConfidentialitySteps.requestConfidentialityForJP();
    });

    test("As a Judge, view the Review Confidentiality Request - Judge task", async ({
        reviewConfidentialityRequestTaskSteps }) => {

        test.slow();
        await reviewConfidentialityRequestTaskSteps.verifySalariedJudgeCanViewTheUnassignedReviewConfidentialityRequestTask(caseId);
    });

    test("As a Judge, complete the Review Confidentiality Request task manually", async ({
        reviewConfidentialityRequestTaskSteps }) => {

        test.slow();
        await reviewConfidentialityRequestTaskSteps.verifySalariedJudgeCanCompleteTheReviewConfidentialityRequestTaskManually(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
})

test.describe.serial('WA - Review Confidentiality Request Judge task automatic cancellation when case is void', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Create case", async () => {
        caseId = await createCaseBasedOnCaseType('UC');
    });

    test("Grant Confidentiality request", async ({ uploadResponseSteps, enhancedConfidentialitySteps }) => {
        test.slow();
        await uploadResponseSteps.performUploadResponseOnAUniversalCreditWithJP(caseId);
        await enhancedConfidentialitySteps.requestConfidentialityForJP();
    });

    test("As a Judge, view the Review Confidentiality Request - Judge task", async ({
        reviewConfidentialityRequestTaskSteps }) => {

        test.slow();
        await reviewConfidentialityRequestTaskSteps.verifySalariedJudgeCanViewAndSelfAssignTheReviewConfidentialityRequestTask(caseId);
    });

    test("Review Confidentiality Request - Judge task is cancelled automatically when case is void", async ({
        reviewConfidentialityRequestTaskSteps}) => {

        test.slow();
        await reviewConfidentialityRequestTaskSteps.verifyReviewConfidentialityRequestTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});

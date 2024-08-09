import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";


test.describe.serial('WA - Review PHE Request - Judge task initiation and completion tests by Interlocutory Judge', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Create case", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Allocate case to Interlocutory Judge, upload response with PHE and grant a PHE Request", async ({ 
        uploadResponseSteps,
        reviewPHESteps }) => {

        test.slow();
        await reviewPHESteps.allocateCaseToInterlocutoryJudge(caseId);
        await uploadResponseSteps.performUploadResponseWithPHEOnAPIPAndReviewResponse(caseId);
    });

    test("As an Interlocutory Judge, view and complete the auto assigned Review PHE Request task", async ({
        reviewPHESteps }) => {

        test.slow();
        await reviewPHESteps.verifyInterlocutoryJudgeCanViewAndCompleteTheAutoAssignedReviewPHERequestTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
})

test.describe.serial('WA - Review PHE Request - Judge task initiation and completion tests by Salaried Judge', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Create case", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Upload response with PHE and refuse a PHE Request", async ({
        uploadResponseSteps }) => {

        test.slow();
        await uploadResponseSteps.performUploadResponseWithPHEOnAPIPAndReviewResponse(caseId);
    });

    test("As a Salaried Judge, view and complete the Review PHE Request - Judge task", async ({
        reviewPHESteps }) => {

        test.slow();
        await reviewPHESteps.verifySalariedJudgeCanViewAndCompleteTheUnassignedReviewPHERequestTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
})

test.describe.serial('WA - Review PHE Request - Judge task initiation and completion tests by Fee-Paid Judge', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Create case", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Upload response with PHE and grant a PHE Request", async ({ 
        uploadResponseSteps }) => {

        test.slow();
        await uploadResponseSteps.performUploadResponseWithPHEOnAPIPAndReviewResponse(caseId);
    });

    test("As a Fee-Paid Judge, view and complete the Review PHE Request - Judge task", async ({
        reviewPHESteps }) => {

        test.slow();
        await reviewPHESteps.verifyFeePaidJudgeCanViewAndCompleteTheUnassignedReviewPHERequestTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
})

test.describe.serial('WA - Review PHE Request Judge task automatic cancellation when case is void', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;

    test.beforeAll("Create case", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Upload response with PHE and refuse a PHE Request", async ({ 
        uploadResponseSteps }) => {

        test.slow();
        await uploadResponseSteps.performUploadResponseWithPHEOnAPIPAndReviewResponse(caseId);
    });

    test("As a Judge, view the Review PHE Request - Judge task", async ({
        reviewPHESteps }) => {

        test.slow();
        await reviewPHESteps.verifySalariedJudgeCanViewAndSelfAssignTheReviewPHERequestTask(caseId);
    });

    test("Review PHE Request - Judge task is cancelled automatically when case is void", async ({
        reviewPHESteps}) => {

        test.slow();
        await reviewPHESteps.verifyReviewPHERequestTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});

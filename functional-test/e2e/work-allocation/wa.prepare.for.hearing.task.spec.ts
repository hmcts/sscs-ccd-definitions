import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";


test.describe.serial('WA - Prepare for hearing task initiation and cancelling tests', {
    tag: '@wip'
}, async () => {

    let caseId: string;

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Judge with Hearing-judge role, can view and assign 'prepare for hearing' task", async ({
        prepareForHearingTaskSteps, createBundleSteps }) => {

        test.slow();
        //await prepareForHearingTaskSteps.allocateCaseToHearingJudge(caseId);
        await createBundleSteps.performUploadBundleResponse(caseId);
        await prepareForHearingTaskSteps.verifyTaskAndAssign(caseId);
    });

    test("Judge with Hearing-judge role, can cancel 'update hearing details' task", async ({
        prepareForHearingTaskSteps }) => {

        test.slow();
        await prepareForHearingTaskSteps.cancelTask(caseId);
    });

    // test.afterAll("Case has to be set to Dormant", async () => {
    //     await performAppealDormantOnCase(caseId);
    // });
})

test.describe.serial('WA - Prepare for hearing task completion tests', {
    tag: '@work-allocation'
}, async () => {

    let caseId: string;

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Judge with Hearing-judge role, can complete 'prepare for hearing' task", async ({
        prepareForHearingTaskSteps, createBundleSteps }) => { 
        
            test.slow();
            await createBundleSteps.performUploadBundleResponse(caseId);
            await prepareForHearingTaskSteps.completesTask(caseId);
        })

     // test.afterAll("Case has to be set to Dormant", async () => {
    //     await performAppealDormantOnCase(caseId);
    // });
})
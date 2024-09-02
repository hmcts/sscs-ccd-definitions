import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";


let caseId : string;

test.describe.serial('WA - Write Decision - Judge task initiation and completion tests by Judge', {tag: '@work-allocation'}, async() => {

    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('UC');
    });

    test("As a Judge, view and complete the Write Decision - Judge task", async ({ readyToListSteps, writeDecisionJudgeTaskSteps }) => {
        
        await readyToListSteps.performReadyToListEvent(caseId);
        test.slow();
        await writeDecisionJudgeTaskSteps.verifyJudgeCanViewAndCompleteTheUnassignedWriteDecisionJudgeTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant",async () => {
         await performAppealDormantOnCase(caseId);
    });
});

test.describe.serial('Write Decision - Judge task automatic cancellation when case is void', {
    tag: '@work-allocation'
}, async() => {

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Review Write Decision Pre Hearing Judge task is cancelled automatically when case is void", async ({ readyToListSteps, writeDecisionJudgeTaskSteps }) => {
        
        await readyToListSteps.performReadyToListEvent(caseId);
        test.slow();
        await writeDecisionJudgeTaskSteps.verifyWriteDecisionJudgeTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});
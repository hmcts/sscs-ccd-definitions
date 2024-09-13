import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";


let caseId : string;

// Test commented out as the interlocutory judge credentials from confluence not matching to preview enviroment credentials


// test.describe.serial('WA - Referred By TCW - Judge task initiation and completion tests by Interlocutory Judge', {tag: '@work-allocation'}, async() => {

//     let caseId : string;
    
//     test.beforeAll("Case has to be Created",async () => {
//         caseId = await createCaseBasedOnCaseType('PIP');
//     });

//     test("Send to judge to be reviewed by Judge", async ({ sendToJudgeSteps , referredByTcwJudgeTaskSteps }) => {
        
//         test.slow();
//         await referredByTcwJudgeTaskSteps.allocateCaseToInterlocutoryJudge(caseId);
//         await sendToJudgeSteps.performSendToJudgeReviewedByJudge(caseId);
//     });

//     test("As a Interlocutory judge, view and complete Referred by TCW Judge task", async ({ referredByTcwJudgeTaskSteps }) => {
        
//         test.slow();
//         await referredByTcwJudgeTaskSteps.verifyInterlocutoryJudgeCanViewAndCompleteTheAutoAssignedReferredByTcwJudgeTask(caseId);
//     });

//     test.afterAll("Case has to be set to Dormant",async () => {
//          await performAppealDormantOnCase(caseId);
//     });
// });

test.describe.serial('WA - Referred By TCW - Judge task initiation and completion tests by Salaried Judge', {tag: '@work-allocation'}, async() => {

    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Send to Judge to be reviewed by Judge", async ({ sendToJudgeSteps }) => {

        test.slow();
        await sendToJudgeSteps.performSendToJudgeReviewedByJudge(caseId);
    });

    test("As a Salaried Judge, view and complete the Referred By TCW - Judge task", async ({ sendToJudgeSteps, referredByTcwJudgeTaskSteps}) => {
        test.slow();
        await referredByTcwJudgeTaskSteps.verifySalariedJudgeCanViewAndCompleteTheUnassignedReferredByTcwJudgeTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant",async () => {
         await performAppealDormantOnCase(caseId);
    });
});

test.describe.serial('WA - Referred By TCW - Judge task initiation and completion tests by Fee-Paid Judge', {tag: '@work-allocation'}, async() => {

    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Send to Judge to be reviewed by Judge", async ({ sendToJudgeSteps }) => {

        test.slow();
        await sendToJudgeSteps.performSendToJudgeReviewedByJudge(caseId);
    });

    test("As a Fee-Paid Judge, view and complete the Referred By TCW - Judge task", async ({ sendToJudgeSteps, referredByTcwJudgeTaskSteps}) => {

        test.slow();
        await referredByTcwJudgeTaskSteps.verifyFeePaidJudgeCanViewAndCompleteTheUnassignedReferredByTcwJudgeTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant",async () => {
         await performAppealDormantOnCase(caseId);
    });
});

test.describe.serial('Referred By TCW - Judge task automatic cancellation when case is void', {
    tag: '@work-allocation'
}, async() => {

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Send to interloc to be reviewed by Judge", async ({ sendToJudgeSteps }) => {

        test.slow();
        await sendToJudgeSteps.performSendToJudgeReviewedByJudge(caseId);
    });

    test("Review Referred by TCW Judge task is cancelled automatically when case is void", async ({ referredByTcwJudgeTaskSteps }) => {
        
        test.slow();
        await referredByTcwJudgeTaskSteps.verifyReferredByTcwJudgeTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});
import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";


let caseId : string;

// Test commented out as the interlocutory judge credentials from confluence not matching to preview enviroment credentials


// test.describe.serial('WA - Referred by Admin - Judge task initiation and completion tests by Interlocutory Judge', {tag: '@work-allocation'}, async() => {

//     let caseId : string;
    
//     test.beforeAll("Case has to be Created",async () => {
//         caseId = await createCaseBasedOnCaseType('PIP');
//     });

//     test("Send to interloc to be reviewed by Judge", async ({ sendToInterlocSteps , referredByAdminJudgeTaskSteps }) => {
        
//         test.slow();
//         await referredByAdminJudgeTaskSteps.allocateCaseToInterlocutoryJudge(caseId);
//         await sendToInterlocSteps.performSendToInterlocJudge(caseId);
//     });

//     test("As a Interlocutory judge, view and complete Referred by Admin Pre Hearing Judge task", async ({ referredByAdminJudgeTaskSteps }) => {
        
//         test.slow();
//         await referredByAdminJudgeTaskSteps.verifyInterlocutoryJudgeCanViewAndCompleteTheAutoAssignedReferredByAdminJudgeTask(caseId);
//     });

//     test.afterAll("Case has to be set to Dormant",async () => {
//          await performAppealDormantOnCase(caseId);
//     });
// });

test.describe.serial('WA - Referred by Admin - Judge task initiation and completion tests by Salaried Judge', {tag: '@work-allocation'}, async() => {

    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Send to interloc to be reviewed by Judge", async ({ sendToInterlocSteps }) => {

        test.slow();
        await sendToInterlocSteps.performSendToInterlocJudge(caseId);
    });

    test("As a Salaried Judge, view and complete the Referred By Admin - Judge task", async ({ sendToInterlocSteps, referredByAdminJudgeTaskSteps}) => {
        test.slow();
        await referredByAdminJudgeTaskSteps.verifySalariedJudgeCanViewAndCompleteTheUnassignedReferredByAdminJudgeTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant",async () => {
         await performAppealDormantOnCase(caseId);
    });
});

test.describe.serial('WA - Referred by Admin - Judge task initiation and completion tests by Fee-Paid Judge', {tag: '@work-allocation'}, async() => {

    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Send to interloc to be reviewed by Judge", async ({ sendToInterlocSteps }) => {

        test.slow();
        await sendToInterlocSteps.performSendToInterlocJudge(caseId);
    });

    test("As a Fee-Paid Judge, view and complete the Referred By Admin - Judge task", async ({ sendToInterlocSteps, referredByAdminJudgeTaskSteps}) => {

        test.slow();
        await referredByAdminJudgeTaskSteps.verifyFeePaidJudgeCanViewAndCompleteTheUnassignedReferredByAdminJudgeTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant",async () => {
         await performAppealDormantOnCase(caseId);
    });
});

test.describe.serial('Referred by Admin - Judge task automatic cancellation when case is void', {
    tag: '@work-allocation'
}, async() => {

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Send to interloc to be reviewed by Judge", async ({ sendToInterlocSteps }) => {

        test.slow();
        await sendToInterlocSteps.performSendToInterlocJudge(caseId);
    });

    test("Review Referred by Admin Pre Hearing Judge task is cancelled automatically when case is void", async ({ referredByAdminJudgeTaskSteps }) => {
        
        test.slow();
        await referredByAdminJudgeTaskSteps.verifyReferredByAdminJudgeTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});
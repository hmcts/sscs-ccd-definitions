import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";


let caseId : string;

test.describe.serial('WA - Abate(Judge) FTA not Provided Appointee Details - Judge task initiation and completion tests by Salaried Judge', {tag: '@work-allocation'}, async() => {

    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Update not listable case with directions not fulfilled to be reviewed by Judge", async ({ updateNotListableSteps }) => {

        test.slow();
        await updateNotListableSteps.performUpdateNotListableDirectionNotFulfilledAbateJudge(caseId);
    });

    test("As a Salaried Judge, view and complete the Abate(Judge) FTA not Provided Appointee Details - Judge task", async ({ ftaNotProvidedAppointeeDetailsJudgeTaskSteps }) => {
        test.slow();
        await ftaNotProvidedAppointeeDetailsJudgeTaskSteps.verifySalariedJudgeCanViewAndCompleteTheUnassignedFtaNotProvidedAppointeeDetailsJudgeTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant",async () => {
        //  await performAppealDormantOnCase(caseId);
    });
});

test.describe.serial('WA - Abate(Judge) FTA not Provided Appointee Details - Judge task initiation and completion tests by Fee-Paid Judge', {tag: '@work-allocation'}, async() => {

    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Update not listable case with directions not fulfilled to be reviewed by Judge", async ({ updateNotListableSteps }) => {

        test.slow();
        await updateNotListableSteps.performUpdateNotListableDirectionNotFulfilledAbateJudge(caseId);
    });

    test("As a Fee-Paid Judge, view and complete the Abate(Judge) FTA not Provided Appointee Details - Judge task", async ({ ftaNotProvidedAppointeeDetailsJudgeTaskSteps }) => {

        test.slow();
        await ftaNotProvidedAppointeeDetailsJudgeTaskSteps.verifyFeePaidJudgeCanViewAndCompleteTheUnassignedFtaNotProvidedAppointeeDetailsJudgeTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant",async () => {
        //  await performAppealDormantOnCase(caseId);
    });
});

test.describe.serial('Abate(Judge) FTA not Provided Appointee Details - Judge task automatic cancellation when case is void', {
    tag: '@work-allocation'
}, async() => {

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("Update not listable case with directions not fulfilled to be reviewed by Judge", async ({ updateNotListableSteps }) => {

        test.slow();
        await updateNotListableSteps.performUpdateNotListableDirectionNotFulfilledAbateJudge(caseId);
    });

    test("Review Abate(Judge) FTA not Provided Appointee Details - Judge task is cancelled automatically when case is void", async ({ ftaNotProvidedAppointeeDetailsJudgeTaskSteps }) => {
        
        test.slow();
        await ftaNotProvidedAppointeeDetailsJudgeTaskSteps.verifyFtaNotProvidedAppointeeDetailsJudgeTaskIsCancelledAutomaticallyWhenTheCaseIsVoid(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        // await performAppealDormantOnCase(caseId);
    });
});
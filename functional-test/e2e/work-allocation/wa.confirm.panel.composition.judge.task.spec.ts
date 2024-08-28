import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";
import { RolesAndAccess } from "../../pages/tabs/roles.and.access";


test.describe.serial('WA - Confirm panel composition Judge task initiation and cancelling tests', {
    tag: '@work-allocation'
}, async () => {

    let caseId: string;

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('CHILDSUPPORT');
    });

    test("Judge with Interlocutory-judge role, can view and assign 'Confirm panel composition' task", async ({
        confirmPanelCompositionTaskSteps,  }) => {

        test.slow();
        //await confirmPanelCompositionTaskSteps.allocateCaseToInterlocutoryJudge(caseId)
        await confirmPanelCompositionTaskSteps.createConfirmPanelCompositionTask(caseId);
        await confirmPanelCompositionTaskSteps.verifyTaskAndAssign(caseId);
    });

    test("Salaried Judge without Interlocutory-judge role, check if can't reassign 'Confirm panel composition' task", async ({
        confirmPanelCompositionTaskSteps }) => { 
        
        test.slow();
        //await confirmPanelCompositionTaskSteps.allocateCaseToInterlocutoryJudge(caseId)
        await confirmPanelCompositionTaskSteps.salariedJudgeCannotReassign(caseId);
    })

    test("Fee Paid Judge without Interlocutory-judge role, check if can't reassign 'Confirm panel composition' task", async ({
        confirmPanelCompositionTaskSteps }) => {

        test.slow();
        //await confirmPanelCompositionTaskSteps.allocateCaseToInterlocutoryJudge(caseId)
        await confirmPanelCompositionTaskSteps.feepaidJudgeCannotReassign(caseId);
    })


    test("CTSC Admin user, can cancel 'Confirm panel composition' task", async ({
        confirmPanelCompositionTaskSteps }) => {

        test.slow();
        await confirmPanelCompositionTaskSteps.cancelTask(caseId);
    });

    // test.afterAll("Case has to be set to Dormant", async () => {
    //     await performAppealDormantOnCase(caseId);
    // });
})

test.describe.serial('WA - Confirm panel composition Judge task completion tests', {
    tag: '@work-allocation'
}, async () => {

    let caseId: string;

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('CHILDSUPPORT');
    });

    test("Salaried Judge, can complete 'Confirm panel composition' task via Issue direction event", async ({
        confirmPanelCompositionTaskSteps }) => {

        test.slow();
        //await confirmPanelCompositionTaskSteps.allocateCaseToInterlocutoryJudge(caseId)
        await confirmPanelCompositionTaskSteps.createConfirmPanelCompositionTask(caseId);
        await confirmPanelCompositionTaskSteps.completeByIssueDirection(caseId);
    })

    test("Fee Paid Judge, can complete 'Confirm panel composition' task via Final decision event", async ({
        confirmPanelCompositionTaskSteps }) => {

        test.slow();
        //await confirmPanelCompositionTaskSteps.allocateCaseToInterlocutoryJudge(caseId)
        await confirmPanelCompositionTaskSteps.createConfirmPanelCompositionTask(caseId);
        await confirmPanelCompositionTaskSteps.completeByFinalDecisionEvent(caseId);
    })

    test("TCW, can complete 'Confirm panel composition' task via Review confidentiality event", async ({
        confirmPanelCompositionTaskSteps }) => {

        test.slow();
        //await confirmPanelCompositionTaskSteps.allocateCaseToInterlocutoryJudge(caseId)
        await confirmPanelCompositionTaskSteps.createConfirmPanelCompositionTask(caseId);
        await confirmPanelCompositionTaskSteps.completeByReviewConfidentiality(caseId);
    })

    // test.afterAll("Case has to be set to Dormant", async () => {
    //     await performAppealDormantOnCase(caseId);
    // });
})
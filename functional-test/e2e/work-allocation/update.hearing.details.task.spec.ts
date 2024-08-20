

import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";


//UPDATE TAG BEFORE PUSHING
test.describe.serial('WA - Update hearing details task initiation and reviewing tests', {
    tag: '@wip'
}, async () => {

    let caseId: string;

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("As a TCW without LO role, I can view but cannot reassign 'update hearing details' task", async ({
        updateHearingDetailsSteps }) => {

        test.slow();
        await updateHearingDetailsSteps.taskCreation(caseId);
        await updateHearingDetailsSteps.verifyTCWWithoutLORoleCanViewAndAssignTask(caseId);
    });

    test("As a TCW with LO role, I can view and reassign 'update hearing details' task", async ({
        updateHearingDetailsSteps }) => {

        test.slow();
        await updateHearingDetailsSteps.verifyTCWWithLORoleCanViewAndAssignTask(caseId);
    });

    // test.afterAll("Case has to be set to Dormant", async () => {
    //     await performAppealDormantOnCase(caseId);
    // });
})


//By options not events
test.describe.serial('WA - Update hearing details task completion test', {
    tag: '@TBD'
}, async () => {


    let caseId: string;

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    // ADD HERE TCW 

    // test.afterAll("Case has to be set to Dormant", async () => {
    //     await performAppealDormantOnCase(caseId);
    // });

})

test.describe.serial('WA - Update hearing details task cancellation test', {
    tag: '@TBD'
}, async () => {


    let caseId: string;

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    //ADD HERE TCW 

    // test.afterAll("Case has to be set to Dormant", async () => {
    //     await performAppealDormantOnCase(caseId);
    // });

})
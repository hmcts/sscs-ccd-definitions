

import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";


test.describe.serial('WA - Update hearing details task initiation and reviewing tests', {
    tag: '@work-allocation'
}, async () => {

    let caseId: string;

    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("As a TCW without Admin role, I can view but cannot reassign 'update hearing details' task", async ({
        updateHearingDetailsSteps }) => {

        test.slow();
        await updateHearingDetailsSteps.taskCreation(caseId);
        await updateHearingDetailsSteps.verifyTCWWithoutLORoleCanViewAndAssignTask(caseId);
    });

    test("As a TCW with Admin role, I can view and assign 'update hearing details' task", async ({
        updateHearingDetailsSteps }) => {

        test.slow();
        await updateHearingDetailsSteps.verifyTCWWithLORoleCanViewAndAssignTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
})
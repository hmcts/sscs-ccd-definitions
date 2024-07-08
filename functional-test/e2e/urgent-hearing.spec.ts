import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

let caseId : string;

test.beforeEach("Case has to be Created", async () => {
    caseId = await createCaseBasedOnCaseType('PIP');
});

test("Grant - Urgent hearing request", {tag: '@wip'}, async ({ urgentHearingSteps }) => {
    await urgentHearingSteps.requestAndGrantAnUrgentHearing(caseId);
});

test("Refuse - Urgent hearing request", async ({ urgentHearingSteps }) => {
    await urgentHearingSteps.requestAndRefuseAnUrgentHearing(caseId);
});

test("Error scenario - Upload encrypted file in Action further evidence event", async({ urgentHearingSteps }) => {
    await urgentHearingSteps.uploadEncryptedFiles(caseId);
});

 test.afterAll("Case has to be set to Dormant",async () => {
    // await performAppealDormantOnCase(caseId);
 });

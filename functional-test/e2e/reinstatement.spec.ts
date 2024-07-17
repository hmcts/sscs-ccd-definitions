import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

let caseId : string;

test.describe("Reinstatement test", {tag: '@pipeline'}, async() => {

    test.beforeEach("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });
    
    test("Grant - Reinstatement request", async ({ reinstatementSteps }) => {
        await reinstatementSteps.requestAndGrantAnReinstatement(caseId);
    });
    
    test("Refuse - Reinstatement request", async ({ reinstatementSteps }) => {
        await reinstatementSteps.requestAndRefuseAnReinstatement(caseId);
    });
    
     test.afterAll("Case has to be set to Dormant",async () => {
        await performAppealDormantOnCase(caseId);
     });
});

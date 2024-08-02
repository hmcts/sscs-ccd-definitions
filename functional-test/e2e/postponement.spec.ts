import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

let caseId : string;


test.describe("Postponement Request test", {tag: '@pipeline'}, async() => {

   /* test.beforeEach("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
        test.setTimeout(240000);
    });*/
    
    test(" Hearing Route as Gaps with a Grant Option", async ({ postponementSteps }) => {
        await postponementSteps.postponeAListAssistCaseWithASuccessfulGrant();
    });
    
   /* test("Refuse - Hearing recording request", async ({ uploadHearingSteps }) => {
        await uploadHearingSteps.requestAndRefuseAnHearingRecording(caseId);
    });
    
     test.afterAll("Case has to be set to Dormant",async () => {
        await performAppealDormantOnCase(caseId);
     });*/
    
});


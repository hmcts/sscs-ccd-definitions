import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";
let caseId : string;


test.describe("Request time extension test", {tag: '@pipeline'}, async() => {

    test.beforeAll("Case has to be Created",async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });
    
    test("Verify DWP user can succesfully request extension on a appeal", async ({ requestTimeExtensionSteps }) => {
        await requestTimeExtensionSteps.performAndVerifyRequestTimeExtension(caseId);
    });
    
    
     test.afterAll("Case has to be set to Dormant",async () => {
         await performAppealDormantOnCase(caseId);
     });
        
});


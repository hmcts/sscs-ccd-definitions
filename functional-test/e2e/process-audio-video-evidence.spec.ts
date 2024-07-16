import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

let caseId : string;

test.describe("Process audio/video evidence test", async() => {

    test.beforeEach("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });
    
    test("Grant - Audio/video evidence", {tag: '@wip'}, async ({ uploadResponseSteps, processAVEvidenceSteps  }) => {
        await uploadResponseSteps.performUploadResponseWithAVEvidenceOnAPIP(caseId);
        await processAVEvidenceSteps.acceptEvidence(caseId);
    });
    
    test("Refuse - Audio/video evidence", async ({  }) => {
    });
    
     test.afterAll("Case has to be set to Dormant",async () => {
        // await performAppealDormantOnCase(caseId);
     });
});

import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

let caseId : string;

test.describe("Process audio/video evidence test", {tag: "@pipeline"}, async() => {

    test.beforeEach("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });
    
    test("Grant - Audio/video evidence uploaded by DWP", async ({ uploadResponseSteps, processAVEvidenceSteps }) => {
        await uploadResponseSteps.performUploadResponseWithAVEvidenceOnAPIP(caseId);
        await processAVEvidenceSteps.acceptEvidenceUploadedByDWP(caseId);
    });

    test("Grant - Audio/video evidence uploaded by CTSC", async ({ uploadDocumentFurtherEvidenceSteps, processAVEvidenceSteps }) => {
        await uploadDocumentFurtherEvidenceSteps.performUploadDocumentFurtherEvidence(caseId, true);
        await processAVEvidenceSteps.acceptEvidenceUploadedByCTSC(caseId);
    });
    
    test("Refuse - Audio/video evidence uploaded by DWP", async ({ uploadResponseSteps, processAVEvidenceSteps }) => {

        await uploadResponseSteps.performUploadResponseWithAVEvidenceOnAPIP(caseId);
        await processAVEvidenceSteps.excludeEvidenceUploadedByDWP(caseId);
    });

    test("Refuse - Audio/video evidence uploaded by CTSC", async ({ uploadDocumentFurtherEvidenceSteps, processAVEvidenceSteps }) => {

        await uploadDocumentFurtherEvidenceSteps.performUploadDocumentFurtherEvidence(caseId, true);
        await processAVEvidenceSteps.excludeEvidenceUploadedByCTSC(caseId);
    });
    
    
     test.afterAll("Case has to be set to Dormant",async () => {
        // await performAppealDormantOnCase(caseId);
     });
});

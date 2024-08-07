import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

let caseId : string;


test.describe("Enhanced confidentiality test", async() => {

    test.beforeEach("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('UC');
        test.setTimeout(360000);
    });
    
    test("Grant - Confidentiality request", async ({ uploadResponseSteps, enhancedConfidentialitySteps, createBundleSteps }) => {
        await uploadResponseSteps.performUploadResponseOnAUniversalCreditWithJP(caseId);
        await enhancedConfidentialitySteps.requestForConfidentiality();
        await enhancedConfidentialitySteps.grantConfidentiality(caseId);
        await enhancedConfidentialitySteps.verifyConfidentialityFlag();
        await enhancedConfidentialitySteps.uploadSupplementaryCorrespondence(caseId);
        await enhancedConfidentialitySteps.requestForEvidenceConfidentiality();
        await enhancedConfidentialitySteps.verifyRedactedContent();
        await createBundleSteps.triggerBundleForConfidentialCase();
    });

    
});


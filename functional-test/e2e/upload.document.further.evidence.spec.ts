import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

let caseId : string;

test.describe.serial('WA - Action Unprocessed Correspondence CTSC task initiation and completion tests', {
    tag: '@work-allocation'
}, async () => {

    test.beforeAll("Create case and allocate to CTSC Admin", async ({ uploadDocumentFurtherEvidenceSteps }) => {
        caseId = await createCaseBasedOnCaseType('PIP');
        await uploadDocumentFurtherEvidenceSteps.allocateCaseToCtscUser(caseId);
    });

    test("As a CTSC Admin, upload document further evidence", async ({
        uploadDocumentFurtherEvidenceSteps }) => {

        test.slow();
        await uploadDocumentFurtherEvidenceSteps.performUploadDocumentFurtherEvidence(caseId);
    });

    test("CTSC Admin as allocated case worker, views the Action Unprocessed Correspondence CTSC task", async ({
        uploadDocumentFurtherEvidenceSteps }) => {

        test.slow();
        await uploadDocumentFurtherEvidenceSteps.verifyCtscAdminAsAllocatedCaseWorkerCanViewTheAutomaticallyAssignedActionUnprocessedCorrespondenceTask(caseId);
    });

    test("CTSC Admin as allocated case worker, completes the Action Unprocessed Correspondence CTSC task", async ({
        uploadDocumentFurtherEvidenceSteps }) => {

        test.slow();
        await uploadDocumentFurtherEvidenceSteps.verifyCtscAdminAsAllocatedCaseWorkerCanCompleteTheAssignedActionUnprocessedCorrespondenceTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});

test.describe('WA - Action Unprocessed Correspondence CTSC task cancellation', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;
    
    test.beforeAll("Create case", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("CTSC Admin cancels the unassigned Action Unprocessed Correspondence CTSC task manually", async ({
        uploadDocumentFurtherEvidenceSteps}) => {

        test.slow();
        await uploadDocumentFurtherEvidenceSteps.verifyUnassignedActionUnprocessedCorrespondenceTaskCanBeCancelledManuallyByCtscAdmin(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});
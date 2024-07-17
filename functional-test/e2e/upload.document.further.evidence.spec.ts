import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";


test.describe.serial('WA - Action Unprocessed Correspondence CTSC task initiation and completion tests', {
    tag: '@work-allocation'
}, async () => {

    let caseId : string;

    test.beforeAll("Create case and allocate to CTSC Admin", async ({ uploadDocumentFurtherEvidenceSteps }) => {
        caseId = await createCaseBasedOnCaseType('PIP');
        await uploadDocumentFurtherEvidenceSteps.allocateCaseToCtscUser(caseId);
    });

    test("As a CTSC Admin, upload document further evidence", async ({
        uploadDocumentFurtherEvidenceSteps }) => {

        test.slow();
        await uploadDocumentFurtherEvidenceSteps.performUploadDocumentFurtherEvidence(caseId, false);
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
    
    test.beforeAll("Create case", async ( { uploadDocumentFurtherEvidenceSteps }) => {
        test.slow();
        caseId = await createCaseBasedOnCaseType('PIP');
        await uploadDocumentFurtherEvidenceSteps.performUploadDocumentFurtherEvidence(caseId, false);
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


test.describe.serial('WA - Review Bi-Lingual Document CTSC task initiation and completion tests', {
    tag: '@work-allocation'
}, async () => {

    let caseId : string;

    test.beforeAll("Create case, allocate to CTSC Admin and update language preference to Welsh", async ({ 
        uploadDocumentFurtherEvidenceSteps,
        updateLanguagePreferenceSteps }) => {

        test.slow();
        caseId = await createCaseBasedOnCaseType('PIP');
        await uploadDocumentFurtherEvidenceSteps.allocateCaseToCtscUser(caseId);
        await updateLanguagePreferenceSteps.performUpdateLanguagePreference(caseId, false);
    });

    test("As a CTSC Admin, upload document further evidence", async ({
        uploadDocumentFurtherEvidenceSteps }) => {

        test.slow();
        await uploadDocumentFurtherEvidenceSteps.performUploadDocumentFurtherEvidence(caseId, false);
    });

    test("As a CTSC Admin, view the Review Bi-Lingual Document CTSC task", async ({
        uploadDocumentFurtherEvidenceSteps }) => {

        test.slow();
        await uploadDocumentFurtherEvidenceSteps.verifyCtscAdminAsAllocatedCaseWorkerCanViewTheAutomaticallyAssignedReviewBilingualDocumentTask(caseId);
    });

    test("CTSC Admin as allocated case worker, completes the Review Bi-Lingual Document CTSC task", async ({
        uploadDocumentFurtherEvidenceSteps }) => {

        test.slow();
        await uploadDocumentFurtherEvidenceSteps.verifyCtscAdminAsAllocatedCaseWorkerCanCompleteTheAssignedReviewBilingualDocumentTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});


test.describe.serial('WA - Review Bi-Lingual Document CTSC task cancellation tests', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;
    
    test.beforeAll("Create case and update language preference to Welsh", async ({ 
        updateLanguagePreferenceSteps }) => {

        test.slow();
        caseId = await createCaseBasedOnCaseType('PIP');
        await updateLanguagePreferenceSteps.performUpdateLanguagePreference(caseId);
    });

    test("As a CTSC Admin, upload document further evidence", async ({
        uploadDocumentFurtherEvidenceSteps }) => {

        test.slow();
        await uploadDocumentFurtherEvidenceSteps.performUploadDocumentFurtherEvidence(caseId, false);
    });

    test("CTSC Admin cancels the unassigned Review Bi-Lingual Document CTSC task manually", async ({
        uploadDocumentFurtherEvidenceSteps}) => {

        test.slow();
        await uploadDocumentFurtherEvidenceSteps.verifyUnassignedReviewBilingualDocumentTaskIsCancelledWhenTranslationsAreCancelledByCtscAdmin(caseId);
    });

    test("CTSC Admin verifies Review Bi-Lingual Document CTSC task is removed from the tasks list", async ({
        uploadDocumentFurtherEvidenceSteps}) => {

        test.slow();
        await uploadDocumentFurtherEvidenceSteps.verifyUnassignedReviewBilingualDocumentTaskIsRemovedFromTheTasksList(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});
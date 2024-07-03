import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

let caseId : string;

test.describe.serial('WA - Action Unprocessed Correspondence CTSC task initiation and completion tests', {
    tag: '@work-allocation'
}, async () => {

    test.beforeAll("Create case and allocate to CTSC Admin", async ({ supplementaryResponseSteps }) => {
        caseId = await createCaseBasedOnCaseType('PIP');
        await supplementaryResponseSteps.allocateCaseToCtscUser(caseId);
    });

    test("As a DWP user, provide supplementary response", async ({
        supplementaryResponseSteps }) => {

        test.slow();
        await supplementaryResponseSteps.performSupplementaryResponse(caseId);
    });

    test("CTSC Admin as allocated case worker, views the Action Unprocessed Correspondence task", async ({
        supplementaryResponseSteps }) => {

        test.slow();
        await supplementaryResponseSteps.verifyCtscAdminAsAllocatedCaseWorkerCanViewTheAutomaticallyAssignedActionUnprocessedCorrespondenceTask(caseId);
    });

    test("CTSC Admin as allocated case worker, completes the Action Unprocessed Correspondence task", async ({
        supplementaryResponseSteps }) => {

        test.slow();
        await supplementaryResponseSteps.verifyCtscAdminAsAllocatedCaseWorkerCanCompleteTheAssignedActionUnprocessedCorrespondenceTask(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});

test.describe('WA - Action Unprocessed Correspondence CTSC task cancellation', {
    tag: '@work-allocation'
}, async() => {

    let caseId : string;
    
    test.beforeAll("Create case and allocate to CTSC Admin", async ({ supplementaryResponseSteps }) => {
        caseId = await createCaseBasedOnCaseType('PIP');
        await supplementaryResponseSteps.allocateCaseToCtscUser(caseId);
    });

    test("CTSC Admin as allocated case worker, cancels the Action Unprocessed Correspondence CTSC task manually", async ({
        supplementaryResponseSteps}) => {

        test.slow();
        await supplementaryResponseSteps.verifyActionUnprocessedCorrespondenceTaskCanBeCancelledManuallyByAllocatedCtscAdmin(caseId);
    });

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
});
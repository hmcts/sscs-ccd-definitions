import { test } from '../lib/steps.factory';
import createCaseBasedOnCaseType from '../api/client/sscs/factory/appeal.type.factory';


test.describe('Reissue Further Evidence tests', { tag: '@pipeline' }, async () => {

    let caseId: string;

    test.beforeAll('Create case', async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test('Reissuing Further Evidence', async ({ reissueFurtherEvidenceSteps, uploadDocumentFurtherEvidenceSteps }) => {
        test.slow();
        //caseId = await createCaseBasedOnCaseType('PIP');
        await reissueFurtherEvidenceSteps.performUploadDocumentFurtherEvidence2(caseId, false);
        await reissueFurtherEvidenceSteps.performActionEvidence(caseId);
        await reissueFurtherEvidenceSteps.performReissueFurtherEvidence(caseId);
    })
})
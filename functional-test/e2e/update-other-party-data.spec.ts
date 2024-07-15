import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";

let caseId: string;

test("Adding Other party data in a ChildSupport case", { tag: '@wip' }, async ({ updateOtherPartyDataSteps }) => {
    test.slow();
    await updateOtherPartyDataSteps.performUpdateOtherPartyData(caseId);
})

test("Adding Other party data in a TaxCredit case", { tag: '@wip' }, async ({ updateOtherPartyDataSteps }) => {
    test.slow();
    await updateOtherPartyDataSteps.performUpdateOtherPartyDataTaxCredit(caseId);
})

// test("Updating subscription for other", { tag: '@wip' }, async ({ updateOtherPartyDataSteps }) => {
//     test.slow();
//     await updateOtherPartyDataSteps.performUpdateOtherPartyDataTaxCredit(caseId);
// })
import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";

let caseId: string;

test("Adding Other party data in a ChildSupport case", { tag: "@wip" }, async ({ updateOtherPartyDataSteps }) => {
    test.slow();
    await updateOtherPartyDataSteps.performUpdateOtherPartyData(caseId);
})

// test("Adding Other party data in a TaxCredit case", async ({ updateSubscriptionSteps }) => {
//  
// })
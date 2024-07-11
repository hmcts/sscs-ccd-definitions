import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";

let caseId: string;

test("Performing Update subscription event for all parties PIP case", { tag: '@wip' }, async ({ updateSubscriptionSteps }) => {
    test.slow();
    await updateSubscriptionSteps.performUpdateSubscription(caseId);
});

// pre-requisite 'Update other party data' event must be run first. Add this now or later? 
// test("Performing Update subscription event for Other party CHILDSUPPORT case", { tag: '@wip' }, async ({ updateSubscriptionSteps }) => {
//     test.slow();
//     await updateSubscriptionSteps.performUpdateSubscriptionChildSupport(caseId);
// });
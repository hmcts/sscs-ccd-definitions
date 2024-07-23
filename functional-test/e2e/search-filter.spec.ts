import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";

let caseId: string;
let caseId2: string;
let caseId3: string;

test.beforeEach("Cases have to be Created", async () => {
    caseId = await createCaseBasedOnCaseType('PIP');
    caseId2 = await createCaseBasedOnCaseType('CHILDSUPPORT');
    caseId3 = await createCaseBasedOnCaseType('TAX CREDIT');
});

test("Searching case by benefit and issue code ", { tag: '@wip' }, async ({ searchFilterSteps }) => {
    test.slow();
    await searchFilterSteps.performSearchSteps;
})

// searching case by benefit + issue codesgit
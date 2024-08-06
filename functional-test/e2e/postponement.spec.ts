import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

let caseId : string;


test.describe("Postponement Request test", {tag: '@pipeline'}, async() => {

    test(" Hearing Route as Gaps with a Grant Option", async ({ postponementSteps }) => {
        test.slow();
        await postponementSteps.postponeAListAssistCaseWithAPostponement('Grant Postponement');
    });

    test(" Hearing Route as Gaps with a Refuse Option", async ({ postponementSteps }) => {
        test.slow();
        await postponementSteps.postponeAListAssistCaseWithAPostponement('Refuse Postponement');
    });

    test(" Hearing Route as Gaps with a Send to Judge Option", async ({ postponementSteps }) => {
        test.slow();
        await postponementSteps.postponeAListAssistCaseWithAPostponement('Send to Judge');
    });
});


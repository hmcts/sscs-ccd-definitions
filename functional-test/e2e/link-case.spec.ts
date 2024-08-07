import {test} from "../lib/steps.factory";

test.describe('Link a case tests', {tag: '@pipeline'}, () => {


    // Happy Path test:
    test("As a caseworker link a case to another case", async ({linkACaseSteps}) => {
        await linkACaseSteps.linkCaseSuccessfully();
    })

    // Test for error message that comes with linking invalid case:
    test("As a caseworker I should not be able link a case to a non-existent case", async ({linkACaseSteps}) => {
        await linkACaseSteps.linkNonExistingCase();
    })

    // Test for error message that comes with linking a case to itself
    test("As a caseworker I should not be able to link a case to itself", async ({linkACaseSteps}) => {
        await linkACaseSteps.linkCaseToItself();
    })

    // Test for removing link between cases after link a case has linked them together.
    test("As a caseworker I should be able to unlink cases", async ({linkACaseSteps}) => {
        await linkACaseSteps.removeLinkedCase();
    })


})
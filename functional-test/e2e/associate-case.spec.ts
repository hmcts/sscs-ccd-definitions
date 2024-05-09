import { test } from "../lib/steps.factory";

test.describe('Associate case tests', () => {

    /* TODO: Below test needs to be revisited when the relevant bug is fixed.
    Related cases tab is not displayed after the Associate case event is completed
    successfully.
    */
    test("As a caseworker associate a case to another case", async ({ associateCaseSteps }) => {
        await associateCaseSteps.associateCaseSuccessfully();
    });

    test("As a caseworker I should not be able associate a case to non-existent case", async ({ associateCaseSteps }) => {
        await associateCaseSteps.associateNonExistentCase();
    });

    /* TODO: Below test needs to be revisited when the relevant bug is fixed.
    No validation is in place when the user self associates the case.
    */
    test.describe.fixme(() => {
        test("As a caseworker I should not be able self associate a case", async ({ associateCaseSteps }) => {
         await associateCaseSteps.selfAssociateACase();
        });
    });
});





import { test } from "../lib/steps.factory";
import {getSSCSIDAMUserToken} from "../api/client/idam/idam.service";

test.skip("Test to Add a note to a case", async ({ addNoteSteps }) => {
    await getSSCSIDAMUserToken();
});

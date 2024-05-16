import { test } from "../lib/steps.factory";
import {getSSCSIDAMUserToken, getSSCSServiceToken} from "../api/client/idam/idam.service";

test.only("Test to Add a note to a case", async ({ addNoteSteps }) => {
    //await getSSCSIDAMUserToken();
    await getSSCSServiceToken();
});

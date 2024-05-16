import { test } from "../lib/steps.factory";
import {credentials} from "../config/config"
import {getIDAMUserToken, getSSCSServiceToken, getIDAMUserID} from "../api/client/idam/idam.service";

test.only("Test to Add a note to a case", async ({ addNoteSteps }) => {
    let token :string = await getIDAMUserToken(credentials.caseWorker);
    //await getSSCSServiceToken();
    await getIDAMUserID(token);
});

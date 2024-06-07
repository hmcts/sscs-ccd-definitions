import {test} from "../lib/steps.factory";
import {credentials} from "../config/config"
import {accessToken, getSSCSServiceToken, getIDAMUserID} from "../api/client/idam/idam.service";
import performEventOnCase from "../api/client/sscs/factory/appeal.update.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";

test.only("Test to Add a note to a case", async ({addNoteSteps}) => {
    let token: string = await accessToken(credentials.caseWorker);
    console.log("The value of the IDAM Token : "+token);
    let serviceToken: string = await getSSCSServiceToken();
    let userId: string = await getIDAMUserID(token);
    let pipCaseId = await createCaseBasedOnCaseType("CHILDSUPPORT");
    await performEventOnCase(token.trim(),
        serviceToken.trim(), userId.trim(),
        'SSCS','Benefit',
        pipCaseId.trim(),'appealDormant')
});

import {test} from "../lib/steps.factory";
import {credentials} from "../config/config"
import {accessToken, getSSCSServiceToken,accessId} from "../api/client/idam/idam.service";
import performEventOnCaseWithEmptyBody from "../api/client/sscs/factory/appeal.update.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performEventOnCaseWithUploadResponse from "../api/client/sscs/factory/appeal.update.factory";

test("Test to Add a note to a case", async ({addNoteSteps}) => {
    let token: string = await accessToken(credentials.caseWorker);
    console.log("The value of the IDAM Token : "+token);
    let serviceToken: string = await getSSCSServiceToken();
    let userId: string = await accessId(credentials.caseWorker);
    let pipCaseId = await createCaseBasedOnCaseType("CHILDSUPPORT");
    await performEventOnCaseWithEmptyBody(token.trim(),
        serviceToken.trim(), userId.trim(),
        'SSCS','Benefit',
        pipCaseId.trim(),'appealDormant')
   /* await performEventOnCaseWithUploadResponse(token.trim(),
        serviceToken.trim(), userId.trim(),
        'SSCS','Benefit',
        pipCaseId.trim(),'appealDormant')*/
});

import {test} from "../lib/steps.factory";
import {credentials} from "../config/config"
import {accessToken, getSSCSServiceToken, accessId, getIDAMUserID} from "../api/client/idam/idam.service";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import {
    performEventOnCaseWithEmptyBody,
    performEventOnCaseWithUploadResponse
} from "../api/client/sscs/factory/appeal.update.factory";

test.only("Test to Make an Appeal Dormant", async ({addNoteSteps}) => {

    let token: string = await accessToken(credentials.amSuperUser);
    //let token: string = await accessToken(credentials.judge);
    console.log("The value of the IDAM Token : "+token);
    let serviceToken: string = await getSSCSServiceToken();
    let userId: string = await accessId(credentials.amSuperUser);
    let pipCaseId = await createCaseBasedOnCaseType("CHILDSUPPORT");

    await new Promise(f => setTimeout(f, 4000)); //Delay required for the Case to be ready
    await performEventOnCaseWithEmptyBody(token.trim(),
        serviceToken.trim(), userId.trim(),
        'SSCS','Benefit',
        pipCaseId.trim(),'appealDormant');

  /*await performEventOnCaseWithUploadResponse(token.trim(),
        serviceToken.trim(), userId.trim(),
        'SSCS','Benefit',
        pipCaseId.trim(),'dwpUploadResponse');*/
});

import {test} from "../lib/steps.factory";
import {credentials} from "../config/config"
import {accessToken, getSSCSServiceToken, accessId, getIDAMUserID} from "../api/client/idam/idam.service";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import {
    performEventOnCaseWithEmptyBody,
    performEventOnCaseWithUploadResponse
} from "../api/client/sscs/factory/appeal.update.factory";
import logger from "../utils/loggerUtil";
//var event_token: string = JSON.parse(response_document).push({hello: 'value'});
import fs from 'fs';

test("Test to Make an Appeal Dormant", async ({addNoteSteps}) => {

    let childSupportCaseId = await createCaseBasedOnCaseType("CHILDSUPPORT");

    let judgeToken: string = await accessToken(credentials.dwpResponseWriter);
    let serviceTokenForJudge: string = await getSSCSServiceToken();
    let judgeUserId: string = await accessId(credentials.dwpResponseWriter);
    await new Promise(f => setTimeout(f, 3000)); //Delay required for the Case to be ready

    await performEventOnCaseWithUploadResponse(judgeToken.trim(),
        serviceTokenForJudge.trim(), judgeUserId.trim(),
        'SSCS','Benefit-3545',
        childSupportCaseId.trim(),'dwpUploadResponse');


   /* let token: string = await accessToken(credentials.amSuperUser);
    let serviceToken: string = await getSSCSServiceToken();
    let userId: string = await accessId(credentials.amSuperUser);
    await new Promise(f => setTimeout(f, 3000)); //Delay required for the Case to be ready
     await performEventOnCaseWithEmptyBody(token.trim(),
         serviceToken.trim(), userId.trim(),
         'SSCS','Benefit-3545',
         childSupportCaseId.trim(),'appealDormant');
    logger.info("The value of the IDAM Token : "+token);*/


});

/*test.only("Temporary testing of the JSON Node on Json Node", async ({addNoteSteps}) => {

    fs.readFile('./functional-test/api/data/payload/upload-response/upload-response.json', function read(err, data) {
        if (err) {
            throw err;
        }
        const content = data;

        // Invoke the next step here however you like
        console.log(content.toString());   // Put all of the code here (not the best solution)
    });

    /!*var response_document = {
        documentLink: {
            document_url: "http://dm-store-aat.service.core-compute-aat.internal/documents/b4b8b038-1e11-49b3-b83e-13546cfc152d",
            document_binary_url: "http://dm-store-aat.service.core-compute-aat.internal/documents/b4b8b038-1e11-49b3-b83e-13546cfc152d/binary",
            document_filename: "Bloggs_IEF.pdf"
        },
        documentFilename: "Bloggs_IEF.pdf"
    };
    //var event_token: string = JSON.parse(response_document).push({hello: 'value'});
    console.log("The value of the event Token : "+response_document)*!/

});*/

/* eslint-disable complexity */
import logger from '../../../utils/loggerUtil';
import {accessId, accessToken, getSSCSServiceToken} from "../idam/idam.service";
import {credentials} from "../../../config/config";
import performEventOnCase from "./factory/appeal.update.factory";

export default async function performAppealDormantOnCase(caseId: string) {
    let token: string = await accessToken(credentials.caseWorker);
    console.log("The value of the IDAM Token : "+token);
    let serviceToken: string = await getSSCSServiceToken();
    let userId: string = await accessId(token);
    await performEventOnCase(token.trim(),
        serviceToken.trim(), userId.trim(),
        'SSCS','Benefit',
        caseId.trim(),'appealDormant')
}

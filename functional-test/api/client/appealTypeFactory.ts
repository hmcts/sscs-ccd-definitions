/* eslint-disable complexity */
import {request} from '@playwright/test';

import {urls} from '../../config/config'
import pipPayload from '../../data/payload/pip_sya.json';
import ucPayload from '../../data/payload/uc_sya.json';
import esaPayload from '../../data/payload/esa_sya.json';
import childSupportPayload from '../../data/payload/child_support_sya.json';
import taxCreditPayload from '../../data/payload/tax_credit_sya.json';
import pipSandLPayload from '../../data/payload/pip_sandl_sya.json';
import dlaSandLPayload from '../../data/payload/dla_sandl_sya.json';
import ucSandLVideoPayload from '../../data/payload/uc_sandl_video_sya.json';
import piprepFtoFSandLPayload from '../../data/payload/pip_sandl_rep_ftof.json';
import piprepSandLPayload from '../../data/payload/pip_sandl_rep.json';


async function createCaseBasedOnCaseType(caseType: string) {
    let apiContext;
    let dataPayload;

    //Formulate API Context For Request,wrapping the Request Endpoint
    apiContext = await request.newContext({
        // All requests we send go to this API Endpoint.
        baseURL: urls.tribunalsApiUri,
    });

    dataPayload =
        caseType == "PIP"
            ? pipPayload
            : caseType == "UC"
                ? ucPayload
                : caseType == "ESA"
                    ? esaPayload
                    : caseType == "CHILDSUPPORT"
                        ? childSupportPayload
                        : caseType == "TAX CREDIT"
                            ? taxCreditPayload
                            : caseType == "PIPSANDL"
                                ? pipSandLPayload
                                : caseType == "DLASANDL"
                                    ? dlaSandLPayload
                                    : caseType == "UCSANDL"
                                        ? ucSandLVideoPayload
                                        : caseType == "PIPREPINTERSANDL"
                                            ? piprepFtoFSandLPayload
                                            : caseType == "PIPREPSANDL"
                                                ? piprepSandLPayload
                                                : new Error("Unsupported case type");

    const response = await apiContext.post(`${urls.tribunalsApiUri}/api/appeals`, {
        data: dataPayload
    });
    const respHeaders = response.headers();
    const locationUrl: string = respHeaders.location;
    let caseId = locationUrl.substring(locationUrl.lastIndexOf('/') + 1);
    console.log(`Case id is ${caseId}`);
    return caseId;
}

export default createCaseBasedOnCaseType;

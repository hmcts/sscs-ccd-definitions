/* eslint-disable complexity */
import {request} from '@playwright/test';
import {urls} from '../../../../config/config';
import logger from '../../../../utils/loggerUtil';

let apiContext;
async function getStartEventTokenOnCase (idamToken: string,
                                                 serviceToken: string,
                                                 userId: string,
                                                 jurisdiction: string,
                                                 caseType: string,
                                                 caseId: string,eventId: string) {
    //Formulate API Context For Request,wrapping the Request Endpoint
    apiContext = await request.newContext({
        // All requests we send go to this API Endpoint.
        baseURL: urls.ccdApiUrl,
    });
    const responseForStartAnEvent = await apiContext
        .get(`${urls.ccdApiUrl}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/event-triggers/${eventId}/token`, {
            headers: {
                Authorization: `Bearer ${idamToken}`,
                ServiceAuthorization: `${serviceToken}`,
                'content-type': 'application/json',
            }
        });
    logger.info('The value of the status for the start event :'+ responseForStartAnEvent.status());
    logger.info('The value of the status text for the start event:'+ responseForStartAnEvent.statusText());
    const body : string = await responseForStartAnEvent.body();
    await responseForStartAnEvent.dispose();
    return body;
}

export default async function performEventOnCaseWithEmptyBody(idamToken: string,
                                                              serviceToken: string,
                                                              userId: string,
                                                              jurisdiction: string,
                                                              caseType: string,
                                                              caseId: string, eventId: string) {

    //logger.info('The logger value for the body : ' + body);
    let body :string = await getStartEventTokenOnCase(idamToken,
        serviceToken,
        userId,
        jurisdiction,
        caseType,
        caseId, eventId);
    let event_token :string = JSON.parse(body).token;

    let dataPayload = {
        event: {
            id: `${eventId}`,
            summary: `Summary for the ${eventId} of ${caseId}`,
            description: `Description for the ${eventId} of ${caseId}`,
        },
        data: {},
        event_token: `${event_token}`,
        ignore_warning: true,
    }

    logger.info('The payload : ' + JSON.stringify(dataPayload));

    let endURL : string = `${urls.ccdApiUrl}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`;
    logger.info('The end URL : ' + endURL);

    const responseForSubmitAnEvent = await apiContext
        .post(`${endURL}`, {
            headers: {
                Authorization: `Bearer ${idamToken}`,
                ServiceAuthorization: `${serviceToken}`,
                'content-type': 'application/json',
            },
            data : dataPayload
        });
    logger.info('The value of the status for the submit event :'+ responseForSubmitAnEvent.status());
    logger.info('The value of the status text for the submit event :'+ responseForSubmitAnEvent.statusText());


    if (responseForSubmitAnEvent.status() != 201) {
        throw new Error("Error : Could not set the case to Dormant with status code - "
            + responseForSubmitAnEvent.status()+ " and message "+ responseForSubmitAnEvent.statusText());
    }

   // @ts-ignore
    export default async function performEventOnCaseWithUploadResponse(idamToken: string,
                                                                  serviceToken: string,
                                                                  userId: string,
                                                                  jurisdiction: string,
                                                                  caseType: string,
                                                                  caseId: string, eventId: string) {

        let response_document = {
            "documentLink": {
                "document_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/b4b8b038-1e11-49b3-b83e-13546cfc152d",
                "document_binary_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/b4b8b038-1e11-49b3-b83e-13546cfc152d/binary",
                "document_filename": "Bloggs_IEF.pdf"
            },
            "documentFilename": "Bloggs_IEF.pdf"
        };

        let body: string = await getStartEventTokenOnCase(idamToken,
            serviceToken,
            userId,
            jurisdiction,
            caseType,
            caseId, eventId);
        let event_token :string = JSON.parse(body).token;
        let case_details = JSON.parse(body).case_details;


        /*let dataPayload = {
            event: {
                id: `${eventId}`,
                summary: `Summary for the ${eventId} of ${caseId}`,
                description: `Description for the ${eventId} of ${caseId}`,
            },
            data: {},
            event_token: `${event_token}`,
            ignore_warning: true,
        }*/
        logger.info('The case_details : ' + JSON.stringify(case_details));
    }
}

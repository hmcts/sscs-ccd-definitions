/* eslint-disable complexity */
import {request} from '@playwright/test';
import {urls} from '../../../../config/config';
import logger from '../../../../utils/loggerUtil';

export async function performEventOnCase(idamToken: string,
                                        serviceToken: string,
                                        userId: string,
                                        jurisdiction: string,
                                        caseType: string,
                                        caseId: string, eventId: string) {
    let apiContext;

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
    //logger.info('The logger value for the body : ' + body);
    let event_id :string = JSON.parse(body).event_id;
    let event_token :string = JSON.parse(body).token;
    await responseForStartAnEvent.dispose();

    let dataPayload = {
        event: {
            id: `${event_id}`,
            summary: `Summary for the Dormant of ${caseId}`,
            description: `Description for the Dormant of ${caseId}`,
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
}

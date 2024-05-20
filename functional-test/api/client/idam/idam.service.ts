/* eslint-disable complexity */
import {request} from '@playwright/test';
import {urls, credentials, resources} from '../../../config/config';
import logger from '../../../utils/loggerUtil';


export async function getIDAMUserToken(user) {
    const scope = 'openid profile roles';
    const grantType = 'password';
    const idamTokenPath = '/o/token';
    let apiContext;

    //Formulate API Context For Request,wrapping the Request Endpoint
    apiContext = await request.newContext({
        // All requests we send go to this API Endpoint.
        baseURL: urls.idamUrl,
        extraHTTPHeaders: {
            // We set this header per GitHub guidelines.
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
    });
    const response = await apiContext.post(`${urls.idamUrl}${idamTokenPath}`, {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        form: {
            grant_type: `${grantType}`,
            client_secret: `${resources.idamClientSecret}`,
            client_id: `${resources.idamClientId}`,
            scope: `${scope}`,
            redirect_uri: `${resources.idamClientRedirect}`,
            username: `${user.email}`,
            password: `${user.password}`
        }
    });
    logger.info('The value of the status :' + response.status());
    let token = response.statusText();
    const body: string = await response.body();
    await response.dispose();
    return JSON.parse(body).access_token;
}

export async function getSSCSServiceToken() {
    const s2sTokenPath = '/testing-support/lease';

    let apiContext = await request.newContext({
        // All requests we send go to this API Endpoint.
        baseURL: urls.s2sUrl,
        extraHTTPHeaders: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
    });

    const response = await apiContext.post(`${urls.s2sUrl}${s2sTokenPath}`, {
        headers: {
            'content-type': 'application/json',
        },
        data: {microservice: `${resources.idamClientId}`}
    });
    logger.info('The value of the status :' + response.status());
    let statusText = response.statusText();
    logger.info('The value of the status :' + statusText);
    const body = await response.body();
    logger.info('The value of the service token :' + body);
    await response.dispose();
    return body;
}

export async function getIDAMUserID(idamToken) {
    const idamDetailsPath = '/details';

    let apiContext = await request.newContext({
        // All requests we send go to this API Endpoint.
        baseURL: urls.idamUrl,
        extraHTTPHeaders: {
            'content-type': 'application/json'
        },
    });

    const response = await apiContext.get(`${urls.idamUrl}${idamDetailsPath}`, {
        headers: {
            Authorization: `Bearer ${idamToken}`,
            'content-type': 'application/json',
        }
    });
    logger.info('The value of the status :' + response.status());
    let statusText = response.statusText();
    const body= await response.body();
    // @ts-ignore
    logger.info('The value of the id :' + JSON.parse(body).id);
    // @ts-ignore
    return JSON.parse(body).id;
}

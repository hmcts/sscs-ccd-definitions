/* eslint-disable complexity */
import {request} from '@playwright/test';
import {urls, credentials, resources} from '../../../config/config';


export async function getSSCSIDAMUserToken() {
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
            // Add GitHub personal access token.
        },
        form: {
            grant_type: `${grantType}`,
            client_secret: `${resources.idamClientSecret}`,
            client_id: `${resources.idamClientId}`,
            scope: `${scope}`,
            redirect_uri: `${resources.idamClientRedirect}`,
            username: `${credentials.caseWorker.email}`,
            password: `${credentials.caseWorker.password}`
        }
    });
    console.log('The value of the status :' + response.status());
    let token = response.statusText();
    const body: string = await response.body();
    response.dispose();
    return 'Bearer ' + JSON.parse(body).access_token;
}

export async function getSSCSServiceToken() {
    const s2sTokenPath = '/testing-support/lease';

    let apiContext = await request.newContext({
        // All requests we send go to this API Endpoint.
        baseURL: urls.s2sUrl,
        extraHTTPHeaders: {
            // We set this header per GitHub guidelines.
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
    });

    const response = await apiContext.post(`${urls.s2sUrl}${s2sTokenPath}`, {
        headers: {
            'content-type': 'application/json',
            // Add GitHub personal access token.
        },
        data: {microservice: `${resources.idamClientId}`}
    });
    console.log('The value of the status :' + response.status());
    let statusText = response.statusText();
    console.log('The value of the status :' + statusText);
    const body = await response.body();
    console.log('The value of the token :' + body);
    return body;
}

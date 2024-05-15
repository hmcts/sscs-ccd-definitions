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
            'Content-Type': 'application/x-www-form-urlencoded',
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
    return 'Bearer ' + JSON.parse(body).access_token;
}


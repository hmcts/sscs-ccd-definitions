/* eslint-disable complexity */
import { test, request } from '@playwright/test';

//import { Logger } from '@hmcts/nodejs-logging';
import config from '../config/config';
// import rp from 'request-promise';
import pipPayload from '../data/apiJsonTestData/pip_sya.json';
import ucPayload from '../data/apiJsonTestData/uc_sya.json';
import esaPayload from '../data/apiJsonTestData/esa_sya.json';
import childSupportPayload from '../data/apiJsonTestData/child_support_sya.json';
import taxCreditPayload from '../data/apiJsonTestData/tax_credit_sya.json';
import pipSandLPayload from '../data/apiJsonTestData/pip_sandl_sya.json';
import dlaSandLPayload from '../data/apiJsonTestData/dla_sandl_sya.json';
import ucSandLVideoPayload from '../data/apiJsonTestData/uc_sandl_video_sya.json';
import piprepFtoFSandLPayload from '../data/apiJsonTestData/pip_sandl_rep_ftof.json';
import piprepSandLPayload from '../data/apiJsonTestData/pip_sandl_rep.json';
import { Console, exception } from 'console';


async function setUpData(caseType: string){
  let apiContext;
  let dataPayload;
  // create new test data
  apiContext = await request.newContext({
          // All requests we send go to this API endpoint.
          baseURL: config.tribunalsApiUri,
        });

  console.log('creating new test data...');

  dataPayload = 
    caseType == "PIP"
      ? pipPayload
      :caseType == "UC"
      ? ucPayload
      :caseType == "ESA"
      ? esaPayload
      :caseType == "CHILDSUPPORT"
      ? childSupportPayload
      :caseType == "TAX CREDIT"
      ? taxCreditPayload
      :caseType == "PIPSANDL"
      ? pipSandLPayload
      :caseType == "DLASANDL"
      ? dlaSandLPayload
      :caseType == "UCSANDL"
      ? ucSandLVideoPayload
      :caseType == "PIPREPINTERSANDL"
      ? piprepFtoFSandLPayload
      :caseType == "PIPREPSANDL"
      ? piprepSandLPayload
      : new Error("Unsupported case type");

      const response = await apiContext.post(`${config.tribunalsApiUri}/api/appeals`, {
              data: dataPayload
      });
      const respHeaders = response.headers();
      const locationUrl: string = respHeaders.location;
      let caseId = locationUrl.substring(locationUrl.lastIndexOf('/') + 1);
      console.log(`Case id is ${caseId}`);
      return caseId;
  

}
export default setUpData;
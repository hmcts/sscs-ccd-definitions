import { Logger } from '@hmcts/nodejs-logging';
import config from 'config';
import rp from 'request-promise';
import ucPayload from '../features/json/uc_sya.json';
import pipPayload from '../features/json/pip_sya.json';
import esaPayload from '../features/json/esa_sya.json';
import childSupportPayload from '../features/json/child_support_sya.json';
import taxCreditPayload from '../features/json/tax_credit_sya.json';
import pipSandLPayload from '../features/json/pip_sandl_sya.json';

const logger = Logger.getLogger('ccd.ts');

const timeout = config.get('ApiCallTimeout');

interface CaseDetails {
  case_reference: string;
  appellant_tya: string;
  joint_party_tya: string;
  representative_tya: string;
  id: string;
  email: string;
}

async function createCase(hearingType): Promise<CaseDetails> {
  const randomNumber = parseInt(`${Math.random() * 10000000}`, 10);
  const email = `test${randomNumber}@hmcts.net`;
  const options = {
    url: `${config.get('tribunals.uri')}/api/case`,
    qs: { email, hearingType },
    json: true,
    timeout,
  };
  let caseDetails: CaseDetails = null;
  try {
    caseDetails = await rp.post(options);
    logger.info(
      `Created CCD case for ${caseDetails.email} with ID ${caseDetails.id} and reference ${caseDetails.case_reference} and appellant_tya ${caseDetails.appellant_tya} and jp_tya ${caseDetails.joint_party_tya} and representative_tya ${caseDetails.representative_tya}`
    );
  } catch (error) {
    logger.error('Error at CCD createCase:', error.error);
  }
  return caseDetails;
}

async function createSYACase(caseType: string) {
  let caseId: string = null;
  let options = {};

  if (caseType === 'UC') {
    options = {
      method: 'POST',
      uri: `${config.get('tribunals.uri')}/api/appeals`,
      body: ucPayload,
      json: true,
      resolveWithFullResponse: true,
    };
  } else if (caseType === 'PIP' || caseType === 'CAMPIP') {
    options = {
      method: 'POST',
      uri: `${config.get('tribunals.uri')}/api/appeals`,
      body: pipPayload,
      json: true,
      resolveWithFullResponse: true,
    };
  } else if (caseType === 'ESA') {
    options = {
      method: 'POST',
      uri: `${config.get('tribunals.uri')}/api/appeals`,
      body: esaPayload,
      json: true,
      resolveWithFullResponse: true,
    };
  } else if (caseType === 'Child Support') {
    options = {
      method: 'POST',
      uri: `${config.get('tribunals.uri')}/api/appeals`,
      body: childSupportPayload,
      json: true,
      resolveWithFullResponse: true,
    };
  } else if (caseType === 'Tax Credit') {
    options = {
      method: 'POST',
      uri: `${config.get('tribunals.uri')}/api/appeals`,
      body: taxCreditPayload,
      json: true,
      resolveWithFullResponse: true,
    };
  } else if (caseType === 'SANDLPIP') {
    options = {
      method: 'POST',
      uri: `${config.get('tribunals.uri')}/api/appeals`,
      body: pipSandLPayload,
      json: true,
      resolveWithFullResponse: true,
    };
  } else {
    throw new Error('Unsupported case type passed');
  }

  await rp
    .post(options)
    .then(function (response) {
      const locationUrl: string = response.headers.location;
      caseId = locationUrl.substring(locationUrl.lastIndexOf('/') + 1);
    })
    .catch(function (error) {
      logger.error(`Error at CCD createCase`, error);
      throw error;
    });

  return caseId;
}

export { createCase, createSYACase };

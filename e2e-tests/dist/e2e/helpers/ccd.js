"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSYACase = exports.createCase = void 0;
/* eslint-disable complexity */
const nodejs_logging_1 = require("@hmcts/nodejs-logging");
const config_1 = __importDefault(require("config"));
const request_promise_1 = __importDefault(require("request-promise"));
const uc_sya_json_1 = __importDefault(require("../features/json/uc_sya.json"));
const pip_sya_json_1 = __importDefault(require("../features/json/pip_sya.json"));
const esa_sya_json_1 = __importDefault(require("../features/json/esa_sya.json"));
const child_support_sya_json_1 = __importDefault(require("../features/json/child_support_sya.json"));
const tax_credit_sya_json_1 = __importDefault(require("../features/json/tax_credit_sya.json"));
const pip_sandl_sya_json_1 = __importDefault(require("../features/json/pip_sandl_sya.json"));
const dla_sandl_sya_json_1 = __importDefault(require("../features/json/dla_sandl_sya.json"));
const uc_sandl_video_sya_json_1 = __importDefault(require("../features/json/uc_sandl_video_sya.json"));
const pip_sandl_rep_ftof_json_1 = __importDefault(require("../features/json/pip_sandl_rep_ftof.json"));
const pip_sandl_rep_json_1 = __importDefault(require("../features/json/pip_sandl_rep.json"));
const logger = nodejs_logging_1.Logger.getLogger('ccd.ts');
const timeout = config_1.default.get('ApiCallTimeout');
async function createCase(hearingType) {
    const randomNumber = parseInt(`${Math.random() * 10000000}`, 10);
    const email = `test${randomNumber}@hmcts.net`;
    const options = {
        url: `${config_1.default.get('tribunals.uri')}/api/case`,
        qs: { email, hearingType },
        json: true,
        timeout,
    };
    let caseDetails = null;
    try {
        caseDetails = await request_promise_1.default.post(options);
        logger.info(`Created CCD case for ${caseDetails.email} with ID ${caseDetails.id} and reference ${caseDetails.case_reference} and appellant_tya ${caseDetails.appellant_tya} and jp_tya ${caseDetails.joint_party_tya} and representative_tya ${caseDetails.representative_tya}`);
    }
    catch (error) {
        logger.error('Error at CCD createCase:', error.error);
    }
    return caseDetails;
}
exports.createCase = createCase;
async function createSYACase(caseType) {
    let caseId = null;
    let options = {};
    if (caseType === 'UC') {
        options = {
            method: 'POST',
            uri: `${config_1.default.get('tribunals.uri')}/api/appeals`,
            body: uc_sya_json_1.default,
            json: true,
            resolveWithFullResponse: true,
        };
    }
    else if (caseType === 'PIP' || caseType === 'CAMPIP') {
        options = {
            method: 'POST',
            uri: `${config_1.default.get('tribunals.uri')}/api/appeals`,
            body: pip_sya_json_1.default,
            json: true,
            resolveWithFullResponse: true,
        };
    }
    else if (caseType === 'ESA') {
        options = {
            method: 'POST',
            uri: `${config_1.default.get('tribunals.uri')}/api/appeals`,
            body: esa_sya_json_1.default,
            json: true,
            resolveWithFullResponse: true,
        };
    }
    else if (caseType === 'Child Support') {
        options = {
            method: 'POST',
            uri: `${config_1.default.get('tribunals.uri')}/api/appeals`,
            body: child_support_sya_json_1.default,
            json: true,
            resolveWithFullResponse: true,
        };
    }
    else if (caseType === 'Tax Credit') {
        options = {
            method: 'POST',
            uri: `${config_1.default.get('tribunals.uri')}/api/appeals`,
            body: tax_credit_sya_json_1.default,
            json: true,
            resolveWithFullResponse: true,
        };
    }
    else if (caseType === 'SANDLPIP') {
        options = {
            method: 'POST',
            uri: `${config_1.default.get('tribunals.uri')}/api/appeals`,
            body: pip_sandl_sya_json_1.default,
            json: true,
            resolveWithFullResponse: true,
        };
    }
    else if (caseType === 'SANDLDLA') {
        options = {
            method: 'POST',
            uri: `${config_1.default.get('tribunals.uri')}/api/appeals`,
            body: dla_sandl_sya_json_1.default,
            json: true,
            resolveWithFullResponse: true,
        };
    }
    else if (caseType === 'SANDLUCVIDEO') {
        options = {
            method: 'POST',
            uri: `${config_1.default.get('tribunals.uri')}/api/appeals`,
            body: uc_sandl_video_sya_json_1.default,
            json: true,
            resolveWithFullResponse: true,
        };
    }
    else if (caseType === 'SANDLPIPREPF2F') {
        options = {
            method: 'POST',
            uri: `${config_1.default.get('tribunals.uri')}/api/appeals`,
            body: pip_sandl_rep_ftof_json_1.default,
            json: true,
            resolveWithFullResponse: true,
        };
    }
    else if (caseType === 'SANDLPIPREP') {
        options = {
            method: 'POST',
            uri: `${config_1.default.get('tribunals.uri')}/api/appeals`,
            body: pip_sandl_rep_json_1.default,
            json: true,
            resolveWithFullResponse: true,
        };
    }
    else {
        throw new Error('Unsupported case type passed');
    }
    await request_promise_1.default
        .post(options)
        .then(function (response) {
        const locationUrl = response.headers.location;
        caseId = locationUrl.substring(locationUrl.lastIndexOf('/') + 1);
    })
        .catch(function (error) {
        logger.error(`Error at CCD createCase`, error);
        throw error;
    });
    return caseId;
}
exports.createSYACase = createSYACase;
//# sourceMappingURL=ccd.js.map
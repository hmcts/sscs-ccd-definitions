"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const protractor_1 = require("protractor");
const browser_platform_matrix_1 = require("./browser.platform.matrix");
const config_1 = __importDefault(require("config"));
const path_1 = __importDefault(require("path"));
const nodejs_logging_1 = require("@hmcts/nodejs-logging");
const protractor_retry_1 = require("protractor-retry");
const multiple_cucumber_html_reporter_1 = __importDefault(require("multiple-cucumber-html-reporter"));
const fs_1 = require("fs");
const logger = nodejs_logging_1.Logger.getLogger('features.crossbrowser.conf');
const ccdWebUrl = config_1.default.get('ccd.webUrl');
// const failFast = Boolean(JSON.parse(serviceConfig.get('protractor.FailFast')));
const sauceUser = config_1.default.get('sauce.user');
const sauceKey = config_1.default.get('sauce.key');
const retries = Math.max(config_1.default.get('protractor.testRetries'), 0);
const testOutputDir = path_1.default.resolve(process.cwd(), config_1.default.get('protractor.TestOutputDir'));
const reportDir = path_1.default.resolve(testOutputDir, 'crossbrowser');
function onCleanUp(results) {
    protractor_retry_1.retry.onCleanUp(results);
}
async function onPrepare() {
    await protractor_1.browser.getCapabilities();
    await protractor_1.browser.manage().window().maximize();
    await protractor_1.browser.waitForAngularEnabled(false);
    protractor_retry_1.retry.onPrepare();
}
async function onComplete() {
    await protractor_1.browser.getProcessedConfig();
    const session = await protractor_1.browser.getSession();
    logger.info(`SauceOnDemandSessionID=${session.getId()} job-name=sscs-ccd-e2e-tests`);
    multiple_cucumber_html_reporter_1.default.generate({
        jsonDir: reportDir,
        reportPath: reportDir,
        pageTitle: 'SSCS Service Cross Browser Test',
    });
}
function afterLaunch() {
    return protractor_retry_1.retry.afterLaunch(retries);
}
const featuresPath = path_1.default.resolve(process.cwd(), 'e2e/features/search-filter.feature');
const jsonDir = path_1.default.resolve(reportDir, 'json');
(0, fs_1.mkdirSync)(jsonDir, { recursive: true });
const cucumberOpts = {
    format: ['@cucumber/pretty-formatter', `json:${path_1.default.resolve(jsonDir, 'testResult.json')}`],
    require: ['./cucumber.conf.js', './features/step_definitions/**/*.steps.js'],
    // failFast,
    // strict: true,
    backtrace: true,
    // retry: retries,
};
exports.config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts,
    sauceSeleniumAddress: 'ondemand.eu-central-1.saucelabs.com:443/wd/hub',
    host: 'ondemand.eu-central-1.saucelabs.com',
    sauceRegion: 'eu',
    port: 80,
    sauceConnect: true,
    // sauceProxy: 'http://proxyout.reform.hmcts.net:8080',  // Proxy for the REST API
    sauceUser,
    sauceKey,
    SAUCE_REST_ENDPOINT: 'https://eu-central-1.saucelabs.com/rest/v1/',
    specs: [featuresPath],
    baseUrl: ccdWebUrl,
    allScriptsTimeout: 220000,
    useAllAngular2AppRoots: true,
    multiCapabilities: browser_platform_matrix_1.multiCapabilities,
    maxSessions: 7,
    onCleanUp,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onPrepare,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onComplete,
    afterLaunch,
};
//# sourceMappingURL=features.crossbrowser.conf.js.map
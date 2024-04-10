"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const protractor_1 = require("protractor");
const protractor_retry_1 = require("protractor-retry");
const puppeteer_1 = __importDefault(require("puppeteer"));
const config_1 = __importDefault(require("config"));
const customReporter_1 = require("./reporter/customReporter");
const path_1 = __importDefault(require("path"));
const nodejs_logging_1 = require("@hmcts/nodejs-logging");
const multiple_cucumber_html_reporter_1 = __importDefault(require("multiple-cucumber-html-reporter"));
const fs_1 = require("fs");
const logger = nodejs_logging_1.Logger.getLogger('features.a11y.conf');
const proxyUrl = config_1.default.get('proxy.url');
const useProxy = Boolean(JSON.parse(config_1.default.get('proxy.use')));
const useHeadlessBrowser = Boolean(JSON.parse(config_1.default.get('protractor.UseHeadlessBrowser')));
const ccdWebUrl = config_1.default.get('ccd.webUrl');
// const failFast = Boolean(JSON.parse(serviceConfig.get('protractor.FailFast')));
const retries = Math.max(config_1.default.get('protractor.testRetries'), 0);
const testOutputDir = path_1.default.resolve(process.cwd(), config_1.default.get('protractor.TestOutputDir'));
const reportDir = path_1.default.resolve(testOutputDir, 'a11y');
const loggingDriver = config_1.default.get('logging.driver');
const loggingBrowser = config_1.default.get('logging.driver');
let proxy = null;
if (useProxy) {
    const proxyBase = proxyUrl.replace('http://', '');
    proxy = {
        proxyType: 'manual',
        httpProxy: proxyBase,
        sslProxy: proxyBase,
    };
}
const featuresPath = path_1.default.resolve(process.cwd(), 'e2e/features/*.feature');
const capabilities = {
    browserName: 'chrome',
    chromeOptions: {
        args: [
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-sandbox',
            useHeadlessBrowser ? '--headless' : '--noop',
            useHeadlessBrowser ? '--window-size=1920,1080' : '--noop',
        ],
        binary: puppeteer_1.default.executablePath(),
    },
    acceptInsecureCerts: true,
    maxInstances: 1,
    proxy,
    loggingPrefs: {
        driver: loggingDriver,
        browser: loggingBrowser,
    },
    shardTestFiles: false,
};
const jsonDir = path_1.default.resolve(reportDir, 'json');
(0, fs_1.mkdirSync)(jsonDir, { recursive: true });
const cucumberOpts = {
    format: ['@cucumber/pretty-formatter', `json:${path_1.default.resolve(jsonDir, 'testResult.json')}`],
    require: ['./cucumber.conf.js', './features/step_definitions/*.steps.js', './support/hooks.js'],
    backtrace: true,
    // failFast,
    retry: retries,
};
const frameworkPath = require.resolve('protractor-cucumber-framework');
function onCleanUp(results) {
    protractor_retry_1.retry.onCleanUp(results);
}
async function onPrepare() {
    // returning the promise makes protractor wait for
    // the reporter config before executing tests
    await protractor_1.browser.getProcessedConfig();
    protractor_retry_1.retry.onPrepare();
}
function onComplete() {
    (0, customReporter_1.generateAccessibilityReport)();
    multiple_cucumber_html_reporter_1.default.generate({
        jsonDir: reportDir,
        reportPath: reportDir,
        pageTitle: 'SSCS CCD Pa11y Accessibility Tests',
    });
}
function afterLaunch() {
    return protractor_retry_1.retry.afterLaunch(retries);
}
exports.config = {
    baseUrl: ccdWebUrl,
    maxSessions: null,
    getMultiCapabilities: null,
    specs: [featuresPath],
    capabilities,
    allScriptsTimeout: 120000,
    getPageTimeout: 120000,
    disableChecks: true,
    ignoreUncaughtExceptions: true,
    directConnect: true,
    useAllAngular2AppRoots: true,
    // this causes issues with test failing
    // so do not enable it unless all tests pass
    // on a variety of environments first :)
    restartBrowserBetweenTests: false,
    framework: 'custom',
    frameworkPath,
    cucumberOpts,
    onCleanUp,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onPrepare,
    afterLaunch,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onComplete,
};
logger.info(JSON.stringify(exports.config, null, 2));
//# sourceMappingURL=features.a11y.conf.js.map
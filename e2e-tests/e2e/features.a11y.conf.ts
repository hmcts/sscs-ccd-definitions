import { browser, Config } from 'protractor';
import { retry } from 'protractor-retry';
import puppeteer from 'puppeteer';
import serviceConfig from 'config';
import { generateAccessibilityReport } from './reporter/customReporter';
import path from 'path';
import { Logger } from '@hmcts/nodejs-logging';
import { IConfiguration } from '@cucumber/cucumber/lib/configuration/types';
import report from 'multiple-cucumber-html-reporter';
import { mkdirSync } from 'fs';

const logger = Logger.getLogger('features.a11y.conf');

const proxyUrl: string = serviceConfig.get('proxy.url');
const useProxy = Boolean(JSON.parse(serviceConfig.get('proxy.use')));
const useHeadlessBrowser = Boolean(JSON.parse(serviceConfig.get('protractor.UseHeadlessBrowser')));
const ccdWebUrl: string = serviceConfig.get('ccd.webUrl');
// const failFast = Boolean(JSON.parse(serviceConfig.get('protractor.FailFast')));
const retries: number = Math.max(serviceConfig.get('protractor.testRetries'), 0);
const testOutputDir: string = path.resolve(process.cwd(), serviceConfig.get('protractor.TestOutputDir'));
const reportDir: string = path.resolve(testOutputDir, 'a11y');

const loggingDriver = serviceConfig.get('logging.driver');
const loggingBrowser = serviceConfig.get('logging.driver');

let proxy: { httpProxy: any; proxyType: string; sslProxy: any } = null;
if (useProxy) {
  const proxyBase = proxyUrl.replace('http://', '');
  proxy = {
    proxyType: 'manual',
    httpProxy: proxyBase,
    sslProxy: proxyBase,
  };
}

const featuresPath = path.resolve(process.cwd(), 'e2e/features/*.feature');

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
    binary: puppeteer.executablePath(),
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

const jsonDir = path.resolve(reportDir, 'json');
mkdirSync(jsonDir, { recursive: true });

const cucumberOpts: IConfiguration = <IConfiguration>{
  format: ['@cucumber/pretty-formatter', `json:${path.resolve(jsonDir, 'testResult.json')}`],
  require: ['./cucumber.conf.js', './features/step_definitions/*.steps.js', './support/hooks.js'],
  backtrace: true,
  // failFast,
  retry: retries,
};

const frameworkPath = require.resolve('protractor-cucumber-framework');

function onCleanUp(results): void {
  retry.onCleanUp(results);
}

async function onPrepare(): Promise<void> {
  // returning the promise makes protractor wait for
  // the reporter config before executing tests
  await browser.getProcessedConfig();

  retry.onPrepare();
}

function onComplete(): void {
  generateAccessibilityReport();
  report.generate({
    jsonDir: reportDir,
    reportPath: reportDir,
    pageTitle: 'SSCS CCD Pa11y Accessibility Tests',
  });
}

function afterLaunch(): any {
  return retry.afterLaunch(retries);
}

export const config: Config = {
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

logger.info(JSON.stringify(config, null, 2));

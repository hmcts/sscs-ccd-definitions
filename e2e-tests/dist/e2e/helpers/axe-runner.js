"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessibilityTestResult = exports.runAndReportAccessibility = void 0;
const protractor_1 = require("protractor");
const webdriverjs_1 = __importDefault(require("@axe-core/webdriverjs"));
const config_1 = __importDefault(require("config"));
const fs_1 = require("fs");
const nodejs_logging_1 = require("@hmcts/nodejs-logging");
const path_1 = __importDefault(require("path"));
const logger = nodejs_logging_1.Logger.getLogger('axe-runner.ts');
const testOutputDir = path_1.default.resolve(process.cwd(), config_1.default.get('protractor.TestOutputDir'));
const result = {
    PASSED: 'passed',
    FAILED: 'failed',
};
const resultObj = {
    appName: 'Manage cases',
    passCount: 0,
    failCount: 0,
    tests: [],
};
async function runAndReportAccessibility() {
    const screenshotName = `${Date.now()}.png`;
    const screenshotPath = path_1.default.resolve(testOutputDir, screenshotName);
    const screenshotReportRef = `e2e/${screenshotName}`;
    const accessibilityErrorsOnThePage = await new webdriverjs_1.default(protractor_1.browser.driver).withTags(['wcag2a', 'wcag2aa']).analyze();
    await fs_1.promises.mkdir(testOutputDir, { recursive: true });
    await protractor_1.browser.takeScreenshot().then(async (screenShot) => {
        try {
            await fs_1.promises.writeFile(screenshotPath, screenShot, 'base64');
        }
        catch (error) {
            logger.error('Failed to copy the screenshot', error);
        }
    });
    const processIssue = function (issue) {
        return {
            code: issue.id,
            type: issue.impact,
            message: issue.description,
            helpurl: issue.helpUrl,
            tags: issue.tags,
            runner: 'axe',
        };
    };
    const violations = accessibilityErrorsOnThePage.violations.map(processIssue);
    const isPageAccessible = violations.length === 0 ? result.PASSED : result.FAILED;
    const urlArr = accessibilityErrorsOnThePage.url.split('/');
    if (isPageAccessible === result.PASSED) {
        resultObj.passCount += 1;
    }
    else {
        resultObj.failCount += 1;
    }
    resultObj.tests.push({
        name: `${urlArr[urlArr.length - 2]}/${urlArr[urlArr.length - 1]}`,
        pageUrl: accessibilityErrorsOnThePage.url,
        status: isPageAccessible,
        screenshot: screenshotReportRef,
        a11yIssues: violations,
    });
}
exports.runAndReportAccessibility = runAndReportAccessibility;
function getAccessibilityTestResult() {
    return resultObj;
}
exports.getAccessibilityTestResult = getAccessibilityTestResult;
//# sourceMappingURL=axe-runner.js.map
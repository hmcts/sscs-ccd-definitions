import { browser } from 'protractor';
import AxeBuilder from '@axe-core/webdriverjs';
import config from 'config';
import { PathLike, promises } from 'fs';
import { Logger } from '@hmcts/nodejs-logging';
import path from 'path';

const logger = Logger.getLogger('axe-runner.ts');

const testOutputDir: string = path.resolve(process.cwd(), config.get('protractor.TestOutputDir'));

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

export async function runAndReportAccessibility(): Promise<void> {
  const screenshotName = `${Date.now()}.png`;
  const screenshotPath = path.resolve(testOutputDir, screenshotName);
  const screenshotReportRef = `e2e/${screenshotName}`;

  const accessibilityErrorsOnThePage = await new AxeBuilder(browser.driver).withTags(['wcag2a', 'wcag2aa']).analyze();

  await promises.mkdir(testOutputDir as PathLike, { recursive: true });

  await browser.takeScreenshot().then(async (screenShot) => {
    try {
      await promises.writeFile(screenshotPath, screenShot, 'base64');
    } catch (error) {
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
  } else {
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

export function getAccessibilityTestResult() {
  return resultObj;
}

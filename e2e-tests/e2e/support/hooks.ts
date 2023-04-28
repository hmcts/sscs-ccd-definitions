import { After, Status } from '@cucumber/cucumber';
import { browser } from 'protractor';
import { Logger } from '@hmcts/nodejs-logging';

const logger = Logger.getLogger('hooks.ts');
const LOG_LEVEL_ERROR_THRESHOLD = 900;
const MIME_TYPE_PNG = 'image/png';

// This hook runs after each scenario
After(async function (scenario) {
  logger.info(`Scenario results are ${scenario.result.status}`);

  // If the scenario has failed, capture a screenshot and browser error logs
  if (scenario.result.status === Status.FAILED) {
    // Capture and attach a screenshot to the report
    const screenshotStream = await browser.takeScreenshot();
    const decodedImage = Buffer.from(screenshotStream.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
    await this.attach(decodedImage, MIME_TYPE_PNG);

    // Fetch browser logs and filter for errors
    const browserLog = await browser.manage().logs().get('browser');
    const browserErrorLogs = [];
    for (const logEntry of browserLog) {
      if (logEntry.level.value > LOG_LEVEL_ERROR_THRESHOLD) {
        browserErrorLogs.push(logEntry);
      }
    }

    // Attach browser error logs to the report
    try {
      await this.attach(JSON.stringify(browserErrorLogs, null, 2));
    } catch (error) {
      logger.error('Error occurred adding message to report.', error);
    }
  }
});


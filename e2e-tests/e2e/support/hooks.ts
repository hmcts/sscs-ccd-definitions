import { After, Status } from '@cucumber/cucumber';
import { browser } from 'protractor';
import { Logger } from '@hmcts/nodejs-logging';

const logger = Logger.getLogger('hooks.ts');

After(async function (scenario) {
  logger.info(`Scenario results are ${scenario.result.status}`);
  if (scenario.result.status === Status.FAILED) {
    const stream = await browser.takeScreenshot();
    const decodedImage = Buffer.from(stream.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
    // eslint-disable-next-line no-invalid-this
    this.attach(decodedImage, 'image/png');

    // fetch browser logs
    const browserLog = await browser.manage().logs().get('browser');
    const browserErrorLogs = [];
    for (const element of browserLog) {
      if (element.level.value > 900) {
        browserErrorLogs.push(element);
      }
    }
    try {
      // eslint-disable-next-line no-invalid-this
      this.attach(JSON.stringify(browserErrorLogs, null, 2));
    } catch (error) {
      logger.error('Error occurred adding message to report.', error);
    }
  }
});

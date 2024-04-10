"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const protractor_1 = require("protractor");
const nodejs_logging_1 = require("@hmcts/nodejs-logging");
const logger = nodejs_logging_1.Logger.getLogger('hooks.ts');
(0, cucumber_1.After)(async function (scenario) {
    logger.info(`Scenario results are ${scenario.result.status}`);
    if (scenario.result.status === cucumber_1.Status.FAILED) {
        const stream = await protractor_1.browser.takeScreenshot();
        const decodedImage = Buffer.from(stream.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
        // eslint-disable-next-line no-invalid-this
        this.attach(decodedImage, 'image/png');
        // fetch browser logs
        const browserLog = await protractor_1.browser.manage().logs().get('browser');
        const browserErrorLogs = [];
        for (const element of browserLog) {
            if (element.level.value > 900) {
                browserErrorLogs.push(element);
            }
        }
        try {
            // eslint-disable-next-line no-invalid-this
            this.attach(JSON.stringify(browserErrorLogs, null, 2));
        }
        catch (error) {
            logger.error('Error occurred adding message to report.', error);
        }
    }
});
//# sourceMappingURL=hooks.js.map
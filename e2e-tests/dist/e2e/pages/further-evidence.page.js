"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FurtherEvidencePage = void 0;
const protractor_1 = require("protractor");
const any_page_1 = require("./any.page");
class FurtherEvidencePage extends any_page_1.AnyPage {
    async enterFileName(inputElement, fileName) {
        await (0, protractor_1.element)(protractor_1.by.id(inputElement)).sendKeys(fileName);
    }
    async enterScannedDate(date, month, year) {
        await (0, protractor_1.element)(protractor_1.by.id('scannedDate-day')).sendKeys(date);
        await protractor_1.browser.driver.sleep(1000);
        await (0, protractor_1.element)(protractor_1.by.id('scannedDate-month')).sendKeys(month);
        await protractor_1.browser.driver.sleep(1000);
        await (0, protractor_1.element)(protractor_1.by.id('scannedDate-year')).sendKeys(year);
    }
}
exports.FurtherEvidencePage = FurtherEvidencePage;
//# sourceMappingURL=further-evidence.page.js.map
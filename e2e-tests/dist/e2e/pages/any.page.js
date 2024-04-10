"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyPage = void 0;
const protractor_1 = require("protractor");
class AnyPage {
    async get(uri) {
        await protractor_1.browser.waitForAngularEnabled(false);
        await protractor_1.browser.get(uri);
    }
    async getWithoutWaitingForAngular(uri) {
        await protractor_1.browser.waitForAngularEnabled(false);
        await protractor_1.browser.get(uri);
    }
}
exports.AnyPage = AnyPage;
//# sourceMappingURL=any.page.js.map
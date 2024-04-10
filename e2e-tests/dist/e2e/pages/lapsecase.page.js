"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LapseCasePage = void 0;
const protractor_1 = require("protractor");
const any_page_1 = require("./any.page");
const any_ccd_page_1 = require("./any-ccd.page");
const chai_1 = require("chai");
const remote = __importStar(require("selenium-webdriver/remote"));
const wait_1 = require("../enums/wait");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
class LapseCasePage extends any_page_1.AnyPage {
    async uploadResponse(action) {
        (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Lapse appeal')).to.equal(true);
        await protractor_1.browser.waitForAngular();
        await protractor_1.browser.sleep(wait_1.Wait.short);
        protractor_1.browser.setFileDetector(new remote.FileDetector());
        await anyCcdPage.uploadFile('dwpLT203_documentLink', 'issue1.pdf');
        await protractor_1.browser.sleep(wait_1.Wait.normal);
        await anyCcdPage.uploadFile('dwpLapseLetter_documentLink', 'issue2.pdf');
        await anyCcdPage.chooseOptionContainingText('dwpState', 'No action');
        await anyCcdPage.chooseOptionContainingText('interlocReviewState', 'N/A');
        await anyCcdPage.clickContinue();
    }
}
exports.LapseCasePage = LapseCasePage;
//# sourceMappingURL=lapsecase.page.js.map
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
const cucumber_1 = require("@cucumber/cucumber");
const chai_1 = require("chai");
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const ccd = __importStar(require("../../helpers/ccd"));
const nodejs_logging_1 = require("@hmcts/nodejs-logging");
const wait_1 = require("../../enums/wait");
const protractor_1 = require("protractor");
const logger = nodejs_logging_1.Logger.getLogger('link-case');
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
let linkedCaseReference = null;
(0, cucumber_1.When)('I add a case to be linked', async function () {
    linkedCaseReference = await ccd.createSYACase('PIP');
    logger.info(`linked Case Id: ${linkedCaseReference}`);
    await protractor_1.browser.sleep(wait_1.Wait.normal);
    await anyCcdPage.clickAddNew();
    await (0, protractor_1.element)(protractor_1.by.css('input#linkedCase_0_0')).sendKeys(linkedCaseReference);
    await anyCcdPage.clickSubmit();
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.Then)('I should see the case linked within related cases tab', async function () {
    await anyCcdPage.clickTab('Related Cases');
    const linkedCaseIds = await anyCcdPage.getFieldValues('Linked case(s)');
    const linkedCaseIdsTrimmed = linkedCaseIds.map((caseId) => caseId.replace(/-/g, ''));
    logger.info(`Linked Cases Ids:\n${linkedCaseIdsTrimmed.join('\n')}`);
    (0, chai_1.expect)(linkedCaseIdsTrimmed).to.include(linkedCaseReference);
});
//# sourceMappingURL=link-case.steps.js.map
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
exports.HearingRecordingPage = void 0;
const protractor_1 = require("protractor");
const any_page_1 = require("./any.page");
const wait_1 = require("../enums/wait");
const any_ccd_page_1 = require("./any-ccd.page");
const remote = __importStar(require("selenium-webdriver/remote"));
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
class HearingRecordingPage extends any_page_1.AnyPage {
    async addHearingRecording() {
        await (0, protractor_1.element)(protractor_1.by.id('hearingRecording_recordings'))
            .element(protractor_1.by.xpath('//*[@id="hearingRecording_recordings"]/div/button[1]'))
            .click();
        await protractor_1.browser.waitForAngular();
        protractor_1.browser.setFileDetector(new remote.FileDetector());
        await anyCcdPage.uploadFile('hearingRecording_recordings_value', 'test_av.mp3');
    }
    async uploadHearingRecording() {
        await anyCcdPage.clickElementById('hearingRecording_hearingType-final');
        await this.addHearingRecording();
        await anyCcdPage.clickContinue();
        await protractor_1.browser.sleep(wait_1.Wait.long);
        await anyCcdPage.clickSubmit();
        await protractor_1.browser.manage().window().maximize();
    }
    async selectHearing() {
        await (0, protractor_1.element)(protractor_1.by.id('selectHearingDetails')).element(protractor_1.by.xpath('//*[@id="selectHearingDetails"]/option[2]')).click();
    }
    async requestDwpHearingRecording() {
        await (0, protractor_1.element)(protractor_1.by.id('requestableHearingDetails'))
            .element(protractor_1.by.xpath('//*[@id="requestableHearingDetails"]/option[2]'))
            .click();
    }
    async refuseAppellantHearingRecording(permissionType) {
        await anyCcdPage.chooseOptionContainingText('processHearingRecordingRequest_appellant', permissionType);
    }
    async grantRequestDwpHearingRecording(permissionType) {
        await anyCcdPage.chooseOptionContainingText('processHearingRecordingRequest_dwp', permissionType);
    }
}
exports.HearingRecordingPage = HearingRecordingPage;
//# sourceMappingURL=hearing-recording.page.js.map
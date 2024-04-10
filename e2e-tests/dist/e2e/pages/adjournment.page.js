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
exports.AdjournmentPage = void 0;
const protractor_1 = require("protractor");
const any_page_1 = require("./any.page");
const any_ccd_page_1 = require("./any-ccd.page");
const remote = __importStar(require("selenium-webdriver/remote"));
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
class AdjournmentPage extends any_page_1.AnyPage {
    async uploadAdjournmentNotice() {
        await protractor_1.browser.waitForAngular();
        protractor_1.browser.setFileDetector(new remote.FileDetector());
        await anyCcdPage.uploadFile('adjournCasePreviewDocument', 'issue1.pdf');
    }
    async addVenue(day, month, year) {
        await (0, protractor_1.element)(protractor_1.by.id('hearings_0_venue_name')).sendKeys('Fox Court');
        await (0, protractor_1.element)(protractor_1.by.id('hearings_0_venue_address_line1')).sendKeys('Fox Court');
        await (0, protractor_1.element)(protractor_1.by.id('hearings_0_venue_address_line2')).sendKeys('4th Floor');
        await (0, protractor_1.element)(protractor_1.by.id('hearings_0_venue_address_line3')).sendKeys('30 Brooke Street');
        await (0, protractor_1.element)(protractor_1.by.id('hearings_0_venue_address_town')).sendKeys('Town');
        await (0, protractor_1.element)(protractor_1.by.id('hearings_0_venue_address_county')).sendKeys('County');
        await (0, protractor_1.element)(protractor_1.by.id('hearings_0_venue_address_postcode')).sendKeys('EC1N 7RS');
        await (0, protractor_1.element)(protractor_1.by.id('hearings_0_venue_address_country')).sendKeys('UK');
        await (0, protractor_1.element)(protractor_1.by.id('hearings_0_venue_googleMapLink')).sendKeys('https://www.google.com/maps/place/4th+Floor+30+Brooke+Street+EC1N+7RS/@51.518706,-0.110348');
        await (0, protractor_1.element)(protractor_1.by.id('hearingDate-day')).sendKeys(day);
        await (0, protractor_1.element)(protractor_1.by.id('hearingDate-month')).sendKeys(month);
        await (0, protractor_1.element)(protractor_1.by.id('hearingDate-year')).sendKeys(year);
        await (0, protractor_1.element)(protractor_1.by.id('hearings_0_time')).sendKeys('13:00');
        await (0, protractor_1.element)(protractor_1.by.id('postponedDate-day')).sendKeys('20');
        await (0, protractor_1.element)(protractor_1.by.id('postponedDate-month')).sendKeys('10');
        await (0, protractor_1.element)(protractor_1.by.id('postponedDate-year')).sendKeys('2021');
        await anyCcdPage.clickElementById('hearings_0_adjourned_Yes');
        await (0, protractor_1.element)(protractor_1.by.id('adjournedDate-day')).sendKeys('20');
        await (0, protractor_1.element)(protractor_1.by.id('adjournedDate-month')).sendKeys('10');
        await (0, protractor_1.element)(protractor_1.by.id('adjournedDate-year')).sendKeys('2021');
        await (0, protractor_1.element)(protractor_1.by.id('hearings_0_hearingId')).sendKeys('12345');
        await (0, protractor_1.element)(protractor_1.by.id('eventDate-day')).sendKeys('20');
        await (0, protractor_1.element)(protractor_1.by.id('eventDate-month')).sendKeys('02');
        await (0, protractor_1.element)(protractor_1.by.id('eventDate-year')).sendKeys('2022');
        await (0, protractor_1.element)(protractor_1.by.id('hearings_0_venueId')).sendKeys('142');
        await (0, protractor_1.element)(protractor_1.by.id('hearingRequested-day')).sendKeys('21');
        await (0, protractor_1.element)(protractor_1.by.id('hearingRequested-month')).sendKeys('01');
        await (0, protractor_1.element)(protractor_1.by.id('hearingRequested-year')).sendKeys('2024');
        await (0, protractor_1.element)(protractor_1.by.id('hearings_0_versionNumber')).sendKeys('123');
        await anyCcdPage.chooseOptionContainingText('hearings_0_hearingStatus', 'Hearing has been Listed');
        await (0, protractor_1.element)(protractor_1.by.id('start-day')).sendKeys('21');
        await (0, protractor_1.element)(protractor_1.by.id('start-month')).sendKeys('01');
        await (0, protractor_1.element)(protractor_1.by.id('start-year')).sendKeys('2024');
        await (0, protractor_1.element)(protractor_1.by.id('end-day')).sendKeys('21');
        await (0, protractor_1.element)(protractor_1.by.id('end-month')).sendKeys('01');
        await (0, protractor_1.element)(protractor_1.by.id('end-year')).sendKeys('2024');
        await (0, protractor_1.element)(protractor_1.by.id('hearings_0_epimsId')).sendKeys('372653');
        await anyCcdPage.chooseOptionContainingText('hearings_0_hearingChannel', 'Face To Face');
        await anyCcdPage.clickSubmit();
        // Event description page
        await anyCcdPage.clickSubmit();
    }
    async addPanelMembers() {
        await (0, protractor_1.element)(protractor_1.by.id('adjournCasePanelMember1')).sendKeys('Disability Member');
        await (0, protractor_1.element)(protractor_1.by.id('adjournCasePanelMember2')).sendKeys('Medically Member');
    }
    async addReasons() {
        await anyCcdPage.clickAddNew();
        await (0, protractor_1.element)(protractor_1.by.id('adjournCaseReasons_0')).sendKeys('Appellant not available');
    }
    async setAdjournCaseReasonsText() {
        await anyCcdPage.clickAddNew();
        await anyCcdPage.setText("//textarea[@rows='3']", 'I am very busy so i cannot');
    }
}
exports.AdjournmentPage = AdjournmentPage;
//# sourceMappingURL=adjournment.page.js.map
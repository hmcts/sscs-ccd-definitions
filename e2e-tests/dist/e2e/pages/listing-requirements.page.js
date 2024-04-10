"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingRequirementsPage = void 0;
// import { browser } from 'protractor';
const any_page_1 = require("./any.page");
const chai_1 = require("chai");
const any_ccd_page_1 = require("./any-ccd.page");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
class ListingRequirementsPage extends any_page_1.AnyPage {
    async verifyOverriddenHearingValues() {
        await anyCcdPage.clickTab('Listing Requirements');
        (0, chai_1.expect)(await anyCcdPage.contentContains('Overrides Listing Values')).to.equal(true);
        await anyCcdPage.isFieldValueDisplayed('Duration of the hearing', '90');
        await anyCcdPage.isFieldValueDisplayed('Is an interpreter wanted?', 'Yes');
        await anyCcdPage.isFieldValueDisplayed('Interpreter Language', 'Dutch');
        await anyCcdPage.isFieldValueDisplayed("Appellant's Hearing Channel", 'Telephone');
        await anyCcdPage.isFieldValueDisplayed('Are Panel Members Excluded?', 'Yes');
    }
    async verifyOverriddenHearingValuesForVideoAdjourned() {
        await anyCcdPage.clickTab('Listing Requirements');
        (0, chai_1.expect)(await anyCcdPage.contentContains('Overrides Listing Values')).to.equal(true);
        await anyCcdPage.isFieldValueDisplayed('Duration of the hearing', '330');
        await anyCcdPage.isFieldValueDisplayed('Duration length', '2');
        await anyCcdPage.isFieldValueDisplayed('Minutes or sessions', 'Session(s)');
        await anyCcdPage.isFieldValueDisplayed("Appellant's Hearing Channel", 'Video');
    }
    async verifyOverriddenHearingValuesForPaperAdjourned() {
        await anyCcdPage.clickTab('Listing Requirements');
        (0, chai_1.expect)(await anyCcdPage.contentContains('Overrides Listing Values')).to.equal(true);
        await anyCcdPage.isFieldValueDisplayed('Duration of the hearing', '30');
        await anyCcdPage.isFieldValueDisplayed("Appellant's Hearing Channel", 'Paper');
    }
    async verifyOverriddenHearingValuesForFaceToFaceAdjourned() {
        await anyCcdPage.clickTab('Listing Requirements');
        (0, chai_1.expect)(await anyCcdPage.contentContains('Overrides Listing Values')).to.equal(true);
        await anyCcdPage.isFieldValueDisplayed('Duration of the hearing', '60');
        await anyCcdPage.isFieldValueDisplayed('Duration length', '2');
        await anyCcdPage.isFieldValueDisplayed('Minutes or sessions', 'Minutes');
        await anyCcdPage.isFieldValueDisplayed("Appellant's Hearing Channel", 'Face To Face');
    }
}
exports.ListingRequirementsPage = ListingRequirementsPage;
//# sourceMappingURL=listing-requirements.page.js.map
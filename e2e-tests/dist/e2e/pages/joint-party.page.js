"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JointPartyPage = void 0;
const protractor_1 = require("protractor");
const any_ccd_page_1 = require("./any-ccd.page");
class JointPartyPage extends any_ccd_page_1.AnyCcdPage {
    async addJointPartyDetails() {
        await (0, protractor_1.element)(protractor_1.by.id('jointPartyName_title')).sendKeys('Mr');
        await (0, protractor_1.element)(protractor_1.by.id('jointPartyName_firstName')).sendKeys('JPFirstName');
        await (0, protractor_1.element)(protractor_1.by.id('jointPartyName_lastName')).sendKeys('JPLastName');
        await (0, protractor_1.element)(protractor_1.by.id('jointPartyAddressSameAsAppellant-No')).click();
        await (0, protractor_1.element)(protractor_1.by.id('jointPartyAddress_line1')).sendKeys('Jp Address line1');
        await (0, protractor_1.element)(protractor_1.by.id('jointPartyAddress_line2')).sendKeys('Jp Address line2');
        await (0, protractor_1.element)(protractor_1.by.id('jointPartyAddress_town')).sendKeys('Jp Town');
        await (0, protractor_1.element)(protractor_1.by.id('jointPartyAddress_county')).sendKeys('Jp County');
        await (0, protractor_1.element)(protractor_1.by.id('jointPartyAddress_postcode')).sendKeys('TS1 1ST');
        await (0, protractor_1.element)(protractor_1.by.id('jointPartyIdentity_nino')).sendKeys('KL335252C');
        await (0, protractor_1.element)(protractor_1.by.xpath('//button[2]')).click();
    }
}
exports.JointPartyPage = JointPartyPage;
//# sourceMappingURL=joint-party.page.js.map
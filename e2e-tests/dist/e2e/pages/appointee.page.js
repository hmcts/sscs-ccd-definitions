"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointeePage = void 0;
const protractor_1 = require("protractor");
const any_ccd_page_1 = require("./any-ccd.page");
class AppointeePage extends any_ccd_page_1.AnyCcdPage {
    async addAppointeeDetails() {
        await (0, protractor_1.element)(protractor_1.by.id('appeal_appellant_appointee_name_title')).sendKeys('Mr');
        await (0, protractor_1.element)(protractor_1.by.id('appeal_appellant_appointee_name_firstName')).sendKeys('AppointeeFirstName');
        await (0, protractor_1.element)(protractor_1.by.id('appeal_appellant_appointee_name_lastName')).sendKeys('AppointeeLastName');
        await (0, protractor_1.element)(protractor_1.by.id('dob-day')).sendKeys('1');
        await (0, protractor_1.element)(protractor_1.by.id('dob-month')).sendKeys('1');
        await (0, protractor_1.element)(protractor_1.by.id('dob-year')).sendKeys('1990');
        await (0, protractor_1.element)(protractor_1.by.id('appeal_appellant_appointee_identity_nino')).sendKeys('KL335252C');
        await (0, protractor_1.element)(protractor_1.by.id('appeal_appellant_appointee_address_line1')).sendKeys('line1');
        await (0, protractor_1.element)(protractor_1.by.id('appeal_appellant_appointee_address_line2')).sendKeys('line2');
        await (0, protractor_1.element)(protractor_1.by.id('appeal_appellant_appointee_address_town')).sendKeys('town');
        await (0, protractor_1.element)(protractor_1.by.id('appeal_appellant_appointee_address_county')).sendKeys('UK');
        await (0, protractor_1.element)(protractor_1.by.id('appeal_appellant_appointee_address_postcode')).sendKeys('TS1 1ST');
        await (0, protractor_1.element)(protractor_1.by.id('appeal_appellant_appointee_contact_phone')).sendKeys('0123456789');
        await (0, protractor_1.element)(protractor_1.by.id('appeal_appellant_appointee_contact_mobile')).sendKeys('0123456789');
        await (0, protractor_1.element)(protractor_1.by.id('appeal_appellant_appointee_contact_email')).sendKeys('abc@abcxyz.com');
    }
}
exports.AppointeePage = AppointeePage;
//# sourceMappingURL=appointee.page.js.map
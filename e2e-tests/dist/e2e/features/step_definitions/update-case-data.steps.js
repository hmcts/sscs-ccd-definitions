"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const any_ccd_form_page_1 = require("../../pages/any-ccd-form.page");
const cucumber_1 = require("@cucumber/cucumber");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
const anyCcdFormPage = new any_ccd_form_page_1.AnyCcdFormPage();
(0, cucumber_1.Then)('I should update case with a valid nino', async function () {
    await anyCcdFormPage.setTextFiledValueNull('appeal_appellant_identity_nino');
    await anyCcdFormPage.setValueByElementId('appeal_appellant_identity_nino', 'SK982165A');
    await anyCcdPage.clickSubmit();
    await anyCcdPage.clickSubmit();
});
(0, cucumber_1.Then)('I should update case with a valid nino and confidentiality option', async function () {
    await anyCcdFormPage.setTextFiledValueNull('appeal_mrnDetails_dwpIssuingOffice');
    await anyCcdFormPage.setValueByElementId('appeal_mrnDetails_dwpIssuingOffice', 'Tax Credit Office');
    await anyCcdFormPage.setTextFiledValueNull('appeal_appellant_identity_nino');
    await anyCcdFormPage.setValueByElementId('appeal_appellant_identity_nino', 'SK982165A');
    await anyCcdFormPage.clickElementById('appeal_appellant_confidentialityRequired_No');
    await anyCcdPage.clickSubmit();
    await anyCcdPage.clickSubmit();
});
//# sourceMappingURL=update-case-data.steps.js.map
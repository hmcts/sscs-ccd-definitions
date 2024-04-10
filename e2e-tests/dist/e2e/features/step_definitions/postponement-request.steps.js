"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const any_ccd_page_1 = require("../../pages/any-ccd.page");
const adjournment_page_1 = require("../../pages/adjournment.page");
const postponement_request_page_1 = require("../../pages/postponement-request.page");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
const adjournmentPage = new adjournment_page_1.AdjournmentPage();
const postponementRequestPage = new postponement_request_page_1.PostponementRequestPage();
(0, cucumber_1.When)('I book a hearing in the future', async function () {
    await anyCcdPage.clickAddNew();
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10);
    await adjournmentPage.addVenue(targetDate.getDate().toString(), (targetDate.getMonth() + 1).toString(), targetDate.getFullYear().toString());
});
(0, cucumber_1.Then)('I enter postponement request details', async function () {
    await postponementRequestPage.enterPostponementRequestDetails();
});
(0, cucumber_1.Then)('I enter {string} in the action postponement request page', async function (action) {
    await postponementRequestPage.actionPostponementRequest(action);
    await postponementRequestPage.verifyInterlocStatus(action);
});
//# sourceMappingURL=postponement-request.steps.js.map
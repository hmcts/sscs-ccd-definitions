"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const update_listing_requirements_page_1 = require("../../pages/update-listing-requirements.page");
const updateListingRequirementsPage = new update_listing_requirements_page_1.UpdateListingRequirementsPage();
(0, cucumber_1.Given)('I choose {string} option from appellants hearing channel', async function (video) {
    await updateListingRequirementsPage.updateHearingChannel(video);
});
(0, cucumber_1.Then)('I choose {string} is po office attending', async function (yes) {
    await updateListingRequirementsPage.updatePOOfficerAttending(yes);
});
(0, cucumber_1.Then)('I amend the reason for update', async function () {
    await updateListingRequirementsPage.amendReasonForUpdate();
});
//# sourceMappingURL=update-listing-requirements.steps.js.map
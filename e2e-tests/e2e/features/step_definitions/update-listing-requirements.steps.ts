import { Given, Then } from '@cucumber/cucumber';
import { UpdateListingRequirementsPage } from '../../pages/update-listing-requirements.page';

const updateListingRequirementsPage = new UpdateListingRequirementsPage();

Given('I choose {string} option from appellants hearing channel', async function (video) {
  await updateListingRequirementsPage.updateHearingChannel(video);
});

Then('I choose {string} is po office attending', async function (yes) {
  await updateListingRequirementsPage.updatePOOfficerAttending(yes);
});

Then('I amend the reason for update', async function () {
  await updateListingRequirementsPage.amendReasonForUpdate();
});

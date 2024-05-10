import {test} from "../lib/steps.factory";


test.only("Test Listing Error Event sets case state to Listing Error", async ({listingErrorSteps}) => {
    await listingErrorSteps.performListingErrorEvent();

});
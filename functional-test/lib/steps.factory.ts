import { test as stepsFactory } from '@playwright/test';
import { Note } from '../fixtures/steps/note';
import { ConfirmCaseLapsed } from '../fixtures/steps/confirm.case.lapsed';
import {ListingError} from "../fixtures/steps/listing.error";
import {use} from "chai";


type MyFixtures = {
    addNoteSteps: Note
    confirmCaseLapsedSteps: ConfirmCaseLapsed
    listingErrorSteps: ListingError

};

export const test =  stepsFactory.extend<MyFixtures>({
    addNoteSteps:async ({page}, use) => {
        const addNoteSteps = new Note(page);
        await use(addNoteSteps);
    },
    confirmCaseLapsedSteps:async ({page}, use) => {
        const confirmCaseLapsedSteps = new ConfirmCaseLapsed(page);
        await use(confirmCaseLapsedSteps);
    },
    listingErrorSteps:async ({page}, use) =>{
        const listingErrorSteps = new ListingError(page);
        await use(listingErrorSteps)
}
})

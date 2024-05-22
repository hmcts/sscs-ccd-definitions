import { test as baseTest } from '@playwright/test';
import { Note } from '../fixtures/steps/note';


type MyFixtures = {
    addNoteSteps: Note

};

export const test =  baseTest.extend<MyFixtures>({
    addNoteSteps:async ({page}, use) => {
        const addNoteSteps = new Note(page);
        await use(addNoteSteps);
    }
})
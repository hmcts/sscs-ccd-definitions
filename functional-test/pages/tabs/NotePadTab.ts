import {Page} from '@playwright/test';
import {WebActions} from '../../common/webActions'
import addNoteTestData from "../content/add.note_en.json";


let webActions: WebActions;

export class NotePadTab {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async verifyPageContent() {
        await webActions.verifyPageLabel('#case-viewer-field-read--appealNotePad [_ngcontent-nae-c318] > div > [_nghost-nae-c276] > [_ngcontent-nae-c276] > ccd-read-complex-field > [_nghost-nae-c293] > .complex-panel > .complex-panel-title .text-16', 'Note pad');
        await webActions.verifyPageLabel('#case-viewer-field-read--appealNotePad > span:nth-of-type(1) > ccd-field-read:nth-of-type(1) > div:nth-of-type(1) > ccd-field-read-label:nth-of-type(1) > div:nth-of-type(1) > ccd-read-complex-field:nth-of-type(1) > ccd-read-complex-field-table:nth-of-type(1) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > th:nth-of-type(1) > span:nth-of-type(1)', 'Note pad');
        await webActions.verifyPageLabel('ccd-field-read[_ngcontent-nae-c206] .complex-panel-title .text-16', 'Note pad 1');
        await webActions.verifyPageLabel('ccd-field-read[_ngcontent-nae-c206] tr:nth-of-type(1) > #complex-panel-simple-field-label','Date of note');
        await webActions.verifyPageLabel('tr:nth-of-type(2) > #complex-panel-simple-field-label','Note');
        await webActions.verifyPageLabel('tr:nth-of-type(3) > #complex-panel-simple-field-label > .text-16','Author');
    }
}

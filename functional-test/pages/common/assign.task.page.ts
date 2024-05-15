import { Page } from '@playwright/test';
import { WebAction } from '../../common/web.action'
import assignTaskContent from "../content/assign.task_en.json";

let webActions: WebAction;

export class AssignTaskPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async verifyPageContent() {
        await webActions.verifyPageLabel('.govuk-caption-l', assignTaskContent['assign-task-caption']);
        await webActions.verifyPageLabel('.govuk-heading-l', assignTaskContent['assign-task-role-type-heading']);
        await webActions.verifyPageLabel('.form-label', assignTaskContent['assign-task-role-type-form-label']);
    }

    async inputData(enterNoteText:string): Promise<void> {
        await webActions.inputField('#inputSelectPerson', enterNoteText);
    }

    async confirmSubmission(): Promise<void> {
        await webActions.clickButton('Submit');
    }
}

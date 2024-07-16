import {Page} from '@playwright/test';
import {WebAction} from '../common/web.action';

let webActions: WebAction;

export class ProcessAVPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async selectRequestedEvidence(): Promise<void> {
        await webActions.verifyPageLabel('h1.govuk-heading-l', 'Process Audio/Video Evidence');
        await webActions.chooseOptionByLabel('#selectedAudioVideoEvidence', 'test_av.mp3');
        await webActions.clickButton('Continue');
    }

    async grantApprovalForEvidence(): Promise<void> {
        
    }
}
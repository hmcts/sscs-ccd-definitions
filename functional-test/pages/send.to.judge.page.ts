import { Page } from '@playwright/test';
import { WebAction } from '../common/web.action';
import sendToJudgeData from "./content/send.to.judge_en.json";

let webAction: WebAction;

export class SendToJudgePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webAction = new WebAction(this.page);
    }

    async verifyPageContent() {
        await webAction.verifyPageLabel('h1.govuk-heading-l', sendToJudgeData['send-to-judge-heading']); //Heading Text
        await webAction.verifyPageLabel('label[for=\'prePostHearing\']', sendToJudgeData['send-to-judge-pre-post-hearing-field-label']); //Field Label
        await webAction.verifyPageLabel('label[for=\'tempNoteDetail\']', sendToJudgeData['send-to-judge-text-field-label']);
        await webAction.verifyPageLabel('label[for=\'interlocReviewState\']', sendToJudgeData['send-to-judge-review-state-field-label']);
    }

    async selectHearingType(): Promise<void> {
        await webAction.chooseOptionByLabel('#prePostHearing', sendToJudgeData['send-to-judge-pre-post-hearing-select-value']);
    }

    async inputData(): Promise<void> {
        await webAction.inputField('#tempNoteDetail', sendToJudgeData['send-to-judge-input']);
    }

    async selectInterlocutoryReviewState(): Promise<void> {
        await webAction.chooseOptionByLabel('#interlocReviewState', sendToJudgeData['send-to-judge-review-state-select-value']);
    }

    async confirmSubmission(): Promise<void> {
        await webAction.clickButton('Submit');
    } 
}
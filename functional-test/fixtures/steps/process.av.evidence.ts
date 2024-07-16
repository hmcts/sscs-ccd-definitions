import { BaseStep } from "./base";
import { Page } from '@playwright/test';
import { credentials } from "../../config/config";
import { timingSafeEqual } from "crypto";

const actionFurtherEvidenceTestdata = require('../../pages/content/action.further.evidence_en.json');
const issueDirectionTestdata = require('../../pages/content/issue.direction_en.json');


const uploadResponseTestdata = require('../../pages/content/upload.response_en.json');

export class ProcessAVEvidence extends BaseStep {

    readonly page: Page;

    constructor(page){
        
        super(page);
        this.page = page;
    }

    async acceptEvidence(caseId: string) {
        
        await this.loginUserWithCaseId(credentials.judge, true, caseId);
        await this.homePage.navigateToTab('Audio/Video Evidence');

        await this.avTab.verifyPageContentByKeyValue('Document Type', 'audioDocument');
        await this.avTab.verifyPageContentByKeyValue('Audio/video document url', uploadResponseTestdata.testaudiofile);
        await this.avTab.verifyPageContentByKeyValue('Audio/video party uploaded', 'FTA');
        await this.avTab.verifydueDates('Date added');

        await this.homePage.chooseEvent('Process audio/video evidence');

    }

    async rejectEvidence(caseId: string) {
        
        await this.loginUserWithCaseId(credentials.amCaseWorker, false, caseId);
        await this.homePage.reloadPage();
        
    }

}

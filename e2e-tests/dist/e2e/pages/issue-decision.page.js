"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueDecisionPage = void 0;
const protractor_1 = require("protractor");
const any_page_1 = require("./any.page");
const chai_1 = require("chai");
const remote = __importStar(require("selenium-webdriver/remote"));
const any_ccd_page_1 = require("./any-ccd.page");
const nodejs_logging_1 = require("@hmcts/nodejs-logging");
const logger = nodejs_logging_1.Logger.getLogger('issue-decision.page');
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
const expectedLabels = [
    'Part 1: Physical Disabilities (Optional)',
    '1. Mobilising unaided by another person with or without a walking stick, manual wheelchair or other aid if such aid ' +
        'is normally or could reasonably be worn or used.',
    '2. Standing and sitting.',
    '3. Reaching.',
    '4. Picking up and moving or transferring by the use of the upper body and arms.',
    '5. Manual dexterity.',
    '6. Making self understood through speaking, writing, typing, or other means which are normally or could ' +
        'reasonably be used, unaided by another person.',
    '7. Understanding communication by: (i) verbal means (such as hearing or lip reading) alone; (ii) ' +
        'non-verbal means (such as reading 16 point print or Braille) alone; or (iii) a combination of ' +
        'sub-paragraphs (i) and (ii), using any aid that is normally or could reasonably be used, unaided by another person.',
    '8. Navigation and maintaining safety using a guide dog or other aid if either or both are normally used ' +
        'or could reasonably be used.',
    '9. Absence or loss of control whilst conscious leading to extensive evacuation of the bowel and/or ' +
        'bladder, other than enuresis (bed- wetting), despite the wearing or use of any aids or adaptations ' +
        'which are normally or could reasonably be worn or used.',
    '10. Consciousness during waking moments.',
    'Part 2: Mental, cognitive and intellectual function assessment (Optional)',
    '11. Learning tasks.',
    '12. Awareness of everyday hazards (such as boiling water or sharp objects).',
    '13. Initiating and completing personal action (which means planning, organisation, problem solving, ' +
        'prioritising or switching tasks).',
    '14. Coping with change.',
    '15. Getting about.',
    '16. Coping with social engagement due to cognitive impairment or mental disorder.',
    '17. Appropriateness of behaviour with other people, due to cognitive impairment or mental disorder.',
];
class IssueDecisionPage extends any_page_1.AnyPage {
    async uploadDirection() {
        await protractor_1.browser.waitForAngular();
        protractor_1.browser.setFileDetector(new remote.FileDetector());
        await anyCcdPage.uploadFile('writeFinalDecisionPreviewDocument', 'issue1.pdf');
    }
    async addPanelMembers() {
        await (0, protractor_1.element)(protractor_1.by.id('writeFinalDecisionDisabilityQualifiedPanelMemberName')).sendKeys('Disability Member');
        await (0, protractor_1.element)(protractor_1.by.id('writeFinalDecisionMedicallyQualifiedPanelMemberName')).sendKeys('Medically Member');
    }
    async pageReference() {
        await protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf((0, protractor_1.element)(protractor_1.by.id('writeFinalDecisionPageSectionReference'))), 5000);
        await (0, protractor_1.element)(protractor_1.by.id('writeFinalDecisionPageSectionReference')).sendKeys('20');
    }
    async fillSummary() {
        await protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf((0, protractor_1.element)(protractor_1.by.id('writeFinalDecisionDetailsOfDecision'))), 5000);
        await (0, protractor_1.element)(protractor_1.by.id('writeFinalDecisionDetailsOfDecision')).sendKeys('This is the summary');
    }
    async schedule6PageFieldsAreInTheCorrectOrder() {
        await anyCcdPage.waitForElement(protractor_1.by.xpath(`//span[contains(@class, 'form-label') and text()='${expectedLabels[0]}']`));
        const labels = await protractor_1.element.all(protractor_1.by.className('form-label')).map(async (x) => x.getText());
        logger.info(labels.join('\n'));
        (0, chai_1.expect)(labels.length).to.equal(expectedLabels.length);
        for (let i = 0; i < labels.length; i++) {
            (0, chai_1.expect)(labels[i]).to.equal(expectedLabels[i]);
        }
    }
}
exports.IssueDecisionPage = IssueDecisionPage;
//# sourceMappingURL=issue-decision.page.js.map
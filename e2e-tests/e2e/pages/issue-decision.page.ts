import { browser, by, element, ExpectedConditions } from 'protractor';
import { AnyPage } from './any.page';
import { expect } from 'chai';
import * as remote from 'selenium-webdriver/remote';
import { AnyCcdPage } from './any-ccd.page';
import { Logger } from '@hmcts/nodejs-logging';

const logger = Logger.getLogger('issue-decision.page');

const anyCcdPage = new AnyCcdPage();

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

export class IssueDecisionPage extends AnyPage {
  async uploadDirection() {
    await browser.waitForAngular();
    browser.setFileDetector(new remote.FileDetector());
    await anyCcdPage.uploadFile('writeFinalDecisionPreviewDocument', 'issue1.pdf');
  }

  async addPanelMembers() {
    await element(by.id('writeFinalDecisionDisabilityQualifiedPanelMemberName')).sendKeys('Disability Member');
    await element(by.id('writeFinalDecisionMedicallyQualifiedPanelMemberName')).sendKeys('Medically Member');
  }

  async pageReference() {
    await browser.wait(ExpectedConditions.presenceOf(element(by.id('writeFinalDecisionPageSectionReference'))), 5000);
    await element(by.id('writeFinalDecisionPageSectionReference')).sendKeys('20');
  }

  async fillSummary() {
    await browser.wait(ExpectedConditions.presenceOf(element(by.id('writeFinalDecisionDetailsOfDecision'))), 5000);
    await element(by.id('writeFinalDecisionDetailsOfDecision')).sendKeys('This is the summary');
  }

  async schedule6PageFieldsAreInTheCorrectOrder() {
    await anyCcdPage.waitForElement(
      by.xpath(`//span[contains(@class, 'form-label') and text()='${expectedLabels[0]}']`)
    );

    const labels: Array<string> = await element.all(by.className('form-label')).map(async (x) => x.getText());

    logger.info(labels.join('\n'));

    expect(labels.length).to.equal(expectedLabels.length);
    for (let i = 0; i < labels.length; i++) {
      expect(labels[i]).to.equal(expectedLabels[i]);
    }
  }
}

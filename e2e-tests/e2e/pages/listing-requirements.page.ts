// import { browser } from 'protractor';
import { AnyPage } from './any.page';
import { expect } from 'chai';
import { AnyCcdPage } from './any-ccd.page';

const anyCcdPage = new AnyCcdPage();

export class ListingRequirementsPage extends AnyPage {
  async verifyOverriddenHearingValues() {
    await anyCcdPage.clickTab('Listing Requirements');
    expect(await anyCcdPage.contentContains('Overrides Listing Values')).to.equal(true);

    await anyCcdPage.isFieldValueDisplayed('Duration of the hearing', '90');
    await anyCcdPage.isFieldValueDisplayed('Is an interpreter wanted?', 'Yes');
    await anyCcdPage.isFieldValueDisplayed('Interpreter Language', 'Dutch');
    await anyCcdPage.isFieldValueDisplayed("Appellant's Hearing Channel", 'Telephone');
    await anyCcdPage.isFieldValueDisplayed('Are Panel Members Excluded?', 'Yes');
  }

  async verifyOverriddenHearingValuesForVideoAdjourned() {
    await anyCcdPage.clickTab('Listing Requirements');
    expect(await anyCcdPage.contentContains('Overrides Listing Values')).to.equal(true);

    await anyCcdPage.isFieldValueDisplayed('Duration of the hearing', '330');
    await anyCcdPage.isFieldValueDisplayed('Duration length', '2');
    await anyCcdPage.isFieldValueDisplayed('Minutes or sessions', 'Session(s)');
    await anyCcdPage.isFieldValueDisplayed("Appellant's Hearing Channel", 'Video');
  }

  async verifyOverriddenHearingValuesForPaperAdjourned() {
    await anyCcdPage.clickTab('Listing Requirements');
    expect(await anyCcdPage.contentContains('Overrides Listing Values')).to.equal(true);

    await anyCcdPage.isFieldValueDisplayed('Duration of the hearing', '30');
    await anyCcdPage.isFieldValueDisplayed("Appellant's Hearing Channel", 'Paper');
  }

  async verifyOverriddenHearingValuesForFaceToFaceAdjourned() {
    await anyCcdPage.clickTab('Listing Requirements');
    expect(await anyCcdPage.contentContains('Overrides Listing Values')).to.equal(true);

    await anyCcdPage.isFieldValueDisplayed('Duration of the hearing', '60');
    await anyCcdPage.isFieldValueDisplayed('Duration length', '2');
    await anyCcdPage.isFieldValueDisplayed('Minutes or sessions', 'Minutes');
    await anyCcdPage.isFieldValueDisplayed("Appellant's Hearing Channel", 'Face To Face');
  }
}

import { AnyCcdFormPage } from '../../pages/any-ccd-form.page';
import { CaseDetailsPage } from '../../pages/case-details.page';
import { AppointeePage } from '../../pages/appointee.page';
import { DwpResponsePage } from '../../pages/dwpresponse.page';
import { Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { browser } from 'protractor';

const anyCcdPage = new AnyCcdFormPage();
const caseDetailsPage = new CaseDetailsPage();
const appointeePage = new AppointeePage();
const dwpresponse = new DwpResponsePage();

When('I populate fields and continue', async function () {
  await caseDetailsPage.addReasonAndDate('notListableDueDate');
  await anyCcdPage.clickSubmit();
  await anyCcdPage.clickTab('Summary');
});

Then('I set UCB flag to {string}', async function (ucbFlag) {
  if (ucbFlag === 'Yes') {
    await anyCcdPage.clickElementById('dwpUCB_Yes');
  } else {
    await anyCcdPage.clickElementById('dwpUCB_No');
  }
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
  if (ucbFlag === 'Yes') {
    await anyCcdPage.clickTab('Listing Requirements');
    expect(await anyCcdPage.contentContains(ucbFlag)).to.equal(true);
  }
  expect(await anyCcdPage.contentContains(ucbFlag)).to.equal(true);
});

Then('I set PHME Granted flag to {string}', async function (phmeGranted) {
  if (phmeGranted === 'Yes') {
    await anyCcdPage.clickElementById('phmeGranted_Yes');
  } else {
    await anyCcdPage.clickElementById('phmeGranted_No');
  }
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
});

Then('I enter date of appellant death with {string} to appointee', async function (hasAppointee) {
  await caseDetailsPage.addPastDate('dateOfAppellantDeath');
  if (hasAppointee === 'No') {
    await anyCcdPage.clickElementById('appeal_appellant_isAppointee_No');
    await anyCcdPage.clickContinue();
  } else if (hasAppointee === 'Yes') {
    await anyCcdPage.clickElementById('appeal_appellant_isAppointee_Yes');
    await appointeePage.addAppointeeDetails();
    await anyCcdPage.clickContinue();
  } else {
    throw new Error('Appointee option not provided ');
  }
  await anyCcdPage.clickSubmit();
  await anyCcdPage.clickTab('Appeal Details');
  expect(await anyCcdPage.contentContains('Date of appellant death')).to.equal(true);
  if (hasAppointee === 'No') {
    await browser.driver.sleep(10);
    expect(await anyCcdPage.contentContains('Appointee details needed')).to.equal(true);
  }
  await anyCcdPage.clickTab('History');
});

Then('I enter {string} to appointee and continue', async function (hasAppointee) {
  await anyCcdPage.clickElementById('appeal_appellant_isAppointee_Yes');
  await appointeePage.addAppointeeDetails();
  await browser.driver.sleep(10);
  await anyCcdPage.clickContinue();
  await browser.driver.sleep(10);
  await anyCcdPage.clickSubmit();
  await browser.driver.sleep(10);
  await anyCcdPage.clickTab('History');

  expect(await anyCcdPage.contentContains('Awaiting Admin Action')).to.equal(true);
  await browser.driver.sleep(5);
  expect(await anyCcdPage.contentContains('Provide appointee details')).to.equal(true);
});

When(
  'I upload a {string} doc contains further information {string} for {string}',
  async function (docType: string, action: string, benefitType: string) {
    const dwpState = 'YES';
    const docLink = 'dwpUcbEvidenceDocument';
    const isContainsFurtherInfo = action === 'YES';
    const isUCB = docType === 'UCB';
    const isPHME = docType === 'PHME';
    await dwpresponse.uploadResponseWithUcbAndPhme(dwpState, docLink, isUCB, isPHME, isContainsFurtherInfo);
    if (benefitType !== 'UC') {
      await anyCcdPage.selectIssueCode();
    }
    await anyCcdPage.clickContinue();
    if (benefitType === 'UC') {
      await anyCcdPage.clickElementById('elementsDisputedList-general');
      await anyCcdPage.clickContinue();
      await anyCcdPage.addNewCollectionItem('General');
      await anyCcdPage.selectGeneralIssueCode();
      await anyCcdPage.clickContinue();
      await anyCcdPage.clickElementById('elementsDisputedIsDecisionDisputedByOthers_No');
      await anyCcdPage.clickContinue();
      await anyCcdPage.clickElementById('jointParty_No');
      await anyCcdPage.clickContinue();
    }
    await anyCcdPage.clickSubmit();
  }
);

When('I do not upload edited docs after selecting {string} option', async function (docType: string) {
  const dwpState = 'YES';
  const isContainsFurtherInfo = 'NO';
  const isPHME = docType === 'PHME';
  await dwpresponse.uploadResponseWithoutPhmeDocs(dwpState, isPHME, isContainsFurtherInfo);
  await anyCcdPage.selectIssueCode();
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
});

When('I upload a doc', async function () {
  const docLink = 'tl1Form_documentLink';
  await dwpresponse.uploadDoc(docLink);
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
});

Then('I see {string} event in case fields', async function (expectedEvent) {
  await anyCcdPage.clickTab('History');
  const fieldValue = await caseDetailsPage.getFieldValue('Event');
  expect(fieldValue).to.equal(expectedEvent);
  await browser.driver.sleep(50);
});

Then('I see field {string} with value {string} in {string} tab', async function (key, value, tab) {
  await anyCcdPage.clickTab(tab);
  const fieldValue = await caseDetailsPage.getFieldValue(key);
  expect(fieldValue).to.equal(value);
  await browser.driver.sleep(60);
});

Then('I should see UCB flag', async function () {
  await anyCcdPage.clickTab('Listing Requirements');
  expect(await anyCcdPage.contentContains('Appellant - Unacceptable Customer Behaviour (UCB)')).to.equal(true);
});

Then('I should see PHME flag as {string}', async function (state) {
  await anyCcdPage.clickTab('Summary');

  if (state === 'Under Review') {
    expect(await anyCcdPage.contentContains('PHE on this case: Under Review')).to.equal(true);
  } else if (state === 'Granted') {
    expect(await anyCcdPage.contentContains('PHE on this case: Granted')).to.equal(true);
  }
});

Then('not listable reason is {string} on summary page', async function (isVisible) {
  if (isVisible === 'Visible') {
    expect(await anyCcdPage.contentContains('reason for not listable goes here')).to.equal(true);
  }
});

When(
  'I choose not listable direction full filled to {string} and interloc review to {string}',
  async function (isDirectionFullFilled, isReview) {
    if (isDirectionFullFilled === 'YES') {
      await anyCcdPage.clickElementById('updateNotListableDirectionsFulfilled_Yes');
      await anyCcdPage.clickContinue();
      await anyCcdPage.clickSubmit();
    } else {
      await anyCcdPage.clickElementById('updateNotListableDirectionsFulfilled_No');
      await anyCcdPage.clickContinue();
      if (isReview === 'YES') {
        await anyCcdPage.clickElementById('updateNotListableInterlocReview_Yes');
        await anyCcdPage.chooseOptionContainingText('updateNotListableWhoReviewsCase', 'A Judge');
        await anyCcdPage.clickContinue();
        await anyCcdPage.clickSubmit();
        await anyCcdPage.clickTab('History');
        expect(await anyCcdPage.contentContains('Review by Judge')).to.equal(true);
      } else {
        await anyCcdPage.clickElementById('updateNotListableInterlocReview_No');
        await anyCcdPage.clickContinue();
        await anyCcdPage.clickElementById('updateNotListableSetNewDueDate_No');
        await anyCcdPage.clickContinue();
        await anyCcdPage.clickElementById('updateNotListableWhereShouldCaseMoveTo-withDwp');
        await anyCcdPage.clickContinue();
        await anyCcdPage.clickSubmit();
      }
    }
  }
);

Then('I subscribed to all parties to {string}', async function (isSubscribed) {
  const action = isSubscribed;
  if (action === 'Yes') {
    await anyCcdPage.clickElementById(`subscriptions_appellantSubscription_wantSmsNotifications_${action}`);
    await anyCcdPage.setValueByElementId('subscriptions_appellantSubscription_tya', 'appellant123');
    await anyCcdPage.setValueByElementId('subscriptions_appellantSubscription_email', 'appellant-test@mailinator.com');
    await anyCcdPage.setValueByElementId('subscriptions_appellantSubscription_mobile', '01234567890');
    await anyCcdPage.clickElementById(`subscriptions_appellantSubscription_subscribeEmail_${action}`);
    await anyCcdPage.clickElementById(`subscriptions_appellantSubscription_subscribeSms_${action}`);

    await anyCcdPage.clickElementById(`subscriptions_representativeSubscription_wantSmsNotifications_${action}`);
    await anyCcdPage.setValueByElementId('subscriptions_representativeSubscription_tya', 'representative123');
    await anyCcdPage.setValueByElementId(
      'subscriptions_representativeSubscription_email',
      'representative-test@mailinator.com'
    );
    await anyCcdPage.setTextFiledValueNull('subscriptions_representativeSubscription_mobile');
    await anyCcdPage.setValueByElementId('subscriptions_representativeSubscription_mobile', '01234567890');

    await anyCcdPage.clickElementById(`subscriptions_appointeeSubscription_wantSmsNotifications_${action}`);
    await anyCcdPage.setValueByElementId('subscriptions_appointeeSubscription_tya', 'appointee123');
    await anyCcdPage.setValueByElementId('subscriptions_appointeeSubscription_email', 'appointee-test@mailinator.com');
    await anyCcdPage.setValueByElementId('subscriptions_appointeeSubscription_mobile', '01234567890');
    await anyCcdPage.clickElementById(`subscriptions_jointPartySubscription_wantSmsNotifications_${action}`);
    await anyCcdPage.setValueByElementId('subscriptions_jointPartySubscription_tya', 'jointParty123');
    await anyCcdPage.setValueByElementId(
      'subscriptions_jointPartySubscription_email',
      'jointparty-test@mailinator.com'
    );
    await anyCcdPage.setValueByElementId('subscriptions_jointPartySubscription_mobile', '01234567890');

    await anyCcdPage.clickElementById(`subscriptions_supporterSubscription_wantSmsNotifications_${action}`);
    await anyCcdPage.setValueByElementId('subscriptions_supporterSubscription_tya', 'supportParty123');
    await anyCcdPage.setValueByElementId(
      'subscriptions_supporterSubscription_email',
      'supportparty-test@mailinator.com'
    );
    await anyCcdPage.setValueByElementId('subscriptions_supporterSubscription_mobile', '01234567890');
  } else {
    await anyCcdPage.clickElementById(`subscriptions_appellantSubscription_wantSmsNotifications_${action}`);
    await anyCcdPage.clickElementById(`subscriptions_appellantSubscription_subscribeEmail_${action}`);

    await anyCcdPage.clickElementById(`subscriptions_representativeSubscription_wantSmsNotifications_${action}`);
    await anyCcdPage.clickElementById(`subscriptions_representativeSubscription_subscribeEmail_${action}`);

    await anyCcdPage.clickElementById(`subscriptions_appointeeSubscription_wantSmsNotifications_${action}`);
    await anyCcdPage.clickElementById(`subscriptions_appointeeSubscription_subscribeEmail_${action}`);

    await anyCcdPage.clickElementById(`subscriptions_jointPartySubscription_wantSmsNotifications_${action}`);
    await anyCcdPage.clickElementById(`subscriptions_jointPartySubscription_subscribeEmail_${action}`);

    await anyCcdPage.clickElementById(`subscriptions_supporterSubscription_wantSmsNotifications_${action}`);
    await anyCcdPage.clickElementById(`subscriptions_supporterSubscription_subscribeEmail_${action}`);
    await anyCcdPage.setValueByElementId('subscriptions_supporterSubscription_tya', 'supportParty123');
    await anyCcdPage.setValueByElementId(
      'subscriptions_supporterSubscription_email',
      'supportparty-test@mailinator.com'
    );
    await anyCcdPage.setValueByElementId('subscriptions_supporterSubscription_mobile', '01234567890');
  }
  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
  await anyCcdPage.clickTab('Subscriptions');

  expect(await anyCcdPage.contentContains(action)).to.equal(true);
});

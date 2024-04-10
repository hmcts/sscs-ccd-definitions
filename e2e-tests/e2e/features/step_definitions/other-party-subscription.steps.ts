import { AnyCcdFormPage } from '../../pages/any-ccd-form.page';
import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { browser } from 'protractor';
import { Wait } from '../../enums/wait';

const anyCcdPage = new AnyCcdFormPage();

Then('I subscribed to all parties including other party to {string}', async function (isSubscribed: string) {
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

    await anyCcdPage.clickElementById(`otherParties_0_otherPartySubscription_wantSmsNotifications_${action}`);
    await anyCcdPage.setValueByElementId('otherParties_0_otherPartySubscription_tya', 'otherParty123');
    await anyCcdPage.setValueByElementId(
      'otherParties_0_otherPartySubscription_email',
      'otherparty-test@mailinator.com'
    );
    await anyCcdPage.setValueByElementId('otherParties_0_otherPartySubscription_mobile', '01234567890');
    await anyCcdPage.clickElementById(`otherParties_0_otherPartySubscription_subscribeEmail_${action}`);
    await anyCcdPage.clickElementById(`otherParties_0_otherPartySubscription_subscribeSms_${action}`);

    await anyCcdPage.clickElementById(`otherParties_0_otherPartyAppointeeSubscription_wantSmsNotifications_${action}`);
    await anyCcdPage.setValueByElementId(
      'otherParties_0_otherPartyAppointeeSubscription_tya',
      'otherPartyAppointee123'
    );
    await anyCcdPage.setValueByElementId(
      'otherParties_0_otherPartyAppointeeSubscription_email',
      'opAppontee-test@mailinator.com'
    );
    await anyCcdPage.setValueByElementId('otherParties_0_otherPartyAppointeeSubscription_mobile', '01234567890');

    await anyCcdPage.clickElementById(
      `otherParties_0_otherPartyRepresentativeSubscription_wantSmsNotifications_${action}`
    );
    await anyCcdPage.setValueByElementId('otherParties_0_otherPartyRepresentativeSubscription_tya', 'otherParty123');
    await anyCcdPage.setValueByElementId(
      'otherParties_0_otherPartyRepresentativeSubscription_email',
      'otherparty-test@mailinator.com'
    );
    await anyCcdPage.setValueByElementId('otherParties_0_otherPartyRepresentativeSubscription_mobile', '01234567890');
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

    await anyCcdPage.clickElementById(`otherParties_0_otherPartySubscription_wantSmsNotifications_${action}`);
    await anyCcdPage.clickElementById(`otherParties_0_otherPartySubscription_subscribeEmail_${action}`);

    await anyCcdPage.clickElementById(`otherParties_0_otherPartyAppointeeSubscription_wantSmsNotifications_${action}`);
    await anyCcdPage.clickElementById(`otherParties_0_otherPartyAppointeeSubscription_subscribeEmail_${action}`);

    await anyCcdPage.clickElementById(
      `otherParties_0_otherPartyRepresentativeSubscription_wantSmsNotifications_${action}`
    );
    await anyCcdPage.clickElementById(`otherParties_0_otherPartyRepresentativeSubscription_subscribeEmail_${action}`);
  }
  await anyCcdPage.clickSubmit();
  await browser.sleep(Wait.extended);
  await anyCcdPage.clickSubmit();
  await anyCcdPage.clickTab('Subscriptions');

  expect(await anyCcdPage.contentContains(action)).to.equal(true);
  await anyCcdPage.clickTab('Other Party Details');

  expect(await anyCcdPage.contentContains(action)).to.equal(true);
});

@migrated-to-exui
Feature: ESA Final Decision Notices

  Background:
    Given I presetup an "ESA" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case
    Then the case should be in "With FTA" state

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    When I choose "Upload response"
    And I perform upload contains further information "NO" on a esa case

    When I switch to be a Judge
    And I navigate to an existing case
    When I choose "Write final decision"

  @esa-decision @ESA-DN-1 @nightly-test
  Scenario: Write ESA final decision WCA and refuse all
    And I write a final decision of "wca" appeal "YES" and Support group "NO" To Allowed "NO"
    And I select schedule 2 activities with <15 points and reg 29 "NO"
    And I continue writing final decision WCA appeal
    And I provide reasons and check answers To Allowed "NO"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision upheld
    Then the case should end in "Dormant" state
    And I see "Final Decision Notice"

  @esa-decision @ESA-DN-3 @nightly-test
  Scenario: Write ESA final decision WCA and Support group, >= points for schedule 2, No Schedule 3, reg 35 YES and allow
    And I write a final decision of "wca" appeal "YES" and Support group "NO" To Allowed "YES"
    And I select schedule 2 activities with >=15 points
    And I opt out schedule 3 activities and reg 35 "YES"
    And I continue writing final decision WCA appeal
    And I provide reasons and check answers To Allowed "YES"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should end in "Dormant" state
    And I see "Final Decision Notice"

  @esa-decision @nightly-test-10 @ESA-DN-4
  Scenario: Write ESA final decision WCA and Support group, Select Schedule 3 and allow
    And I write a final decision of "wca" appeal "YES" and Support group "YES" To Allowed "YES"
    And I select schedule 3 activities
    And I continue writing final decision WCA appeal
    And I provide reasons and check answers To Allowed "YES"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" appeal status
    And I see "Final Decision Notice"

  @esa-decision @nightly-test-10 @ESA-DN-5
  Scenario: Write ESA final decision WCA and Not support group, >= points for schedule 2, No Schedule 3, No reg 35 and allow
    And I write a final decision of "wca" appeal "YES" and Support group "NO" To Allowed "YES"
    And I select schedule 2 activities with >=15 points
    And I opt out schedule 3 activities and reg 35 "NO"
    And I continue writing final decision WCA appeal
    And I provide reasons and check answers To Allowed "YES"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" appeal status
    And I see "Final Decision Notice"

  @esa-decision @nightly-test-10 @ESA-DN-6
  Scenario: Write ESA final decision WCA and Not support group, >= points for schedule 2, Select Schedule 3 and allow
    And I write a final decision of "wca" appeal "YES" and Support group "NO" To Allowed "YES"
    And I select schedule 2 activities with >=15 points
    And I select schedule 3 activities
    And I continue writing final decision WCA appeal
    And I provide reasons and check answers To Allowed "YES"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" appeal status
    And I see "Final Decision Notice"

  @esa-decision @nightly-test-10 @ESA-DN-7
  Scenario: Write ESA final decision WCA and Not support group, <15 points for schedule 2, reg 29 YES, No Schedule 3, reg 35 NO,  and allow
    And I write a final decision of "wca" appeal "YES" and Support group "NO" To Allowed "YES"
    And I select schedule 2 activities with <15 points and reg 29 "YES"
    And I opt out schedule 3 activities and reg 35 "NO"
    And I continue writing final decision WCA appeal
    And I provide reasons and check answers To Allowed "YES"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" appeal status
    And I see "Final Decision Notice"

  @esa-decision @nightly-test-10 @ESA-DN-8
  Scenario: Write ESA final decision WCA and Not support group, <15 points for schedule 2, reg 29 YES, No Schedule 3, reg 35 YES,  and allow
    And I write a final decision of "wca" appeal "YES" and Support group "NO" To Allowed "YES"
    And I select schedule 2 activities with <15 points and reg 29 "YES"
    And I opt out schedule 3 activities and reg 35 "YES"
    And I continue writing final decision WCA appeal
    And I provide reasons and check answers To Allowed "YES"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" appeal status
    And I see "Final Decision Notice"

  @esa-decision @nightly-test-10 @ESA-DN-9
  Scenario: Write ESA final decision WCA and Not support group, <15 points for schedule 2, reg 29 YES, Select Schedule 3 and allow
    And I write a final decision of "wca" appeal "YES" and Support group "NO" To Allowed "YES"
    And I select schedule 2 activities with <15 points and reg 29 "YES"
    And I select schedule 3 activities
    And I continue writing final decision WCA appeal
    And I provide reasons and check answers To Allowed "YES"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" appeal status
    And I see "Final Decision Notice"

  @esa-decision @nightly-test-10 @ESA-DN-10
  Scenario: Write ESA final decision non WCA and refuse all
    And I write a final decision of "wca" appeal "NO" and Support group "NO" To Allowed "NO"
    And I continue writing final decision non WCA appeal
    And I provide reasons and check answers To Allowed "NO"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision upheld
    Then the case should be in "Dormant" appeal status
    And I see "Final Decision Notice"

  @esa-decision @nightly-test-10 @ESA-DN-11
  Scenario: Write ESA final decision non WCA and allow
    And I write a final decision of "wca" appeal "NO" and Support group "NO" To Allowed "YES"
    And I continue writing final decision non WCA appeal
    And I provide reasons and check answers To Allowed "YES"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" appeal status
    And I see "Final Decision Notice"

  @esa-decision @nightly-test-10 @ESA-DN-12
  Scenario: Write ESA final decision with manual upload
    And I choose manual upload
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" appeal status
    And I see "Final Decision Notice"

@migrated-to-exui
Feature: UC Final Decision Notices

  Background:
    Given I presetup an "UC" SYA case
    And I am signed in as a Case Officer
    When I navigate to an existing case
    Then the case should be in "With FTA" state

    When I switch to be a DWPResponse Writer
    When I choose "Upload response"
    And I upload contains further information "NO" for "UC"

    When I switch to be a Judge
    And I navigate to an existing case
    When I choose "Write final decision"

  @uc-decision @nightly-test @UC-DN-1
  Scenario: Write UC final decision WCA and refuse all
    And I write a final decision of "wca" appeal "YES" and Support group "NO" To Allowed "NO"
    And I select schedule 6 activities with <15 points and schedule 8 para 4 "NO"
    And I continue writing final decision LCWA appeal
    And I provide reasons and check answers To Allowed "NO"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision upheld
    Then the case should be in "Dormant" state
    And I see "Final Decision Notice"

  @uc-decision @nightly-test-wip @UC-DN-3 @bug-ticket-EUI-2744
  Scenario: Write UC final decision LCWA and Support group, >= points for schedule 6, No Schedule 7, schedule 9 para 4 YES and allow
    And I write a final decision of "lcwa" appeal "YES" and Support group "NO" To Allowed "YES"
    And I select schedule 6 activities with >=15 points
    And I opt out schedule 7 activities and schedule 9 para 4 "YES"
    And I continue writing final decision LCWA appeal
    And I provide reasons and check answers To Allowed "YES"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" state
    And I see "Final Decision Notice"

  @uc-decision @nightly-test-10 @UC-DN-4
  Scenario: Write UC final decision LCWA and Support group, Select Schedule 7 and allow
    And I write a final decision of "lcwa" appeal "YES" and Support group "YES" To Allowed "YES"
    And I select schedule 7 activities
    And I continue writing final decision LCWA appeal
    And I provide reasons and check answers To Allowed "YES"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" state
    And I see "Final Decision Notice"

  @uc-decision @nightly-test-10 @UC-DN-5
  Scenario: Write UC final decision LCWA and Not support group, >= points for schedule 6, No Schedule 7, schedule 9 para 4 NO and allow
    And I write a final decision of "lcwa" appeal "YES" and Support group "NO" To Allowed "YES"
    And I select schedule 6 activities with >=15 points
    And I opt out schedule 7 activities and schedule 9 para 4 "NO"
    And I continue writing final decision LCWA appeal
    And I provide reasons and check answers To Allowed "YES"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" state
    And I see "Final Decision Notice"

  @uc-decision @nightly-test-10 @UC-DN-6
  Scenario: Write UC final decision LCWA and Not support group, >= points for schedule 6, Select Schedule 7 and allow
    And I write a final decision of "lcwa" appeal "YES" and Support group "NO" To Allowed "YES"
    And I select schedule 6 activities with >=15 points
    And I select schedule 7 activities
    And I continue writing final decision WCA appeal
    And I provide reasons and check answers To Allowed "YES"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" state
    And I see "Final Decision Notice"

  @uc-decision @nightly-test-10 @UC-DN-7
  Scenario: Write UC final decision LCWA and Not support group, <15 points for schedule 6, schedule 8 para 4 YES, No Schedule 7, schedule 9 para 4 NO,  and allow
    And I write a final decision of "lcwa" appeal "YES" and Support group "NO" To Allowed "YES"
    And I select schedule 6 activities with <15 points and schedule 8 para 4 "YES"
    And I opt out schedule 7 activities and schedule 9 para 4 "NO"
    And I continue writing final decision LCWA appeal
    And I provide reasons and check answers To Allowed "YES"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" state
    And I see "Final Decision Notice"

  @uc-decision @nightly-test-10 @UC-DN-8
  Scenario: Write UC final decision LCWA and Not support group, <15 points for schedule 6, schedule 8 para 4 YES, No Schedule 7, schedule 9 para 4 YES,  and allow
    And I write a final decision of "lcwa" appeal "YES" and Support group "NO" To Allowed "YES"
    And I select schedule 6 activities with <15 points and schedule 8 para 4 "YES"
    And I opt out schedule 7 activities and schedule 9 para 4 "YES"
    And I continue writing final decision LCWA appeal
    And I provide reasons and check answers To Allowed "YES"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" state
    And I see "Final Decision Notice"

  @uc-decision @nightly-test-10 @UC-DN-9
  Scenario: Write UC final decision LCWA and Not support group, <15 points for schedule 6, schedule 8 para 4 YES, Select Schedule 7 and allow
    And I write a final decision of "lcwa" appeal "YES" and Support group "NO" To Allowed "YES"
    And I select schedule 6 activities with <15 points and schedule 8 para 4 "YES"
    And I select schedule 7 activities
    And I continue writing final decision LCWA appeal
    And I provide reasons and check answers To Allowed "YES"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" state
    And I see "Final Decision Notice"

  @uc-decision @nightly-test-10 @UC-DN-10
  Scenario: Write UC final decision non LCWA and refuse all
    And I write a final decision of "lcwa" appeal "NO" and Support group "NO" To Allowed "NO"
    And I continue writing final decision non LCWA appeal
    And I provide reasons and check answers To Allowed "NO"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision upheld
    Then the case should be in "Dormant" state
    And I see "Final Decision Notice"

  @uc-decision @nightly-test-10 @UC-DN-11
  Scenario: Write UC final decision non LCWA and allow
    And I write a final decision of "lcwa" appeal "NO" and Support group "NO" To Allowed "YES"
    And I continue writing final decision non LCWA appeal
    And I provide reasons and check answers for non WCA To Allowed "YES"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" state
    And I see "Final Decision Notice"

  @uc-decision @nightly-test-10 @UC-DN-12
  Scenario: Write UC final decision with manual upload
    And I choose manual upload
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" state
    And I see "Final Decision Notice"

@migrated-to-exui @nightly-test
Feature: ESA Final Decision WCA And Refuse

  Background:
    Given I presetup an "ESA" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case
    Then the case should be in "With FTA" state
    When I choose execute CCD event "Admin - send to Ready to List"

    When I switch to be a Judge
    When I choose "Write final decision"

  @esa-decision @ESA-DN-2 @TA-608
  Scenario: Write ESA final decision WCA and Support group, >= points for schedule 2, No Schedule 3, No reg 35 and refuse
    And I write a final decision of "wca" appeal "YES" and Support group "YES" To Allowed "NO"
    And I opt out schedule 3 activities and reg 35 "NO"
    And I continue writing final decision WCA appeal
    And I provide reasons and check answers To Allowed "NO"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision upheld
    Then the case should end in "Dormant" state
    And I see "Final Decision Notice"

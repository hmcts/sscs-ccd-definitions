@migrated-to-exui
Feature: UC Final Decision Notices 2

  Background:
    Given I presetup an "UC" SYA case
    Given I am signed in as a Case Officer
    And I navigate to an existing case

    When I choose execute CCD event "Admin - send to Ready to List"
    Then I should see case should be in "Ready to list" state

    When I switch to be a Judge
    When I choose "Write final decision"

  @uc-decision @nightly-test @wip @UC-DN-2
  Scenario: Write ESA final decision WCA and Support group, >= points for schedule 2, No Schedule 3, No reg 35 and refuse
    And I write a final decision of "wca" appeal "YES" and Support group "YES" To Allowed "NO"
    And I opt out schedule 7 activities and schedule 9 para 4 "NO"
    And I continue writing final decision LCWA appeal
    And I provide reasons and check answers To Allowed "NO"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision upheld
    Then the case should be in "Dormant" state
    And I see "Final Decision Notice"

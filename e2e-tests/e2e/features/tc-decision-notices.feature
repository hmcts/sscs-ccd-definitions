@tc-decision @nightly-test
Feature: TC Final Decision Notices

  Background:
    Given I presetup an "Tax Credit" SYA case
    And I am signed in as a Case Officer
    When I navigate to an existing case
    Then the case should be in "With FTA" state

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    When I choose "Upload response"
    And I upload contains further information "NO" for "Tax Credit"

    When I switch to be a Judge
    And I navigate to an existing case
    When I choose "Write final decision"

  Scenario: Write TC final decision
    And I write a final decision of taxCredit appeal "YES" and Support group "NO" To Allowed "NO"
    And I see "Draft Decision Notice"

    When I choose "Issue final decision"
    And I issue a final decision generate decision upheld
    Then the case should be in "Dormant" state
    And I see "Final Decision Notice"



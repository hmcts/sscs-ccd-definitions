@migrated-to-exui @nightly-test
Feature: Interloc Review

  Background:
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case
    Then the case should be in "With FTA" state

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    When I choose "Upload response"
    And I upload contains further information "YES" for "PIP"
    Then the case should end in "Response received" state

  @interloc @TA-614
  Scenario: Should end up in "With FTA" state when ALL fields are present
    When I switch to be a Case Officer
    And I navigate to an existing case
    When I choose "Response reviewed"
    And I choose Requires Interlocutory Review Yes "Response reviewed"
    Then the case should end in "Response received" state

    When I choose "Action direction"
    And I set FTA State to No action "Action direction"
    Then the case should end in "Response received" state

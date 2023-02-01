Feature: Update UCB

@update-ucb @migrated-to-exui @nightly-test
  Scenario: Update UCB flag with upload response Granted and Refused
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    Then the case should end in "With FTA" state

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    And I choose "Upload response"
    And I upload a "UCB" doc contains further information "YES" for "PIP"
    Then the case should be in "Response received" state
    Then I should see UCB flag

    And I choose "Update UCB flag"
    And I set UCB flag to "No"




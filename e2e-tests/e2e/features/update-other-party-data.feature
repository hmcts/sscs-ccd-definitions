@update-other-party-data @migrated-to-exui @nightly-test
Feature: Update Other Party Data

 Scenario: Update Other Party Data
    Given I presetup an "Child Support" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    Then the case should end in "With FTA" state

    And I choose "Update other party data"
    And I add other party data
    Then the case should end in "With FTA" state
    And the "Other Party Details" tab is seen with "Paying parent" content

  Scenario: Update Other Party Data
    Given I presetup an "Tax Credit" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    Then the case should end in "With FTA" state

    And I choose "Update other party data"
    And I add taxCredit other party data
    Then the case should end in "With FTA" state
    And the "Other Party Details" tab is seen with "Other" content




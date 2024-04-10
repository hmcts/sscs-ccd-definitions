@migrated-to-exui @nightly-test
Feature: Link a case

  Background:
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case
    Then the case should be in "With FTA" state

  Scenario: Link with another sscs case
    When I choose "Link a case"
    And I add a case to be linked
    Then I should see the case linked within related cases tab

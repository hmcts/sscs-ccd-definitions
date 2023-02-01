@migrated-to-exui
Feature: Withdrawal

  Background:
    Given I preset up a test case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    And I choose "Admin - send to With FTA"
    Given I complete the event
    Then the case should be in "With FTA" state

  @withdrawal  @nightly-test @crossbrowser99
  Scenario: Should end up in "With FTA" state when ALL fields are present
    When I choose "Admin Appeal Withdrawn"
    And I click submit withdrawal "Admin Appeal Withdrawn"
    And I submit "Admin Appeal Withdrawn"
    Then the case should be in "Dormant" state

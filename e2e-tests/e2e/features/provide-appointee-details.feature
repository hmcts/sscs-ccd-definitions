@migrated-to-exui @nightly-test
Feature: Provide appointee details

  Background:
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    And I choose "Admin - send to Dormant"
    Given I complete the event
    Then the case should be in "Dormant" state

  @provide-appointee-details
  Scenario: Provide appointee details
    When I choose "Provide appointee details"
    And I enter "Yes" to appointee and continue
    Then I see field "Event" with value "Provide appointee details" in "History" tab
    And the case appointee details should be listed in "Appeal Details" tab





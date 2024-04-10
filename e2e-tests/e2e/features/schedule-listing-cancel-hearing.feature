@nightly-test
Feature: Cancel Schedule and Listing

  Scenario: Manual Cancellation of a hearing request

    Given I presetup an "SANDLDLA" SYA case
    And I am signed in as a Hearing Case Officer
    And I navigate to an existing case
    And the case should be in "With FTA" state

    When I choose "Upload response"
    And I respond to the dla appeal with upload contains further information "No" option and "EI" issue code
    Then the case should be in "Ready to list" state

    And I should see a hearing request generated for the appeal
    When I click on "Cancel" hearing link and select "incompl" as cancellation reason
    Then the hearing status should be updated to "CANCELLATION REQUESTED"

  Scenario: Auto Cancellation of a hearing request

    Given I presetup an "SANDLDLA" SYA case
    And I am signed in as a Hearing Case Officer
    And I navigate to an existing case
    And the case should be in "With FTA" state

    When I choose "Upload response"
    And I respond to the dla appeal with upload contains further information "No" option and "EI" issue code
    Then the case should be in "Ready to list" state

    And I should see a hearing request generated for the appeal
    When I choose "Strike out case"
    And submit the event
    Then the hearing status should be updated to "CANCELLATION REQUESTED"


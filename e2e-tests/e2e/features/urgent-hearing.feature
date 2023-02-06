@urgent-hearing @nightly-test @migrated-to-exui
Feature: Urgent hearing functionality

  Scenario: Grant urgent hearing for a case
    Given I preset up a test case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    And I choose "Admin - send to With FTA"
    Given I complete the event
    Then the case should be in "With FTA" state

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    When I choose "Action further evidence"
    And I fill the further evidence form with "otherDocumentManual" and "Urgent hearing request"
    Then the case should have successfully processed "Action further evidence" event

    When I switch to be a Judge
    And I navigate to an existing case
    When I choose "Issue directions notice"
    And I fill the direction notice form with "Grant urgent hearing"
    Then the case should be "Granted" permissions for "Urgent hearing"

  Scenario: Refuse urgent hearing for a case
    Given I preset up a test case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    When I choose "Action further evidence"
    And I fill the further evidence form with "otherDocumentManual" and "Urgent hearing request"
    Then the case should have successfully processed "Action further evidence" event

    When I switch to be a Judge
    And I navigate to an existing case
    When I choose "Issue directions notice"
    And I fill the direction notice form with "Refuse urgent hearing"
    Then the case should be "Refused" permissions for "Urgent hearing"

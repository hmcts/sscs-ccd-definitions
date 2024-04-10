@migrated-to-exui @reinstatement @nightly-test
Feature: Reinstatement functionality

  Background:
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case
    Then the case should end in "With FTA" state

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    When I choose "Action further evidence"
    And I wait "30" seconds
    And I fill the further evidence form with "otherDocumentManual" and "Reinstatement request"
    Then the case should have successfully processed "Action further evidence" event

    When I switch to be a Judge
    And I navigate to an existing case
    When I choose "Issue directions notice"

  Scenario: Grant reinstatement
    And I fill the direction notice form with "Grant reinstatement"
    Then the case should be "Granted" permissions for "Reinstatement"

  Scenario: Refuse reinstatement
    And I fill the direction notice form with "Refuse reinstatement"
    Then the case should be "Refused" permissions for "Reinstatement"

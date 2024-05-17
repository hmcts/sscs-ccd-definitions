@migrated-to-exui @nightly-test
Feature: Error messages

  @happy-path @dwp-upload-response
  Scenario: Verify AT38 Exui error message for users
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    Then the case should be in "With FTA" state

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    When I choose "Upload response"
    And I upload only evidence and original documents
    Then I should see "AT38 document is missing" error message

  Scenario: Verify edited bundle missign docs error message for users
    Given I am signed in as a Case Officer
    And I navigate to an existing case

    And I choose "Upload response"
    And I do not upload edited docs after selecting "PHME" option
    Then I should see "You must upload an edited FTA response document" error message
    And I should see "You must upload an edited FTA evidence bundle" error message

  Scenario: Verify issue code error message for users
    Given I am signed in as a Case Officer
    And I navigate to an existing case

    And I choose "Upload response"
    And I upload with default issue code
    Then I should see "Issue code cannot be set to the default value of DD" error message

  Scenario: Verify encrypted error message warning for users
    Given I am signed in as a Case Officer
    And I navigate to an existing case

    And I choose "Action further evidence"
    And I fill the further evidence form with "test-encrypted-file" invalid file
    Then I should see "The below PDF document(s) cannot be password protected, please correct this" error message

  Scenario: Verify encrypted error message warning for users
    Given I am signed in as a Case Officer
    And I navigate to an existing case

    And I choose "Action further evidence"
    And I fill the further evidence form with "test-corrupted-file" invalid file
    Then I should see "The below PDF document(s) are not readable, please correct this" error message



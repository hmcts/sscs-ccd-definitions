@migrated-to-exui @hearing-recording
Feature: Hearing recording

  Background:
    Given I presetup an "PIP" SYA case
    When I switch to be a Case Officer
    And I navigate to an existing case
    When I choose "Add a hearing"
    And I book a hearing
    And I choose "Hearing booked"
    And I submit "Hearing booked"
    Then the case should end in "Hearing" state
    When I switch to be a Case Officer

    And I navigate to an existing case
    When I choose "Upload hearing recording"

  @nightly-test
  Scenario: Grant Hearing recording - Upload and Action hearing recordings
    And I select a hearing
    And I upload a hearing recording
    Then the hearing recording should be in "Hearing Recordings" tab
    And the "Upload hearing recording" should be successfully listed in the History

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    And I choose "Request hearing recording"
    And I request for Hearing recording

    When I switch to be a Case Officer
    And I navigate to an existing case
    And I choose "Action hearing recording req"
    And request for Hearing recording is "Granted"
    Then the "FTA Request hearing recording" should be successfully listed in the History
    Then the "Action hearing recording req" should be successfully listed in the History

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    Then the hearing recording should be in "Documents" tab

 @nightly-test-CI-bug
 Scenario: Refuse Hearing recording  - an offline hearing recording request
    And I select a hearing
    And I upload a hearing recording
    Then the hearing recording should be in "Hearing Recordings" tab
    And the "Upload hearing recording" should be successfully listed in the History

    And I choose "Upload document FE"
    When I submit "issue1.pdf" as Request for Hearing Recording in the Upload document FE event
    Then the hearing recording should be in "Unprocessed Correspondence" tab
    And I choose "Action hearing recording req"
    And request for Hearing recording is "Refused"
    Then the "Action hearing recording req" should be successfully listed in the History
    And the recording collection is cleared from Unprocessed correspondence tab

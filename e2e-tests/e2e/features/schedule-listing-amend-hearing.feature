Feature: Auto Amend and Manual Amend Hearing - Schedule and Listing
  
  @nightly-test
  Scenario: Manual amend Hearing for PIP case

    Given I presetup an "SANDLDLA" SYA case
    And I am signed in as a Hearing Case Officer
    Given I navigate to an existing case
    And the case should be in "With FTA" state

    When I choose "Upload response"
    And I respond to the dla appeal with upload contains further information "No" option and "EI" issue code
    Then the case should be in "Ready to list" state

    And I should see a hearing request generated for the appeal
    When I click on hearing details
    Then the venue of the hearing should be in "Cardiff Social Security And Child Support Tribunal"
    And the duration of the hearing should be "1 Hour"
    And the earliest hearing date should be from "28" days of hearing requested

    When I update the length of hearing to "2" hours
    Then the hearing status should be updated to "UPDATE REQUESTED"

  @nightly-test-bug
  Scenario: Auto amend Hearing for PIP case

    Given I presetup an "SANDLDLA" SYA case
    And I am signed in as a Hearing Case Officer
    Given I navigate to an existing case
    And the case should be in "With FTA" state

    When I choose "Upload response"
    And I respond to the dla appeal with upload contains further information "No" option and "EI" issue code
    Then the case should be in "Ready to list" state

    When I choose "Update Listing Requirements"
    And I choose "Video" option from appellants hearing channel
    And I amend the reason for update
    Then the hearing status should be updated to "UPDATE REQUESTED"
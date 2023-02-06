@migrated-to-exui @nightly-test @issue-direction
Feature: Issue direction

  @issue-direction @preview-test
  Scenario: Judge should be able to proceed incomplete application without mrn-date
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case

    And I choose "Admin - send to Incomplete App"
    And I complete the event
    Then the case should be in "Incomplete Application" state

    And I choose "Send to interloc - pre-valid"
    And I submit the interloc reason

    When I choose "Update to case data"
    Then I should update case with a valid nino

    When I switch to be a Judge
    And I navigate to an existing case
    And I choose "Issue directions notice"
    And I allow the appeal to proceed
    Then I should see Addition details in documents tab

  @tc-decision
  Scenario: Judge should be able to proceed incomplete application without mrn-date

    Given I presetup an "Tax Credit" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case
    Then the case should end in "With FTA" state

    And I choose "Admin - send to Incomplete App"
    And I complete the event
    Then the case should be in "Incomplete Application" state

    And I choose "Send to interloc - pre-valid"
    And I submit the interloc reason

    When I choose "Update to case data"
    Then I should update case with a valid nino and confidentiality option

    When I switch to be a Judge
    And I navigate to an existing case
    And I choose "Issue directions notice"
    And I allow the appeal to proceed
    Then I should see Addition details in documents tab


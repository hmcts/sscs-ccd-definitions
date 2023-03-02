@migrated-to-exui-1 @wip
Feature: Upload evidences to a case

  @nightly-test
  Scenario: Upload an evidence using Upload document event
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case
    Then the case should end in "With FTA" state

    When I choose "Upload document"
    And I upload a new document
    Then I should see uploaded file within documents tab

  @nightly-test
  Scenario: Upload an evidence using Upload document FE event
    Given I am signed in as a Case Officer
    And I navigate to an existing case

    And I choose "Upload document FE"
    When I submit "issue1.pdf" as "Appellant evidence" in the Upload document FE event
    Then I should see uploaded file within Unprocessed correspondence tab

  @nightly-test @preview-test
  Scenario: Upload an evidence using Upload further evidence event
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case

    And I choose "Admin - send to Incomplete App"
    And I complete the event
    Then the case should be in "Incomplete Application" state

    And I choose "Upload further evidence"
    When I upload further evidence documents for Incomplete Application
    Then I should see uploaded file for incomplete case within documents tab

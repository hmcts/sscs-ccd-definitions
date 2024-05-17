@migrated-to-exui @nightly-test
Feature: Update Phme

  Background:
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case
    Then the case should be in "With FTA" state

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    And I choose "Upload response"
    And I upload a "PHME" doc contains further information "YES" for "PIP"
    Then the case should end in "Response received" state
    Then I should see PHME flag as "Under Review"

    When I switch to be a Judge
    And I choose "Review PHE request"

  @update-phme @bug-EUI-4125
  Scenario: Update UCB flag with upload response Granted and Refused
    And I set PHME Granted flag to "Yes"
    Then I should see PHME flag as "Granted"

    When I switch to be a Case Officer
    And I choose "Create a bundle"
    And I submit "Create a bundle"
    Then the "Create a bundle" event should be successfully listed in the History
    Then the "Stitching bundle complete" event should be successfully listed in the History
    And the case bundle details should be listed in "Bundles" tab
    And the "SSCS Bundle Edited" bundle configuration should have been used
    And the "SSCS Bundle Original" bundle configuration should have been used
    And FTA edited documents should be seen against the case


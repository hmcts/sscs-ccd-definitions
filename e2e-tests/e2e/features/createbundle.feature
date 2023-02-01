@migrated-to-exui @nightly-test
Feature: Create bundle for a case

  Background:
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case
    Then the case should end in "With FTA" state

    When I choose "Upload response"
    And I upload contains further information "NO" for "PIP"
    Then the case should end in "Ready to list" state

  @bundle @preview-test-skip
  Scenario: Verify create bundle event for cases
    Given I navigate to an existing case
    And I choose "Create a bundle"
    And I submit "Create a bundle"
    Then the "Create a bundle" event should be successfully listed in the History
    Then the "Stitching bundle complete" event should be successfully listed in the History
    And the case bundle details should be listed in "Bundles" tab

  @stitch-bundle
  Scenario: Verify stitch bundle event for cases
    And I choose "Stitching bundle complete"
    And I submit "Stitching bundle complete"
    Then the "Stitching bundle complete" event should be successfully listed in the History

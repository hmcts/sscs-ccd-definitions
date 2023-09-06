@migrated-to-exui @nightly-test @update-subscriptions @preview-test
Feature: Update subscriptions

  Background:
    Given I presetup an "UC" SYA case
    And I am signed in as a Case Officer
    When I navigate to an existing case
    Then the case should end in "With FTA" state
    And I choose "Update subscription"

  Scenario: Update Subscription - Yes
    And I subscribed to all parties to "Yes"

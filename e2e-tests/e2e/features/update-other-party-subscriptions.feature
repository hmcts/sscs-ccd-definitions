@migrated-to-exui @nightly-test-skip @update-other-party-subscriptions
Feature: Update Other Party Subscriptions

  Background:
    Given I presetup an "Child Support" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    Then the case should be in "With FTA" state

    And I choose "Update other party data"
    And I add other party data
    Then the case should end in "With FTA" state

  @preview-test-skip
  Scenario: Update Subscription - Yes
    And I choose "Update subscription"
    And I subscribed to all parties including other party to "Yes"

  Scenario: Update Subscription - No
    And I wait "35" seconds
    And I choose "Update subscription"
    And I subscribed to all parties including other party to "No"

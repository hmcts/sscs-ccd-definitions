@migrated-to-exui @nightly-test
Feature: Update Not Listable

  Background:
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case
    Then the case should end in "With FTA" state

    And I choose "Not listable"
    And I populate fields and continue
    Then not listable reason is "Visible" on summary page
    Then the case should be in "Not listable" appeal status

  @update-not-listable
  Scenario: Update not listable : Yes to direction full filled and end to Ready to list
    And I choose "Update not listable case"
    And I choose not listable direction full filled to "YES" and interloc review to "NO"
    Then not listable reason is "Invisible" on summary page
    Then the case should end in "Ready to list" state

  @update-not-listable
  Scenario: Update not listable : No to direction full filled and interloc review to NO
    And I choose "Update not listable case"
    And I choose not listable direction full filled to "NO" and interloc review to "NO"
    Then the case should be in "With FTA" appeal status

  @update-not-listable
  Scenario: Update not listable : No to direction full filled and interloc review to YES
    And I choose "Update not listable case"
    And I choose not listable direction full filled to "NO" and interloc review to "YES"

    And I choose "Provide appointee details"
    And I enter "Yes" to appointee and continue
    Then I see field "Event" with value "Provide appointee details" in "History" tab

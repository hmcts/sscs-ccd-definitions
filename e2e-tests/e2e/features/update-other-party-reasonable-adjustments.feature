@reasonable-adjustments-other-party @nightly-test
Feature: Other party Reasonable adjustments functionality

  Scenario: Actioned reasonable adjustments
    Given I presetup an "Child Support" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    Then the case should end in "With FTA" state

    And I choose "Update other party data"
    And I add other party data
    Then the case should end in "Not listable" state

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    And I choose "Update reasonable adjustment"
    And generate a letter in "Alternative Letter Format" with "otherPartyYes" option
    Then reasonable adjustment details are seen on the "Other Party Details" tab

    When I choose "Issue directions notice"
    And I fill the direction notice form with "Provide information"
    And I wait "30" seconds
    Then the "Stop bulk print" event should be successfully listed in the History
    Then Reasonable adjustment tab is seen with "Reasonable adjustment status" as "Required"

  Scenario: Remove reasonable adjustment flag from a case
    Given I presetup an "Child Support" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    Then the case should end in "With FTA" state

    And I choose "Update other party data"
    And I add other party data
    Then the case should end in "Not listable" state

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    And I choose "Update reasonable adjustment"
    And generate a letter in "Alternative Letter Format" with "otherPartyYes" option
    Then reasonable adjustment details are seen on the "Other Party Details" tab
    And I wait "30" seconds

    When I choose "Update reasonable adjustment"
    And generate a letter in "Alternative Letter Format" with "otherPartyNo" option
    Then reasonable adjustment details are not seen on the "Other Party Details" tab

@reasonable-adjustments @nightly-test
Feature: Reasonable adjustments functionality


  Scenario: Actioned reasonable adjustments
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case
    Then the case should end in "With FTA" state

    When I choose "Update reasonable adjustment"
    And generate a letter in "Alternative Letter Format" with "Yes" option
    Then reasonable adjustment details are seen on the "Summary" tab

    When I choose "Issue directions notice"
    And I fill the direction notice form with "Provide information"
    Then Reasonable adjustment tab is seen with "Reasonable adjustment status" as "Required"

  Scenario: Required reasonable adjustments
    Given I am signed in as a Case Officer
    And I navigate to an existing case

    When I choose "Process reasonable adjustment"
    And I update adjustment status to be "Actioned"
    Then Reasonable adjustment tab is seen with "Reasonable adjustment status" as "Actioned"

  Scenario: Remove reasonable flag from a case
    Given I am signed in as a Case Officer
    And I navigate to an existing case

    When I choose "Update reasonable adjustment"
    And generate a letter in "Alternative Letter Format" with "No" option
    Then reasonable adjustment details are not seen on the "Summary" tab

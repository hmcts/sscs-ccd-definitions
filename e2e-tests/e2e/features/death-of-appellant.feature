@migrated-to-exui @nightly-test
Feature: Record the death of an appellant
 
  @death-of-appellant 
  Scenario: Record the death of an appellant : No Appointee
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    Then the case should be in "With FTA" state

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    And I choose "Death of appellant"
    And I enter date of appellant death with "No" to appointee
    Then I see field "Event" with value "Death of appellant" in "History" tab
    Then I see field "Want SMS Notifications" with value "No" in "Subscriptions" tab
    Then I see field "Subscribed to Email" with value "No" in "Subscriptions" tab


  @death-of-appellant
  Scenario: Record the death of an appellant : No Appointee
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    Then the case should be in "With FTA" state

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    And I choose "Death of appellant"
    And I enter date of appellant death with "Yes" to appointee
    Then I see field "Event" with value "Death of appellant" in "History" tab
    Then I see field "Want SMS Notifications" with value "No" in "Subscriptions" tab
    Then I see field "Subscribed to Email" with value "No" in "Subscriptions" tab



@amend-elements-issues @migrated-to-exui @nightly-test
Feature: Amend Elements Issues

    Scenario: Add new elements to UC case
        Given I presetup an "UC" SYA case
        And I am signed in as a Case Officer
        When I navigate to an existing case
        Then the case should be in "With FTA" state
        When I switch to be a DWPResponse Writer
        And I navigate to an existing case
        And I choose "Upload response"
        And I upload contains further information "NO" for "UC"
        When I switch to be a Case Officer
        And I navigate to an existing case
        And I choose "Amend elements"
        When I select "Housing" and "Childcare" Elements
        And I add issue codes for respective elements
        When I submit "Amend elements"
        Then the Amend elements event should be seen in "History" tab
        And I should see the choose elements and issue code within "Elements and issues" tab
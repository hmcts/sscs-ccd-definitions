@migrated-to-exui
Feature: Postponement request event

    Background: Set up PIP case
        Given I presetup an "PIP" SYA case
        When I switch to be a Case Officer
        And I navigate to an existing case
        When I choose "Add a hearing"
        And I book a hearing in the future
        And I choose "Hearing booked"
        And I submit "Hearing booked"
        Then the case should end in "Hearing" state
        When I choose "Postponement request"
        And I enter postponement request details
        Then I choose "Action Postponement Request"

    Scenario: Grant postponement request
        And I enter "Grant Postponement" in the action postponement request page
        Then the case should end in "Ready to list" state

    Scenario: Refuse postponement request
        And I enter "Refuse Postponement" in the action postponement request page

    Scenario: Send to Judge postponement request
        And I enter "Send to Judge" in the action postponement request page


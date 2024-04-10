@a11y
Feature: Common accessibility checks

    Scenario: Go to Sign in page
        Given I go to the sign in page
        Then the page is accessible

    Scenario: Visit the standard tabs as DWP worker
        Given I presetup an "ESA" SYA case
        And I am signed in as a Case Officer
        And I navigate to an existing case
        Then the page is accessible
        Given I go to "Appeal Details" tab
        Then the page is accessible
        Given I go to "History" tab
        Then the page is accessible
        Given I go to "Subscriptions" tab
        Then the page is accessible
        Given I go to "Documents" tab
        Then the page is accessible
        Given I go to "FTA Documents" tab
        Then the page is accessible
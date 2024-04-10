@reissue-document @migrated-to-exui @nightly-test
Feature: Reissue document

    Scenario: Reissue an document to appellants
        Given I presetup an "PIP" SYA case
        And I am signed in as a Case Officer
        And I navigate to an existing case
        When I choose "Update to case data"
        Then I should update case with a valid nino
        When I switch to be a Judge
        And I navigate to an existing case
        And I choose "Issue directions notice"
        And I allow the appeal to proceed
        Then I should see Addition details in documents tab
        When I switch to be a Case Officer
        And I navigate to an existing case
        When I choose "Reissue document"
        And resend only to appellant and not to representative
        And I submit "Reissue document"
        Then the reissue document event should be seen in “History” tab
        And I should see Addition details in documents tab

@nightly-test @migrated-to-exui
Feature: Process audio video evidence event

    Background: Set up PIP case
        Given I presetup an "PIP" SYA case

    Scenario: Upload response with AV, admit the evidence and then create a bundle
        And I am signed in as a DWPResponse Writer
        And I navigate to an existing case
        And I choose "Upload response"
        When I upload AV evidence and complete Upload response event for "PIP" case 
        Then I should see the AV evidence after clicking the AV tab
        And I should see the RIP1 document
        And I should see that the AV evidence was uploaded by "FTA"
        When I choose "Process audio/video evidence"
        And I process the AV evidence using the "Admit audio/video evidence" action
        Then I "should" see the AV evidence in the FTA Documents tab
        When I choose "Create a bundle"
        And I submit "Create a bundle"
        Then the bundle should include the AV evidence

    Scenario: Upload document FE with AV, exclude the evidence and ensure it is dissociated from case
        And I am signed in as a Case Officer
        And I navigate to an existing case
        And I choose "Upload document FE"
        When I submit "test_av.mp3" as "Appellant evidence" in the Upload document FE event
        Then I should see the AV evidence after clicking the AV tab
        And I should see that the AV evidence was uploaded by "CTSC clerk"
        When I choose "Process audio/video evidence"
        And I process the AV evidence using the "Exclude audio/video evidence" action
        Then I "should not" see the AV evidence in the FTA Documents tab

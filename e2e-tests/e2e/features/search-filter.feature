@nightly-test
Feature: Workbasket filter search

  Scenario: Search by benefit and issue code
    Given I am signed in as a Case Officer
    When I choose to filter with benefit and issue code in workbasket filter
    Then I should see 25 cases returned in search results
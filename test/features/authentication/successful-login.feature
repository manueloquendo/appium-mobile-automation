@mobile @android @ios @signin @positive @smoke
Feature: Mobile Sign In - Successful Authentication

  Scenario: Successful authentication with valid credentials
    Given the user is on the Sign In screen
    When the user enters a valid email address
    And the user enters a valid password
    And the user taps the Sign In button
    Then the user should be redirected to the MyStore screen
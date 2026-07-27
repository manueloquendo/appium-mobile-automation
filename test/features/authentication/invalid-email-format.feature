@mobile @android @ios @signin @negative @regression

Feature: Mobile Sign In - Invalid Email Format Validation

    Scenario: Validation for invalid email format

        Given the user is on the Sign In screen
        When the user enters an invalid email address
        And the user taps the Sign In button
        Then the Email Address field should display the invalid format validation message
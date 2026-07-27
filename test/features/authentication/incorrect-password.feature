@mobile @android @ios @signin @negative @regression

Feature: Mobile Sign In - Authentication Failure with Incorrect Password

    Scenario: Authentication failure with an incorrect password

        Given the user is on the Sign In screen
        When the user enters a valid email address
        And the user enters an incorrect password
        And the user taps the Sign In button
        Then an authentication failure message should be displayed
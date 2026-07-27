@mobile @android @ios @forgot-password @negative @regression

Feature: Mobile Forgot Password - Navigation and Email Validation

    Scenario: Navigation and empty or invalid email field validation

        Given the user is on the Sign In screen
        When the user taps the Forgot Email or Password link
        Then the Forgot Password screen should be displayed
        When the user taps the Submit button without entering an email address
        Then the Forgot Password email field should display the required validation message
        When the user enters an invalid email address on the Forgot Password screen
        And the user taps the Forgot Password Submit button
        Then the Forgot Password email field should display the invalid format validation message
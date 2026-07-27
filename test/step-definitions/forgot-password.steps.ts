import {
    When,
    Then,
} from '@wdio/cucumber-framework';

import ForgotPasswordPage from '../pageobjects/forgot-password.page.js';

/**
 * Opens Forgot Password from the Sign In screen.
 *
 * The Given step:
 * "the user is on the Sign In screen"
 *
 * continues to be provided by:
 * authentication.steps.ts
 */
When(
    'the user taps the Forgot Email or Password link',
    async function (): Promise<void> {
        await ForgotPasswordPage
            .openFromSignIn();
    }
);

/**
 * Verifies that the Forgot Password screen opened.
 */
Then(
    'the Forgot Password screen should be displayed',
    async function (): Promise<void> {
        await ForgotPasswordPage
            .verifyPageIsDisplayed();
    }
);

/**
 * Submits the Forgot Password form without
 * entering an email address.
 */
When(
    'the user taps the Submit button without entering an email address',
    async function (): Promise<void> {
        await ForgotPasswordPage
            .submitWithoutEmail();
    }
);

/**
 * Verifies the empty-email required message.
 */
Then(
    'the Forgot Password email field should display the required validation message',
    async function (): Promise<void> {
        await ForgotPasswordPage
            .verifyEmailRequiredMessage();
    }
);

/**
 * Enters a malformed email address.
 */
When(
    'the user enters an invalid email address on the Forgot Password screen',
    async function (): Promise<void> {
        await ForgotPasswordPage.enterEmail(
            'ashutoh'
        );
    }
);

/**
 * Enters an unregistered email address.
 */
When(
    'the user enters the unregistered email address {string}',
    async function (email: string): Promise<void> {
        await ForgotPasswordPage.enterEmail(email);
    }
);

/**
 * Enters a registered email address.
 */
When(
    'the user enters the registered email address {string}',
    async function (email: string): Promise<void> {
        await ForgotPasswordPage.enterEmail(email);
    }
);

/**
 * Taps the Submit button after entering an email.
 */
When(
    'the user taps the Forgot Password Submit button',
    async function (): Promise<void> {
        await ForgotPasswordPage
            .tapSubmitButton();
    }
);

/**
 * Verifies the invalid email format message.
 */
Then(
    'the Forgot Password email field should display the invalid format validation message',
    async function (): Promise<void> {
        await ForgotPasswordPage
            .verifyInvalidEmailFormatMessage();
    }
);

/**
 * Verifies the unregistered email popup.
 */
Then(
    'the Unable to Send Reset Email popup should be displayed',
    async function (): Promise<void> {
        await ForgotPasswordPage
            .verifyUnregisteredEmailPopup();
    }
);

/**
 * Verifies the unregistered email popup message.
 */
Then(
    'the unregistered email error message should be displayed',
    async function (): Promise<void> {
        await ForgotPasswordPage
            .verifyUnregisteredEmailMessage();
    }
);

/**
 * Closes the unregistered email popup.
 */
When(
    'the user taps the OK button on the popup',
    async function (): Promise<void> {
        await ForgotPasswordPage
            .tapUnregisteredEmailPopupOkButton();
    }
);

/**
 * Verifies the successful password-reset popup.
 */
Then(
    'the password reset email confirmation popup should be displayed',
    async function (): Promise<void> {
        await ForgotPasswordPage
            .verifySuccessfulResetPopup();
    }
);

/**
 * Verifies the successful password-reset message.
 */
Then(
    'the successful password reset message should be displayed',
    async function (): Promise<void> {
        await ForgotPasswordPage
            .verifySuccessfulResetMessage();
    }
);

/**
 * Closes the successful password-reset popup.
 */
When(
    'the user taps the OK button on the successful reset popup',
    async function (): Promise<void> {
        await ForgotPasswordPage
            .tapSuccessfulResetPopupOkButton();
    }
);

/**
 * Taps Cancel on the Forgot Password screen.
 */
When(
    'the user taps the Cancel button on the Forgot Password screen',
    async function (): Promise<void> {
        await ForgotPasswordPage
            .tapCancelButton();
    }
);

/**
 * Verifies that the user returned to the Sign In screen.
 */
Then(
    'the Sign In screen should be displayed',
    async function (): Promise<void> {
        await ForgotPasswordPage
            .verifySignInScreenIsDisplayed();
    }
);

/**
 * Confirms the Forgot Password page is still displayed.
 *
 * Kept for existing scenarios that still validate
 * the original post-popup behavior.
 */
Then(
    'the Forgot Password screen should remain displayed',
    async function (): Promise<void> {
        await ForgotPasswordPage
            .verifyPageIsDisplayed();
    }
);
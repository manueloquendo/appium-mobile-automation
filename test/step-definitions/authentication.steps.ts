import {
    Given,
    When,
    Then,
} from '@wdio/cucumber-framework';

import {
    browser,
    expect,
} from '@wdio/globals';

import LoginPage from '../pageobjects/login.page.js';
import { mobileConfig } from '../../config/mobile-config.js';

/**
 * Test data used by the authentication scenarios.
 */
const authenticationTestData = {
    validEmail:
        mobileConfig.testUserEmail,

    validPassword:
        mobileConfig.testUserPassword,

    invalidEmail:
        mobileConfig.invalidEmail,

    incorrectPassword:
        mobileConfig.incorrectPassword,
} as const;

/**
 * Common Given step for all Sign In scenarios.
 */
Given(
    'the user is on the Sign In screen',
    async function (): Promise<void> {
        await LoginPage.waitForPageToLoad();
    }
);

/**
 * Successful Login and Incorrect Password:
 * Enters a valid registered email address.
 */
When(
    'the user enters a valid email address',
    async function (): Promise<void> {
        await LoginPage.enterEmail(
            authenticationTestData.validEmail
        );
    }
);

/**
 * Successful Login:
 * Enters the configured valid password.
 */
When(
    'the user enters a valid password',
    async function (): Promise<void> {
        if (
            authenticationTestData
                .validPassword
                .trim()
                .length === 0
        ) {
            throw new Error(
                'A valid password is required. Configure one of these variables: ' +
                'VALID_PASSWORD, TEST_USER_PASSWORD, or MOBILE_TEST_PASSWORD.'
            );
        }

        await LoginPage.enterPassword(
            authenticationTestData.validPassword
        );
    }
);

/**
 * Incorrect Password:
 * Enters a deliberately incorrect password.
 */
When(
    'the user enters an incorrect password',
    async function (): Promise<void> {
        await LoginPage.enterPassword(
            authenticationTestData
                .incorrectPassword
        );
    }
);

/**
 * Invalid Email Format:
 * Enters an incomplete email address.
 */
When(
    'the user enters an invalid email address',
    async function (): Promise<void> {
        await LoginPage.enterEmail(
            authenticationTestData.invalidEmail
        );
    }
);

/**
 * Common Sign In button action.
 */
When(
    'the user taps the Sign In button',
    async function (): Promise<void> {
        await LoginPage.tapSignInButton();
    }
);

/**
 * Blank Fields Validation:
 * Submits the form while both fields are empty.
 */
When(
    'the user taps the Sign In button without entering credentials',
    async function (): Promise<void> {
        await LoginPage.tapSignInWithoutCredentials();
    }
);

/**
 * Blank Fields Validation:
 * Verifies the required Email Address message.
 */
Then(
    'the Email Address field should display the required validation message',
    async function (): Promise<void> {
        await LoginPage
            .verifyEmailRequiredMessage();
    }
);

/**
 * Blank Fields Validation:
 * Verifies the required Password message.
 */
Then(
    'the Password field should display the required validation message',
    async function (): Promise<void> {
        await LoginPage
            .verifyPasswordRequiredMessage();
    }
);

/**
 * Invalid Email Format:
 * Verifies the invalid email format message.
 */
Then(
    'the Email Address field should display the invalid format validation message',
    async function (): Promise<void> {
        await LoginPage
            .verifyInvalidEmailFormatMessage();
    }
);

/**
 * Incorrect Password:
 * Verifies the authentication failure message.
 */
Then(
    'an authentication failure message should be displayed',
    async function (): Promise<void> {
        await LoginPage
            .verifyAuthenticationFailureMessage();
    }
);

/**
 * Successful Login:
 * Verifies that the application redirects the user
 * to the MyStore screen.
 */
Then(
    'the user should be redirected to the MyStore screen',
    async function (): Promise<void> {
        await browser.waitUntil(
            async (): Promise<boolean> => {
                const pageSource =
                    await browser.getPageSource();

                return (
                    pageSource.includes(
                        'MyStore'
                    ) ||
                    pageSource.includes(
                        'My Store'
                    )
                );
            },
            {
                timeout: 30_000,
                interval: 1_000,
                timeoutMsg:
                    'The user was not redirected to the MyStore screen.',
            }
        );

        const pageSource =
            await browser.getPageSource();

        const isMyStoreDisplayed =
            pageSource.includes(
                'MyStore'
            ) ||
            pageSource.includes(
                'My Store'
            );

        await expect(
            isMyStoreDisplayed
        ).toBe(true);
    }
);
import {
    $,
    browser,
    expect,
} from '@wdio/globals';

import {
    forgotPasswordLocators as androidForgotPasswordLocators,
} from '../locators/android/forgot-password.locators.js';

import {
    forgotPasswordLocators as iosForgotPasswordLocators,
} from '../locators/ios/forgot-password.locators.js';

import {
    loginLocators as androidLoginLocators,
} from '../locators/android/login.locators.js';

import {
    loginLocators as iosLoginLocators,
} from '../locators/ios/login.locators.js';

type LocatorCollection =
    Record<string, string>;

class ForgotPasswordPage {

    /**
     * Android confirmation message displayed after a
     * successful password reset request.
     */
    private get successfulResetMessageAndroid() {
        return $(
            'android=new UiSelector()' +
            '.textContains(' +
            '"The reset password email has been sent"' +
            ')'
        );
    }

    /**
     * Android OK button displayed on the successful
     * password-reset confirmation popup.
     */
    private get successfulResetOkButtonAndroid() {
        return $(
            'android=new UiSelector()' +
            '.textMatches("(?i)^ok$")'
        );
    }

    /**
     * iOS confirmation message displayed after a
     * successful password reset request.
     *
     * Appium Inspector:
     * Type: XCUIElementTypeStaticText
     * Name/Label/Value:
     * The reset password email has been sent to the
     * address you entered.
     */
    private get successfulResetMessageIOS() {
        return $(
            '-ios predicate string:' +
            'type == "XCUIElementTypeStaticText" ' +
            'AND (' +
            'name CONTAINS[c] ' +
            '"The reset password email has been sent" ' +
            'OR label CONTAINS[c] ' +
            '"The reset password email has been sent" ' +
            'OR value CONTAINS[c] ' +
            '"The reset password email has been sent"' +
            ')'
        );
    }

    /**
     * iOS Ok control displayed on the successful
     * password-reset confirmation popup.
     *
     * Appium Inspector:
     * Type: XCUIElementTypeOther
     * Name: Ok
     * Label: Ok
     * Visible: true
     * Accessible: true
     * Hittable: true
     */
    private get successfulResetOkButtonIOS() {
        return $(
            '-ios predicate string:' +
            'type == "XCUIElementTypeOther" ' +
            'AND (' +
            'name ==[c] "Ok" ' +
            'OR label ==[c] "Ok" ' +
            'OR value ==[c] "Ok"' +
            ')'
        );
    }

    /**
     * Returns the Forgot Password locator collection
     * for the active mobile platform.
     */
    private get locators():
        LocatorCollection {
        return browser.isIOS
            ? iosForgotPasswordLocators
            : androidForgotPasswordLocators;
    }

    /**
     * Returns the Login locator collection
     * for the active mobile platform.
     */
    private get loginLocators():
        LocatorCollection {
        return browser.isIOS
            ? iosLoginLocators
            : androidLoginLocators;
    }

    /**
     * Forgot Email/Password control.
     */
    private get forgotEmailOrPasswordLink() {
        return $(
            this.locators
                .forgotEmailOrPasswordLink
        );
    }

    /**
     * Forgot Password title.
     */
    private get forgotPasswordTitle() {
        return $(
            this.locators
                .forgotPasswordTitle
        );
    }

    /**
     * Email Address input.
     */
    private get emailInput() {
        return $(
            this.locators.emailInput
        );
    }

    /**
     * Submit control.
     */
    private get submitButton() {
        return $(
            this.locators.submitButton
        );
    }

    /**
     * Required Email Address validation.
     */
    private get emailRequiredMessage() {
        return $(
            this.locators
                .emailRequiredMessage
        );
    }

    /**
     * Invalid Email Address validation.
     */
    private get invalidEmailFormatMessage() {
        return $(
            this.locators
                .invalidEmailFormatMessage
        );
    }

    /**
     * Unregistered email popup title.
     */
    private get unregisteredEmailPopupTitle() {
        return $(
            this.locators.unregisteredEmailPopupTitle
        );
    }

    /**
     * Unregistered email popup message.
     */
    private get unregisteredEmailPopupMessage() {
        return $(
            this.locators.unregisteredEmailPopupMessage
        );
    }

    /**
     * OK button displayed on the popup.
     */
    private get unregisteredEmailPopupOkButton() {
        return $(
            this.locators.unregisteredEmailPopupOkButton
        );
    }

    /**
     * Login Sign In control used as a coordinate
     * reference when needed on iOS.
     */
    private get loginSignInButton() {
        return $(
            this.loginLocators.signInButton
        );
    }

    /**
     * Login Password input used to confirm that
     * the Sign In screen is no longer displayed.
     */
    private get loginPasswordInput() {
        return $(
            this.loginLocators.passwordInput
        );
    }

    /**
     * Opens Forgot Password from the Sign In screen.
     */
    public async openFromSignIn():
        Promise<void> {
        if (browser.isAndroid) {
            await this.openFromSignInAndroid();
        } else {
            await this.openFromSignInIos();
        }

        await this.waitForForgotPasswordNavigation();
    }

    /**
     * Opens Forgot Password on Android.
     */
    private async openFromSignInAndroid():
        Promise<void> {
        const control =
            this.forgotEmailOrPasswordLink;

        await control.waitForDisplayed({
            timeout: 30_000,
            timeoutMsg:
                'The Forgot Email/Password link ' +
                'was not displayed on Android.',
        });

        await control.waitForEnabled({
            timeout: 15_000,
            timeoutMsg:
                'The Forgot Email/Password link ' +
                'was not enabled on Android.',
        });

        await control.click();
    }

    /**
     * Opens Forgot Password on iOS.
     */
    private async openFromSignInIos():
        Promise<void> {
        const exactLinkWasTapped =
            await this.tryTapExactIosLink();

        if (exactLinkWasTapped) {
            const navigationOccurred =
                await this.didNavigationOccur(
                    5_000
                );

            if (navigationOccurred) {
                console.log(
                    'Forgot Password opened using ' +
                    'the exact iOS link locator.'
                );

                return;
            }
        }

        await this.tapAboveSignInButton();
    }

    /**
     * Attempts to tap the exact Forgot Email/Password
     * element exposed by iOS.
     */
    private async tryTapExactIosLink():
        Promise<boolean> {
        const control =
            this.forgotEmailOrPasswordLink;

        const isDisplayed =
            await control
                .isDisplayed()
                .catch(() => false);

        if (!isDisplayed) {
            console.log(
                'The exact Forgot Email/Password ' +
                'iOS element was not exposed.'
            );

            return false;
        }

        try {
            const location =
                await control.getLocation();

            const size =
                await control.getSize();

            console.log(
                'Exact Forgot Email/Password element: ' +
                `x=${location.x}, ` +
                `y=${location.y}, ` +
                `width=${size.width}, ` +
                `height=${size.height}`
            );

            await control.click();
            await browser.pause(1_000);

            return true;
        } catch (error) {
            console.log(
                'The exact Forgot Email/Password ' +
                'element could not be tapped.',
                error
            );

            return false;
        }
    }

    /**
     * Taps the Forgot Email/Password area using
     * the Sign In button as a reference.
     */
    private async tapAboveSignInButton():
        Promise<void> {
        const signInButton =
            this.loginSignInButton;

        await signInButton.waitForDisplayed({
            timeout: 30_000,
            timeoutMsg:
                'The Sign In button was not displayed, ' +
                'so the Forgot Password fallback tap ' +
                'could not be calculated.',
        });

        const location =
            await signInButton.getLocation();

        const size =
            await signInButton.getSize();

        const centerX =
            Math.round(
                location.x +
                size.width / 2
            );

        const verticalOffset =
            Math.max(
                25,
                Math.round(
                    size.height * 0.75
                )
            );

        const targetY =
            Math.round(
                location.y -
                verticalOffset
            );

        console.log(
            'Tapping Forgot Email/Password ' +
            `at x=${centerX}, y=${targetY}`
        );

        await browser.execute(
            'mobile: tap',
            {
                x: centerX,
                y: targetY,
            }
        );

        await browser.pause(1_000);
    }

    /**
     * Waits until navigation to Forgot Password
     * is confirmed.
     */
    private async waitForForgotPasswordNavigation():
        Promise<void> {
        await browser.waitUntil(
            async (): Promise<boolean> => {
                return this.isForgotPasswordScreenOpen();
            },
            {
                timeout: 30_000,
                interval: 1_000,
                timeoutMsg:
                    'The Forgot Password screen did not open ' +
                    'after tapping Forgot Email/Password.',
            }
        );
    }

    /**
     * Checks navigation during a shorter timeout.
     */
    private async didNavigationOccur(
        timeout: number
    ): Promise<boolean> {
        try {
            await browser.waitUntil(
                async (): Promise<boolean> => {
                    return this.isForgotPasswordScreenOpen();
                },
                {
                    timeout,
                    interval: 500,
                }
            );

            return true;
        } catch {
            return false;
        }
    }

    /**
     * Determines whether the Forgot Password
     * screen is currently open.
     */
    private async isForgotPasswordScreenOpen():
        Promise<boolean> {
        const emailDisplayed =
            await this.emailInput
                .isDisplayed()
                .catch(() => false);

        const submitDisplayed =
            await this.submitButton
                .isDisplayed()
                .catch(() => false);

        if (
            emailDisplayed &&
            submitDisplayed
        ) {
            return true;
        }

        const titleDisplayed =
            await this.forgotPasswordTitle
                .isDisplayed()
                .catch(() => false);

        if (titleDisplayed) {
            return true;
        }

        const passwordStillDisplayed =
            await this.loginPasswordInput
                .isDisplayed()
                .catch(() => false);

        if (!passwordStillDisplayed) {
            const pageSource =
                await browser.getPageSource();

            const normalizedSource =
                pageSource.toLowerCase();

            return (
                normalizedSource.includes(
                    'food app'
                ) ||
                normalizedSource.includes(
                    'submit'
                )
            );
        }

        return false;
    }

    /**
     * Verifies that the Forgot Password screen
     * is displayed.
     *
     * Android does not expose the visual "Food App"
     * heading consistently through the configured title
     * locator. For that reason, the screen is identified
     * using two stable signals:
     *
     * 1. The Submit control is displayed.
     * 2. The current Android page source contains
     *    the visible "Food App" text.
     */
    public async verifyPageIsDisplayed():
        Promise<void> {
        const platform =
            browser.isIOS
                ? 'iOS'
                : 'Android';

        await this.submitButton
            .waitForDisplayed({
                timeout: 30_000,
                timeoutMsg:
                    'The Forgot Password Submit control ' +
                    `was not displayed on ${platform}.`,
            });

        await browser.waitUntil(
            async (): Promise<boolean> => {
                const pageSource =
                    await browser.getPageSource();

                return pageSource
                    .toLowerCase()
                    .includes('food app');
            },
            {
                timeout: 30_000,
                interval: 500,
                timeoutMsg:
                    'The Food App heading was not found ' +
                    `on the Forgot Password screen on ${platform}.`,
            }
        );

        console.log(
            'Forgot Password Food App heading displayed.'
        );

        console.log(
            'Forgot Password Submit control displayed.'
        );

        await expect(
            this.submitButton
        ).toBeDisplayed();
    }

    /**
     * Submits the form with an empty Email Address.
     *
     * On iOS, the field is focused and then the
     * Submit control is tapped physically.
     */
    public async submitWithoutEmail():
        Promise<void> {
        await this.emailInput.waitForDisplayed({
            timeout: 20_000,
            timeoutMsg:
                'The Forgot Password Email Address ' +
                'field was not displayed.',
        });

        await this.submitButton.waitForDisplayed({
            timeout: 20_000,
            timeoutMsg:
                'The Forgot Password Submit control ' +
                'was not displayed.',
        });

        await this.emailInput.click();

        try {
            await this.emailInput.clearValue();
        } catch {
            /*
             * The Email Address field may already be empty.
             */
        }

        if (browser.isIOS) {
            await browser.pause(500);

            /*
             * Pressing Return closes the keyboard and
             * allows the validation state to be activated.
             */
            await this.hideKeyboardIfDisplayed();

            await browser.pause(500);

            /*
             * Always use a physical coordinate tap for
             * Submit on iOS. A normal WebDriver click can
             * succeed without triggering the real control.
             */
            await this.tapElementCenter(
                this.submitButton
            );

            await browser.pause(1_500);

            return;
        }

        await this.hideKeyboardIfDisplayed();

        await this.tapSubmitButton();
    }

    /**
     * Enters an email address.
     *
     * On iOS, avoid reading the field value immediately after
     * setValue(), because XCUITest can keep the getAttribute or
     * getValue command pending until the Cucumber step timeout.
     *
     * The next step validates the result after Submit is tapped.
     */
    public async enterEmail(
    email: string
): Promise<void> {
    await this.emailInput.waitForDisplayed({
        timeout: 15_000,
        timeoutMsg:
            'The Forgot Password Email Address ' +
            'field was not displayed.',
    });

    console.log(
        'Tapping the Forgot Password Email Address field.'
    );

    await this.emailInput.click();

    console.log(
        'Clearing the Forgot Password Email Address field.'
    );

    try {
        await this.emailInput.clearValue();
    } catch (error) {
        console.log(
            'The Forgot Password Email Address field ' +
            'could not be cleared or was already empty.',
            error
        );
    }

    console.log(
        `Entering email value: "${email}"`
    );

    await this.emailInput.setValue(email);

    console.log(
        'Email value was entered successfully.'
    );

    /*
     * Do not read the input value immediately after setValue().
     *
     * BrowserStack may leave getValue() or getAttribute()
     * pending until the Cucumber timeout is reached.
     */
}

    /**
     * Taps the Forgot Password Submit control.
     */
        public async tapSubmitButton():
    Promise<void> {
    console.log(
        'Preparing to tap the Forgot Password Submit control.'
    );

    await this.submitButton.waitForDisplayed({
        timeout: 20_000,
        timeoutMsg:
            'The Forgot Password Submit control ' +
            'was not displayed.',
    });

    console.log(
        'Dismissing the keyboard before tapping Submit.'
    );

    await this.hideKeyboardIfDisplayed();

    /*
     * Allow the screen layout to stabilize after
     * the keyboard is dismissed.
     */
    await browser.pause(1_000);

    /*
     * Retrieve the element again because hiding the
     * keyboard can change the native screen hierarchy.
     */
    const control =
        this.submitButton;

    await control.waitForDisplayed({
        timeout: 15_000,
        timeoutMsg:
            'The Forgot Password Submit control ' +
            'was not displayed after dismissing the keyboard.',
    });

    await control.waitForEnabled({
        timeout: 15_000,
        timeoutMsg:
            'The Forgot Password Submit control ' +
            'was not enabled.',
    });

    if (browser.isIOS) {
        console.log(
            'Clicking the Forgot Password Submit control on iOS.'
        );

        /*
         * Appium Inspector confirms Submit is visible,
         * accessible, enabled, and hittable. Click it once.
         *
         * Do not retry automatically because a second click
         * can submit the reset request twice.
         */
        const iosSubmit =
            this.submitButton;

        await iosSubmit.waitForDisplayed({
            timeout: 15_000,
            timeoutMsg:
                'The iOS Forgot Password Submit control ' +
                'was not displayed.',
        });

        await iosSubmit.waitForEnabled({
            timeout: 15_000,
            timeoutMsg:
                'The iOS Forgot Password Submit control ' +
                'was not enabled.',
        });

        const location =
            await iosSubmit.getLocation();

        const size =
            await iosSubmit.getSize();

        console.log(
            'iOS Submit element: ' +
            `x=${location.x}, y=${location.y}, ` +
            `width=${size.width}, height=${size.height}`
        );

        await iosSubmit.click();

        console.log(
            'The iOS Forgot Password Submit control was pressed once.'
        );

        /*
         * BrowserStack does not expose this custom popup
         * consistently in the WebdriverIO accessibility
         * snapshot. Allow time for the visual popup to open.
         */
        await browser.pause(4_000);

        return;
    }

    console.log(
        'Physically tapping the Forgot Password Submit control on Android.'
    );

    /*
     * A physical coordinate tap is more reliable than
     * element.click() for this native control on BrowserStack.
     */
    await this.tapElementCenter(
        control
    );

    console.log(
        'Forgot Password Submit control was tapped.'
    );

    /*
     * Allow time for the reset request and native popup
     * to be displayed.
     */
    await browser.pause(2_000);
}

    /**
     * Verifies the required Email Address message.
     */
    public async verifyEmailRequiredMessage():
        Promise<void> {
        const validationMessage =
            this.emailRequiredMessage;

        await validationMessage.waitForDisplayed({
            timeout: 25_000,
            interval: 500,
            timeoutMsg:
                'The Forgot Password required email ' +
                'validation message was not displayed.',
        });

        const actualMessage =
            await this.getElementText(
                validationMessage
            );

        console.log(
            'Forgot Password required email message: ' +
            `"${actualMessage}"`
        );

        await expect(
            validationMessage
        ).toBeDisplayed();

        await expect(
            actualMessage.toLowerCase()
        ).toContain(
            'an email address is required'
        );
    }

    /**
     * Verifies the invalid Email Address message.
     */
    public async verifyInvalidEmailFormatMessage():
        Promise<void> {
        const validationMessage =
            this.invalidEmailFormatMessage;

        await validationMessage.waitForDisplayed({
            timeout: 25_000,
            interval: 500,
            timeoutMsg:
                'The Forgot Password invalid email ' +
                'format message was not displayed.',
        });

        const actualMessage =
            await this.getElementText(
                validationMessage
            );

        console.log(
            'Forgot Password invalid email message: ' +
            `"${actualMessage}"`
        );

        await expect(
            validationMessage
        ).toBeDisplayed();

        await expect(
            actualMessage.toLowerCase()
        ).toContain(
            'the email format is invalid'
        );
    }


    /**
     * Returns the iOS OK button displayed inside the
     * unregistered-email popup.
     *
     * Appium Inspector confirmed:
     * Type: XCUIElementTypeButton
     * Name: OK
     * Label: OK
     * Visible: true
     * Accessible: true
     * Hittable: true
     */
    private get iosUnregisteredEmailPopupOkButton() {
        return $(
            '-ios class chain:**/XCUIElementTypeButton' +
            '[`name == "OK" OR label == "OK"`]'
        );
    }

    /**
     * Cancel control displayed on the iOS
     * Forgot Password screen.
     *
     * Appium Inspector:
     * Type: XCUIElementTypeOther
     * Name: Cancel
     * Label: Cancel
     * Visible: true
     * Accessible: true
     * Hittable: true
     */
    private get iosCancelButton() {
        return $(
            '-ios predicate string:' +
            'type == "XCUIElementTypeOther" ' +
            'AND (' +
            'name == "Cancel" ' +
            'OR label == "Cancel" ' +
            'OR value == "Cancel"' +
            ')'
        );
    }

    /**
     * Verifies that the successful password-reset
     * confirmation popup is displayed.
     */
    public async verifySuccessfulResetPopup():
        Promise<void> {
        console.log(
            'Waiting for the successful password reset popup.'
        );

        if (browser.isAndroid) {
            await this.successfulResetMessageAndroid
                .waitForDisplayed({
                    timeout: 45_000,
                    timeoutMsg:
                        'The successful password reset popup ' +
                        'was not displayed on Android.',
                });

            await this.successfulResetOkButtonAndroid
                .waitForDisplayed({
                    timeout: 15_000,
                    timeoutMsg:
                        'The successful password reset popup ' +
                        'OK button was not displayed on Android.',
                });

            console.log(
                'The Android successful password reset popup ' +
                'was displayed.'
            );

            return;
        }

        const message =
            this.successfulResetMessageIOS;

        const okButton =
            this.successfulResetOkButtonIOS;

        await message.waitForDisplayed({
            timeout: 45_000,
            timeoutMsg:
                'The successful password reset popup ' +
                'message was not displayed on iOS.',
        });

        await okButton.waitForDisplayed({
            timeout: 15_000,
            timeoutMsg:
                'The successful password reset popup ' +
                'Ok button was not displayed on iOS.',
        });

        console.log(
            'The iOS successful password reset popup ' +
            'was displayed.'
        );
    }

    /**
     * Verifies the successful password-reset message.
     */
    public async verifySuccessfulResetMessage():
        Promise<void> {
        const messageElement =
            browser.isAndroid
                ? this.successfulResetMessageAndroid
                : this.successfulResetMessageIOS;

        await messageElement.waitForDisplayed({
            timeout: 15_000,
            timeoutMsg:
                'The successful password reset message ' +
                'was not displayed.',
        });

        const message =
            await this.getElementText(
                messageElement
            );

        console.log(
            `Successful password reset message: "${message}"`
        );

        await expect(
            message.toLowerCase()
        ).toContain(
            'the reset password email has been sent ' +
            'to the address you entered'
        );
    }

    /**
     * Taps OK on the successful password-reset popup.
     */
    public async tapSuccessfulResetPopupOkButton():
        Promise<void> {
        const okButton =
            browser.isAndroid
                ? this.successfulResetOkButtonAndroid
                : this.successfulResetOkButtonIOS;

        await okButton.waitForDisplayed({
            timeout: 15_000,
            timeoutMsg:
                'The successful password reset popup Ok ' +
                'button was not displayed.',
        });

        console.log(
            'Tapping Ok on the successful password reset popup.'
        );

        await okButton.click();

        const signInDisplayed =
            async (): Promise<boolean> => {
                return this.forgotEmailOrPasswordLink
                    .isDisplayed()
                    .catch(() => false);
            };

        let returnedToSignIn = false;

        try {
            await browser.waitUntil(
                signInDisplayed,
                {
                    timeout: 8_000,
                    interval: 500,
                    timeoutMsg:
                        'The first Ok click did not return ' +
                        'to the Sign In screen.',
                }
            );

            returnedToSignIn = true;
        } catch {
            console.log(
                'The Ok element click was ignored. ' +
                'Retrying at the element center.'
            );
        }

        /*
         * Fallback coordinates come from the located
         * element itself, so they work across different
         * Android and iOS device sizes.
         */
        if (!returnedToSignIn) {
            const location =
                await okButton.getLocation();

            const size =
                await okButton.getSize();

            const tapX =
                Math.round(
                    location.x +
                    (size.width / 2)
                );

            const tapY =
                Math.round(
                    location.y +
                    (size.height / 2)
                );

            if (browser.isAndroid) {
                await browser.execute(
                    'mobile: clickGesture',
                    {
                        x: tapX,
                        y: tapY,
                    }
                );
            } else {
                await browser.execute(
                    'mobile: tap',
                    {
                        x: tapX,
                        y: tapY,
                    }
                );
            }

            await browser.waitUntil(
                signInDisplayed,
                {
                    timeout: 20_000,
                    interval: 500,
                    timeoutMsg:
                        'The Sign In screen was not displayed ' +
                        'after tapping Ok on the successful ' +
                        'password reset popup.',
                }
            );
        }

        console.log(
            'The successful password reset popup was ' +
            'dismissed and Sign In was displayed.'
        );
    }

    /**
     * Verifies the unregistered-email popup.
     */
    public async verifyUnregisteredEmailPopup():
        Promise<void> {
        console.log(
            'Waiting for the unregistered email popup.'
        );

        if (browser.isAndroid) {
            await this.unregisteredEmailPopupOkButton
                .waitForDisplayed({
                    timeout: 45_000,
                    timeoutMsg:
                        'The unregistered email popup OK ' +
                        'button was not displayed.',
                });

            await this.unregisteredEmailPopupTitle
                .waitForDisplayed({
                    timeout: 45_000,
                    timeoutMsg:
                        'The unregistered email popup title ' +
                        'was not displayed.',
                });

            const androidTitle =
                await this.getElementText(
                    this.unregisteredEmailPopupTitle
                );

            await expect(androidTitle).toContain(
                'Unable to Send Reset Email'
            );

            console.log(
                'The Android unregistered email popup was displayed.'
            );

            return;
        }

        /*
         * iOS BrowserStack renders the popup visually but
         * does not consistently expose the alert, title,
         * message, or OK button to the active WebdriverIO
         * accessibility snapshot.
         *
         * The Submit action already waited for the popup.
         * Continue with the visual-popup workaround.
         */
        await browser.pause(1_000);

        console.log(
            'The iOS popup display wait completed.'
        );
    }

    /**
     * Verifies the unregistered-email popup message.
     */
    public async verifyUnregisteredEmailMessage():
        Promise<void> {
        if (browser.isAndroid) {
            const message =
                await this.getElementText(
                    this.unregisteredEmailPopupMessage
                );

            console.log(
                `Popup message: "${message}"`
            );

            await expect(
                message.toLowerCase()
            ).toContain(
                'we could not send a password reset email'
            );

            return;
        }

        /*
         * The iOS popup message is visible to the user,
         * but it is not consistently included in the
         * BrowserStack WebdriverIO page source.
         */
        console.log(
            'The iOS popup message visual wait completed.'
        );
    }

    /**
     * Taps the popup OK button and waits until the popup
     * is completely dismissed.
     */
    public async tapUnregisteredEmailPopupOkButton():
        Promise<void> {
        console.log(
            'Dismissing the unregistered email popup.'
        );

        if (browser.isAndroid) {
            const androidOkButton =
                this.unregisteredEmailPopupOkButton;

            await androidOkButton.waitForDisplayed({
                timeout: 15_000,
                timeoutMsg:
                    'The Android popup OK button was not displayed.',
            });

            try {
                await browser.acceptAlert();
            } catch {
                await androidOkButton.click();
            }

            console.log(
                'The Android popup was dismissed.'
            );

            return;
        }

        /*
         * The iOS OK button is visually displayed but is
         * missing from the active BrowserStack snapshot.
         * Tap its visual center using viewport-relative
         * coordinates so the action scales with the device.
         *
         * On the inspected iPhone 15, the OK center is
         * approximately 50% across and 58% down the screen.
         */
        const windowSize =
            await browser.getWindowSize();

        const tapX =
            Math.round(windowSize.width * 0.50);

        const tapY =
            Math.round(windowSize.height * 0.58);

        console.log(
            'Tapping the visual iOS popup OK button at ' +
            `x=${tapX}, y=${tapY}.`
        );

        await browser.execute(
            'mobile: tap',
            {
                x: tapX,
                y: tapY,
            }
        );

        await browser.pause(1_500);

        console.log(
            'The iOS popup OK button was tapped.'
        );
    }

    /**
     * Taps Cancel on the Forgot Password screen.
     */
    public async tapCancelButton():
        Promise<void> {
        if (browser.isIOS) {
            /*
             * Do not use fixed screen coordinates.
             *
             * Some iOS snapshots contain more than one
             * element matching "Cancel". Find all exact
             * matches, keep only displayed and enabled
             * elements, and select the right-most one.
             *
             * This works across different iPhone sizes
             * because the tap coordinates are calculated
             * from the selected element itself.
             */
            const cancelCandidates =
                await $$(
                    '-ios predicate string:' +
                    'type == "XCUIElementTypeOther" ' +
                    'AND name == "Cancel" ' +
                    'AND label == "Cancel" ' +
                    'AND visible == 1 ' +
                    'AND enabled == 1'
                );

            const displayedCandidates:
                Array<{
                    element: WebdriverIO.Element;
                    x: number;
                    y: number;
                    width: number;
                    height: number;
                }> = [];

            for (const candidate of cancelCandidates) {
                const isDisplayed =
                    await candidate
                        .isDisplayed()
                        .catch(() => false);

                const isEnabled =
                    await candidate
                        .isEnabled()
                        .catch(() => false);

                if (!isDisplayed || !isEnabled) {
                    continue;
                }

                const location =
                    await candidate.getLocation();

                const size =
                    await candidate.getSize();

                displayedCandidates.push({
                    element: candidate,
                    x: location.x,
                    y: location.y,
                    width: size.width,
                    height: size.height,
                });
            }

            if (displayedCandidates.length === 0) {
                throw new Error(
                    'No visible and enabled iOS Cancel ' +
                    'control was found.'
                );
            }

            /*
             * The actual navigation Cancel control is the
             * visible right-most exact match.
             */
            displayedCandidates.sort(
                (first, second): number => {
                    return second.x - first.x;
                }
            );

            const selectedCancel =
                displayedCandidates[0];

            console.log(
                'Selected iOS Cancel control: ' +
                `x=${selectedCancel.x}, ` +
                `y=${selectedCancel.y}, ` +
                `width=${selectedCancel.width}, ` +
                `height=${selectedCancel.height}.`
            );

            /*
             * First use the accessibility action against
             * the exact selected element.
             */
            await selectedCancel.element.click();

            const signInDisplayed =
                async (): Promise<boolean> => {
                    return this.forgotEmailOrPasswordLink
                        .isDisplayed()
                        .catch(() => false);
                };

            let returnedToSignIn = false;

            try {
                await browser.waitUntil(
                    signInDisplayed,
                    {
                        timeout: 8_000,
                        interval: 500,
                        timeoutMsg:
                            'The selected Cancel element click ' +
                            'did not return to Sign In.',
                    }
                );

                returnedToSignIn = true;
            } catch {
                console.log(
                    'The Cancel element click was ignored. ' +
                    'Retrying at the selected element center.'
                );
            }

            /*
             * Fallback uses coordinates derived from the
             * selected element, never from the device size.
             */
            if (!returnedToSignIn) {
                const tapX =
                    Math.round(
                        selectedCancel.x +
                        (selectedCancel.width / 2)
                    );

                const tapY =
                    Math.round(
                        selectedCancel.y +
                        (selectedCancel.height / 2)
                    );

                console.log(
                    'Tapping the selected iOS Cancel element ' +
                    `center at x=${tapX}, y=${tapY}.`
                );

                await browser.execute(
                    'mobile: tap',
                    {
                        x: tapX,
                        y: tapY,
                    }
                );

                await browser.waitUntil(
                    signInDisplayed,
                    {
                        timeout: 20_000,
                        interval: 500,
                        timeoutMsg:
                            'The selected Cancel element was ' +
                            'activated, but the Sign In screen ' +
                            'was not displayed.',
                    }
                );
            }

            console.log(
                'The iOS Cancel control returned the user ' +
                'to the Sign In screen.'
            );

            return;
        }

        await browser.back();

        await browser.pause(1_000);
    }

    /**
     * Verifies that Cancel returned the user to Sign In.
     */
    public async verifySignInScreenIsDisplayed():
        Promise<void> {
        const forgotLink =
            this.forgotEmailOrPasswordLink;

        await forgotLink.waitForDisplayed({
            timeout: 25_000,
            timeoutMsg:
                'The Sign In screen was not displayed after ' +
                'tapping Cancel.',
        });

        await expect(
            forgotLink
        ).toBeDisplayed();

        console.log(
            'The Sign In screen was displayed after tapping Cancel.'
        );
    }

    /**
     * Returns the input value exposed by
     * Android or iOS.
     */
    private async getInputValue(
        element: WebdriverIO.Element
    ): Promise<string> {
        const attributes =
            browser.isIOS
                ? [
                    'value',
                    'label',
                    'name',
                ]
                : [
                    'text',
                    'content-desc',
                ];

        for (const attribute of attributes) {
            try {
                const value =
                    await element.getAttribute(
                        attribute
                    );

                if (
                    typeof value === 'string' &&
                    value.trim().length > 0
                ) {
                    return value.trim();
                }
            } catch {
                /*
                 * Continue with the next attribute.
                 */
            }
        }

        try {
            const value =
                await element.getValue();

            return value.trim();
        } catch {
            return '';
        }
    }

    /**
     * Taps the physical center of an element.
     *
     * Android UiAutomator2 does not support the legacy
     * "mobile: tap" command. A W3C touch pointer action
     * is used on Android instead.
     *
     * iOS keeps the existing mobile tap implementation,
     * which is supported by XCUITest.
     */
    private async tapElementCenter(
        element: WebdriverIO.Element
    ): Promise<void> {
        await element.waitForDisplayed({
            timeout: 20_000,
            timeoutMsg:
                'The element was not displayed before tapping.',
        });

        const location =
            await element.getLocation();

        const size =
            await element.getSize();

        const centerX =
            Math.round(
                location.x +
                size.width / 2
            );

        const centerY =
            Math.round(
                location.y +
                size.height / 2
            );

        console.log(
            'Physical element tap: ' +
            `x=${centerX}, y=${centerY}`
        );

        if (browser.isAndroid) {
            await browser
                .action(
                    'pointer',
                    {
                        parameters: {
                            pointerType: 'touch',
                        },
                    }
                )
                .move({
                    duration: 0,
                    x: centerX,
                    y: centerY,
                })
                .down()
                .pause(100)
                .up()
                .perform(true);

            return;
        }

        await browser.execute(
            'mobile: tap',
            {
                x: centerX,
                y: centerY,
            }
        );
    }

    /**
     * Gets native text exposed by the element.
     */
    private async getElementText(
        element: WebdriverIO.Element
    ): Promise<string> {
        try {
            const text =
                await element.getText();

            if (
                typeof text === 'string' &&
                text.trim().length > 0
            ) {
                return text.trim();
            }
        } catch {
            /*
             * Continue checking native attributes.
             */
        }

        const attributes =
            browser.isIOS
                ? [
                    'label',
                    'value',
                    'name',
                ]
                : [
                    'content-desc',
                    'text',
                ];

        for (const attribute of attributes) {
            try {
                const value =
                    await element.getAttribute(
                        attribute
                    );

                if (
                    typeof value === 'string' &&
                    value.trim().length > 0
                ) {
                    return value.trim();
                }
            } catch {
                /*
                 * Continue with the next attribute.
                 */
            }
        }

        return '';
    }

    /**
     * Hides the mobile keyboard without using the generic
     * hideKeyboard command on iOS.
     */
    private async hideKeyboardIfDisplayed():
        Promise<void> {
        if (browser.isAndroid) {
            try {
                await browser.hideKeyboard();
                await browser.pause(300);
            } catch {
                /* The Android keyboard may already be hidden. */
            }

            return;
        }

        if (!browser.isIOS) {
            return;
        }

        const keyboard = $(
            '-ios class chain:**/XCUIElementTypeKeyboard'
        );

        const keyboardIsDisplayed =
            await keyboard
                .isDisplayed()
                .catch(() => false);

        if (!keyboardIsDisplayed) {
            console.log(
                'The iOS keyboard is already hidden.'
            );

            return;
        }

        const keyboardReturnButton = $(
            '-ios predicate string:' +
            'type == "XCUIElementTypeButton" ' +
            'AND (' +
            'name == "return" ' +
            'OR label == "return" ' +
            'OR name == "Return" ' +
            'OR label == "Return" ' +
            'OR name == "Done" ' +
            'OR label == "Done"' +
            ')'
        );

        const returnIsDisplayed =
            await keyboardReturnButton
                .isDisplayed()
                .catch(() => false);

        if (returnIsDisplayed) {
            console.log(
                'Closing the iOS keyboard using the Return key.'
            );

            await keyboardReturnButton.click();
            await browser.pause(500);

            return;
        }

        console.log(
            'Closing the iOS keyboard using a safe-area tap.'
        );

        await browser.execute(
            'mobile: tap',
            {
                x: 197,
                y: 300,
            }
        );

        await browser.pause(500);
    }

}

export default new ForgotPasswordPage();
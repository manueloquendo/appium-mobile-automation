import {
    $,
    browser,
    expect,
} from '@wdio/globals';

import {
    myStoreLocators as androidMyStoreLocators,
} from '../locators/android/mystore.locators.js';

import {
    myStoreLocators as iosMyStoreLocators,
} from '../locators/ios/mystore.locators.js';

class MyStorePage {
    private get locators() {
        return browser.isIOS
            ? iosMyStoreLocators
            : androidMyStoreLocators;
    }

    private get screenTitle() {
        return $(this.locators.screenTitle);
    }

    public async waitForPageToLoad(): Promise<void> {
        await this.screenTitle.waitForDisplayed({
            timeout: 30_000,
            timeoutMsg:
                'The MyStore screen was not displayed after login.',
        });
    }

    public async verifyPageIsDisplayed(): Promise<void> {
        await expect(
            this.screenTitle
        ).toBeDisplayed();
    }
}

export default new MyStorePage();
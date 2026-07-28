import allureReporter from '@wdio/allure-reporter';

import { browserStackConfig } from './config/browserstack-config.js';

const browserStackUsername = browserStackConfig.username;
const browserStackAccessKey = browserStackConfig.accessKey;
const browserStackAppId = browserStackConfig.androidAppId;

export const config: WebdriverIO.Config = {
    // ====================
    // Runner configuration
    // ====================
    runner: 'local',
    tsConfigPath: './test/tsconfig.json',

    // ========================
    // BrowserStack connection
    // ========================
    user: browserStackUsername,
    key: browserStackAccessKey,
    hostname: 'hub.browserstack.com',
    protocol: 'https',
    port: 443,

    // ==================
    // Test specifications
    // ==================
    specs: [
        './test/specs/**/*.ts',
    ],

    exclude: [],

    // Start with one device/session.
    maxInstances: 1,

    // =========================
    // Android app capabilities
    // =========================
    capabilities: [
        {
            platformName: 'Android',

            'appium:automationName': 'UiAutomator2',
            'appium:app': browserStackAppId,

            // Change these two values later if you prefer another device.
            'appium:deviceName': 'Samsung Galaxy S23',
            'appium:platformVersion': '13.0',

            'bstack:options': {
                projectName: 'Tepia Mobile Automation',
                buildName: process.env.BROWSERSTACK_BUILD_NAME
                    ?? `Android Build ${new Date().toISOString()}`,
                sessionName: 'Android Appium Test',

                // BrowserStack evidence and debugging.
                debug: true,
                video: true,
                deviceLogs: true,
                appiumLogs: true,
                networkLogs: true,

                // BrowserStack chooses a compatible Appium version by default.
                source: 'webdriverio:appium',
            },
        },
    ],

    // ===================
    // WebdriverIO behavior
    // ===================
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 180000,
    connectionRetryCount: 3,

    // BrowserStack provides the remote Appium server.
    // Do not include the local "appium" service here.
    services: [
        [
            'browserstack',
            {
                browserstackLocal: false,
                testObservability: false,
            },
        ],
    ],

    // =================
    // Test framework
    // =================
    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd',
        timeout: 120000,
    },

    // =========
    // Reporters
    // =========
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: './allure-results',
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false,
            },
        ],
    ],

    // =============================
    // Screenshot on test failure
    // =============================
    afterTest: async function (
        test,
        _context,
        { passed }
    ): Promise<void> {
        if (passed || !browser.sessionId) {
            return;
        }

        try {
            const screenshot = await browser.takeScreenshot();

            allureReporter.addAttachment(
                `Failure Screenshot - ${test.title}`,
                Buffer.from(screenshot, 'base64'),
                'image/png'
            );
        } catch (screenshotError) {
            console.error(
                'The test failed, but WebdriverIO could not capture the screenshot:',
                screenshotError
            );
        }
    },
};
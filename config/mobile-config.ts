import 'dotenv/config';

import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

type MobileConfig = {
    androidDeviceUdid: string;
    iosDeviceUdid: string;
    androidAppPath: string;
    iosAppPath: string;
    testUserEmail: string;
    testUserPassword: string;
    invalidEmail: string;
    incorrectPassword: string;
};

function getConfigValue(
    environmentVariable: string | undefined
): string {
    return environmentVariable?.trim() || '';
}

function resolveAppPath(
    environmentVariable: string | undefined,
    fallbackPath: string
): string {
    const configuredPath = getConfigValue(environmentVariable);

    if (configuredPath) {
        return configuredPath;
    }

    return path.resolve(fallbackPath);
}

function readMobileConfig(): MobileConfig {
    const currentFilePath = fileURLToPath(import.meta.url);
    const configDirectory = path.dirname(currentFilePath);
    const projectRoot = path.resolve(configDirectory, '..');

    const config: MobileConfig = {
        androidDeviceUdid: getConfigValue(process.env.ANDROID_DEVICE_UDID),
        iosDeviceUdid: getConfigValue(process.env.IOS_DEVICE_UDID),
        androidAppPath: resolveAppPath(
            process.env.ANDROID_APP_PATH,
            path.join(projectRoot, 'apps', 'android', 'umami-android-staging.apk')
        ),
        iosAppPath: resolveAppPath(
            process.env.IOS_APP_PATH,
            path.join(projectRoot, 'apps', 'ios', 'umami-ios-staging.ipa')
        ),
        testUserEmail: getConfigValue(process.env.TEST_USER_EMAIL),
        testUserPassword: getConfigValue(process.env.TEST_USER_PASSWORD),
        invalidEmail: getConfigValue(process.env.INVALID_EMAIL),
        incorrectPassword: getConfigValue(process.env.INCORRECT_PASSWORD),
    };

    const requiredSharedFields = [
        'testUserEmail',
        'testUserPassword',
        'invalidEmail',
        'incorrectPassword',
    ] as const;

    const missingFields = requiredSharedFields
        .filter((field) => !config[field])
        .map((field) => field);

    if (missingFields.length > 0) {
        throw new Error(
            [
                'Missing required Appium USB shared test data values:',
                missingFields.join(', '),
                '',
                'Provide them through environment variables or a local .env file.',
            ].join('\n')
        );
    }

    return config;
}

export const mobileConfig = readMobileConfig();
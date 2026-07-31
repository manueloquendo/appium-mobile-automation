import 'dotenv/config';

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

type BrowserStackConfig = {
    username: string;
    accessKey: string;
    androidAppId: string;
    iosAppId: string;
    testUserEmail: string;
    testUserPassword: string;
    invalidEmail: string;
    incorrectPassword: string;
};

type PartialBrowserStackConfig = Partial<BrowserStackConfig>;

function readLocalJsonConfig(): PartialBrowserStackConfig {
    const currentFilePath = fileURLToPath(import.meta.url);
    const configDirectory = path.dirname(currentFilePath);
    const projectRoot = path.resolve(configDirectory, '..');

    const configPath = path.join(
        projectRoot,
        'config',
        'browserstack.config.json'
    );

    if (!fs.existsSync(configPath)) {
        return {};
    }

    try {
        return JSON.parse(
            fs.readFileSync(configPath, 'utf8')
        ) as PartialBrowserStackConfig;
    } catch (error) {
        throw new Error(
            `Unable to read BrowserStack config file at ${configPath}. ${
                error instanceof Error ? error.message : String(error)
            }`
        );
    }
}

function getConfigValue(
    environmentVariable: string | undefined,
    jsonValue: string | undefined
): string | undefined {
    return environmentVariable?.trim() || jsonValue?.trim();
}

function readBrowserStackConfig(): BrowserStackConfig {
    const localConfig = readLocalJsonConfig();

    /*
     * Priority:
     * 1. Environment variables from GitHub Actions or .env
     * 2. Local browserstack.config.json fallback
     */
    const config: PartialBrowserStackConfig = {
        username: getConfigValue(
            process.env.BROWSERSTACK_USERNAME,
            localConfig.username
        ),

        accessKey: getConfigValue(
            process.env.BROWSERSTACK_ACCESS_KEY,
            localConfig.accessKey
        ),

        androidAppId: getConfigValue(
            process.env.BROWSERSTACK_ANDROID_APP_ID,
            localConfig.androidAppId
        ),

        iosAppId: getConfigValue(
            process.env.BROWSERSTACK_IOS_APP_ID,
            localConfig.iosAppId
        ),

        testUserEmail: getConfigValue(
            process.env.TEST_USER_EMAIL,
            localConfig.testUserEmail
        ),

        testUserPassword: getConfigValue(
            process.env.TEST_USER_PASSWORD,
            localConfig.testUserPassword
        ),

        invalidEmail: getConfigValue(
            process.env.INVALID_EMAIL,
            localConfig.invalidEmail
        ),

        incorrectPassword: getConfigValue(
            process.env.INCORRECT_PASSWORD,
            localConfig.incorrectPassword
        ),
    };

    const missingFields = Object.entries(config)
        .filter(([, value]) => !value)
        .map(([field]) => field);

    if (missingFields.length > 0) {
        throw new Error(
            [
                'Missing required BrowserStack configuration values:',
                missingFields.join(', '),
                '',
                'Provide them through environment variables, a local .env file,',
                'or config/browserstack.config.json for local execution.',
            ].join('\n')
        );
    }

    return config as BrowserStackConfig;
}

export const browserStackConfig = readBrowserStackConfig();
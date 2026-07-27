export const validUser = {
    email: process.env.UMAMI_VALID_EMAIL ?? '',
    password: process.env.UMAMI_VALID_PASSWORD ?? '',
};

export function validateTestCredentials(): void {
    if (!validUser.email || !validUser.password) {
        throw new Error(
            'UMAMI_VALID_EMAIL and UMAMI_VALID_PASSWORD must be configured.'
        );
    }
}
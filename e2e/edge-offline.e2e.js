describe('Edge Cases - Offline & Permission Interruptions', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    describe('Network Interruptions', () => {
        it('should handle offline login attempt', async () => {
            // Disable network connectivity
            await device.setURLBlacklist(['.*']);

            await waitFor(element(by.text('Welcome Back')))
                .toBeVisible()
                .withTimeout(10000);

            // Attempt login while offline
            await element(by.id('email-input')).typeText('john@gmail.com');
            await element(by.id('password-input')).typeText('Password123!');
            await element(by.id('login-button')).tap();

            // Verify network error message
            await waitFor(element(by.text('Network Error')))
                .toBeVisible()
                .withTimeout(10000);

            // Or check for connection error
            await expect(element(by.text('Please check your internet connection'))).toBeVisible();

            // Re-enable network
            await device.setURLBlacklist([]);
        });

        it('should handle network recovery and retry', async () => {
            // Start offline
            await device.setURLBlacklist(['.*']);

            await waitFor(element(by.text('Welcome Back')))
                .toBeVisible()
                .withTimeout(10000);

            // Try login offline (should fail)
            await element(by.id('email-input')).typeText('john@gmail.com');
            await element(by.id('password-input')).typeText('Password123!');
            await element(by.id('login-button')).tap();

            // Verify error appears
            await waitFor(element(by.text('Network Error')))
                .toBeVisible()
                .withTimeout(10000);

            // Restore network
            await device.setURLBlacklist([]);

            // Wait a moment for network to restore
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Retry login (should succeed)
            await element(by.id('login-button')).tap();

            // Verify successful login
            await waitFor(element(by.text('Welcome Back!')))
                .toBeVisible()
                .withTimeout(10000);
        });
    });

    describe('App State Interruptions', () => {
        it('should handle app backgrounding during login', async () => {
            await waitFor(element(by.text('Welcome Back')))
                .toBeVisible()
                .withTimeout(10000);

            // Start entering login details
            await element(by.id('email-input')).typeText('john@gmail.com');
            await element(by.id('password-input')).typeText('Pass');

            // Send app to background
            await device.sendToHome();

            // Bring app back to foreground
            await device.launchApp({ newInstance: false });

            // Verify app state is preserved
            await expect(element(by.text('Welcome Back'))).toBeVisible();

            // Complete login
            await element(by.id('password-input')).typeText('word123!');
            await element(by.id('login-button')).tap();

            // Verify login still works
            await waitFor(element(by.text('Welcome Back!')))
                .toBeVisible()
                .withTimeout(10000);
        });

        it('should handle device orientation changes', async () => {
            await waitFor(element(by.text('Welcome Back')))
                .toBeVisible()
                .withTimeout(10000);

            // Rotate device to landscape
            await device.setOrientation('landscape');

            // Verify UI still works in landscape
            await expect(element(by.text('Welcome Back'))).toBeVisible();
            await expect(element(by.id('email-input'))).toBeVisible();
            await expect(element(by.id('password-input'))).toBeVisible();

            // Try login in landscape
            await element(by.id('email-input')).typeText('john@gmail.com');
            await element(by.id('password-input')).typeText('Password123!');
            await element(by.id('login-button')).tap();

            // Verify login works in landscape
            await waitFor(element(by.text('Welcome Back!')))
                .toBeVisible()
                .withTimeout(10000);

            // Rotate back to portrait
            await device.setOrientation('portrait');

            // Verify UI still works in portrait
            await expect(element(by.text('Welcome Back!'))).toBeVisible();
        });
    });

    describe('Memory & Performance Edge Cases', () => {
        it('should handle rapid navigation without crashes', async () => {
            // Login first
            await waitFor(element(by.text('Welcome Back')))
                .toBeVisible()
                .withTimeout(10000);

            await element(by.id('email-input')).typeText('john@gmail.com');
            await element(by.id('password-input')).typeText('Password123!');
            await element(by.id('login-button')).tap();

            await waitFor(element(by.text('Welcome Back!')))
                .toBeVisible()
                .withTimeout(10000);

            // Rapidly switch between tabs
            for (let i = 0; i < 5; i++) {
                await element(by.id('details-tab')).tap();
                await element(by.id('profile-tab')).tap();
                await element(by.id('home-tab')).tap();
            }

            // Verify app is still responsive
            await expect(element(by.text('Welcome Back!'))).toBeVisible();
        });

        it('should handle multiple login attempts', async () => {
            await waitFor(element(by.text('Welcome Back')))
                .toBeVisible()
                .withTimeout(10000);

            // Try multiple failed login attempts
            for (let i = 0; i < 3; i++) {
                await element(by.id('email-input')).clearText();
                await element(by.id('password-input')).clearText();

                await element(by.id('email-input')).typeText(`wrong${i}@email.com`);
                await element(by.id('password-input')).typeText('WrongPassword!');
                await element(by.id('login-button')).tap();

                await waitFor(element(by.text('Invalid email or password')))
                    .toBeVisible()
                    .withTimeout(5000);
            }

            // Finally login correctly
            await element(by.id('email-input')).clearText();
            await element(by.id('password-input')).clearText();

            await element(by.id('email-input')).typeText('john@gmail.com');
            await element(by.id('password-input')).typeText('Password123!');
            await element(by.id('login-button')).tap();

            // Verify successful login
            await waitFor(element(by.text('Welcome Back!')))
                .toBeVisible()
                .withTimeout(10000);
        });
    });
});
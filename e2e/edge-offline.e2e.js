describe('Edge Cases - Offline & Permission Interruptions', () => {
    beforeAll(async () => {
        await device.launchApp({ newInstance: true });
    });

    beforeEach(async () => {
        await device.reloadReactNative();
        // Wait for PersistGate + Redux loading like working tests
        await device.disableSynchronization();
        await new Promise(resolve => setTimeout(resolve, 3000));
        await device.enableSynchronization();

        await waitFor(element(by.id('login-root')))
            .toBeVisible()
            .withTimeout(10000);
    });

    afterEach(async () => {
        // 📸 Take screenshot after each test for CI artifacts (same pattern as login.e2e.js)
        await device.takeScreenshot('offline-test-screenshot');
    });

    describe('Network Interruptions', () => {
        it('should handle offline login attempt', async () => {
            console.log('🌐 Testing offline login scenario...');

            // 1. SIMULATE NETWORK OFF using Detox (emulator stays on, but network blocked)
            await device.setURLBlacklist(['.*']);
            console.log('📱 Network requests blocked - simulating offline');

            // 2. ATTEMPT LOGIN WHILE "OFFLINE"
            await element(by.id('email-input')).replaceText('john@gmail.com');
            await element(by.id('password-input')).replaceText('Password123!');
            console.log('📝 Credentials entered');

            await element(by.id('login-button')).tap();
            console.log('🔘 Login button tapped - should trigger network error');

            // 3. VERIFY NETWORK ERROR MESSAGE APPEARS (wait a bit for error processing)
            await new Promise(resolve => setTimeout(resolve, 3000));

            await waitFor(element(by.text('Network Error. Please check your internet connection and try again.')))
                .toBeVisible()
                .withTimeout(10000);
            console.log('✅ Network error message displayed correctly');

            // 4. RESTORE NETWORK
            await device.setURLBlacklist([]);
            console.log('🌐 Network restored');
        });

        it('should handle network recovery and retry', async () => {
            console.log('🔄 Testing network recovery scenario...');

            // 1. START OFFLINE
            await device.setURLBlacklist(['.*']);
            console.log('📱 Starting offline');

            // 2. TRY LOGIN OFFLINE (should fail)
            await element(by.id('email-input')).replaceText('john@gmail.com');
            await element(by.id('password-input')).replaceText('Password123!');
            await element(by.id('login-button')).tap();

            // 3. VERIFY ERROR APPEARS
            await waitFor(element(by.text('Network Error. Please check your internet connection and try again.')))
                .toBeVisible()
                .withTimeout(5000);
            console.log('✅ Network error appeared as expected');

            // 4. RESTORE NETWORK
            await device.setURLBlacklist([]);
            console.log('🌐 Network restored');

            // Wait a moment for network to stabilize
            await new Promise(resolve => setTimeout(resolve, 2000));

            // 5. RETRY LOGIN (should succeed now)
            await element(by.id('login-button')).tap();
            console.log('🔘 Retry login with network restored');

            // 6. VERIFY SUCCESSFUL LOGIN
            await waitFor(element(by.text('Home')))
                .toBeVisible()
                .withTimeout(10000);
            console.log('✅ Login successful after network recovery');
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
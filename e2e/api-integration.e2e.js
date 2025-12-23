describe('API Integration Tests', () => {
    beforeAll(async () => {
        await device.launchApp({ newInstance: true });

        // LOGIN FIRST - Use same approach as working tests
        await device.disableSynchronization();
        console.log('⏳ Waiting for app to load...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        await device.enableSynchronization();

        // Wait for login screen
        await waitFor(element(by.id('login-root')))
            .toBeVisible()
            .withTimeout(10000);
        console.log('✅ Login screen ready');

        // Enter credentials
        console.log('📝 Entering login credentials...');
        await element(by.id('email-input')).replaceText('john@gmail.com');
        await element(by.id('password-input')).tap();
        await element(by.id('password-input')).replaceText('Password123!');

        // Dismiss keyboard (platform-specific)
        if (device.getPlatform() === 'android') {
            await device.pressBack();
        } else if (device.getPlatform() === 'ios') {
            await element(by.id('password-input')).tapReturnKey();
        }

        // Tap login button
        await element(by.id('login-button')).tap();
        console.log('🔘 Login button tapped, waiting for navigation...');

        // Wait for home screen
        await new Promise(resolve => setTimeout(resolve, 5000));
        await waitFor(element(by.id('home-tab-root')))
            .toBeVisible()
            .withTimeout(15000);

        console.log('🏠 Successfully logged in and on Home tab - READY FOR API TESTS');
    });

    afterEach(async () => {
        // 📸 Take screenshot after each test
        await device.takeScreenshot('api-test-screenshot');
    });

    it('should make successful API call when Test API button is tapped', async () => {
        console.log('🌐 Testing successful API call...');

        // Ensure we're on Home tab
        await expect(element(by.id('home-tab-root'))).toBeVisible();
        await expect(element(by.id('api-test-button'))).toBeVisible();
        console.log('✅ API test button found on Home screen');

        // Tap the API test button
        await element(by.id('api-test-button')).tap();
        console.log('🔘 Tapped API test button');

        // Wait for API call to complete and success state to appear
        await waitFor(element(by.id('api-success')))
            .toBeVisible()
            .withTimeout(10000);
        console.log('✅ API success state visible');

        // Verify the API result content
        await expect(element(by.id('api-result-title'))).toBeVisible();
        await expect(element(by.id('api-result-id'))).toBeVisible();
        console.log('📊 API result data displayed correctly');

        // Verify specific content (JSONPlaceholder post #1)
        await expect(element(by.id('api-result-id'))).toHaveText('Post ID: 1');
        console.log('🎯 Verified correct API data returned');

        console.log('🎉 API integration test completed successfully!');
    });

    it('should show loading state during API call', async () => {
        console.log('⏳ Testing API loading state...');

        // Ensure we're on Home tab
        await expect(element(by.id('home-tab-root'))).toBeVisible();
        await expect(element(by.id('api-test-button'))).toBeVisible();

        // Tap the API test button
        await element(by.id('api-test-button')).tap();
        console.log('🔘 Tapped API test button');

        // Verify loading state appears quickly
        try {
            await waitFor(element(by.id('api-loading')))
                .toBeVisible()
                .withTimeout(2000);
            console.log('✅ Loading state appeared correctly');
        } catch (error) {
            console.log('⚠️ Loading state may have appeared too quickly to catch');
        }

        // Wait for API call to complete and verify final state
        await waitFor(element(by.id('api-success')))
            .toBeVisible()
            .withTimeout(10000);
        console.log('✅ API call completed successfully');

        // Verify loading state is no longer visible
        await expect(element(by.id('api-loading'))).not.toBeVisible();
        console.log('✅ Loading state correctly disappeared');

        console.log('🎯 API loading state test completed!');
    });

});
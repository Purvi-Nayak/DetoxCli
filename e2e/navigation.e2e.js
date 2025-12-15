describe('Positive Flow - Navigation Between Core Screens', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();

        // Login first to access main app
        await waitFor(element(by.text('Welcome Back')))
            .toBeVisible()
            .withTimeout(10000);

        await element(by.id('email-input')).typeText('john@gmail.com');
        await element(by.id('password-input')).typeText('Password123!');
        await element(by.id('login-button')).tap();

        // Wait for home screen
        await waitFor(element(by.text('Welcome Back!')))
            .toBeVisible()
            .withTimeout(10000);
    });

    it('should navigate from Home to Details screen', async () => {
        // Verify we're on Home screen
        await expect(element(by.text('Welcome Back!'))).toBeVisible();
        await expect(element(by.text('Statistics'))).toBeVisible();

        // Navigate to Details tab
        await element(by.id('details-tab')).tap();

        // Verify Details screen content
        await waitFor(element(by.text('App Details')))
            .toBeVisible()
            .withTimeout(5000);

        await expect(element(by.text('Application Information'))).toBeVisible();
        await expect(element(by.text('Version'))).toBeVisible();
    });

    it('should navigate from Details to Profile screen', async () => {
        // Navigate to Details first
        await element(by.id('details-tab')).tap();
        await waitFor(element(by.text('App Details')))
            .toBeVisible()
            .withTimeout(5000);

        // Navigate to Profile tab
        await element(by.id('profile-tab')).tap();

        // Verify Profile screen content
        await waitFor(element(by.text('Profile')))
            .toBeVisible()
            .withTimeout(5000);

        await expect(element(by.text('Account Information'))).toBeVisible();
        await expect(element(by.text('John Doe'))).toBeVisible();
    });

    it('should navigate back to Home from Profile', async () => {
        // Navigate to Profile
        await element(by.id('profile-tab')).tap();
        await waitFor(element(by.text('Profile')))
            .toBeVisible()
            .withTimeout(5000);

        // Navigate back to Home
        await element(by.id('home-tab')).tap();

        // Verify Home screen
        await waitFor(element(by.text('Welcome Back!')))
            .toBeVisible()
            .withTimeout(5000);

        await expect(element(by.text('Statistics'))).toBeVisible();
    });

    it('should show active tab animation effects', async () => {
        // Test tab switching with animation delays
        await element(by.id('details-tab')).tap();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await element(by.id('profile-tab')).tap();
        await new Promise(resolve => setTimeout(resolve, 1000));

        await element(by.id('home-tab')).tap();
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Verify final state
        await expect(element(by.text('Welcome Back!'))).toBeVisible();
    });

    it('should maintain bottom tab visibility across screens', async () => {
        // Verify tabs are visible on Home
        await expect(element(by.id('home-tab'))).toBeVisible();
        await expect(element(by.id('details-tab'))).toBeVisible();
        await expect(element(by.id('profile-tab'))).toBeVisible();

        // Navigate to Details
        await element(by.id('details-tab')).tap();
        await waitFor(element(by.text('App Details')))
            .toBeVisible()
            .withTimeout(5000);

        // Verify tabs still visible
        await expect(element(by.id('home-tab'))).toBeVisible();
        await expect(element(by.id('details-tab'))).toBeVisible();
        await expect(element(by.id('profile-tab'))).toBeVisible();
    });
});
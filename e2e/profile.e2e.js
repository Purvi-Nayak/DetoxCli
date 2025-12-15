describe('Positive Flow - Profile Editing', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();

        // Login first to access profile
        await waitFor(element(by.text('Welcome Back')))
            .toBeVisible()
            .withTimeout(10000);

        await element(by.id('email-input')).typeText('john@gmail.com');
        await element(by.id('password-input')).typeText('Password123!');
        await element(by.id('login-button')).tap();

        // Navigate to Profile screen
        await waitFor(element(by.text('Welcome Back!')))
            .toBeVisible()
            .withTimeout(10000);

        await element(by.id('profile-tab')).tap();
        await waitFor(element(by.text('Profile')))
            .toBeVisible()
            .withTimeout(5000);
    });

    it('should edit profile name successfully', async () => {
        // Verify current name
        await expect(element(by.text('John Doe'))).toBeVisible();

        // Tap edit name button
        await element(by.id('edit-name-button')).tap();

        // Verify modal opens
        await waitFor(element(by.text('Edit Profile Name')))
            .toBeVisible()
            .withTimeout(5000);

        // Clear existing text and enter new name
        await element(by.id('name-input')).clearText();
        await element(by.id('name-input')).typeText('John Smith');

        // Save changes
        await element(by.id('save-button')).tap();

        // Verify modal closes and name is updated
        await waitFor(element(by.text('John Smith')))
            .toBeVisible()
            .withTimeout(5000);

        // Verify old name is no longer visible
        await expect(element(by.text('John Doe'))).not.toBeVisible();
    });

    it('should open image picker when tapping avatar', async () => {
        // Tap on avatar to open image picker
        await element(by.id('avatar-image')).tap();

        // Note: Image picker is native, so we can't fully test it in Detox
        // But we can verify the tap doesn't crash the app
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Verify we're still on profile screen
        await expect(element(by.text('Profile'))).toBeVisible();
    });

    it('should cancel profile name editing', async () => {
        // Get current name
        await expect(element(by.text('John Doe'))).toBeVisible();

        // Open edit modal
        await element(by.id('edit-name-button')).tap();
        await waitFor(element(by.text('Edit Profile Name')))
            .toBeVisible()
            .withTimeout(5000);

        // Enter new name but cancel
        await element(by.id('name-input')).clearText();
        await element(by.id('name-input')).typeText('Cancelled Name');

        // Cancel editing
        await element(by.id('cancel-button')).tap();

        // Verify modal closes and original name remains
        await waitFor(element(by.text('John Doe')))
            .toBeVisible()
            .withTimeout(5000);

        // Verify cancelled name is not saved
        await expect(element(by.text('Cancelled Name'))).not.toBeVisible();
    });

    it('should show profile information correctly', async () => {
        // Verify all profile information is displayed
        await expect(element(by.text('Account Information'))).toBeVisible();
        await expect(element(by.text('Full Name:'))).toBeVisible();
        await expect(element(by.text('Email Address:'))).toBeVisible();
        await expect(element(by.text('john@gmail.com'))).toBeVisible();
        await expect(element(by.text('Account Status:'))).toBeVisible();
        await expect(element(by.text('Active'))).toBeVisible();
    });

    it('should logout successfully from profile', async () => {
        // Scroll down to logout section if needed
        await element(by.id('profile-scroll')).scrollTo('bottom');

        // Verify logout button is visible
        await expect(element(by.id('logout-button'))).toBeVisible();

        // Tap logout button
        await element(by.id('logout-button')).tap();

        // Verify logout confirmation dialog
        await waitFor(element(by.text('Logout Confirmation')))
            .toBeVisible()
            .withTimeout(5000);

        // Confirm logout
        await element(by.text('Logout')).tap();

        // Verify we're back to login screen
        await waitFor(element(by.text('Welcome Back')))
            .toBeVisible()
            .withTimeout(10000);
    });
});
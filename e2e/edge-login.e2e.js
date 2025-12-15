describe('Edge Cases - Invalid Login & Missing Inputs', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
        await waitFor(element(by.text('Welcome Back')))
            .toBeVisible()
            .withTimeout(10000);
    });

    describe('Invalid Login Credentials', () => {
        it('should show error for wrong email', async () => {
            // Enter invalid email
            await element(by.id('email-input')).typeText('wrong@email.com');
            await element(by.id('password-input')).typeText('Password123!');

            // Attempt login
            await element(by.id('login-button')).tap();

            // Verify error message appears
            await waitFor(element(by.text('Invalid email or password')))
                .toBeVisible()
                .withTimeout(5000);

            // Verify we're still on login screen
            await expect(element(by.text('Welcome Back'))).toBeVisible();
        });

        it('should show error for wrong password', async () => {
            // Enter correct email but wrong password
            await element(by.id('email-input')).typeText('john@gmail.com');
            await element(by.id('password-input')).typeText('WrongPassword!');

            // Attempt login
            await element(by.id('login-button')).tap();

            // Verify error message appears
            await waitFor(element(by.text('Invalid email or password')))
                .toBeVisible()
                .withTimeout(5000);
        });

        it('should show error for non-existent user', async () => {
            // Enter credentials for non-existent user
            await element(by.id('email-input')).typeText('nonexistent@user.com');
            await element(by.id('password-input')).typeText('AnyPassword123!');

            // Attempt login
            await element(by.id('login-button')).tap();

            // Verify account not found message
            await waitFor(element(by.text('Account Not Found')))
                .toBeVisible()
                .withTimeout(5000);

            // Verify register suggestion appears
            await expect(element(by.text('Please register first'))).toBeVisible();
        });
    });

    describe('Missing Input Validation', () => {
        it('should show error when email field is empty', async () => {
            // Leave email empty, enter password
            await element(by.id('password-input')).typeText('Password123!');

            // Attempt login
            await element(by.id('login-button')).tap();

            // Verify email required error
            await waitFor(element(by.text('Email is required')))
                .toBeVisible()
                .withTimeout(3000);
        });

        it('should show error when password field is empty', async () => {
            // Enter email, leave password empty
            await element(by.id('email-input')).typeText('john@gmail.com');

            // Attempt login
            await element(by.id('login-button')).tap();

            // Verify password required error
            await waitFor(element(by.text('Password is required')))
                .toBeVisible()
                .withTimeout(3000);
        });

        it('should show error when both fields are empty', async () => {
            // Don't enter anything, just tap login
            await element(by.id('login-button')).tap();

            // Verify both error messages appear
            await waitFor(element(by.text('Email is required')))
                .toBeVisible()
                .withTimeout(3000);

            await expect(element(by.text('Password is required'))).toBeVisible();
        });

        it('should validate email format', async () => {
            // Enter invalid email format
            await element(by.id('email-input')).typeText('invalid-email-format');
            await element(by.id('password-input')).typeText('Password123!');

            // Attempt login
            await element(by.id('login-button')).tap();

            // Verify email format error
            await waitFor(element(by.text('Please enter a valid email')))
                .toBeVisible()
                .withTimeout(3000);
        });
    });

    describe('Registration Missing Inputs', () => {
        beforeEach(async () => {
            // Navigate to registration screen
            await element(by.text('Register here')).tap();
            await waitFor(element(by.text('Create Account')))
                .toBeVisible()
                .withTimeout(5000);
        });

        it('should validate all required fields in registration', async () => {
            // Don't fill any fields, just tap register
            await element(by.id('register-button')).tap();

            // Verify all required field errors
            await waitFor(element(by.text('Name is required')))
                .toBeVisible()
                .withTimeout(3000);

            await expect(element(by.text('Email is required'))).toBeVisible();
            await expect(element(by.text('Password is required'))).toBeVisible();
        });

        it('should validate password confirmation match', async () => {
            // Fill all fields but mismatched passwords
            await element(by.id('name-input')).typeText('John Doe');
            await element(by.id('email-input')).typeText('john@gmail.com');
            await element(by.id('password-input')).typeText('Password123!');
            await element(by.id('confirm-password-input')).typeText('DifferentPassword!');

            // Attempt registration
            await element(by.id('register-button')).tap();

            // Verify password mismatch error
            await waitFor(element(by.text('Passwords do not match')))
                .toBeVisible()
                .withTimeout(3000);
        });
    });
});
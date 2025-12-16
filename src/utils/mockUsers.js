// Valid user for successful login - matches your working login.e2e.js
export const VALID_USER = {
    email: 'john@gmail.com',
    password: 'Password123!', // This matches your working test
    name: 'John Doe',
    id: 'mock-user-123'
};

// Simple function to check for specific error cases only
export const checkForLoginErrors = (email, password) => {
    // For specific test emails that should show errors
    if (email === 'purvi@gmail.com') {
        return { hasError: true, message: 'User not found. Please check your email or register first.' };
    }

    if (email === 'wrong@gmail.com' || email === 'nonexistent@user.com') {
        return { hasError: true, message: 'User not found. Please check your email or register first.' };
    }

    // For john@gmail.com with wrong password
    if (email === 'john@gmail.com' && password !== VALID_USER.password) {
        return { hasError: true, message: 'Invalid email or password' };
    }

    // No error - let the normal flow continue
    return { hasError: false };
};
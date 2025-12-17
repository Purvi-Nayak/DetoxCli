# 🔐 React Native Authentication System

## 📱 Complete Login & Registration Implementation

This project implements a full-featured authentication system for React Native with Redux persistence, Formik validation, and TypeScript support.

## 🎯 Features Implemented

### ✅ Authentication Screens

- **Login Screen** (`/screens/auth/login/`)

  - Email and password fields
  - Real-time Formik + Yup validation
  - Error handling with user-friendly messages
  - Loading states and disabled button during submission
  - Navigation to Registration screen

- **Registration Screen** (`/screens/auth/registration/`)
  - Name, email, password, and confirm password fields
  - Comprehensive validation including password matching
  - Success feedback and auto-navigation to login
  - Responsive design with error states

### 🔧 Redux Authentication Flow

- **AuthSlice** with complete state management
- **User Registration → Login Required** workflow
- **Token persistence** using redux-persist + AsyncStorage
- **Automatic navigation** based on authentication state
- **Logout functionality** with state cleanup

### 🎨 UI/UX Features

- **Responsive Design** using react-native-size-matters
- **Color System** using centralized color utilities
- **Error Validation** with visual feedback
- **Loading States** with activity indicators
- **Professional Styling** with shadows and proper spacing

## 🗂️ File Structure

```
src/
├── screens/auth/
│   ├── login/
│   │   ├── index.tsx          # Login screen component
│   │   └── style.ts           # Responsive styles
│   └── registration/
│       ├── index.tsx          # Registration screen component
│       └── style.ts           # Responsive styles
├── navigation/
│   ├── AuthNavigation.tsx     # Auth stack navigator
│   ├── HomeNavigator.tsx      # Home tab navigator
│   └── StackNavigation.tsx    # Main app navigator
├── redux/
│   ├── store.ts               # Redux store + persistence
│   └── slices/
│       └── AuthSlice.ts       # Authentication state management
└── utils/
    ├── color.js               # Color constants
    └── helper.js              # Validation schemas
```

## 🔄 Authentication Flow

### Registration Flow

1. User fills registration form (name, email, password, confirmPassword)
2. Formik validates all fields with Yup schema
3. On success: userData saved to Redux → Navigate to Login
4. User must login to access app

### Login Flow

1. User enters email and password
2. System checks if userData exists (registration required)
3. Validates credentials against registered user
4. On success: token generated → Navigate to Home
5. State persisted for future app launches

### Logout Flow

1. User taps logout in Profile tab
2. Token cleared from Redux state
3. userData remains (user can login again)
4. Auto-navigate back to Login screen

## 🛡️ Validation Rules

### Registration Validation

- **Name**: Minimum 3 characters, required
- **Email**: Valid email format, required
- **Password**:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character (@$!%\*?&)
- **Confirm Password**: Must match password field

### Login Validation

- **Email**: Valid email format, required
- **Password**: Same rules as registration

## 📦 Dependencies Used

```json
{
  "@reduxjs/toolkit": "^2.x.x",
  "@react-navigation/native": "^7.x.x",
  "@react-navigation/stack": "^7.x.x",
  "@react-navigation/bottom-tabs": "^7.x.x",
  "redux-persist": "^6.x.x",
  "react-redux": "^9.x.x",
  "formik": "^2.x.x",
  "yup": "^1.x.x",
  "react-native-size-matters": "^0.4.x",
  "react-native-vector-icons": "^9.x.x"
}
```

## 🚀 How to Test

1. **Start the application**: `npm start` then `npx react-native run-android`
2. **Registration Flow**:
   - Fill out registration form with valid data
   - Verify validation errors for invalid inputs
   - Complete registration → redirected to login
3. **Login Flow**:
   - Try login without registration (should show error)
   - Login with registered credentials
   - Verify navigation to Home tabs
4. **Logout Flow**:
   - Navigate to Profile tab
   - Tap logout button
   - Verify return to login screen
5. **Persistence**:
   - Close and reopen app
   - Verify token persistence (stay logged in)

## 🎨 Design System

### Colors (COLORS object)

- `primary`: #4169E1 (Royal Blue)
- `error`: #FF0000 (Red)
- `success`: #5bce5bff (Green)
- `white`: #FFFFFF
- `black`: #000000
- `grayLight`: #D3D3D3
- `grayDark`: #A9A9A9

### Responsive Sizing

All dimensions use `scale()` from react-native-size-matters for consistent scaling across devices.

## 🔧 Customization

### Adding New Validation Rules

Edit `/utils/helper.js` validation schemas:

```javascript
export const loginValidationSchema = Yup.object().shape({
  // Add new fields here
});
```

### Styling Changes

Update style files using scale() for responsive design:

```typescript
fontSize: scale(16),        // Responsive font size
paddingHorizontal: scale(20) // Responsive padding
```

### Adding New Auth Actions

Extend AuthSlice reducers:

```typescript
// In AuthSlice.ts
forgotPassword: (state, action) => {
  // Implementation
};
```

## ✨ Key Features

- ✅ **Production-Ready**: Complete error handling and loading states
- ✅ **TypeScript Support**: Fully typed throughout
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Persistent Auth**: Redux-persist integration
- ✅ **Navigation Logic**: Conditional routing based on auth state
- ✅ **Form Validation**: Real-time validation with error messages
- ✅ **Professional UI**: Modern design with proper spacing and colors

## 🐛 Troubleshooting

### Build Issues

If you encounter build issues with react-native-vector-icons, the fonts are manually copied to `android/app/src/main/assets/fonts/`.

### Navigation Issues

Make sure all navigation dependencies are properly linked and the main App.tsx includes the Redux Provider and PersistGate.

### Redux Issues

Check that the store is properly configured with persistence and the AuthSlice is correctly imported.

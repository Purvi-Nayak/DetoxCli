import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { registerValidationSchema } from '../../../utils/helper';
import {
  registerSuccess,
  setLoading,
  setError,
} from '../../../redux/slices/AuthSlice';
import { RootState } from '../../../redux/store';
import { ICONS } from '../../../assets';
import { styles } from './style';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues: RegisterFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleRegister = async (values: RegisterFormData) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful registration
      const userData = {
        name: values.name,
        email: values.email,
        id: Math.random().toString(36).substr(2, 9), // Mock ID
      };

      dispatch(registerSuccess({ userData }));

      // Alert.alert(
      //   'Registration Successful!',
      //   'Your account has been created. Please login to continue.',
      //   [
      //     {
      //       text: 'Login Now',
      //       onPress: () => navigation.navigate('Login' as never),
      //     },
      //   ],
      // );
    } catch (err) {
      dispatch(setError('Registration failed. Please try again.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView
      testID="registration-root"
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text testID="registration-screen-title" style={styles.title}>
            Create Account
          </Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleRegister}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              {/* Name Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  testID="name-input"
                  style={[
                    styles.input,
                    touched.name && errors.name ? styles.inputError : null,
                  ]}
                  placeholder="Enter your full name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              {/* Email Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  testID="email-input"
                  style={[
                    styles.input,
                    touched.email && errors.email ? styles.inputError : null,
                  ]}
                  placeholder="Enter your email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Password Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    testID="password-input"
                    style={[
                      styles.passwordInput,
                      touched.password && errors.password
                        ? styles.inputError
                        : null,
                    ]}
                    placeholder="Enter your password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Image
                      source={showPassword ? ICONS.View : ICONS.Hide}
                      style={styles.eyeIconImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Confirm Password Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    testID="confirm-password-input"
                    style={[
                      styles.passwordInput,
                      touched.confirmPassword && errors.confirmPassword
                        ? styles.inputError
                        : null,
                    ]}
                    placeholder="Confirm your password"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Image
                      source={showConfirmPassword ? ICONS.View : ICONS.Hide}
                      style={styles.eyeIconImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>

              {/* Global Error */}
              {error && (
                <View style={styles.globalErrorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {/* Register Button */}
              <TouchableOpacity
                testID="register-button"
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={() => handleSubmit()}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </TouchableOpacity>

              {/* Login Link */}
              <View style={styles.linkContainer}>
                <Text style={styles.linkText}>Already have an account? </Text>
                <TouchableOpacity
                  testID="login-link"
                  onPress={() => navigation.navigate('Login' as never)}
                >
                  <Text style={styles.linkButton}>Login here</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;

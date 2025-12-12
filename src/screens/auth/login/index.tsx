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
import { loginValidationSchema } from '../../../utils/helper';
import {
  loginSuccess,
  setLoading,
  setError,
} from '../../../redux/slices/AuthSlice';
import { RootState } from '../../../redux/store';
import { ICONS } from '../../../assets';
import { styles } from './style';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoading, error, userData } = useSelector(
    (state: RootState) => state.auth,
  );
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: LoginFormData = {
    email: '',
    password: '',
  };

  const handleLogin = async (values: LoginFormData) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // Check if user has registered
      if (!userData) {
        Alert.alert('Account Not Found', 'Please register first', [
          {
            text: 'Register Now',
            onPress: () => navigation.navigate('Registration' as never),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]);
        dispatch(setLoading(false));
        return;
      }

      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock login validation
      if (userData.email !== values.email) {
        throw new Error('Invalid email or password');
      }

      // Mock successful login
      const token = `token_${Math.random().toString(36).substr(2, 9)}`;

      dispatch(
        loginSuccess({
          userData: userData,
          token: token,
        }),
      );

      Alert.alert('Login Successful!', 'Welcome back!', [{ text: 'Continue' }]);
    } catch (err: any) {
      dispatch(setError(err.message || 'Login failed. Please try again.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
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
              {/* Email Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
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

              {/* Global Error */}
              {error && (
                <View style={styles.globalErrorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {/* Login Button */}
              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={() => handleSubmit()}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>

              {/* Registration Link */}
              <View style={styles.linkContainer}>
                <Text style={styles.linkText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Registration' as never)}
                >
                  <Text style={styles.linkButton}>Register here</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

import { Dimensions } from 'react-native';
import * as Yup from 'yup';
export const height = Dimensions.get('screen').height;
export const width = Dimensions.get('screen').width;

export const loginValidationSchema = Yup.object().shape({
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please enter a valid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    },
  },

});

export const registerValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'fullName must be at least 3 characters')
    .required('fullName is required'),
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please enter a valid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    },
    confirmPassword: {
      required: 'Confirm password is required',
      validate: (value, getValues) => {
        const password = getValues().password;
        return value === password || 'Passwords do not match';
      },
    },
  }
});


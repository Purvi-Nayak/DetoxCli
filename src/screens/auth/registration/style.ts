import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../utils/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingVertical: scale(40),
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: scale(40),
    marginTop: scale(20),
  },
  title: {
    fontSize: scale(28),
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: scale(8),
  },
  subtitle: {
    fontSize: scale(16),
    color: COLORS.grayDark,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: scale(20),
  },
  label: {
    fontSize: scale(16),
    fontWeight: '500',
    color: COLORS.black,
    marginBottom: scale(8),
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    borderRadius: scale(8),
    paddingHorizontal: scale(15),
    paddingVertical: scale(12),
    fontSize: scale(16),
    color: COLORS.black,
    backgroundColor: COLORS.white,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    borderRadius: scale(8),
    backgroundColor: COLORS.white,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: scale(15),
    paddingVertical: scale(12),
    fontSize: scale(16),
    color: COLORS.black,
  },
  eyeIcon: {
    padding: scale(10),
  },
  eyeIconImage: {
    width: scale(20),
    height: scale(20),
    tintColor: COLORS.grayDark,
  },
  errorText: {
    fontSize: scale(12),
    color: COLORS.error,
    marginTop: scale(5),
    marginLeft: scale(5),
  },
  globalErrorContainer: {
    marginBottom: scale(20),
    padding: scale(10),
    backgroundColor: `${COLORS.error}10`,
    borderRadius: scale(8),
    borderLeftWidth: 3,
    borderLeftColor: COLORS.error,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: scale(15),
    borderRadius: scale(8),
    alignItems: 'center',
    marginTop: scale(20),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: COLORS.grayDark,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: scale(18),
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(30),
  },
  linkText: {
    fontSize: scale(14),
    color: COLORS.grayDark,
  },
  linkButton: {
    fontSize: scale(14),
    color: COLORS.primary,
    fontWeight: '600',
  },
});

import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../utils/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flexGrow: 1,
    padding: scale(20),
  },
  header: {
    marginBottom: scale(30),
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: scale(8),
  },
  userName: {
    fontSize: scale(18),
    color: COLORS.primary,
    fontWeight: '600',
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: scale(12),
    padding: scale(20),
    marginBottom: scale(20),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  cardTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: scale(15),
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: scale(12),
    paddingHorizontal: scale(20),
    borderRadius: scale(8),
    marginVertical: scale(8),
    alignItems: 'center',
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: scale(16),
    fontWeight: '500',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(8),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
  },
  statLabel: {
    fontSize: scale(14),
    color: COLORS.grayDark,
  },
  statValue: {
    fontSize: scale(14),
    color: COLORS.black,
    fontWeight: '600',
  },
});

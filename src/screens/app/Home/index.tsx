// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../redux/store';
// import { styles } from './style';

// export type HomeStackParamList = {
//   Home: undefined;
//   Details: undefined;
//   Profile: undefined;
// };

// type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

// const HomeScreen: React.FC = () => {
//   const navigation = useNavigation<HomeScreenNavigationProp>();
//   const { userData } = useSelector((state: RootState) => state.auth);

//   const navigateToDetails = () => {
//     navigation.navigate('Details');
//   };

//   const navigateToProfile = () => {
//     navigation.navigate('Profile');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View testID="home-tab-root" style={{ flex: 1 }}>
//         <View style={styles.header}>
//           <Text testID="welcome-title" style={styles.welcomeText}>
//             Welcome Back!
//           </Text>
//           <Text style={styles.userName}>{userData?.name}</Text>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Statistics</Text>
//           <View style={styles.statRow}>
//             <Text style={styles.statLabel}>Total Sessions:</Text>
//             <Text style={styles.statValue}>24</Text>
//           </View>
//           <View style={styles.statRow}>
//             <Text style={styles.statLabel}>Last Login:</Text>
//             <Text style={styles.statValue}>Today</Text>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../../../utils/color';
import { scale } from 'react-native-size-matters';

const HomeScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testApiCall = async () => {
    setIsLoading(true);
    setError(null);
    setApiData(null);

    try {
      console.log('🌐 Making API call to JSONPlaceholder...');

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/1',
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API call successful:', data);

      setApiData(data);
    } catch (err: any) {
      console.log('❌ API call failed:', err.message);
      setError(`API Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View testID="home-tab-root" style={styles.container}>
      <Text testID="welcome-title" style={styles.title}>
        Welcome Home
      </Text>
      <Text style={styles.subtitle}>You're successfully logged in!</Text>

      {/* API Test Section */}
      <View style={styles.apiTestSection}>
        <TouchableOpacity
          testID="api-test-button"
          style={[styles.apiButton, isLoading && styles.apiButtonDisabled]}
          onPress={testApiCall}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.white} size="small" />
          ) : (
            <Text style={styles.apiButtonText}>Test API Call</Text>
          )}
        </TouchableOpacity>

        {/* Loading State */}
        {isLoading && (
          <Text testID="api-loading" style={styles.statusText}>
            Making API call...
          </Text>
        )}

        {/* Success State */}
        {apiData && (
          <View testID="api-success" style={styles.resultContainer}>
            <Text style={styles.successText}>✅ API Success!</Text>
            <Text testID="api-result-title" style={styles.resultText}>
              Title: {apiData.title}
            </Text>
            <Text testID="api-result-id" style={styles.resultText}>
              Post ID: {apiData.id}
            </Text>
          </View>
        )}

        {/* Error State */}
        {error && (
          <View testID="api-error" style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: scale(20),
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: scale(10),
  },
  subtitle: {
    fontSize: scale(16),
    color: COLORS.grayDark,
    marginBottom: scale(30),
  },
  apiTestSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: scale(20),
  },
  apiButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: scale(30),
    paddingVertical: scale(15),
    borderRadius: scale(8),
    marginBottom: scale(15),
    minWidth: scale(150),
    alignItems: 'center',
  },
  apiButtonDisabled: {
    backgroundColor: COLORS.grayDark,
    opacity: 0.6,
  },
  apiButtonText: {
    color: COLORS.white,
    fontSize: scale(16),
    fontWeight: '600',
  },
  statusText: {
    fontSize: scale(14),
    color: COLORS.grayDark,
    textAlign: 'center',
    marginVertical: scale(10),
  },
  resultContainer: {
    backgroundColor: '#f0f9ff',
    padding: scale(15),
    borderRadius: scale(8),
    marginTop: scale(10),
    width: '100%',
    alignItems: 'center',
  },
  successText: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: scale(10),
  },
  resultText: {
    fontSize: scale(14),
    color: COLORS.black,
    marginBottom: scale(5),
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    padding: scale(15),
    borderRadius: scale(8),
    marginTop: scale(10),
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    fontSize: scale(14),
    color: '#dc2626',
    textAlign: 'center',
  },
});

export default HomeScreen;

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
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/color';
import { scale } from 'react-native-size-matters';

const HomeScreen: React.FC = () => {
  return (
    <View testID="home-tab-root" style={styles.container}>
      <Text testID="welcome-title" style={styles.title}>
        Welcome Home
      </Text>
      <Text style={styles.subtitle}>You're successfully logged in!</Text>
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
  },
});

export default HomeScreen;

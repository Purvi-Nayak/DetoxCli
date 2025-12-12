import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { styles } from './style';

export type HomeStackParamList = {
  Home: undefined;
  Details: undefined;
  Profile: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { userData } = useSelector((state: RootState) => state.auth);

  const navigateToDetails = () => {
    navigation.navigate('Details');
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.userName}>{userData?.name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Statistics</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Sessions:</Text>
          <Text style={styles.statValue}>24</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Last Login:</Text>
          <Text style={styles.statValue}>Today</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

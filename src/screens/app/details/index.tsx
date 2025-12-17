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

type DetailsScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Details'
>;

const DetailsScreen: React.FC = () => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const { userData, token } = useSelector((state: RootState) => state.auth);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView testID="details-screen-root" style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text testID="details-title" style={styles.title}>
          Details
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text testID="details-content" style={styles.contentText}>
          User Details
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;

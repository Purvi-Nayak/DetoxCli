import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AuthNavigator from './AuthNavigation';
import TabNavigator from './BottomTabnavigation';
import { COLORS } from '../utils/color';
import { scale } from 'react-native-size-matters';

const StackNavigator: React.FC = () => {
  const { userData, isLoggedIn, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  // Show loading screen during authentication check
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.white,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn && userData ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default StackNavigator;

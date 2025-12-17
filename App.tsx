/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import StackNavigator from './src/navigation/StackNaviagtion';
import { COLORS } from './src/utils/color';
import { scale } from 'react-native-size-matters';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const LoadingComponent = () => (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => {
          // If loading takes too long, allow user to skip
          persistor.persist();
        }}
      >
        <Text style={styles.skipButtonText}>Skip Loading</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingComponent />}
        persistor={persistor}
        onBeforeLift={() => {
          // This ensures the store is ready before showing the app
          console.log('Store rehydrated successfully');
        }}
      >
        <View style={styles.container}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={COLORS.white}
          />
          <StackNavigator />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  loadingText: {
    fontSize: scale(16),
    color: COLORS.primary,
    fontWeight: '500',
  },
  skipButton: {
    marginTop: scale(20),
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    backgroundColor: COLORS.primary,
    borderRadius: scale(8),
  },
  skipButtonText: {
    fontSize: scale(14),
    color: COLORS.white,
    fontWeight: '500',
  },
});

export default App;

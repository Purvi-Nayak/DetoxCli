import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../utils/color';
import { ICONS } from '../assets';
import HomeScreen from '../screens/app/Home';
import DetailsScreen from '../screens/app/details';
import ProfileScreen from '../screens/app/Profile';

export type TabParamList = {
  Home: undefined;
  Details: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

// Custom TabBar Component
const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={tabBarStyles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name as never);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Get the appropriate icon
        const getIcon = () => {
          switch (route.name) {
            case 'Home':
              return ICONS.Home;
            case 'Details':
              return ICONS.Details;
            case 'Profile':
              return ICONS.Profile;
            default:
              return ICONS.Home;
          }
        };

        // Get testID for the tab
        const getTabTestID = () => {
          switch (route.name) {
            case 'Home':
              return 'home-tab';
            case 'Details':
              return 'details-tab';
            case 'Profile':
              return 'profile-tab';
            default:
              return `${route.name.toLowerCase()}-tab`;
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={getTabTestID()}
            onPress={onPress}
            onLongPress={onLongPress}
            style={tabBarStyles.tabButton}
          >
            <View
              style={[
                tabBarStyles.iconContainer,
                isFocused && tabBarStyles.iconContainerFocused,
              ]}
            >
              <Image
                source={getIcon()}
                style={[
                  tabBarStyles.icon,
                  { tintColor: isFocused ? COLORS.primary : COLORS.grayDark },
                ]}
                resizeMode="contain"
              />
            </View>
            <Text
              style={[
                tabBarStyles.label,
                { color: isFocused ? COLORS.primary : COLORS.grayDark },
              ]}
            >
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabNavigator: React.FC = () => {
  const tabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      initialRouteName="Home"
      tabBar={tabBar}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Details" component={DetailsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// TabBar Styles
const tabBarStyles = {
  container: {
    flexDirection: 'row' as const,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.grayLight,
    paddingVertical: scale(8),
    paddingHorizontal: scale(10),
    height: scale(70),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingVertical: scale(5),
  },
  iconContainer: {
    width: scale(28),
    height: scale(28),
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: scale(4),
  },
  iconContainerFocused: {
    backgroundColor: `${COLORS.primary}20`,
    borderRadius: scale(14),
  },
  icon: {
    width: scale(22),
    height: scale(22),
  },
  label: {
    fontSize: scale(10),
    fontWeight: '500' as const,
    textAlign: 'center' as const,
  },
};

export default TabNavigator;

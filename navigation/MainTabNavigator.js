import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import { GameScreen } from '../screens/GameScreen'
import GamesList from '../screens/GamesList';

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Sports: {
      screen: GamesList
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    },
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = Platform.OS === 'ios'
              ? `ios-paper${focused ? '' : '-outline'}`
              : 'md-information-circle';
            break;
          case 'Sports':
            iconName = Platform.OS === 'ios'
              ? `ios-american-football${focused ? '' : '-outline'}`
              : 'md-american-football';
            break;
          case 'Settings':
            iconName = Platform.OS === 'ios'
              ? `ios-options${focused ? '' : '-outline'}`
              : 'md-options';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
  }
);

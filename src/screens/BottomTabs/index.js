import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

import Dashboard from './Dashboard';
import Profile from './ProfileTab';
import Order from './OrderTab';
import {colors} from '../../utilities';

const Tab = createBottomTabNavigator();

const MainFlow = ({params}) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.p1,
        showLabel: false,
      }}>
      <Tab.Screen
        component={Dashboard}
        name={'Dashboard'}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} type={'antdesign'} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={Order}
        name={'Order'}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} type={'antdesign'} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={Profile}
        name={'Profile'}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} type={'antdesign'} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainFlow;

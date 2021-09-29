import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const AppStack = createNativeStackNavigator();

import Splash from '../screens/Splash';
import AuthStack from './stacks/AuthStack';
import HomeStack from './stacks/HomeStack';

const MainAppNav = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <AppStack.Screen name={'Splash'} component={Splash} />
        <AppStack.Screen name={'Auth'} component={AuthStack} />
        <AppStack.Screen name={'App'} component={HomeStack} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default MainAppNav;

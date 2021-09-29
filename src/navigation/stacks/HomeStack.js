import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../../screens/Home/Home';
import AddChildren from '../../screens/Home/AddChildren';
import AddCard from '../../screens/Home/AddCard';
import UpdateCard from '../../screens/Home/UpdateCard';

const Stack = createNativeStackNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddChildren" component={AddChildren} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="UpdateCard" component={UpdateCard} />
    </Stack.Navigator>
  );
}

export default HomeStack;

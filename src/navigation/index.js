import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const AppStack = createStackNavigator();

import Splash from '../screens/Splash';
// import Login from '../screens/Login';
// import Signup from '../screens/Signup';

import Dashboard from '../screens/BottomTabs';

const AuthStack = createStackNavigator();

// const authStack = () => {
//   return (
//     <AuthStack.Navigator headerMode={'none'} initialRouteName={'Login'}>
//       <AppStack.Screen name={'Login'} component={Login} />
//       <AppStack.Screen name={'Signup'} component={Signup} />
//     </AuthStack.Navigator>
//   );
// };

const HomeStack = createStackNavigator();

const appStack = () => {
  return (
    <HomeStack.Navigator headerMode={'none'} initialRouteName={'Dashboard'}>
      <HomeStack.Screen name={'Dashboard'} component={Dashboard} />
    </HomeStack.Navigator>
  );
};

const MainAppNav = () => {
  const [showSplash, setShowSplash] = useState(true);

  const {isLoggedIn} = useSelector(state => state.login);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, [showSplash, isLoggedIn]);

  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode={'none'}>
        {showSplash && <AppStack.Screen name={'Splash'} component={Splash} />}
        <AppStack.Screen name={'App'} component={appStack} />
        {/* {isLoggedIn ? (
          <AppStack.Screen name={'App'} component={appStack} />
        ) : (
          <AppStack.Screen name={'Auth'} component={authStack} />
        )} */}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
export default MainAppNav;

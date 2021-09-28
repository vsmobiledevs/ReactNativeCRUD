import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, Platform} from 'react-native';
import MainNavigation from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import store, {persistor} from './src/redux/store';
// import SplashScreen from 'react-native-splash-screen';
// import {Settings} from 'react-native-fbsdk-next';

console.disableYellowBox = true;

const App = ({params}) => {
  useEffect(() => {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
  
  }, []);

  return (
    <Provider store={store}>
      <StatusBar
        hidden={false}
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
      />
      <PersistGate persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;

import React from 'react';
import {LogBox} from 'react-native';
import MainNavigation from './src/navigation';

// ignore warnings
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <>
      <MainNavigation />
    </>
  );
};

export default App;

import React, {useEffect} from 'react';
import {Image, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {appIcons} from '../../utilities';

const Splash = ({navigation}) => {
  useEffect(() => {
    handleNavigation();
  }, []);

  const handleNavigation = async () => {
    const login = await AsyncStorage.getItem('Login');
    setTimeout(() => {
      if (login === 'true') {
        navigation.replace('App');
      } else {
        navigation.replace('Auth');
      }
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.main}>
      <Image
        resizeMode="contain"
        source={appIcons.appLogo}
        style={styles.imageStyles}
      />
    </SafeAreaView>
  );
};

export default Splash;

import React from 'react';
import {Image, SafeAreaView} from 'react-native';
import styles from './styles';
import {colors, appIcons} from '../../utilities';

const Splash = ({navigation}) => {
  return (
    <SafeAreaView
      style={[
        styles.main,
        {
          backgroundColor: colors.white,
        },
      ]}>
      <Image
        source={appIcons.appLogo}
        style={styles.imageStyles}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

export default Splash;

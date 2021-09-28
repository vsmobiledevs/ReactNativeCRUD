import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Text,
} from 'react-native';
import {WP, HP, colors} from '../../utilities';
import {hasNotch} from 'react-native-device-info';

export const SmallLoader = ({loading, height, width = '80%'}) => {
  return (
    <View style={[styles.alert, {height, width: width}]}>
      <ActivityIndicator size={'small'} color={colors.p1} animating />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 0,
    backgroundColor: 'red',
    marginHorizontal: WP('3'),
    borderRadius: 5,
  },
  alert: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: hasNotch() ? HP('12') : HP('15'),
    width: WP('80%'),
    flex: 1,
    marginHorizontal: WP('0'),
    borderRadius: 5,
  },
});

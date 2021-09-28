import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, HP, WP} from '../../utilities';

const RatingBar = ({strength}) => {
  let viewWidth =
    strength === 90 ? WP('67%') : strength === 67 ? WP('60%') : WP('20%');

  return (
    <View style={styles.container}>
      <View style={[styles.ratingView, {width: strength + '%'}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WP('76%'),
    backgroundColor: colors.border,
    height: HP('0.7'),
    alignSelf: 'center',
    borderRadius: 2,
  },
  ratingView: {
    backgroundColor: colors.p2,
    height: HP('0.7'),
    borderRadius: 2,
  },
});

export {RatingBar};

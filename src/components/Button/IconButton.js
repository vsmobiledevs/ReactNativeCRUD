import React from 'react';
import {View, Image} from 'react-native';
import {Loader} from '../Loader';
import {colors, WP, size, family, HP} from '../../utilities';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {ActivityIndicator} from 'react-native';

export const IconButton = ({
  isLoading,
  onSubmit,
  title,
  titleStyle,
  loaderColor,
  icon,
  backgroundColor,
  style,
  iconColor,
  titleColor,
  iconSize = HP(3),
  withIcon = true,
}) => {
  return (
    <TouchableOpacity
      style={[styles.submitButton, {backgroundColor}, style]}
      onPress={onSubmit}
      activeOpacity={0.8}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator
          animating
          color={loaderColor ? loaderColor : colors.white}
        />
      ) : (
        // <Loader color={loaderColor ? loaderColor : colors.white} />
        <View style={styles.row}>
          {withIcon && (
            <Image
              source={icon}
              style={[styles.icon, {tintColor: iconColor, height: iconSize}]}
              resizeMode={'contain'}
            />
          )}
          <Text style={[styles.submitButtonText, {color: titleColor}]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: colors.p1,
    height: WP('12'),
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.white,
    fontFamily: family.Montserrat_Medium,
    fontSize: size.xsmall,
    textAlign: 'center',
  },
  icon: {
    width: WP(5),
    height: HP(3),
    right: WP(2),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import {
  Text,
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, HP, size} from '../../utilities';

const {width} = Dimensions.get('window');

export const AppButton = ({
  onClick = () => {},
  txt,
  isBg = true,
  isLoading,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      style={styles.buttonStyle}
      onPress={onClick}>
      {isLoading ? (
        <ActivityIndicator color={isBg ? colors.white : colors.g1} />
      ) : (
        <Text style={styles.buttonTxtStyle}>{txt}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 100,
    width: width / 2.5,
    alignSelf: 'center',
    shadowColor: '#FB3353',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,
    backgroundColor: colors.p1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS === 'android' ? HP('7') : HP('6'),
  },
  buttonTxtStyle: {
    color: colors.white,
    fontSize: size.xsmall,
  },
});

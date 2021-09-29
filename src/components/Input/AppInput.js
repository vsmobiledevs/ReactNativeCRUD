/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Platform, TextInput, StyleSheet, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors, family, HP, size, WP} from '../../utilities';

const {width} = Dimensions.get('window');

export const AppInput = ({
  value,
  placeholder,
  keyboardType,
  onChangeText,
  multiline = false,
  isIcon = false,
  isIcon1 = false,
  editable = true,
  secureTextEntry = false,
  placeholderColor = colors.g2,
  appWidth = width / 1.25,
  autoCapitalize = 'none',
}) => {
  return (
    <View style={{width: appWidth, alignSelf: 'center'}}>
      <View style={styles.rowContainer}>
        <View style={{width: '100%'}}>
          <TextInput
            value={value}
            placeholder={placeholder}
            style={styles.inputStyle}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderColor}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            editable={editable}
            autoCapitalize={autoCapitalize}
          />
        </View>
        {isIcon ? (
          <View style={{justifyContent: 'center'}}>
            <Icon
              type={'MaterialIcons'}
              name={isIcon1 ? 'lock' : 'person'}
              color={'#C1BFC3'}
              size={isIcon1 ? HP('2.5') : HP('3')}
              style={{marginRight: WP('2')}}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    padding: 10,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.g5,
    justifyContent: 'space-between',
  },
  inputStyle: {
    bottom: Platform.OS === 'android' ? 2 : 2.5,
    paddingBottom: Platform.OS === 'android' ? -6 : 0,
    fontSize: size.xxsmall,
    color: colors.drakBlack,
    padding: WP('1'),
    // fontFamily: family.Poppins_Regular,
  },
  imageStyle: {
    width: WP('4'),
    height: HP('2'),
    marginRight: WP('2'),
  },
});

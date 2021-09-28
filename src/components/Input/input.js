/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {colors, family, HP, WP} from '../../utilities';

const Input = ({
  placeholder,
  leftIcon,
  rightIcon,
  placeholderTextColor = colors.black,
  autoCapitalize,
  value,
  style,
  onChangeText,
  secureTextEntry,
  onlyInput = false,
  multiline = false,
  onlyInputWithRight = false,
  keyboardType,
  reference,
  onSubmitEditing,
  returnKeyType,
  editable = true,
  onChange,
}) => {
  return (
    <View
      style={[
        styles.inputContainerStyle,
        {
          height: multiline ? HP(18) : HP(7),
          alignItems: multiline ? 'flex-start' : 'center',
        },
        style,
      ]}>
      {!onlyInput && (
        <View
          style={[
            styles.leftIconCotnainer,
            {
              marginTop: multiline ? WP('3') : 0,
            },
          ]}>
          {leftIcon}
        </View>
      )}
      <View style={styles.body}>
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          ref={reference}
          editable={editable}
          onChange={onChange}
          placeholderTextColor={placeholderTextColor}
          value={value}
          returnKeyType={returnKeyType}
          enablesReturnKeyAutomatically
          multiline={multiline}
          autoCapitalize={'none'}
          onSubmitEditing={onSubmitEditing}
          autoCorrect
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          style={[
            styles.input,
            {
              right: onlyInput ? WP(-2) : onlyInputWithRight ? WP(7) : WP(3),
              marginTop: multiline ? WP('2') : 0,
            },
          ]}
        />
      </View>
      {!onlyInput && <View style={styles.rightIconContainer}>{rightIcon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    padding: 0,
    margin: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginVertical: HP(2),
    height: HP(5),
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.white,
    borderColor: colors.border,
    flexDirection: 'row',
  },
  input: {
    paddingHorizontal: WP(2),
    padding: 0,
    margin: 0,
    borderBottomWidth: 0,
    fontFamily: family.Montserrat_Medium,
    right: WP(3),
  },
  leftIconCotnainer: {
    flex: 0.13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {flex: 0.8, justifyContent: 'center'},
  rightIconContainer: {flex: 0.13},
});

export {Input};

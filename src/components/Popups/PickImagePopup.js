/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Modal from 'react-native-modal';
import {View, StyleSheet, Text, Platform, TouchableOpacity} from 'react-native';
import {WP, family, size, HP, colors, appIcons} from '../../utilities';
import {IconButton, Input} from '../../components';
import I18n from '../../translation';

export const PickImagePopup = ({
  isVisible,
  onCancel,
  onCameraPress,
  onPhotoPress,
}) => {
  return (
    <Modal
      avoidKeyboard={true}
      isVisible={isVisible}
      onBackdropPress={onCancel}
      hasBackdrop={true}
      style={styles.container}>
      <View style={styles.alert}>
        <View style={styles.topView}>
          <Text style={styles.filterText}>Select Options</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.spacer} />
          <View style={styles.spacer} />
          <TouchableOpacity onPress={onCameraPress}>
            <Text style={styles.optionText}>Camera</Text>
          </TouchableOpacity>
          <View style={styles.spacer} />
          <TouchableOpacity onPress={onPhotoPress}>
            <Text style={styles.optionText}>Photo & Video Library</Text>
          </TouchableOpacity>
          <View style={styles.spacer} />
          <View style={styles.spacer} />
        </View>
      </View>
    </Modal>
  );
};

// Pass what ever you wanna display beween icon and buttons here
// Eg - you can pass 2 Text like below to display 2 lines of text.
//     <Text style={styles.textMessage}>Are you sure you want to leave</Text>
//     <Text style={styles.groupName}>{groupName}?</Text>

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 0,
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  alert: {
    marginHorizontal: WP('5'),
    backgroundColor: colors.white,
    justifyContent: 'center',
    borderRadius: WP('1'),
    flexGrow: 1,
  },
  topView: {
    height: HP('8'),
    backgroundColor: colors.p2,
    borderTopEndRadius: WP('1'),
    borderTopStartRadius: WP('1'),
    justifyContent: 'center',
    paddingLeft: WP('4'),
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  iconContainer: {
    margin: WP('5'),
  },
  filterText: {
    fontSize: size.normal,
    fontFamily: family.Montserrat_Bold,
    marginHorizontal: WP('2.5'),
    color: colors.white,
  },
  optionText: {
    fontSize: size.small,
    fontFamily: family.Montserrat_Regular,
    marginHorizontal: WP('2.5'),
    color: colors.black,
  },
  groupName: {
    fontSize: size.normal,
    fontFamily: family.Montserrat_Regular,
    marginHorizontal: WP('5'),
    marginBottom: WP('5'),
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: WP('5'),
  },
  button: {
    flex: 1,
    backgroundColor: colors.p1,
    marginRight: WP('2.5'),
    padding: WP('2'),
    height: WP('12'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: WP('2'),
  },
  canceButton: {
    backgroundColor: colors.white,
    borderColor: colors.p1,
    borderWidth: 0.4,
  },
  canceButtonText: {
    color: colors.p1,
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xsmall,
  },
  body: {
    paddingHorizontal: WP('5'),
  },
  spacer: {
    marginVertical: WP('2'),
  },
});

/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {WP, family, size, HP, colors, appIcons} from '../../utilities';
import {Input, IconButton} from '../../components';
import I18n from '../../translation';
import {useDispatch, useSelector} from 'react-redux';
import {addInAdditional} from '../../redux/actions';

export const PickAdditionalPopup = ({isVisible, onCancel}) => {
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [valueLink, setValueLink] = useState('');
  const [disbaled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  function makeid() {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  const onAddTime = () => {
    if (value === '' || label === '' || valueLink === '') {
      setDisabled(true);
      return;
    }
    setDisabled(false);
    let obj = {
      id: makeid(),
      label: label,
      value: value,
      valueLink: valueLink,
    };
    dispatch(addInAdditional(obj));
    clearFields();
    onCancel();
  };

  const clearFields = () => {
    setValue('');
    setLabel('');
    setValueLink('');
  };

  return (
    <Modal
      avoidKeyboard={true}
      isVisible={isVisible}
      onBackdropPress={onCancel}
      hasBackdrop={false}
      style={styles.container}>
      <View style={styles.alert}>
        <View style={styles.topView}>
          <Text style={styles.filterText}>{I18n.t('add_new_item')}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.spacer} />
          <Text style={styles.lable}>{I18n.t('label')}</Text>
          <Input
            value={label}
            onChangeText={(text) => setLabel(text)}
            onlyInput
          />
          <Text style={styles.lable}>{I18n.t('value')}</Text>
          <Input
            value={value}
            onChangeText={(text) => setValue(text)}
            onlyInput
          />
          <Text style={styles.lable}>{I18n.t('valueLink')}</Text>
          <Input
            value={valueLink}
            onChangeText={(text) => setValueLink(text)}
            onlyInput
          />
          {disbaled && (
            <Text style={[styles.lable, {color: colors.snackRed}]}>
              {I18n.t('enter_all_fields')}
            </Text>
          )}
          <View style={styles.spacer} />

          <View style={styles.row}>
            <IconButton
              backgroundColor={'transparent'}
              title={I18n.t('cancel')}
              withIcon={false}
              titleColor={colors.black}
              style={styles.cancelBtn}
              onSubmit={() => {
                clearFields();
                onCancel();
              }}
            />
            <IconButton
              backgroundColor={colors.p1}
              title={I18n.t('add')}
              withIcon={false}
              titleColor={colors.white}
              style={[styles.addBtn, {left: 5}]}
              onSubmit={() => onAddTime()}
            />
          </View>

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
  addBtn: {
    width: '50%',
    alignSelf: 'center',
  },
  cancelBtn: {
    width: '50%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  lable: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xtiny,
  },
  row: {
    flexDirection: 'row',
  },
});

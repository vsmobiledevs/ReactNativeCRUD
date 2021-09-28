/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {WP, family, size, HP, colors} from '../../utilities';
import {DropDown, IconButton} from '../../components';
import I18n from '../../translation';
import {useDispatch, useSelector} from 'react-redux';
import {addInWeektime} from '../../redux/actions';

export const PickTimePopup = ({isVisible, onCancel}) => {
  const [weekday, setWeekday] = useState({
    label: I18n.t('monday'),
    value: 'monday',
  });
  const [opentime, setOpenTime] = useState({
    label: '00:00',
    value: '00:00',
  });
  const [closeTime, setCloseTime] = useState({
    label: '00:30 am',
    value: '00:30 am',
  });
  const [is24hour, setis24hour] = useState({
    label: I18n.t('non'),
    value: 'none',
  });
  const [closed, setClosed] = useState({
    label: I18n.t('non'),
    value: 'none',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setis24hour({
      label: I18n.t('non'),
      value: 'none',
    });
    setClosed({
      label: I18n.t('non'),
      value: 'none',
    });
  }, []);

  const [weekdays, setWeekdays] = useState([
    {
      label: I18n.t('monday'),
      value: 'monday',
    },
    {
      label: I18n.t('tuesday'),
      value: 'tuesday',
    },
    {
      label: I18n.t('wednesday'),
      value: 'wednesday',
    },
    {
      label: I18n.t('thursday'),
      value: 'thursday',
    },
    {
      label: I18n.t('friday'),
      value: 'friday',
    },
    {
      label: I18n.t('satureday'),
      value: 'satureday',
    },
    {
      label: I18n.t('sunday'),
      value: 'sunday',
    },
  ]);

  const [time, setTime] = useState([
    {
      label: '00:00',
      value: '00:00',
    },
    {
      label: '00:30',
      value: '00:30',
    },
    {
      label: '1:00',
      value: '1:00',
    },
    {
      label: '1:30',
      value: '1:30',
    },
    {
      label: '2:00',
      value: '2:00',
    },
    {
      label: '2:30',
      value: '2:30',
    },
    {
      label: '3:00',
      value: '3:00',
    },
    {
      label: '3:30',
      value: '3:30',
    },
    {
      label: '4:00',
      value: '4:00',
    },
    {
      label: '4:30',
      value: '4:30',
    },
    {
      label: '5:00',
      value: '5:00',
    },
    {
      label: '5:30',
      value: '5:30',
    },
    {
      label: '6:00',
      value: '6:00',
    },
    {
      label: '6:30',
      value: '6:30',
    },
    {
      label: '7:00',
      value: '7:00',
    },
    {
      label: '7:30',
      value: '7:30',
    },
    {
      label: '8:00',
      value: '8:00',
    },
    {
      label: '8:30',
      value: '8:30',
    },
    {
      label: '9:00',
      value: '9:00',
    },
    {
      label: '9:30',
      value: '9:30',
    },
    {
      label: '10:00',
      value: '10:00',
    },
    {
      label: '10:30',
      value: '10:30',
    },
    {
      label: '11:00',
      value: '11:00',
    },
    {
      label: '11:30',
      value: '11:30',
    },
    {
      label: '12:00',
      value: '12:00',
    },
    {
      label: '12:30',
      value: '12:30',
    },
    {
      label: '13:00',
      value: '13:00',
    },
    {
      label: '13:30',
      value: '13:30',
    },
    {
      label: '14:00',
      value: '14:00',
    },
    {
      label: '14:30',
      value: '14:30',
    },
    {
      label: '15:00',
      value: '15:00',
    },
    {
      label: '15:30',
      value: '15:30',
    },
    {
      label: '16:00',
      value: '16:00',
    },
    {
      label: '16:30',
      value: '16:30',
    },
    {
      label: '17:00',
      value: '17:00',
    },
    {
      label: '17:30',
      value: '17:30',
    },
    {
      label: '18:00',
      value: '18:00',
    },
    {
      label: '18:30',
      value: '18:30',
    },
    {
      label: '19:00',
      value: '19:00',
    },
    {
      label: '19:30',
      value: '19:30',
    },
    {
      label: '20:00',
      value: '20:00',
    },
    {
      label: '20:30',
      value: '20:30',
    },
    {
      label: '21:00',
      value: '21:00',
    },
    {
      label: '21:30',
      value: '21:30',
    },
    {
      label: '22:00',
      value: '22:00',
    },
    {
      label: '22:30',
      value: '22:30',
    },
    {
      label: '23:00',
      value: '23:00',
    },
    {
      label: '23:30',
      value: '23:30',
    },
  ]);

  const [isListFeatured, setIsListFeatured] = useState([
    {
      label: I18n.t('no'),
      value: 'no',
    },
    {
      label: I18n.t('yes'),
      value: 'yes',
    },
    {
      label: I18n.t('non'),
      value: 'none',
    },
  ]);

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
    let obj = {
      id: makeid(),
      weekday: weekday,
      openTime: opentime,
      endTime: closeTime,
      is24hour: is24hour,
      closed: closed,
    };
    console.log(obj);
    dispatch(addInWeektime(obj));
    onCancel();
  };

  return (
    <Modal
      avoidKeyboard={true}
      isVisible={isVisible}
      onBackdropPress={onCancel}
      hasBackdrop={true}
      style={styles.container}>
      <View style={styles.alert}>
        <View style={styles.topView}>
          <Text style={styles.filterText}>{I18n.t('add_new_item')}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.spacer} />
          <Text style={styles.lable}>{I18n.t('day')}</Text>
          <DropDown
            withDefault
            zIndex={100}
            data={weekdays}
            getVal={(item) => {
              setWeekday(item);
            }}
          />
          <Text style={styles.lable}>{I18n.t('open_time')}</Text>
          <DropDown
            withDefault
            zIndex={99}
            data={time}
            getVal={(item) => {
              setOpenTime(item);
            }}
          />
          <Text style={styles.lable}>{I18n.t('close_time')}</Text>
          <DropDown
            withDefault
            zIndex={98}
            data={time}
            getVal={(item) => {
              setCloseTime(item);
            }}
          />
          <Text style={styles.lable}>{I18n.t('is_24_hr')}</Text>
          <DropDown
            withDefault
            zIndex={97}
            data={isListFeatured}
            getVal={(item) => {
              setis24hour(item);
            }}
          />
          <Text style={styles.lable}>{I18n.t('closed')}</Text>
          <DropDown
            withDefault
            zIndex={96}
            data={isListFeatured}
            getVal={(item) => {
              setClosed(item);
            }}
          />
          <View style={styles.spacer} />
          <View style={styles.spacer} />
          <View style={styles.row}>
            <IconButton
              backgroundColor={'transparent'}
              title={I18n.t('cancel')}
              withIcon={false}
              titleColor={colors.black}
              style={styles.cancelBtn}
              onSubmit={() => onCancel()}
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
    // paddingHorizontal: WP('5'),
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
    marginHorizontal: WP('6'),
    marginVertical: HP('1'),
    fontSize: size.xtiny,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: WP('5'),
  },
});

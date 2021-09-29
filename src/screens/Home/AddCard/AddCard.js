import React, {useState} from 'react';
import {View, Image, ScrollView, Dimensions} from 'react-native';
import {AppInput, AppButton} from '../../../components';
import database from '@react-native-firebase/database';
import {v4 as uuidv4} from 'uuid';
import {appIcons} from '../../../utilities';
import ShowSnackBar from '../../../components/ShowSnackBar';
import styles from './styles';

const {width} = Dimensions.get('window');

const AddCard = ({navigation, route}) => {
  const [type, setType] = useState('');
  const [number, setNumber] = useState('');
  const [secCode, setSecCode] = useState('');
  const [expDate, setExpDate] = useState('');
  const [monthLimit, setMonthLimit] = useState('');

  const handleSubmit = async () => {
    const validation = validateData();
    if (validation) {
      let id = uuidv4();
      const {childId} = route.params;
      database()
        .ref(`Cards/${childId}`)
        .set({
          type: type,
          number: number,
          code: secCode,
          date: expDate,
          limit: monthLimit,
        })
        .then(() => {
          ShowSnackBar('Card added!');
          navigation.navigate('Home');
        })
        .catch(err => {
          console.log('Error is ==> ', err);
        });
    } else {
      ShowSnackBar('Kindly fill all the fields');
    }
  };

  const validateData = () => {
    if (
      type === '' ||
      number === '' ||
      secCode === '' ||
      expDate === '' ||
      monthLimit === ''
    ) {
      ShowSnackBar('Kindly fill all the fields');
      return false;
    } else {
      return true;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.topView}>
          <Image
            resizeMode="contain"
            source={appIcons.appLogo}
            style={styles.imageStyles}
          />
        </View>
        <View style={styles.inputsView}>
          <AppInput
            value={type}
            placeholder={'Card Type'}
            keyboardType={'default'}
            onChangeText={txt => setType(txt)}
          />
          <AppInput
            value={number}
            placeholder={'Card Number'}
            keyboardType={'number-pad'}
            onChangeText={txt => setNumber(txt)}
          />
          <AppInput
            value={secCode}
            placeholder={'Security Code'}
            keyboardType={'default'}
            onChangeText={txt => setSecCode(txt)}
          />
          <AppInput
            value={expDate}
            placeholder={'Expiration Date'}
            keyboardType={'default'}
            onChangeText={txt => setExpDate(txt)}
          />
          <AppInput
            value={monthLimit}
            placeholder={'Monthly Limit'}
            keyboardType={'default'}
            onChangeText={txt => setMonthLimit(txt)}
          />
        </View>
        <View style={styles.bottomView}>
          <AppButton
            btnWidth={width / 2.5}
            onClick={() => handleSubmit()}
            txt="Submit"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddCard;

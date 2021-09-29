import React, {useState, useEffect} from 'react';
import {View, Image, ScrollView, Dimensions} from 'react-native';
import {AppInput, AppButton} from '../../../components';
import database from '@react-native-firebase/database';
import {appIcons} from '../../../utilities';
import ShowSnackBar from '../../../components/ShowSnackBar';
import styles from './styles';

const {width} = Dimensions.get('window');

const UpdateCard = ({navigation, route}) => {
  const [type, setType] = useState('');
  const [number, setNumber] = useState('');
  const [secCode, setSecCode] = useState('');
  const [expDate, setExpDate] = useState('');
  const [monthLimit, setMonthLimit] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = () => {
    const {childId} = route.params;
    database()
      .ref(`/Cards/${childId}`)
      .once('value')
      .then(snapshot => {
        let dataArr = snapshot.val();
        setType(dataArr.type);
        setNumber(dataArr.number);
        setSecCode(dataArr.code);
        setExpDate(dataArr.date);
        setMonthLimit(dataArr.limit);
      });
  };

  const handleUpdate = async () => {
    const validation = validateData();
    if (validation) {
      const {childId} = route.params;
      database()
        .ref(`/Cards/${childId}`)
        .update({limit: monthLimit})
        .then(() => {
          ShowSnackBar('Card updated!');
          navigation.navigate('Home');
        });
    }
  };

  const validateData = () => {
    if (monthLimit === '') {
      ShowSnackBar('Kindly enter monthly limit');
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
            editable={false}
          />
          <AppInput
            value={number}
            placeholder={'Card Number'}
            keyboardType={'number-pad'}
            onChangeText={txt => setNumber(txt)}
            editable={false}
          />
          <AppInput
            value={secCode}
            placeholder={'Security Code'}
            keyboardType={'default'}
            onChangeText={txt => setSecCode(txt)}
            editable={false}
          />
          <AppInput
            value={expDate}
            placeholder={'Expiration Date'}
            keyboardType={'default'}
            onChangeText={txt => setExpDate(txt)}
            editable={false}
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
            onClick={() => handleUpdate()}
            txt="Update"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateCard;

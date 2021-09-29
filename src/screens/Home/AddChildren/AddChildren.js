import React, {useState} from 'react';
import {View, Image, ScrollView, Dimensions} from 'react-native';
import database from '@react-native-firebase/database';
import {v4 as uuidv4} from 'uuid';
import {AppInput, AppButton} from '../../../components';
import {appIcons, size} from '../../../utilities';
import ShowSnackBar from '../../../components/ShowSnackBar';
import styles from './styles';

const {width} = Dimensions.get('window');

const AddChildren = ({navigation}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async () => {
    if (name !== '' || age !== '') {
      let id = uuidv4();
      database()
        .ref(`Childs/${id}`)
        .set({
          id: id,
          name: name,
          age: age,
        })
        .then(() => {
          ShowSnackBar('User added!');
          navigation.navigate('Home');
        })
        .catch(err => {
          console.log('Error is ==> ', err);
        });
    } else {
      ShowSnackBar('Kindly fill all the fields');
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
            value={name}
            placeholder={'Enter Name'}
            keyboardType={'default'}
            onChangeText={txt => setName(txt)}
          />
          <AppInput
            value={age}
            placeholder={'Enter Age'}
            keyboardType={'number-pad'}
            onChangeText={txt => setAge(txt)}
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

export default AddChildren;

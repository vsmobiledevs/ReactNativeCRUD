import React, {useState} from 'react';
import {View, Image, ScrollView, Dimensions} from 'react-native';
import {AppInput, AppButton} from '../../../components';
import {appIcons, size} from '../../../utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowSnackBar from '../../../components/ShowSnackBar';
import styles from './styles';
import auth from '@react-native-firebase/auth';

const {width} = Dimensions.get('window');

// Validate Email...
const validateEmail = email => {
  let pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(email).toLowerCase());
};

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [cnfrmPass, setCnfmrPass] = useState('');

  const handleLogin = () => {
    const user = auth.getInstance().getCurrentUser();

    console.log('User is ==> ', user);
  };

  const handleSignUp = async () => {
    const validation = validateData();
    if (validation) {
      auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(async res => {
          navigation.navigate('App');
          console.log('Res is => ', res);
          await AsyncStorage.setItem('Login', 'true');
          ShowSnackBar('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            ShowSnackBar('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            ShowSnackBar('That email address is invalid!');
          }
          console.error(error);
        });
    }
  };

  const validateData = () => {
    if (name === '' || email === '' || pass === '' || cnfrmPass === '') {
      ShowSnackBar('Kindly fill all the fields');
      return false;
    } else {
      if (validateEmail(email) === true) {
        if (pass === cnfrmPass) {
          if (pass.length >= 6) {
            return true;
          } else {
            ShowSnackBar('The password must be at least 6 characters.');
          }
        } else {
          ShowSnackBar('Passwords are not equal.');
          return false;
        }
      } else {
        ShowSnackBar('Kindly enter valid email.');
        return false;
      }
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
            placeholder={'Name'}
            keyboardType={'default'}
            onChangeText={txt => setName(txt)}
          />
          <AppInput
            value={email}
            placeholder={'Email'}
            keyboardType={'email-address'}
            onChangeText={txt => setEmail(txt)}
          />
          <AppInput
            value={pass}
            placeholder={'Password'}
            keyboardType={'default'}
            onChangeText={txt => setPass(txt)}
            secureTextEntry
          />
          <AppInput
            value={cnfrmPass}
            placeholder={'Confirm Password'}
            keyboardType={'default'}
            onChangeText={txt => setCnfmrPass(txt)}
            secureTextEntry
          />
        </View>
        <View style={styles.bottomView}>
          <AppButton
            btnWidth={width / 2.5}
            onClick={() => handleSignUp()}
            txt="Register"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

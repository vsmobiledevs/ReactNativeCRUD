import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  Profile,
} from 'react-native-fbsdk-next';
import {SocialIcon} from 'react-native-elements';

const Login = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);

  const [namefb, setNamefb] = useState('');
  const [emailfb, setEmailfb] = useState('');
  const [showfb, setShowfb] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      androidClientId:
        '351190958688-hqtm6pt2rarojbgc50jttflm5m12896m.apps.googleusercontent.com',
    });
  }, []);

  const handleFb = async () => {
    console.log('FB button pressed');
    try {
      const fbLogin = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      console.log('FACEBOOK LOGIN RESULT ' + fbLogin);
      if (fbLogin.isCancelled) {
        console.log('Facebook LogIn is cancelled');
      } else if (fbLogin.declinedPermissions) {
        console.log('Your permission was declined');
      } else if (fbLogin.grantedPermissions) {
        console.log('Logged In via facebook');
      } else {
        console.log('Try again!!!!!');
      }

      const currentUserFb = await Profile.getCurrentProfile();
      // setNamefb(currentUserFb.name);
      // setEmailfb(currentUserFb.email);
      console.log('Fb user name: ' + currentUserFb.name);
      console.log('Fb email: ' + currentUserFb.middleName);
      // setShowfb(true);

      const fbData = await AccessToken.getCurrentAccessToken();
      console.log('fb access token' + fbData.userID);
      collectfbInfo(fbData);
    } catch (error) {
      console.log('try again!!! SignIn failed :(');
      console.log('error message >>>' + error.message);
    }
  };

  const collectfbInfo = async fbData => {
    const data = {
      fields: {
        string: 'id,name,email',
      },
    };
    try {
      const gatherData = new GraphRequest(
        '/me',
        {
          fbData,
          parameters: data,
        },
        (error, result) => {
          if (result) {
            console.log('fb data:' + result.name);
            console.log('fb email' + result.id);
            console.log('fb email' + result.email);
            setEmailfb(result.email);
            setNamefb(result.name);
            setShowfb(true);
          } else {
            console.log(error.message);
          }
        },
      );

      new GraphRequestManager().addRequest(gatherData).start();
    } catch (error) {
      console.log('data gather process failed' + error.message);
    }
  };

  const handleFbLogOut = async () => {
    console.log('logging out .....');
    try {
      await LoginManager.logOut();
      setNamefb('');
      setEmailfb('');
      console.log('SignOut successful');
      setShowfb(false);
    } catch (error) {
      console.log('failed to signOut ...');
    }
  };

  const handleGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      const currentUser = await GoogleSignin.getCurrentUser();
      const accessToken = await await GoogleSignin.getTokens();
      console.log('USER INFO' + user.user.name);
      console.log('Current User is ' + currentUser.user.name);
      console.log('email' + currentUser.user.email);
      console.log('id' + currentUser.user.id);
      console.log('access Token ===> ' + accessToken.accessToken);
      setName(currentUser.user.name);
      setEmail(currentUser.user.email);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('LogIn failed try again!!!!');
      } else if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('Google SignIn required ... ');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services failed ...');
      } else {
        console.log('Process failed try again!!!!');
      }
    }
    setShow(true);
  };

  const handleGoogleLogOut = async () => {
    console.log('logging out .....');
    try {
      await GoogleSignin.signOut();
      setName('');
      setEmail('');
      console.log('SignOut successful');
      setShow(false);
    } catch (error) {
      console.log('failed to signOut ...');
    }
  };

  const handleTwitter = () => {
    console.log('Twitter button pressed');
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpTxt}>Sign Up</Text>
        </TouchableOpacity>
        <SocialIcon
          type="facebook"
          raised={true}
          title={'Login with Facebook'}
          button
          style={styles.socialBtn}
          onPress={handleFb}
        />
        <SocialIcon
          type="google"
          raised={true}
          title={'Login with Google'}
          button
          style={styles.socialBtn}
          onPress={handleGoogle}
        />
        <SocialIcon
          type="twitter"
          raised={true}
          title={'Login with Twitter'}
          button
          style={styles.socialBtn}
          onPress={handleTwitter}
        />
      </View>

      {show ? (
        <View style={styles.viewStyl}>
          <Text>{name}</Text>
          <Text>{email}</Text>
          <SocialIcon
            type="google"
            raised={true}
            title={'LogOut From Google'}
            button
            style={styles.viewStyleBtn}
            onPress={handleGoogleLogOut}
          />
        </View>
      ) : null}

      {showfb ? (
        <View style={styles.viewStyl}>
          <Text>{namefb}</Text>
          <Text>{emailfb}</Text>
          <SocialIcon
            type="facebook"
            raised={true}
            title={'LogOut with Facebook'}
            button
            style={styles.viewStyleBtn}
            onPress={handleFbLogOut}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {flex: 1, width: '100%', backgroundColor: 'white'},
  btnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 30,
  },
  signUpBtn: {
    backgroundColor: 'green',
    borderRadius: 30,
    width: '80%',
    height: 50,
    alignContent: 'center',
  },
  signUpTxt: {
    color: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  viewStyleBtn: {
    width: '70%',
  },
  viewStyl: {alignItems: 'center'},
  socialBtn: {width: '80%'},
});

export default Login;

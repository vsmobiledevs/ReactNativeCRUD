/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  WP,
  family,
  size,
  HP,
  colors,
  appIcons,
  GOOGLE_MAP_API_KEY,
} from '../../utilities';
import {IconButton, Input} from '../../components';
import I18n from '../../translation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

export const FilterPopup = ({
  // Icon,
  isVisible,
  onOk,
  isLoadingOnOk,
  onCancel,
  onValues,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    Geocoder.init(GOOGLE_MAP_API_KEY);
  }, []);

  const {searchObj} = useSelector((state) => state.filter);

  const [address, setAddress] = useState('');
  const [autoAddress, setAutoAddress] = useState('');
  const [loadidngResults, setLoadingResults] = useState(false);
  const [showAutoPlaceView, setShowAutoPlaceView] = useState(false);

  const [text, setText] = useState('');
  const [coords, setCoords] = useState(null);
  const [userLocation, setUserLocation] = useState('');
  const [showingResults, setShowingResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [region, setRegion] = useState(null);

  useEffect(() => {
    setAutoAddress('');
    setRegion(null);
    setText('');
    setSelectedAddress(null);
  }, [isVisible]);

  const getCurrentLocation = async () => {
    if (Platform.OS === 'ios') {
      await Geolocation.requestAuthorization('whenInUse');
    }
    Geolocation.getCurrentPosition(
      async (position) => {
        console.log('current Location', position);
        const regionData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.007,
        };
        setRegion(regionData);
        setCoords(regionData);
        getAddress(regionData);
      },
      (error) => {
        alert(JSON.stringify(error));
      },
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 5000},
    );
  };

  // fetch location details as a JOSN from google map API
  const getAddress = (regionData) => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        regionData?.latitude +
        ',' +
        regionData?.longitude +
        '&key=' +
        GOOGLE_MAP_API_KEY,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('Response JSON', responseJson.results[0].formatted_address);
        //  setUserLocation(responseJson.results[0].formatted_address);
        ///  setAutoAddress(responseJson.results[0].formatted_address);
        setShowAutoPlaceView(false);
        setAutoAddress('');
        setSelectedAddress({
          description: responseJson.results[0].formatted_address,
        });
        searchObj.location = responseJson.results[0].formatted_address;
      })
      .catch((err) => {
        alert(JSON.stringify(err));
        console.log(err);
      });
  };

  const getLatLngFromAddress = ({description}) => {
    console.log('Description', description);
    Geocoder.from(description)
      .then((json) => {
        var location = json.results[0].geometry.location;
        console.log('JSON', location);
        setRegion({
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lng),
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0321,
        });
        getAddress({
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lng),
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0321,
        });
      })
      .catch((error) => console.log(error));
  };

  const onChangeAddress = async () => {
    setLoadingResults(true);
    setShowAutoPlaceView(true);
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_MAP_API_KEY}&input=${autoAddress}`,
      })
      .then((response) => {
        console.log(response.data);
        setShowingResults(response.data.predictions);
        setLoadingResults(false);
      })
      .catch((e) => {
        setLoadingResults(false);
        console.log(e.response);
      });
  };

  useEffect(() => {
    if (autoAddress === '') {
      setShowAutoPlaceView(false);
    } else {
      onChangeAddress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoAddress]);

  return (
    <Modal
      avoidKeyboard={true}
      isVisible={isVisible}
      onBackdropPress={onCancel}
      // hasBackdrop={false}
      style={styles.container}>
      <View style={styles.alert}>
        <View style={styles.topView}>
          <Text style={styles.filterText}>{I18n.t('filter')}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.spacer} />
          <Input
            value={text}
            onChangeText={(text) => setText(text)}
            placeholder={I18n.t('looking_for')}
            onlyInputWithRight
          />

          <Input
            placeholder={I18n.t('complete_place')}
            value={autoAddress}
            onChangeText={(txt) => {
              setAutoAddress(txt);
            }}
            rightIcon={
              <TouchableOpacity onPress={() => getCurrentLocation()}>
                <Image source={appIcons.currentLocIcon} />
              </TouchableOpacity>
            }
            onlyInputWithRight
          />
          {selectedAddress && !showAutoPlaceView && (
            <View>
              <Text
                numberOfLines={5}
                style={{
                  marginHorizontal: 0,
                  fontSize: size.tiny,
                  fontFamily: family.Montserrat_Regular,
                }}>
                {I18n.t('selectedAddress')}:
              </Text>
              <Text
                numberOfLines={2}
                style={{fontFamily: family.Montserrat_Bold, paddingTop: 8}}>
                {selectedAddress?.description}
              </Text>
            </View>
          )}

          {showAutoPlaceView ? (
            <View
              style={{
                backgroundColor: colors.white,
                height: HP('20'),
                bottom: HP('1.8'),
              }}>
              {loadidngResults ? (
                <ActivityIndicator
                  color={colors.p2}
                  style={{alignSelf: 'center', top: 10}}
                />
              ) : (
                <FlatList
                  data={showingResults}
                  contentContainerStyle={{paddingTop: 10}}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedAddress(item);
                        setShowAutoPlaceView(false);
                        getLatLngFromAddress(item);
                      }}
                      key={index}>
                      <Text
                        numberOfLines={2}
                        style={{
                          marginHorizontal: 10,
                          marginBottom: 8,
                          fontSize: size.small,
                        }}>
                        {item.description}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          ) : null}
          <View style={styles.spacer} />
          <IconButton
            icon={appIcons.arrowRight}
            title={I18n.t('apply')}
            titleColor={colors.white}
            iconColor={colors.white}
            backgroundColor={colors.p1}
            onSubmit={() => onValues(text, coords)}
            iconSize={HP('2.5')}
          />
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

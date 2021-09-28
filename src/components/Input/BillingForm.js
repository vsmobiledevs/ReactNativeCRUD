/* eslint-disable no-alert */
import React, {useState, useEffect, Fragment} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import I18n from '../../translation';
import {Input, IconButton, Spacer} from '../../components';
import {WP, appIcons, colors, family, size} from '../../utilities';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {editAddressRequest} from '../../redux/actions';

const BillingForm = ({type, onSave}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [country, setCounrty] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);
  const {billingAddress, addresses} = useSelector((state) => state.address);

  useEffect(() => {
    setDefaultValues(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const setDefaultValues = (type) => {
    console.log(type);
    switch (type) {
      case 'Billing':
        setFirstName(addresses?.billing?.billing_first_name);
        billingAddress.firstName = addresses?.billing?.billing_first_name;
        setLastName(addresses?.billing?.billing_last_name);
        billingAddress.lastName = addresses?.billing?.billing_last_name;
        setCompanyName(addresses?.billing?.billing_company);
        billingAddress.companyName = addresses?.billing?.billing_company;
        setCounrty(addresses?.billing?.billing_country);
        billingAddress.country = addresses?.billing?.billing_country;
        setAddress1(addresses?.billing?.billing_address_1);
        billingAddress.address1 = addresses?.billing?.billing_address_1;
        setAddress2(addresses?.billing?.billing_address_2);
        billingAddress.address2 = addresses?.billing?.billing_address_2;
        setCity(addresses?.billing?.billing_city);
        billingAddress.city = addresses?.billing?.billing_city;
        setState(addresses?.billing?.billing_state);
        billingAddress.state = addresses?.billing?.billing_state;
        setPostalCode(addresses?.billing?.billing_postcode);
        billingAddress.postalCode = addresses?.billing?.billing_postcode;
        setPhone(addresses?.billing?.billing_phone);
        billingAddress.phone = addresses?.billing?.billing_phone;
        setEmail(addresses?.billing?.billing_email);
        billingAddress.email = addresses?.billing?.billing_email;
        break;
      case 'Shipping':
        setFirstName(addresses?.shipping?.shipping_first_name);
        billingAddress.firstName = addresses?.shipping?.shipping_first_name;
        setLastName(addresses?.shipping?.shipping_last_name);
        billingAddress.lastName = addresses?.billing?.shipping_last_name;
        setCompanyName(addresses?.shipping?.shipping_company);
        billingAddress.companyName = addresses?.shipping?.shipping_company;
        setCounrty(addresses?.shipping?.shipping_country);
        billingAddress.country = addresses?.shipping?.shipping_country;
        setAddress1(addresses?.shipping?.shipping_address_1);
        billingAddress.address1 = addresses?.shipping?.shipping_address_1;
        setAddress2(addresses?.shipping?.shipping_address_2);
        billingAddress.address2 = addresses?.shipping?.shipping_address_2;
        setCity(addresses?.shipping?.shipping_city);
        billingAddress.city = addresses?.shipping?.shipping_city;
        setState(addresses?.shipping?.shipping_state);
        billingAddress.state = addresses?.shipping?.shipping_state;
        setPostalCode(addresses?.shipping?.shipping_postcode);
        billingAddress.postalCode = addresses?.shipping?.shipping_postcode;
        break;
      default:
        return;
    }
  };

  const onEditAddress = () => {
    if (type === 'Billing' && !validateBilling()) {
      return;
    }
    let params = makeAPIData();
    console.log(params);
    setLoading(true);
    const cbSuccess = (res) => {
      navigation.pop();
      setLoading(false);
    };
    const cbFailure = () => {
      alert('Server error Try Again ');
      setLoading(false);
    };
    dispatch(editAddressRequest(params, token, cbSuccess, cbFailure));
  };

  const makeAPIData = () => {
    let data = new FormData();
    if (type === 'Billing') {
      data.append('billing_first_name', billingAddress.firstName);
      data.append('billing_last_name', billingAddress.lastName);
      if (
        billingAddress.companyName !== undefined ||
        billingAddress.companyName !== null
      ) {
        data.append('billing_company', billingAddress.companyName);
      }
      data.append('billing_address_1', billingAddress.address1);
      data.append('billing_address_2', billingAddress.address2);
      data.append('billing_city', billingAddress.city);
      data.append('billing_postcode', billingAddress.postalCode);
      data.append('billing_country', billingAddress.country);
      data.append('billing_state', billingAddress.state);
      data.append('billing_phone', billingAddress.phone);
      data.append('billing_email', billingAddress.email);
      // data.append('shipping_first_name', '');
      // data.append('shipping_last_name', '');
      // data.append('shipping_company', '');
      // data.append('shipping_address_1', '');
      // data.append('shipping_address_2', '');
      // data.append('shipping_city', '');
      // data.append('shipping_postcode', '');
      // data.append('shipping_country', '');
      // data.append('shipping_state', '');
      // data.append('shipping_method', '');
    } else {
      // data.append('billing_first_name', '');
      // data.append('billing_last_name', '');
      // data.append('billing_company', '');
      // data.append('billing_address_1', '');
      // data.append('billing_address_2', '');
      // data.append('billing_city', '');
      // data.append('billing_postcode', '');
      // data.append('billing_country', '');
      // data.append('billing_state', '');
      // data.append('billing_phone', '');
      // data.append('billing_email', '');
      data.append('shipping_first_name', billingAddress.firstName);
      data.append('shipping_last_name', billingAddress.lastName);
      data.append('shipping_company', billingAddress.companyName);
      data.append('shipping_address_1', billingAddress.address1);
      data.append('shipping_address_2', billingAddress.address2);
      data.append('shipping_city', billingAddress.city);
      data.append('shipping_postcode', billingAddress.postalCode);
      data.append('shipping_country', billingAddress.country);
      data.append('shipping_state', billingAddress.state);
      data.append('shipping_method', billingAddress.shippingMethod);
    }
    return data;
  };

  const validateBilling = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      billingAddress?.firstName === '' ||
      billingAddress?.lastName === '' ||
      billingAddress?.address1 === '' ||
      billingAddress?.address2 === '' ||
      billingAddress?.city === '' ||
      billingAddress?.postalCode === '' ||
      billingAddress?.country === '' ||
      billingAddress?.state === '' ||
      billingAddress?.phone === '' ||
      billingAddress?.email === ''
    ) {
      alert('Veuillez saisir tous les champs pour continuer');
      return false;
    }
    if (!validateIsEmail(billingAddress?.email)) {
      alert(I18n.t('enter_valid_email'));
      return false;
    }
    return true;
  };

  const validateIsEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.lable}>{I18n.t('first_name')}</Text>
      <Input
        placeholder={I18n.t('first_name')}
        placeholderTextColor={colors.black}
        value={firstName}
        onChangeText={(text) => {
          setFirstName(text);
          billingAddress.firstName = text;
        }}
      />
      <Text style={styles.lable}>{I18n.t('last_name')}</Text>
      <Input
        placeholder={I18n.t('last_name')}
        placeholderTextColor={colors.black}
        value={lastName}
        onChangeText={(text) => {
          setLastName(text);
          billingAddress.lastName = text;
        }}
      />
      <Text style={styles.lable}>{I18n.t('company_name')}</Text>
      <Input
        placeholder={I18n.t('company_name')}
        placeholderTextColor={colors.black}
        value={companyName}
        onChangeText={(text) => {
          setCompanyName(text);
          billingAddress.companyName = text;
        }}
      />
      <Text style={styles.lable}>{I18n.t('country')}</Text>
      <Input
        placeholder={I18n.t('country')}
        placeholderTextColor={colors.black}
        value={country}
        onChangeText={(text) => {
          setCounrty(text);
          billingAddress.country = text;
        }}
      />
      <Text style={styles.lable}>{I18n.t('street_address')}</Text>
      <Input
        placeholder={I18n.t('house_no')}
        placeholderTextColor={colors.black}
        value={address1}
        onChangeText={(text) => {
          setAddress1(text);
          billingAddress.address1 = text;
        }}
      />
      <Input
        placeholder={I18n.t('apartment')}
        placeholderTextColor={colors.black}
        value={address2}
        onChangeText={(text) => {
          setAddress2(text);
          billingAddress.address2 = text;
        }}
      />
      <Text style={styles.lable}>{I18n.t('town')}</Text>
      <Input
        placeholder={I18n.t('town')}
        placeholderTextColor={colors.black}
        value={city}
        onChangeText={(text) => {
          setCity(text);
          billingAddress.city = text;
        }}
      />
      <Text style={styles.lable}>{I18n.t('state')}</Text>
      <Input
        placeholder={I18n.t('state')}
        placeholderTextColor={colors.black}
        value={state}
        onChangeText={(text) => {
          setState(text);
          billingAddress.state = text;
        }}
      />
      <Text style={styles.lable}>{I18n.t('postal_code')}</Text>
      <Input
        placeholder={I18n.t('postal_code')}
        placeholderTextColor={colors.black}
        value={postalCode}
        onChangeText={(text) => {
          setPostalCode(text);
          billingAddress.postalCode = text;
        }}
      />
      {type !== 'Shipping' ? (
        <Fragment>
          <Text style={styles.lable}>{I18n.t('phone')}</Text>
          <Input
            placeholder={I18n.t('phone')}
            placeholderTextColor={colors.black}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              billingAddress.phone = text;
            }}
          />
          <Text style={styles.lable}>{I18n.t('email')}</Text>
          <Input
            placeholder={I18n.t('email')}
            placeholderTextColor={colors.black}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              billingAddress.email = text;
            }}
          />
        </Fragment>
      ) : null}
      <Spacer />
      <Spacer />
      <IconButton
        title={I18n.t('save_address')}
        withIcon={false}
        backgroundColor={colors.p2}
        icon={appIcons.loginIcon}
        iconColor={colors.white}
        style={styles.loginButton}
        isLoading={loading}
        loaderColor={'white'}
        titleColor={colors.white}
        onSubmit={() => onEditAddress()}
      />
      <Spacer />
      <Spacer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    marginHorizontal: WP('4'),
  },
  lable: {
    fontFamily: family.Montserrat_Medium,
    marginHorizontal: WP('1'),
    fontSize: size.xsmall,
    fontWeight: '500',
  },
});

export {BillingForm};

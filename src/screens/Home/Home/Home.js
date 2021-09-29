import React, {useState, useEffect} from 'react';
import {View, Text, Alert, FlatList, TouchableOpacity} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors, HP} from '../../../utilities';
import styles from './styles';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = () => {
    database()
      .ref('/Childs')
      .once('value')
      .then(snapshot => {
        let dataArr = snapshot.val();
        setData(Object.values(dataArr));
      });
  };

  const handleDelete = ({id}) => {
    Alert.alert('Delete', 'Are you sure you want to delete it?', [
      {
        text: 'NO',
      },
      {
        text: 'YES',
        onPress: async () => {
          const delRes = await database().ref(`/Childs/${id}`).remove();
          console.log('delRes is ==> ', delRes);
          getData();
        },
      },
    ]);
  };

  const renderItem = ({item, index}) => {
    return (
      <Card>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('AddCard', {childId: item?.id});
          }}
          style={styles.cardView}>
          <View style={styles.leftView}>
            <Text style={{marginBottom: 7}}>Name: {item?.name}</Text>
            <Text>Age: {item?.age}</Text>
          </View>
          <View style={styles.rightView}>
            <Icon
              type={'MaterialIcons'}
              name={'delete'}
              color={'red'}
              size={HP('3.5')}
              style={{marginBottom: 5}}
              onPress={() => handleDelete(item)}
            />
            <Icon
              type={'MaterialIcons'}
              name={'credit-card'}
              color={'gray'}
              size={HP('3')}
              style={{marginTop: 5}}
              onPress={() => {
                navigation.navigate('UpdateCard', {childId: item?.id});
              }}
            />
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  const handleLogout = async () => {
    await AsyncStorage.setItem('Login', 'false');
    navigation.replace('Auth');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerView}>
        <Text style={styles.titleTxtStyle}>Childrens</Text>
        <Icon
          type={'MaterialIcons'}
          name={'logout'}
          color={'white'}
          size={HP('3')}
          onPress={() => handleLogout()}
        />
      </View>
      <View style={styles.container}>
        {data === undefined || data.length === 0 ? (
          <Text style={styles.recordsTextStyle}>No Records Found</Text>
        ) : (
          <FlatList
            data={data}
            extraData={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <ActionButton
        buttonColor={colors.p1}
        onPress={() => navigation.navigate('AddChildren')}
      />
    </View>
  );
};

export default Home;

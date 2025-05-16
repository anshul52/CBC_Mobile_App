import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Search from '../../assets/Booking/Search.svg';
import Profile from '../../assets/Booking/Profile.svg';

const facilities = [
  {
    id: '1',
    name: 'Badminton Court',
    image: require('../../assets/Booking/place1.png'),
    price: '$1880',
    available: true,
  },
  {
    id: '2',
    name: 'Swimming Pool',
    image: require('../../assets/Booking/place1.png'),
    price: '$1880',
    available: false,
  },
  {
    id: '3',
    name: 'Tennis',
    image: require('../../assets/Booking/place1.png'),
    price: '$1880',
    available: true,
  },
  {
    id: '4',
    name: 'Squash Court',
    image: require('../../assets/Booking/place1.png'),
    price: '$1880',
    available: true,
  },
  {
    id: '5',
    name: 'PickleBall',
    image: require('../../assets/Booking/place1.png'),
    price: '$1880',
    available: true,
  },
  {
    id: '6',
    name: 'Snooker & Billard',
    image: require('../../assets/Booking/place1.png'),
    price: '$1880',
    available: false,
  },
  {
    id: '7',
    name: 'Fitness Dance Studio',
    image: require('../../assets/Booking/place1.png'),
    price: '$1880',
    available: true,
  },

  {
    id: '8',
    name: 'GYM',
    image: require('../../assets/Booking/place1.png'),
    price: '$1880',
    available: true,
  },
];

const FacilityItem = ({item, handleSelect}) => (
  <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)}>
    <Image source={item.image} style={styles.image} resizeMode="cover" />
    <View
      style={[
        styles.statusTag,
        {backgroundColor: item.available ? '#029DDD1A' : '#F15B5B1A'},
      ]}>
      <Text
        style={[
          styles.statusText,
          {color: item.available ? '#029DDD' : '#F15B5B'},
        ]}>
        {item.available ? 'Available' : 'Not Available'}
      </Text>
    </View>
    <Text style={styles.title}>{item.name}</Text>
  </TouchableOpacity>
);

const FacilitySelectionScreen = () => {
  const navigation = useNavigation();
  const handleSelect = item => {
    console.log('Selected:', item);
    navigation.navigate('DateTime', {facility: item});
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('ProfileSettings')}>
          <Profile width={22} height={22} />
        </TouchableOpacity>
        <View style={{marginLeft: 10}}>
          <Text style={styles.welcome}>Welcome to CBC!</Text>
          <Text style={styles.subtext}>Select to book your facilities</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Search width={22} height={22} />
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>

      <FlatList
        data={facilities}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <FacilityItem item={item} handleSelect={handleSelect} />
        )}
        contentContainerStyle={{paddingBottom: 100}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    fontFamily: 'Satoshi-Medium',
  },
  subtext: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Satoshi-Medium',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 3,
    marginBottom: 25,
    marginTop: 15,
    backgroundColor: 'white',
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  card: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#00000014',
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 10,
  },
  statusTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    marginTop: 12,
    borderRadius: 100,
    // backgroundColor: 'red',
  },
  tagText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Satoshi-Medium',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Satoshi-Bold',
    marginTop: 7,
    marginBottom: 17,
  },
});

export default FacilitySelectionScreen;

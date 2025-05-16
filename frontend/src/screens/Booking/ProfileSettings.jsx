import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import BackBlack from '../../assets/Booking/BackBlack.svg';
import {useNavigation} from '@react-navigation/native';
import DummyProfile from '../../assets/Booking/DummyProfile.svg';

const {width} = Dimensions.get('window');

const ProfileSettings = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <BackBlack width={13} height={13} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Settings</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Profile Icon */}
      <View style={styles.profileIconContainer}>
        <View style={styles.profileCircle}>
          <DummyProfile width={50} height={50} />
        </View>
      </View>

      {/* Membership Status */}
      <View style={styles.section}>
        <View style={styles.MemberShipBox}>
          <Text style={styles.label}>Membership Status</Text>
          <View style={styles.activeContainer}>
            <View style={styles.greenDot} />
            <Text style={styles.activeText}>Active</Text>
          </View>
        </View>
        <Text style={styles.statusText}>Valid Until</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusDate}>27 Juny 2025</Text>
        </View>
        <Text style={styles.statusText}>
          Next payment on: <Text style={styles.linkText}>26 Juny 2025</Text>
        </Text>
        <View style={styles.paymentBox}>
          <Text style={styles.payNow}>PAYNOW</Text>
        </View>
        <Text style={styles.BookedFacilityText}>Booked Facility</Text>
      </View>

      {/* Booked Facility */}
      <View style={styles.facilityContainer}>
        <View style={styles.facilityHeader}>
          <Image
            source={{uri: 'https://i.imgur.com/5uYHdNw.jpg'}} // Replace with actual thumbnail
            style={styles.thumbnail}
          />
          <Text style={styles.facilityTitle}>Badminton Court</Text>
        </View>

        <View style={styles.divider} />
        <Text style={styles.paymentStatus}>
          Payment Status: <Text style={styles.completed}>Completed</Text>
        </Text>
        <Text style={styles.detailTitle}>Detail Transaction</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Payment</Text>
          <Text style={styles.detailValue}>$410</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Method</Text>
          <Text style={styles.detailValue}>PayNow</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>16 - 18 Feb 2025</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 50,
    flex: 1,
  },
  header: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 24,
    color: '#000',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: 'black',
    fontFamily: 'Inter_24pt-SemiBold',
    fontSize: 16,
  },
  MemberShipBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  activeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#32C846',
    marginRight: 6,
  },
  activeText: {
    color: '#32C846',
    fontSize: 12,
    fontFamily: 'Satoshi-Regular',
  },
  placeholder: {
    width: 40,
  },
  profileIconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileCircle: {
    backgroundColor: '#DDF2FD',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 40,
    color: '#0090D2',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Satoshi-Medium',
  },
  statusRow: {
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Satoshi-Medium',
  },
  BookedFacilityText: {
    fontSize: 14,
    paddingTop: 20,
    fontFamily: 'Satoshi-Medium',
  },
  statusDate: {
    fontSize: 12,
    fontFamily: 'Satoshi-Regular',
  },
  linkText: {
    color: '#1A9BF7',
  },
  paymentBox: {
    backgroundColor: '#F5F7FA',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  payNow: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#880E4F',
  },
  facilityContainer: {
    backgroundColor: '#F9FBFF',
    borderRadius: 15,
    margin: 20,
    marginTop: 0,
    padding: 20,
  },
  facilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  facilityTitle: {
    fontSize: 16,
    fontFamily: 'Satoshi-Bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  paymentStatus: {
    fontSize: 14,
    marginBottom: 10,
  },
  completed: {
    color: 'green',
    fontWeight: 'bold',
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  detailLabel: {
    color: '#999',
  },
  detailValue: {
    fontWeight: '500',
  },
});

export default ProfileSettings;

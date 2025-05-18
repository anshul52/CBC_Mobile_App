import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PaymentFail from '../../assets/Booking/PaymentFail.svg';

export default function PaymentFailedScreen({route}) {
  const navigation = useNavigation();
  const {reason} = route.params || {};
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Status</Text>

      <View style={styles.iconContainer}>
        <View style={styles.failedIcon}>
          <PaymentFail />
        </View>
      </View>

      <Text style={styles.failedText}>Payment Failed</Text>
      <Text style={styles.subText}>{reason || 'Unknown error occurred.'}</Text>

      <Text style={styles.totalPaid}>Total need paid</Text>
      <Text style={styles.amount}>
        <Text style={styles.currency}>SGD</Text>{' '}
        <Text style={styles.amountBold}>400.00</Text>
      </Text>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate('Checkout')}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('FacilitySelection')}>
        <Text style={styles.backButtonText}>Back to Homepage</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 16,
    fontFamily: 'Inter_24pt-SemiBold',
    marginBottom: 30,
  },
  iconContainer: {marginTop: 50, marginBottom: 0},
  failedIcon: {
    backgroundColor: '#feefef',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossmark: {fontSize: 36, color: '#f44336'},
  failedText: {
    color: '#f44336',
    fontSize: 20,
    fontFamily: 'Inter_24pt-SemiBold',
    marginTop: 20,
  },
  subText: {
    color: '#888',
    fontSize: 14,
    marginVertical: 10,
    fontFamily: 'Inter_24pt-Regular',
  },
  totalPaid: {
    fontSize: 16,
    color: '#7E7E7E',
    marginTop: 10,
    fontFamily: 'Inter_24pt-Medium',
  },
  amount: {fontSize: 28, color: '#000', fontFamily: 'Inter_24pt-SemiBold'},
  currency: {
    fontSize: 14,
    fontFamily: 'Inter_24pt-SemiBold',
    color: '#6A6A6A',
  },
  amountBold: {fontFamily: 'Inter_24pt-SemiBold'},
  cancelButton: {
    position: 'absolute',
    bottom: 120,
    backgroundColor: '#009fe3',
    paddingVertical: 16,
    paddingHorizontal: 143,
    borderRadius: 14,
  },
  cancelButtonText: {color: '#fff', fontSize: 16, fontWeight: '600'},
  backButton: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#e6f7ff',
    paddingVertical: 16,
    paddingHorizontal: 100,
    borderRadius: 14,
  },
  backButtonText: {color: '#009fe3', fontSize: 16, fontWeight: '600'},
});

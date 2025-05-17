import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PaymentSuccess from '../../assets/Booking/PaymentSuccess.svg';

export default function PaymentCompletedScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Status</Text>

      <View style={styles.iconContainer}>
        <View style={styles.successIcon}>
          <PaymentSuccess />
        </View>
      </View>

      <Text style={styles.successText}>Payment Completed</Text>
      <Text style={styles.subText}>Your payment has been done</Text>

      <Text style={styles.totalPaid}>Total paid</Text>
      <Text style={styles.amount}>
        <Text style={styles.currency}>SGD</Text>{' '}
        <Text style={styles.amountBold}>400.00</Text>
      </Text>

      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.navigate('FacilitySelection')}>
        <Text style={styles.doneButtonText}>Done</Text>
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
  successIcon: {
    backgroundColor: '#e6f6fc',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {fontSize: 36, color: '#009fe3'},
  successText: {
    color: '#009fe3',
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
    fontFamily: 'Inter_24pt-Medium',
    fontSize: 16,
    color: '#7E7E7E',
    marginTop: 10,
  },
  amount: {
    fontSize: 28,
    color: '#000',
    fontFamily: 'Inter_24pt-SemiBold',
  },
  currency: {
    fontSize: 14,
    fontFamily: 'Inter_24pt-SemiBold',
    color: '#6A6A6A',
  },
  amountBold: {fontFamily: 'Inter_24pt-SemiBold'},
  doneButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#009fe3',
    paddingVertical: 14,
    paddingHorizontal: 150,
    borderRadius: 14,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_24pt-SemiBold',
  },
});

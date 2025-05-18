import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ImageBackground,
  Button,
  Alert,
} from 'react-native';
import Back from '../../assets/Booking/Back.svg';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const [cardDetails, setCardDetails] = useState({});
  const {confirmPayment} = useStripe();

  const handlePayPress = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.warn('No token found');
        return;
      }
      const response = await fetch(
        'http://10.0.2.2:8085/api/payment/create-payment-intent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: 100,
          }),
        },
      );
      const {clientSecret} = await response.json();

      const {error, paymentIntent} = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            email: 'anshulgupta2028@gmail.com',
          },
        },
      });

      if (error) {
        navigation.replace('PaymentFailed', {
          reason: error.message || 'Payment failed',
        });
      } else if (paymentIntent && paymentIntent.status === 'Succeeded') {
        navigation.replace('PaymentCompleted');
      } else {
        navigation.replace('PaymentFailed', {
          reason: `Unexpected status: ${paymentIntent?.status}`,
        });
      }
    } catch (err) {
      console.error('Payment error', err);
      navigation.replace('PaymentFailed', {
        reason: 'Something went wrong',
      });
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/Booking/Group.png')}
      style={styles.background}
      resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Back width={13} height={13} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Choose Payment</Text>
          <View style={styles.placeholder} />
        </View>
        {/* -------------- */}
        <View style={styles.mainContainer}>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}>
            <View>
              <CardField
                // postalCodeEnabled={true}
                placeholder={{number: '4242 4242 4242 4242'}}
                onCardChange={cardDetails => setCardDetails(cardDetails)}
                style={{height: 50, marginVertical: 30, backgroundColor: 'red'}}
              />
              <Button onPress={handlePayPress} title="Pay" />
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handlePayPress}>
            <Text style={styles.continueButtonText}>Payment Done</Text>
          </TouchableOpacity>
        </View>
        {/* ------------------ */}
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#00A0E0',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Inter_24pt-SemiBold',
  },
  placeholder: {
    width: 40,
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 45,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contentContainer: {
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 100, // Add padding for the continue button
  },
  courtInfoCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#ccc',
    // padding: 16,
    marginBottom: 10,
  },
  courtImage: {
    width: '100%',
    height: 152,
    borderRadius: 8,
  },
  courtDetails: {
    flex: 1,
    marginLeft: 16,
  },
  courtName: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'Satoshi-Bold',
  },
  availabilityText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'Satoshi-Regular',
  },
  availabilityDetails: {
    flexDirection: 'row',
    marginBottom: 8,
    fontFamily: 'Satoshi-Variable',
  },
  availabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    fontFamily: 'Satoshi-Variable',
  },
  availabilityItemText: {
    marginLeft: 4,
    color: '#000',
    fontSize: 12,
    fontFamily: 'Satoshi-Regular',
  },
  priceText: {
    fontSize: 16,
    fontFamily: 'Satoshi-Medium',
  },
  calendarContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
  },
  calendarGrid: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  calendarCell: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayOfWeekText: {
    color: '#666',
    fontWeight: '500',
  },
  calendarDayText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDateCircle: {
    backgroundColor: '#FF9D5C',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDateText: {
    color: 'white',
    fontWeight: '600',
  },
  highlightedLine: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '80%',
    backgroundColor: '#FF9D5C',
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 16,
    fontFamily: 'Inter_24pt-SemiBold',
  },
  timeSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeColumn: {
    width: '48%',
  },
  timeLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  timeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  selectedTimeDisplay: {
    fontSize: 16,
  },
  timeDropdownContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    zIndex: 10,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeDropdownScroll: {
    maxHeight: 200,
  },
  timeOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  timeText: {
    fontSize: 16,
  },
  selectedTimeText: {
    color: '#00A0E0',
    fontWeight: '600',
  },
  continueButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00A0E0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 25,
    marginBottom: 30,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Satoshi-Bold',
    marginTop: 7,
    marginBottom: 17,
  },
  card: {
    marginBottom: 5,
  },
  statusTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    marginTop: 12,
    borderRadius: 100,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Satoshi-Medium',
  },
});

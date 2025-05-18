import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OTPVerificationScreen from '../screens/Auth/OTPVerificationScreen';
import FacilitySelectionScreen from '../screens/Booking/FacilitySelectionScreen';
import ProfileSettings from '../screens/Booking/ProfileSettings';
import DateTimePage from '../screens/Booking/DateTimePage';
import FacilityList from '../screens/Booking/FacilityList';
import LoginScreen from '../screens/Auth/LoginScreen';
import PaymentCompletedScreen from '../screens/Booking/PaymentCompletedScreen';
import PaymentFailedScreen from '../screens/Booking/PaymentFailedScreen';
import CheckoutScreen from '../screens/Booking/CheckoutScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {/* <Stack.Screen name="OTP" component={FacilityList} /> */}

    {/* <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="OTP" component={OTPVerificationScreen} />
    <Stack.Screen
      name="FacilitySelection"
      component={FacilitySelectionScreen}
    /> */}
    <Stack.Screen name="DateTime" component={DateTimePage} />
    <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
    <Stack.Screen name="PaymentCompleted" component={PaymentCompletedScreen} />
    <Stack.Screen name="PaymentFailed" component={PaymentFailedScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
  </Stack.Navigator>
);

export default AppNavigator;

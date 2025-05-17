import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OTPVerificationScreen from '../screens/Auth/OTPVerificationScreen';
import FacilitySelectionScreen from '../screens/Booking/FacilitySelectionScreen';
import ProfileSettings from '../screens/Booking/ProfileSettings';
import DateTimePage from '../screens/Booking/DateTimePage';
import FacilityList from '../screens/Booking/FacilityList';
import LoginScreen from '../screens/Auth/LoginScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {/* <Stack.Screen name="OTP" component={FacilityList} /> */}

    {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
    {/* <Stack.Screen name="OTP" component={OTPVerificationScreen} /> */}
    <Stack.Screen
      name="FacilitySelection"
      component={FacilitySelectionScreen}
    />
    <Stack.Screen name="DateTime" component={DateTimePage} />
    <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
  </Stack.Navigator>
);

export default AppNavigator;

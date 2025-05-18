import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StripeProvider} from '@stripe/stripe-react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {PUBLISHABLE_KEY} from '@env';

export default function App() {
  return (
    <StripeProvider publishableKey={PUBLISHABLE_KEY}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </StripeProvider>
  );
}

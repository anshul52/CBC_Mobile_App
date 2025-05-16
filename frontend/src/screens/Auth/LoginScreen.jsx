import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NumImg from '../../assets/numberimg.svg';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    // const fullPhoneNumber = '+44' + phone.trim();
    const fullPhoneNumber = '+91' + phone.trim();
    if (phone.trim().length < 6) {
      Alert.alert('Invalid', 'Please enter a valid phone number');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:8085/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phone: fullPhoneNumber}),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'OTP sent successfully', [
          {
            text: 'OK',
            onPress: () => {
              // Navigate and pass the phone number if needed
              navigation.navigate('OTP', {phone: fullPhoneNumber});
            },
          },
        ]);
      } else {
        Alert.alert('Failed', data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Network Error',
        'Could not connect to server. Please try again.',
      );
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />

          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.clubText}>Changi Business Club!</Text>

          <Text style={styles.label}>Phone number</Text>
          <View style={styles.inputContainer}>
            <View style={styles.countryCodeContainer}>
              <NumImg width={22} height={22} />
              <Text style={styles.countryCode}>+44</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={[styles.getOtpButton, loading && {opacity: 0.6}]}
            onPress={handleSendOtp}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.getOtpText}>Get OTP </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createAccountButton}
            disabled={loading}>
            <Text style={styles.createAccountText}>Create Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    // backgroundColor: 'red',
    paddingBottom: 250,
  },
  logo: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'Satoshi-Bold',
    color: '#000',
  },
  clubText: {
    fontSize: 24,
    fontFamily: 'Satoshi-Bold',
    color: '#000',
    marginBottom: 70,
  },
  label: {
    fontFamily: 'Satoshi-Regular',
    alignSelf: 'flex-start',
    marginBottom: 13,
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f5f9',
    borderRadius: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
    height: 50,
    overflow: 'hidden',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    borderRightWidth: 1,
    borderColor: '#ccc',
    // backgroundColor: 'red',
    height: 50,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
    resizeMode: 'contain',
  },
  countryCode: {
    fontSize: 16,
    color: '#75838D',
    fontFamily: 'Satoshi-Regular',
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: 'Satoshi-Regular',
    fontSize: 17,
  },
  getOtpButton: {
    backgroundColor: '#00a5ec',
    paddingVertical: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  getOtpText: {
    color: '#fff',
    fontFamily: 'Satoshi-Bold',
    fontSize: 17,
  },
  createAccountButton: {
    backgroundColor: '#e0f5ff',
    paddingVertical: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  createAccountText: {
    color: '#00a5ec',
    fontFamily: 'Satoshi-Medium',
    fontSize: 17,
  },
});

export default LoginScreen;

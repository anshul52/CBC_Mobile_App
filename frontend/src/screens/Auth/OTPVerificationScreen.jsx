import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

const OTPVerificationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {phone} = route.params;
  // const {phone} = '+917697708777';

  const [timer, setTimer] = useState(47);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const inputs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOTPChange = (text, index) => {
    if (!/^\d*$/.test(text)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    // Auto focus next input
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };
  const handleVerifyOtp = async () => {
    const code = otp.join('');
    if (code.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter the 6-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:8085/api/auth/verify-otp', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({phone, otp: code}),
      });

      const data = await response.json();

      if (response.ok && data.token && data.user) {
        // Save token and user details to AsyncStorage
        await AsyncStorage.multiSet([
          ['authToken', data.token],
          ['userData', JSON.stringify(data.user)],
        ]);
        console.log('Token saved:', data.token);
        Alert.alert('Success', 'OTP verified successfully', [
          {
            text: 'Continue',
            onPress: () => {
              console.log('OTP verified');
              navigation.navigate('FacilitySelection');
            },
          },
        ]);
      } else {
        Alert.alert('Verification Failed', data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('OTP verify error:', error);
      Alert.alert('Error', 'Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{marginTop: 90}}>
        <View style={styles.containerCard}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />

          <Text style={styles.title}>Verify Your Phone Number</Text>
          <Text style={styles.subtitle}>
            We sent an activation authentication {'\n'} code to{' '}
            <Text style={styles.phoneNumber}>{phone}</Text>
          </Text>
        </View>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputs.current[index] = ref)}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={text => handleOTPChange(text, index)}
              value={otp[index]}
            />
          ))}
        </View>

        <Text style={styles.goBackText}>
          Wrong Phone Number?{' '}
          <Text style={styles.link} onPress={() => navigation.goBack()}>
            Go Back
          </Text>
        </Text>

        <TouchableOpacity
          style={[
            styles.loginButton,
            {backgroundColor: otp.every(d => d) ? '#00a5ec' : '#e0f5ff'},
          ]}
          onPress={handleVerifyOtp}
          disabled={loading || otp.some(d => !d)}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text
              style={[
                styles.loginText,
                {color: otp.every(d => d) ? '#fff' : '#fff'},
              ]}>
              Login
            </Text>
          )}
        </TouchableOpacity>

        <Text style={styles.timerText}>
          Resend Code in 0:{timer < 10 ? `0${timer}` : timer}
        </Text>
      </View>

      <Text style={styles.resendText}>
        Haven’t received the OTP yet?{' '}
        <Text style={styles.link}>Resend OTP</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // backgroundColor: 'red',
    // alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  containerCard: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingBottom: 170,
  },
  logo: {
    width: 60,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Satoshi-Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontFamily: 'Satoshi-Medium',
    color: 'gray',
    textAlign: 'center',
    marginBottom: 50,
  },
  phoneNumber: {
    color: '#00a5ec',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    gap: 10,
    marginTop: 30,
  },
  otpInput: {
    width: 55,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 10,
  },
  goBackText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
    fontSize: 12,
    fontFamily: 'Satoshi-Regular',
  },
  link: {
    color: '#00a5ec',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#e0f5ff',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginText: {
    color: '#aaa',
    fontSize: 16,
    fontWeight: '600',
  },
  timerText: {
    fontSize: 12,
    fontFamily: 'Satoshi-Regular',
    color: '#555',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  resendText: {
    fontSize: 13,
    fontFamily: 'Satoshi-Regular',
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
  },
});

export default OTPVerificationScreen;

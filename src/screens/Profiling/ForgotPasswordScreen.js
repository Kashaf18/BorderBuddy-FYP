import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily, FontSize, Color } from '../../assets/GlobalStyles';
import { auth } from '../../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { LogBox } from 'react-native'; // For logging

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    LogBox.ignoreLogs(['Sending password reset email...']); // To avoid duplicate log warnings
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      console.log('Error: Email field is empty');
      return;
    }

    console.log('Attempting to send password reset email to:', email);
    
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Email sent
        Alert.alert('Success', 'If the email address is registered, you will receive a password reset link.');
        console.log('Password reset email sent successfully to:', email);
      })
      .catch((error) => {
        // Handle Errors here
        const errorCode = error.code;
        let errorMessage;

        if (errorCode === 'auth/invalid-email') {
          errorMessage = 'The email address is not valid.';
          console.log('Error: Invalid email format');
        } else if (errorCode === 'auth/user-not-found') {
          errorMessage = 'There is no user record corresponding to this email address.';
          console.log('Error: No user found with this email:', email);
        } else {
          errorMessage = 'An error occurred. Please try again later.';
          console.log('Error: General error occurred while sending password reset email:', error.message);
        }

        Alert.alert('Error', errorMessage);
      });
  };

  return (
    <View style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <Image source={require("../../assets/images/TopImage.png")} style={styles.topImage} />
      <View style={styles.textContainer}>
        <Text style={styles.richText}>
          <Text style={styles.bText}>B</Text>
          <Text style={styles.orderText}>ORDER</Text>
          <Text style={styles.BText}>B</Text>
          <Text style={styles.uddyText}>UDDY</Text>
        </Text>
        <Text style={styles.loginText}>Forgot Password</Text>
      </View>
      <View style={styles.inputView}>
        <Icon name="email" size={24} color="#ED6C30" style={styles.icon} />
        <TextInput
          style={styles.inputText}
          placeholder="Enter Email"
          placeholderTextColor="#d5d5d5"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleForgotPassword}>
        <Text style={styles.loginTextBtn}>Reset Password</Text>
      </TouchableOpacity>
      <View style={styles.accountContainer}>
        <Text style={styles.accountText}>Remembered your password? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.signupText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Image source={require("../../assets/images/BottomImage.png")} style={styles.bottomImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  bText: {
    fontSize: FontSize.size_31xl,
    color: Color.colorCoral_100,
    fontFamily: FontFamily.poppinsBold,
  },
  BText: {
    fontSize: FontSize.size_31xl,
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsBold,
  },
  orderText: {
    fontSize: FontSize.size_9xl,
    color: Color.colorCoral_100,
    fontFamily: FontFamily.poppinsBold,
  },
  uddyText: {
    fontSize: FontSize.size_9xl,
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsBold,
  },
  loginText: {
    fontSize: 26,
    color: Color.colorBlack,
    fontFamily: FontFamily.kanitMedium,
  },
  inputView: {
    marginTop: 50,
    flexDirection: 'row',
    width: '80%',
    borderBottomWidth: 1,
    borderColor: '#d5d5d5',
    marginBottom: 25,
    alignSelf: 'center',
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    fontFamily: FontFamily.kanitRegular,
    color: 'black',
    paddingLeft: 10,
  },
  icon: {
    padding: 10,
  },
  loginBtn: {
    width: 200,
    backgroundColor: '#ED6C30',
    borderRadius: 44,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    alignSelf: 'center',
  },
  loginTextBtn: {
    fontSize: 16,
    color: Color.colorWhite,
    fontFamily: FontFamily.kanitMedium,
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  accountText: {
    color: '#B7B3B3',
    fontSize: 14,
    marginLeft: 40,
  },
  signupText: {
    color: '#ED6C30',
    fontSize: 16,
    fontFamily: FontFamily.kanitMedium,
  },
  topImage: {
    width: 153,
    height: 172,
    left: 260,
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 127,
    height: 120,
  },
});

export default ForgotPasswordScreen;

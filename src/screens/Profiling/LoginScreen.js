import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily, FontSize, Color } from '../../assets/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log("Login button pressed");
    console.log("Email entered: ", email);
    console.log("Password entered: ", password);

    if (!email || !password) {
      console.log("Email or password is empty");
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    console.log("Attempting Firebase login");

    // Firebase authentication logic using modular SDK
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successful login
        const user = userCredential.user;
        console.log("Login successful, user UID: ", user.uid);
        navigation.navigate('ProfileScreen'); // Navigate to ProfileScreen on success
      })
      .catch((error) => {
        // Handle errors here
        console.error("Login failed: ", error.message);
        Alert.alert("Login Error", error.message); // Display error message
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/TopImage.png")} style={styles.topImage} />
      <View style={styles.textContainer}>
        <Text style={styles.richText}>
          <Text style={styles.bText}>B</Text>
          <Text style={styles.orderText}>ORDER</Text>
          <Text style={styles.BText}>B</Text>
          <Text style={styles.uddyText}>UDDY</Text>
        </Text>
        <Text style={styles.loginText}>Login</Text>
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
      <View style={styles.inputView}>
        <Icon name="lock" size={24} color="#ED6C30" style={styles.icon} />
        <TextInput
          secureTextEntry={!showPassword}
          style={styles.inputText}
          placeholder="Enter Password"
          placeholderTextColor="#d5d5d5"
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "visibility" : "visibility-off"} size={24} color="#d5d5d5" style={styles.iconRight} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginTextBtn}>Login</Text>
      </TouchableOpacity>
      <View style={styles.rowContainer}>
        <View style={styles.rememberMeContainer}>
          <TouchableOpacity style={styles.checkbox} onPress={() => setRememberMe(!rememberMe)}>
            {rememberMe ? (
              <Icon name="check-box" size={24} color="green" />
            ) : (
              <Icon name="check-box-outline-blank" size={24} color="#B7B7B7" />
            )}
          </TouchableOpacity>
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.accountContainer}>
        <Text style={styles.accountText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.signupText}>Sign Up</Text>
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
  iconRight: {
    padding: 10,
  },
  loginBtn: {
    width: 200,
    backgroundColor: '#ED6C30',
    borderRadius: 44,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 46,
    marginBottom: 10,
    alignSelf: 'center',
  },
  loginTextBtn: {
    fontSize: 16,
    color: Color.colorWhite,
    fontFamily: FontFamily.kanitMedium,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    marginRight: 10,
  },
  rememberMeText: {
    fontSize: 14,
    fontFamily: FontFamily.kanitRegular,
    color: "#999999",
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#ED6C30',
    fontSize: 16,
    fontFamily: FontFamily.kanitMedium,
  },
  accountText: {
    marginTop: 20,
    color: '#B7B3B3',
    fontSize: 16,
    marginLeft: 40,
  },
  signupText: {
    marginTop: 20,
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
    bottom: -20,
    left: 0,
    width: 127,
    height: 120,
  },
});

export default LoginScreen;

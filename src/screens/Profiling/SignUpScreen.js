import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily, FontSize, Color } from '../../assets/GlobalStyles';
import { auth, db } from '../../firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    console.log("Sign up process started");
    
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      console.log("Password mismatch");
      return;
    }

    console.log("Creating user with email: ", email);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("User created with UID: ", user.uid);

        // Add user to Firestore
        try {
          await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email
          });
          console.log("User data stored in Firestore for UID: ", user.uid);
          Alert.alert("Account created and data stored!");
          navigation.navigate('LoginScreen');
        } catch (e) {
          console.error("Error adding document: ", e.message);
          Alert.alert("Error adding document: ", e.message);
        }
      })
      .catch((error) => {
        console.error("Error creating user: ", error.message);
        Alert.alert(error.message);
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
        <Text style={styles.loginText}>Sign Up</Text>
      </View>
      <View style={styles.inputView}>
        <Icon name="person" size={24} color="#ED6C30" style={styles.icon} />
        <TextInput
          style={styles.inputText}
          placeholder="Enter Name"
          placeholderTextColor="#d5d5d5"
          onChangeText={(text) => setName(text)}
        />
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
      <View style={styles.inputView}>
        <Icon name="lock" size={24} color="#ED6C30" style={styles.icon} />
        <TextInput
          secureTextEntry={!showConfirmPassword}
          style={styles.inputText}
          placeholder="Confirm Password"
          placeholderTextColor="#d5d5d5"
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Icon name={showConfirmPassword ? "visibility" : "visibility-off"} size={24} color="#d5d5d5" style={styles.iconRight} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
        <Text style={styles.loginTextBtn}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.accountContainer}>
        <Text style={styles.accountText}>Already have an account? </Text>
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
    marginBottom: 10,
    marginTop: 20,
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
    marginBottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    fontFamily: FontFamily.KanitRegular,
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
    marginTop: 29,
    marginBottom: 10,
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
    marginLeft: 50,
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
    bottom: -20,
    left: 0,
    width: 127,
    height: 120,
  },
});

export default SignUpScreen;

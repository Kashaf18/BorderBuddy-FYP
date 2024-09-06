
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily, FontSize, Color } from '../../assets/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';
import { auth, db, storage } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

const BackArrow = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    <Ionicons style={styles.backIcon} name="chevron-back" size={35} color="black" />
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingContactNumber, setEditingContactNumber] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        console.log("Current user:", user); // Log current user
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log("Fetched user data:", userData); // Log fetched data
            setUsername(userData.name || '');
            setEmail(userData.email || '');
            setContactNumber(userData.contactNumber || '');
            setAddress(userData.address || '');
            setProfilePicture(userData.profilePicture || null);
          } else {
            console.log("No user data found"); // Log when no data is found
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error); // Log error
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("Image picker permission status:", status); // Log permission status
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access gallery is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("Image picker result:", result); // Log selected image result

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const uploadImageToFirebase = async () => {
    if (!profilePicture) return null;

    const user = auth.currentUser;
    if (!user) return null;

    try {
      const response = await fetch(profilePicture);
      const blob = await response.blob();
      console.log("Uploading image to Firebase"); // Log before uploading

      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      console.log("Image uploaded successfully, URL:", downloadURL); // Log the download URL
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error); // Log upload error
      return null;
    }
  };

  const handleSaveChanges = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const profilePictureURL = await uploadImageToFirebase();
        console.log("Profile picture URL:", profilePictureURL); // Log picture URL or null

        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, {
          name: username,
          email,
          contactNumber,
          address,
          profilePicture: profilePictureURL || profilePicture, // Use existing if upload fails
        });

        Alert.alert('Success', 'Your profile has been updated.');
        console.log("Profile updated successfully"); // Log successful update
        setEditingUsername(false);
        setEditingEmail(false);
        setEditingContactNumber(false);
        setEditingAddress(false);
      }
    } catch (error) {
      console.error("Error updating user data:", error); // Log update error
      Alert.alert('Error', 'An error occurred while updating your profile.');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../../assets/images/TopImage.png")} style={styles.topImage} />
      </View>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={profilePicture ? { uri: profilePicture } : require("../../assets/images/profilePicture.jpeg")} 
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.profileName}>{username || 'Username'}</Text>
        <Text style={styles.profileRating}>⭐ (4.5)</Text>
        <View style={styles.statsContainer}>
          <View style={[styles.stat, styles.statWithBorder]}>
            <Text style={styles.statLabel}>Deals</Text>
            <Text style={styles.statValue}>02</Text>
          </View>
          <View style={[styles.stat, styles.statWithBorder]}>
            <Text style={styles.statLabel}>Shipments</Text>
            <Text style={styles.statValue}>25</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Trips</Text>
            <Text style={styles.statValue}>12</Text>
          </View>
        </View>
      </View>
      {/* Username */}
      <View style={styles.inputContainer}>
        <Icon name="person" size={24} color="#ED6C30" style={styles.icon} marginLeft={-20} />
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#B2B2B2"
          value={username}
          onChangeText={setUsername}
          editable={editingUsername}
        />
        <TouchableOpacity onPress={() => setEditingUsername(!editingUsername)}>
          <Icon name="edit" size={24} color="#ED6C30" style={styles.editIcon} />
        </TouchableOpacity>
      </View>
      {/* Email */}
      <View style={styles.inputContainer}>
        <Icon name="email" size={24} color="#ED6C30" style={styles.icon} />
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#B2B2B2"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={editingEmail}
        />
        <TouchableOpacity onPress={() => setEditingEmail(!editingEmail)}>
          <Icon name="edit" size={24} color="#ED6C30" style={styles.editIcon} />
        </TouchableOpacity>
      </View>
      {/* Contact Number */}
      <View style={styles.inputContainer}>
        <Icon name="phone" size={24} color="#ED6C30" style={styles.icon} />
        <TextInput
          style={styles.inputText}
          placeholder="Contact Number"
          placeholderTextColor="#B2B2B2"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
          editable={editingContactNumber}
        />
        <TouchableOpacity onPress={() => setEditingContactNumber(!editingContactNumber)}>
          <Icon name="edit" size={24} color="#ED6C30" style={styles.editIcon} />
        </TouchableOpacity>
      </View>
      {/* Address */}
      <View style={styles.inputContainer}>
        <Icon name="location-on" size={24} color="#ED6C30" style={styles.icon} />
        <TextInput
          style={styles.inputText}
          placeholder="Address"
          placeholderTextColor="#B2B2B2"
          value={address}
          onChangeText={setAddress}
          editable={editingAddress}
        />
        <TouchableOpacity onPress={() => setEditingAddress(!editingAddress)}>
          <Icon name="edit" size={24} color="#ED6C30" style={styles.editIcon} />
        </TouchableOpacity>
      </View>
      {/* Save Button */}
      {(editingUsername || editingEmail || editingContactNumber || editingAddress || profilePicture) && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      )}
      {/*  Bottom Tab*/ }
       <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Icon name="home" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Icon name="shopping-bag" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Icon name="person" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Icon name="airplanemode-on" size={35} color="#fff" />
        </TouchableOpacity>
      </View> 
    </View>
  );
};




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    topImage: {
      width: 153,
      height: 198,
      marginLeft: 260,
      marginRight: 'auto',
    },
    profileContainer: {
      alignItems: 'center',
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
      marginTop: -80,
    },
    profileName: {
      fontSize: 15,
      fontFamily: FontFamily.interSemiBold,
      color: Color.colorBlack,
      marginBottom: 10,
    },
    profileRating: {
      fontSize: 12,
      fontFamily: FontFamily.poppinsRegular,
      color: Color.colorGray,
      marginBottom: 20,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '80%',
      marginBottom: 20,
    },
    stat: {
      alignItems: 'center',
      flex: 1,
    },
    statWithBorder: {
      borderRightWidth: 1,
      borderColor: '#d5d5d5',
    },
    statLabel: {
      fontSize: 12,
      fontFamily: FontFamily.poppinsRegular,
      color: '#B2B2B2',
    },
    statValue: {
      fontSize: 14,
      fontFamily: FontFamily.interSemiBold,
      color: '#ED6C30',
    },
    inputContainer: {
      flexDirection: 'row',
      width: '80%',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#d5d5d5',
      paddingHorizontal: 10,
      alignSelf: 'center',
      marginBottom: 20,
    },
    icon: {
      padding: 10,
      marginLeft: -20,
    },
    inputText: {
      flex: 1,
      fontSize: 14,
      fontFamily: FontFamily.kanitRegular,
      color: 'black',
    },
    saveButton: {
      width: 200,
      backgroundColor: '#ED6C30',
      borderRadius: 44,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 20,
    },
    saveButtonText: {
      fontSize: 16,
      color: '#fff',
      fontFamily: FontFamily.poppinsMedium,
    },
    bottomTab: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#ED6C30',
      borderRadius: 44,
      height: 71,
      width: 370,
      alignItems: 'center',
      marginVertical: 30,
      marginLeft: 20,
      marginHorizontal: 40,
      position: 'absolute',
      bottom: -10,
    },
    tabButton: {
      alignItems: 'center',
    },
    backButton: {
      margin: 10,
    },
    backIcon: {
      marginLeft: 10,
    },
    editIcon: {
      color: "#979493",
      marginLeft: 10,
    },
  });
  
  export default ProfileScreen;
  export { BackArrow };
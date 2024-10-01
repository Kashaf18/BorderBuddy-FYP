import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import * as DocumentPicker from 'expo-document-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as Location from 'expo-location';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; 
import { FontFamily, Color } from '../../assets/GlobalStyles'; 
import LocationPicker from './LocationPicker';

const BackArrow = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <Image source={require('../../assets/images/back-icon.png')} style={styles.backIcon} />
    </TouchableOpacity>
  );
};

const ReportTheft = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [stolenItems, setStolenItems] = useState('');
  const [description, setDescription] = useState('');
  const [document, setDocument] = useState(null);
  const [location, setLocation] = useState('');
  const [isLocationPickerVisible, setLocationPickerVisible] = useState(false);

  // Show/Hide Date Picker
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirmDate = (date) => {
    setDate(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  // Show/Hide Time Picker
  const showTimePicker = () => setIsTimePickerVisible(true);
  const hideTimePicker = () => setIsTimePickerVisible(false);
  const handleConfirmTime = (time) => {
    setTime(moment(time).format('HH:mm'));
    hideTimePicker();
  };

  // Upload document to Firebase Storage
  const uploadDocumentToStorage = async (file) => {
    const storage = getStorage();
    const fileName = `document_${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `documents/${fileName}`);
    const response = await fetch(file.uri);
    const blob = await response.blob();
    const snapshot = await uploadBytes(storageRef, blob);
    return await getDownloadURL(snapshot.ref);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });
      if (result.assets && result.assets.length > 0) {
        setDocument(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick a document.');
    }
  };

  const handleReportTheft = async () => {
    if (!date || !time || !location || !stolenItems || !description || !document) {
      Alert.alert('Error', 'Please fill all fields and attach a document.');
      return;
    }
    try {
      const documentURL = await uploadDocumentToStorage(document);
      const reportData = { date, time, location, stolenItems, description, documentURL };

      // Add the theft report to Firestore and get the document ID
      const docRef = await addDoc(collection(db, 'theftReports'), reportData);
      
      console.log('Document written with ID: ', docRef.id);

      // Navigate to the GenerateReport screen and pass the document ID
      navigation.navigate('GenerateReport', { docId: docRef.id });

      Alert.alert('Success', 'Theft report submitted successfully.');
    } catch (error) {
      Alert.alert('Error', `Failed to submit the report: ${error.message}`);
    }
  };

  const handleLocationSelect = async (selectedLocation) => {
    try {
      const { latitude, longitude } = selectedLocation;
      const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (reverseGeocode.length > 0) {
        const address = `${reverseGeocode[0].name || ''}, ${reverseGeocode[0].street || ''}, ${reverseGeocode[0].city || ''}, ${reverseGeocode[0].country || ''}`;
        setLocation(address);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch location details.');
    }
  };

  return (
    <View style={styles.container}>
      <BackArrow navigation={navigation} />
      <Image source={require("../../assets/images/TopImage.png")} style={styles.topImage} />
      <Text style={styles.title}>Report Theft</Text>

      {/* Date Picker */}
      <TouchableOpacity onPress={showDatePicker} style={styles.inputContainer}>
        <Icon name="event" size={24} color="#ED6C30" style={styles.icon} />
        <Text style={[styles.inputText, !date ? styles.placeholderText : styles.selectedText]}>
          {date || 'Select Date'}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirmDate} onCancel={hideDatePicker} />

      {/* Time Picker */}
      <TouchableOpacity onPress={showTimePicker} style={styles.inputContainer}>
        <Icon name="access-time" size={24} color="#ED6C30" style={styles.icon} />
        <Text style={[styles.inputText, !time ? styles.placeholderText : styles.selectedText]}>
          {time || 'Select Time'}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal isVisible={isTimePickerVisible} mode="time" onConfirm={handleConfirmTime} onCancel={hideTimePicker} />

      {/* Location Input */}
      <TouchableOpacity onPress={() => setLocationPickerVisible(true)} style={styles.inputContainer}>
        <Icon name="location-on" size={24} color="#ED6C30" style={styles.icon} />
        <Text style={[styles.inputText, !location ? styles.placeholderText : styles.selectedText]}>
          {location || 'Select Location'}
        </Text>
      </TouchableOpacity>

      <LocationPicker visible={isLocationPickerVisible} onClose={() => setLocationPickerVisible(false)} onLocationSelect={handleLocationSelect} />

      {/* Stolen Items Input */}
      <View style={styles.inputContainer}>
        <Icon name="inventory" size={24} color="#ED6C30" style={styles.icon} />
        <TextInput style={styles.inputText} placeholder="Stolen Items" onChangeText={setStolenItems} value={stolenItems} />
      </View>

      {/* Description Input */}
      <View style={styles.descriptionContainer}>
        <Icon name="description" size={24} color="#ED6C30" style={styles.descriptionIcon} />
        <TextInput
          style={styles.descriptionInput}
          placeholder="Description of incident..."
          onChangeText={setDescription}
          value={description}
          multiline
        />
      </View>

      {/* Attach Documents */}
      <Text style={styles.attachText}>Attach Documents</Text>
      <TouchableOpacity onPress={pickDocument} style={styles.uploadContainer}>
        <Icon name="cloud-upload" size={40} color="#ED6C30" />
        <Text style={styles.uploadText}>
          {document ? document.name : 'Browse and upload'}
        </Text>
      </TouchableOpacity>

      {/* Report Button */}
      <TouchableOpacity onPress={handleReportTheft} style={styles.reportButton}>
        <Text style={styles.reportButtonText}>Report Theft</Text>
      </TouchableOpacity>

      {/* Bottom Tab */}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Icon name="home" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ShopScreen')}>
          <Icon name="shopping-bag" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('TripsDashboard')}>
          <Icon name="luggage" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('MessagesScreen')}>
          <Icon name="email" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Icon name="person" size={35} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};



 
  



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  topImage: {
    width: 153,
    height: 198,
    marginLeft: 260,
    marginRight: 'auto',
},
backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginBottom: 5,
},
backButton: {
    padding: 10,
    position: 'absolute',
    top: 100, 
    left: 20,
    marginBottom: 5,
},
  title: {

    fontSize: 24,
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorBlack,
    textAlign: 'center',
    marginVertical: 20,
    marginTop: -95,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#d5d5d5',
   // marginBottom: 20,
   // paddingHorizontal: 10,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 2, 
  },
  icon: {
    padding: 10,
  },
  descriptionIcon: {
    padding: 10,
    marginTop: -50,
    marginLeft: -8,
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    fontFamily: FontFamily.kanitRegular,
    color: 'black',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 10,
    height: 100,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  descriptionInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: FontFamily.kanitRegular,
    color: 'black',
    textAlignVertical: 'top',
    marginTop: -50,
  },
  attachText: {
    fontSize: 14,
    fontFamily: FontFamily.kanitMedium,
    marginBottom: 10,
    marginTop: -7,
    color: '#C0C0C0',
    alignSelf: 'center',
    width: '85%',
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: '#d5d5d5',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
    width: '90%',
  },
  uploadText: {
    fontSize: 14,
    fontFamily: FontFamily.kanitMedium,
    color: '#C0C0C0',
    marginTop: 10,
  },
  reportButton: {
    width: '60%',
    backgroundColor: '#ED6C30',
    borderRadius: 44,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 9,
  },
  reportButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: FontFamily.kanitMedium,
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ED6C30',
    borderRadius: 44,
    height: 71,
    width: 370,
    alignItems: 'center',
    marginVertical: 20,
    marginLeft: 20,
    marginHorizontal: 40,
    position: 'absolute', 
    bottom: -10,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  placeholderText: {
    fontSize: 14,
    fontFamily: FontFamily.kanitRegular,
    color: '#8F8D8D',
   // marginTop:10,
  },
  selectedText: {
    fontSize: 14,
    fontFamily: FontFamily.kanitRegular,
    color: 'black',
  
},
});

export default ReportTheft;
export { BackArrow }; 
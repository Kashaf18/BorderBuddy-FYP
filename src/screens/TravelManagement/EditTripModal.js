import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList,Color } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import moment from 'moment';

const BackArrow = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <Image source={require('../../assets/images/back-icon.png')} style={styles.backIcon} />
    </TouchableOpacity>
  );
};

const EditTripModal = ({ route, navigation }) => {
  const [tripData, setTripData] = useState(null);
  const [fromLocation, setFromLocation] = useState(''); 
  const [toLocation, setToLocation] = useState(''); 
  const [fromCountrySuggestions, setFromCountrySuggestions] = useState([]);
  const [fromCitySuggestions, setFromCitySuggestions] = useState([]);
  const [toCountrySuggestions, setToCountrySuggestions] = useState([]);
  const [toCitySuggestions, setToCitySuggestions] = useState([]);
  const [availableWeight, setAvailableWeight] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [categories, setCategories] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const { tripId } = route.params;

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const tripRef = doc(db, 'trips', tripId);
        const tripDoc = await getDoc(tripRef);
        if (tripDoc.exists()) {
          const data = tripDoc.data();
          setTripData(data);
          setFromLocation(data.fromLocation || '');
          setToLocation(data.toLocation || '');
          setAvailableWeight(data.availableWeight || '');
          setDepartureDate(data.departureDate || '');
          setDepartureTime(data.departureTime || '');
          setFirstName(data.firstName || '');
          setLastName(data.lastName || '');
          setCategories(data.categories || '');
          setAdditionalInfo(data.additionalInfo || '');
        }
      } catch (error) {
        console.error('Error fetching trip data: ', error);
      }
    };

    fetchTripData();
  }, [tripId]);

  const handleSaveTrip = async () => {
    if (!fromLocation || !toLocation || !availableWeight || !departureDate || !departureTime || !firstName || !lastName || !categories) {
      alert('Please fill all the input fields');
      return;
    }

    try {
      const updatedTripData = {
        fromLocation,
        toLocation,
        availableWeight,
        departureDate,
        departureTime,
        firstName,
        lastName,
        categories,
        additionalInfo,
      };

      const tripRef = doc(db, 'trips', tripId);
      await setDoc(tripRef, updatedTripData);

      navigation.navigate('TripsDashboard');
      alert('Trip updated successfully!');
    } catch (error) {
      console.error('Error updating trip: ', error);
      alert('Failed to update trip, please try again.');
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDepartureDate(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setIsTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setIsTimePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    setDepartureTime(moment(time).format('HH:mm'));
    hideTimePicker();
  };

  const fetchPlaces = async (input) => {
    try {
      const username = "laibasaleem";
      const response = await axios.get(`http://api.geonames.org/searchJSON?username=${username}&q=${input}&maxRows=10&style=SHORT`);
      return response.data.geonames;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return [];
    }
  };

  const renderSuggestion = ({ item }, setFunction, clearSuggestions, type = 'country') => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (type === 'city') {
            setFunction((prev) => `${prev}, ${item.name}`);
          } else {
            setFunction(item.name);
          }
          clearSuggestions([]);
        }}
        style={styles.suggestionItem}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const categoryOptions = [
    { label: 'Electronics - Other', value: '1' },
    { label: 'Electronics - Mobile & Tablets', value: '2' },
    { label: 'Electronics - Laptop', value: '3' },
    { label: 'Cosmetics', value: '4' },
    { label: 'Clothing', value: '5' },
    { label: 'Shoes & Bags', value: '6' },
    { label: 'Watches & Sunglasses', value: '7' },
    { label: 'Dietary Supplements - Other', value: '8' },
    { label: 'Dietary Supplements - Vitamins', value: '9' },
    { label: 'Food & Beverages', value: '10' },
    { label: 'Books', value: '11' },
    { label: 'Kids Toys', value: '12' },
    { label: 'Child Care', value: '13' },
    { label: 'Others', value: '14' },
  ];

  if (!tripData) return null; 

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <BackArrow navigation={navigation} />
          <Image source={require("../../assets/images/TopImage.png")} style={styles.topImage} />
        </View>
        <Text style={styles.heading}>Edit Trip</Text>

        {/* From Location (Country + City) */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="flight-takeoff" size={24} color="#ED6C30" style={styles.icon} />
          <TextInput
            value={fromLocation}
            onChangeText={async (text) => {
              setFromLocation(text);
              if (text.length > 2) {
                const places = await fetchPlaces(text);
                setFromCountrySuggestions(places);
              } else {
                setFromCountrySuggestions([]);
              }
            }}
            placeholder="From (Country, City)"
            placeholderTextColor="#8F8D8D"
            style={styles.inputText}
          />
        </View>

        {/* Suggestions for From Country */}
        {fromCountrySuggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={fromCountrySuggestions}
              renderItem={(item) => renderSuggestion(item, setFromLocation, setFromCountrySuggestions)}
              keyExtractor={(item) => item.geonameId.toString()}
            />
          </View>
        )}

        {/* From City */}
        {fromLocation && !fromLocation.includes(',') && (
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="city" size={24} color="#ED6C30" style={styles.icon} />
            <TextInput
              placeholder="From (City)"
              placeholderTextColor="#8F8D8D"
              onChangeText={async (text) => {
                if (text.length > 2) {
                  const places = await fetchPlaces(text);
                  setFromCitySuggestions(places);
                } else {
                  setFromCitySuggestions([]);
                }
              }}
              style={styles.inputText}
            />
          </View>
        )}

        {/* Suggestions for From City */}
        {fromCitySuggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={fromCitySuggestions}
              renderItem={(item) => renderSuggestion(item, setFromLocation, setFromCitySuggestions, 'city')}
              keyExtractor={(item) => item.geonameId.toString()}
            />
          </View>
        )}

        {/* To Location (Country + City) */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="flight-land" size={24} color="#ED6C30" style={styles.icon} />
          <TextInput
            value={toLocation}
            onChangeText={async (text) => {
              setToLocation(text);
              if (text.length > 2) {
                const places = await fetchPlaces(text);
                setToCountrySuggestions(places);
              } else {
                setToCountrySuggestions([]);
              }
            }}
            placeholder="To (Country, City)"
            placeholderTextColor="#8F8D8D"
            style={styles.inputText}
          />
        </View>

        {/* Suggestions for To Country */}
        {toCountrySuggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={toCountrySuggestions}
              renderItem={(item) => renderSuggestion(item, setToLocation, setToCountrySuggestions)}
              keyExtractor={(item) => item.geonameId.toString()}
            />
          </View>
        )}

        {/* To City */}
        {toLocation && !toLocation.includes(',') && (
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="city" size={24} color="#ED6C30" style={styles.icon} />
            <TextInput
              placeholder="To (City)"
              placeholderTextColor="#8F8D8D"
              onChangeText={async (text) => {
                if (text.length > 2) {
                  const places = await fetchPlaces(text);
                  setToCitySuggestions(places);
                } else {
                  setToCitySuggestions([]);
                }
              }}
              style={styles.inputText}
            />
          </View>
        )}

        {/* Suggestions for To City */}
        {toCitySuggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={toCitySuggestions}
              renderItem={(item) => renderSuggestion(item, setToLocation, setToCitySuggestions, 'city')}
              keyExtractor={(item) => item.geonameId.toString()}
            />
          </View>
        )}

        {/* Weight */}
        <View style={styles.inputContainer}>
          <AntDesign name="weightl" size={24} color="#ED6C30" style={styles.icon} />
          <TextInput
            value={availableWeight}
            onChangeText={setAvailableWeight}
            placeholder="Available Weight"
            placeholderTextColor="#8F8D8D"
            keyboardType="numeric"
            style={styles.inputText}
          />
        </View>

        {/* Departure Date */}
        <TouchableOpacity onPress={showDatePicker} style={styles.dateContainer}>
          <MaterialIcons name="calendar-today" size={24} color="#ED6C30" style={styles.icon} />
          <Text style={styles.dateText}>{departureDate || 'Departure Date'}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        {/* Departure Time */}
        <TouchableOpacity onPress={showTimePicker} style={styles.dateContainer}>
          <MaterialCommunityIcons name="clock" size={24} color="#ED6C30" style={styles.icon} />
          <Text style={styles.dateText}>{departureTime || 'Departure Time'}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />

        {/* First Name */}
        <View style={styles.inputContainer}>
          <FontAwesome6 name="user" size={24} color="#ED6C30" style={styles.icon} />
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
            placeholderTextColor="#8F8D8D"
            style={styles.inputText}
          />
        </View>

        {/* Last Name */}
        <View style={styles.inputContainer}>
          <FontAwesome6 name="user" size={24} color="#ED6C30" style={styles.icon} />
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name"
            placeholderTextColor="#8F8D8D"
            style={styles.inputText}
          />
        </View>

        {/* Categories */}
        <View style={styles.inputContainer}>
          <AntDesign name="tags" size={24} color="#ED6C30" style={styles.icon} />
          <Dropdown
            data={categoryOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Category"
            value={categories}
            onChange={(item) => setCategories(item.value)}
            style={styles.dropdown}
            selectedTextStyle={styles.dropdownText}
            iconStyle={styles.dropdownIcon}
          />
        </View>

        {/* Additional Info */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="info-outline" size={24} color="#ED6C30" style={styles.icon} />
          <TextInput
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
            placeholder="Additional Info"
            placeholderTextColor="#8F8D8D"
            style={[styles.inputText, styles.additionalInfoInput]}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveTrip}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  inputText: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  suggestionItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionsContainer: {
    maxHeight: 100,
    marginBottom: 10,
  },
  dropdown: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  placeholderStyle: {
    color: '#999',
  },
  selectedTextStyle: {
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#ED6C30',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default EditTripModal;

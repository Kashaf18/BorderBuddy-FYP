import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditTripModal = ({ visible, onClose, tripId, tripData, onSave }) => {
  const [fromCountry, setFromCountry] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [toCountry, setToCountry] = useState('');
  const [toCity, setToCity] = useState('');
  const [availableWeight, setAvailableWeight] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [categories, setCategories] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [fromCountrySuggestions, setFromCountrySuggestions] = useState([]);
  const [fromCitySuggestions, setFromCitySuggestions] = useState([]);
  const [toCountrySuggestions, setToCountrySuggestions] = useState([]);
  const [toCitySuggestions, setToCitySuggestions] = useState([]);

  useEffect(() => {
    if (tripData) {
      if (tripData.fromLocation) {
        const [country, city] = tripData.fromLocation.split(', ');
        setFromCountry(country || '');
        setFromCity(city || '');
      }
      if (tripData.toLocation) {
        const [country, city] = tripData.toLocation.split(', ');
        setToCountry(country || '');
        setToCity(city || '');
      }

      setAvailableWeight(tripData.availableWeight ? tripData.availableWeight.toString() : '');
      setDepartureDate(tripData.departureDate || '');
      setDepartureTime(tripData.departureTime || '');
      setCategories(tripData.categories || '');
      setAdditionalInfo(tripData.additionalInfo || '');
    }
  }, [tripData]);

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

  const handleSave = async () => {
    try {
      if (!fromCountry || !fromCity || !toCountry || !toCity || !availableWeight || !departureDate || !departureTime || !categories) {
        alert('Please fill in all required fields.');
        return;
      }

      const updatedData = {
        fromLocation: `${fromCountry}, ${fromCity}`,
        toLocation: `${toCountry}, ${toCity}`,
        availableWeight: Number(availableWeight) || 0,
        departureDate: departureDate || '',
        departureTime: departureTime || '',
        categories: categories || '',
        additionalInfo: additionalInfo || '',
      };

      const tripRef = doc(db, 'trips', tripId);
      await updateDoc(tripRef, updatedData);

      alert('Trip updated successfully!');
      onSave(tripId, updatedData); // Pass tripId along with updatedData
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error('Error updating trip: ', error);
      alert('Failed to update trip, please try again.');
    }
  };

  const renderSuggestion = ({ item }, setFunction, clearSuggestions) => (
    <TouchableOpacity
      onPress={() => {
        setFunction(item.name);
        clearSuggestions([]);
      }}
      style={styles.suggestionItem}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setDepartureDate(moment(currentDate).format('DD/MM/YYYY'));
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || new Date();
    setShowTimePicker(false);
    setDepartureTime(moment(currentTime).format('HH:mm'));
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

  const renderInput = (value, setter, placeholder, icon, suggestions, suggestionSetter) => (
    <View>
      <View style={styles.inputContainer}>
        {icon}
        <TextInput
          value={value}
          onChangeText={async (text) => {
            setter(text);
            if (text.length > 2) {
              const places = await fetchPlaces(text);
              suggestionSetter(places);
            } else {
              suggestionSetter([]);
            }
          }}
          placeholder={placeholder}
          style={styles.inputText}
        />
      </View>
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          renderItem={(item) => renderSuggestion(item, setter, suggestionSetter)}
          keyExtractor={(item) => item.geonameId.toString()}
          style={styles.suggestionsContainer}
        />
      )}
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Trip</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderInput(fromCountry, setFromCountry, "From Country", <Icon name="flight-takeoff" size={24} color="#ED6C30" style={styles.icon} />, fromCountrySuggestions, setFromCountrySuggestions)}
            {renderInput(fromCity, setFromCity, "From City", <MaterialCommunityIcons name="city" size={24} color="#ED6C30" style={styles.icon} />, fromCitySuggestions, setFromCitySuggestions)}
            {renderInput(toCountry, setToCountry, "To Country", <Icon name="flight-land" size={24} color="#ED6C30" style={styles.icon} />, toCountrySuggestions, setToCountrySuggestions)}
            {renderInput(toCity, setToCity, "To City", <MaterialCommunityIcons name="city" size={24} color="#ED6C30" style={styles.icon} />, toCitySuggestions, setToCitySuggestions)}

            {/* Available Weight Field */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="weight-kilogram" size={24} color="#ED6C30" style={styles.icon} />
              <TextInput
                value={availableWeight}
                onChangeText={setAvailableWeight}
                placeholder="Available Weight (kg)"
                style={styles.inputText}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputContainer}>
              <Icon name="calendar-today" size={24} color="#ED6C30" style={styles.icon} />
              <Text style={[styles.inputText, { color: departureDate ? '#333' : '#999' }]}>{departureDate || 'Select Departure Date'}</Text>
            </TouchableOpacity>

            {/* Date Picker */}
            {showDatePicker && (
              <DateTimePicker
                value={departureDate ? new Date(moment(departureDate, 'DD/MM/YYYY').toDate()) : new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.inputContainer}>
              <Icon name="access-time" size={24} color="#ED6C30" style={styles.icon} />
              <Text style={[styles.inputText, { color: departureTime ? '#333' : '#999' }]}>{departureTime || 'Select Departure Time'}</Text>
            </TouchableOpacity>

            {/* Time Picker */}
            {showTimePicker && (
              <DateTimePicker
                value={departureTime ? new Date(moment(departureTime, 'HH:mm').toDate()) : new Date()}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}

            {/* Category Field with Icon */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="format-list-checks" size={24} color="#ED6C30" style={styles.icon} />
              <Dropdown
                data={categoryOptions}
                labelField="label"
                valueField="value"
                value={categories}
                onChange={(item) => setCategories(item.value)}
                style={styles.dropdown}
                placeholder="Select Category"
              />
            </View>

            {/* Additional Information Field with Icon */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="note-text" size={24} color="#ED6C30" style={styles.icon} />
              <TextInput
                value={additionalInfo}
                onChangeText={setAdditionalInfo}
                placeholder="Additional Information"
                style={styles.inputText}
               
              />
            </View>
            

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
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
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
    borderRadius: 44,
    paddingVertical: 10,
    alignItems: 'center',
    width: 200,
    height: 40,
   marginTop: 5,
   alignSelf: 'center',
  },
  
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditTripModal;
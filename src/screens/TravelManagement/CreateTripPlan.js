import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AntDesign, MaterialIcons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { FontFamily, Color } from '../../assets/GlobalStyles';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'; 


const BackArrow = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <Image source={require('../../assets/images/back-icon.png')} style={styles.backIcon} />
    </TouchableOpacity>
  );
};

const CreateTripPlan = ({ navigation }) => {
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
  
return (
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <BackArrow navigation={navigation} />
        <Image source={require("../../assets/images/TopImage.png")} style={styles.topImage} />
      </View>
      <Text style={styles.heading}>Trip Details</Text>

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

       

      {/* From City  */}
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

        {/* To City  */}
        {toLocation && !toLocation.includes(',') && (
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="city" size={24} color="#ED6C30" style={styles.icon} />
            <TextInput
             style={styles.inputText}
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

        {/* Available Weight */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="weight-kilogram" size={24} color="#ED6C30" style={styles.icon} />
          <TextInput
            style={styles.inputText}
            placeholder="Available Weight"
            value={availableWeight}
            onChangeText={setAvailableWeight}
            keyboardType="numeric"
          />
        </View>

        
         {/* Departure Date */}
         <TouchableOpacity onPress={showDatePicker} style={styles.inputContainer}>
          
          <Icon name="event" size={24} color="#ED6C30" style={styles.icon} />
          <TextInput
            value={departureDate}
            placeholder="Departure Date"
            placeholderTextColor="#8F8D8D"
            style={styles.inputText}
            editable={false}
          />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

{/* Departure Time */}
<View style={styles.inputContainer}>
  <Icon name="access-time" size={24} color="#ED6C30" style={styles.icon} />
  <TouchableOpacity onPress={showTimePicker} style={styles.inputText}>
    <Text
      style={[
        styles.inputText,styles.textAlignCenter,
        !departureTime ? styles.placeholderText : styles.selectedText
      ]}
    >
      {departureTime || 'Departure Time'}
    </Text>
  </TouchableOpacity>
</View>

        {/* Time Picker Modal */}
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
        {/* First Name */}
        <View style={styles.inputContainer}>
          <Icon name="person" size={24} color="#ED6C30" style={styles.icon} />
          <TextInput
            style={styles.inputText}
            placeholder="First Name (on booking card)"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        {/* Last Name */}
        <View style={styles.inputContainer}>
          <Icon name="person" size={24} color="#ED6C30" style={styles.icon} />
          <TextInput
            style={styles.inputText}
            placeholder="Last Name (on booking card)"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        {/* Categories */}
        <View style={styles.pickerContainer}>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={categoryOptions}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select item you don’t want to carry"
                            searchPlaceholder="Search..."
                            value={categories}
                            onChange={item => setCategories(item.value)}
                            renderLeftIcon={() => (
                              <Icon name="category" size={24} color="#ED6C30" style={styles.categoryIcon} />
                            )}
                        />
                    </View>
        {/* Additional Info */}
        <View style={styles.additionalInfoContainer}>
          <TextInput
            style={styles.additionalInfoText}
            placeholder="Additional info"
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
            multiline
          />
        </View>
        {/* Add Trip Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('TripsDashboard')}>
          <Text style={styles.addButtonText}>Add Trip</Text>
        </TouchableOpacity>
        </ScrollView>

      {/* Bottom Tab */}
      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabButton}>
          <Icon name="home" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Icon name="shopping-bag" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Icon name="luggage" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Icon name="email" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Icon name="person" size={35} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
      
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
    marginBottom: 0, 
  },
  textAlignCenter: {
  textAlignVertical: 'center',
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
    top: 90, 
    left: 10,
    marginBottom: 5,
  },
  topImage: {
    width: 153,
    height: 198,
    marginLeft: 260,
    marginRight: 'auto',
    marginTop: 20, 
  },
  heading: {
    fontSize: 24,
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorBlack,
    textAlign: 'center',
    marginVertical: 20,
    marginTop: -110,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#d5d5d5',
    paddingHorizontal: 10,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 2, 
  },

 
  icon: {
    padding: 10,
    marginLeft: -20,
  },
  categoryIcon: {
    padding: 10,
    marginLeft: -10,
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    fontFamily: FontFamily.kanitRegular,
    color: 'black',
  },
  
  additionalInfoContainer: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  additionalInfoText: {
    fontSize: 14,
    fontFamily: FontFamily.kanitRegular,
    color: 'black',
  },
  addButton: {
    backgroundColor: '#ED6C30',
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 40,
    width: 200,
    height: 40,
   marginTop: 20,
   marginBottom: 15,
   alignSelf: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: Color.colorWhite,
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
  },
  editIcon: {
    color: "#979493"
  },
  kgText: {
    fontSize: 14,
    color: '#FFFDFD',
    marginLeft: -30,
  },
  dropdownIcon: {
    position: 'absolute',
    right: 10,
  },
  dropdownContainer: {
    position: 'absolute',
    bottom: 100, 
    right: 20, 
    backgroundColor: '#fff',
    borderColor: '#d5d5d5',
    borderWidth: 1,
    borderRadius: 5,
    maxHeight: 150,
    overflow: 'scroll',
    zIndex: 1
  },
  
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
  },
  pickerContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        width: '80%',
        alignItems: 'center',
        paddingHorizontal: 3,
        alignSelf: 'center',
     
    },
    dropdown: {
        flex: 1,
        borderBottomColor: '#CFCFCF',
        borderBottomWidth: 1,
    },
    
    placeholderStyle: {
        color: '#8F8D8D',
        fontSize: 14,
        fontFamily: FontFamily.kanitRegular,
     
    },
    selectedTextStyle: {
        fontSize: 14,
        fontFamily: FontFamily.kanitRegular,
        color: 'black',
      
    },
    inputSearchStyle: {
        color: '#8F8D8D',
        fontSize: 14,
        fontFamily: FontFamily.kanitRegular,
    },
    formContainer: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        width: 336,
      
      },

  
  suggestionsContainer: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 5,
    marginTop: 5,
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  
});

export default CreateTripPlan;
export { BackArrow };


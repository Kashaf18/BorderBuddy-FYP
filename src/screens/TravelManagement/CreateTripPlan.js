import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily, FontSize, Color } from '../../assets/GlobalStyles';

const BackArrow = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <Image source={require('../../assets/images/back-icon.png')} style={styles.backIcon} />
    </TouchableOpacity>
  );
};

const CreateTripPlan = ({ navigation }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [availableWeight, setAvailableWeight] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [categories, setCategories] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility

  // Array of categories for dropdown
  const categoryOptions = ['Electronics', 'Clothing', 'Books', 'Perishables'];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <BackArrow navigation={navigation} />
          <Image source={require("../../assets/images/TopImage.png")} style={styles.topImage} />
        </View>
        <Text style={styles.heading}>Trip Details</Text>
        {/* From */}
        <View style={styles.inputContainer}>
          <Icon name="flight-takeoff" size={24} color="#ED6C30" style={styles.icon} />
          <TextInput
            style={styles.inputText}
            placeholder="From (City, Country)"
            value={from}
            onChangeText={setFrom}
          />
        </View>
        {/* To */}
        <View style={styles.inputContainer}>
          <Icon name="flight-land" size={24} color="#ED6C30" style={styles.icon} />
          <TextInput
            style={styles.inputText}
            placeholder="To (City, Country)"
            value={to}
            onChangeText={setTo}
          />
        </View>
        {/* Available Weight */}
        <View style={styles.inputContainer}>
          <Icon name="work" size={24} color="#ED6C30" style={styles.icon} />
          <TextInput
            style={styles.inputText}
            placeholder="Available Weight"
            value={availableWeight}
            onChangeText={setAvailableWeight}
            keyboardType="numeric"
          />
        </View>
        {/* Departure Date */}
        <View style={styles.inputContainer}>
          <Icon name="event" size={24} color="#ED6C30" style={styles.icon} />
          <TextInput
            style={styles.inputText}
            placeholder="Departure Date"
            value={departureDate}
            onChangeText={setDepartureDate}
          />
        </View>
        {/* Departure Time */}
        <View style={styles.inputContainer}>
          <Icon name="access-time" size={24} color="#ED6C30" style={styles.icon} />
          <TextInput
            style={styles.inputText}
            placeholder="Departure Time"
            value={departureTime}
            onChangeText={setDepartureTime}
          />
        </View>
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
        <View style={styles.inputContainer}>
          <Icon name="category" size={24} color="#ED6C30" style={styles.icon} />
          <TextInput
            style={styles.inputText}
            placeholder="Categories you don’t want to carry"
            value={categories}
            onChangeText={setCategories}
          />
          {/* Dropdown Icon */}
          <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} style={styles.dropdownIcon}>
            <Icon name={showDropdown ? 'arrow-drop-up' : 'arrow-drop-down'} size={24} color="#ED6C30" />
          </TouchableOpacity>
        </View>
        {/* Dropdown */}
        {showDropdown && (
          <View style={styles.dropdownContainer}>
            {categoryOptions.map((category, index) => (
              <TouchableOpacity key={index} style={styles.dropdownItem}>
                <Text>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Trip</Text>
        </TouchableOpacity>
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
      </ScrollView>
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
    marginBottom: 0, // Ensures proper spacing from the top
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginBottom:
    5,
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    top: 90, // Align with the top of the header
    left: 10,
    marginBottom: 5,
  },
  topImage: {
    width: 153,
    height: 198,
    marginLeft: 260,
    marginRight: 'auto',
    marginTop: 20, // Adjust top margin to make room for back arrow
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
    marginBottom: 10, // Add some space between each input container
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
  additionalInfoContainer: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  additionalInfoText: {
    fontSize: 14,
    fontFamily: FontFamily.kanitRegular,
    color: 'black',
  },
  addButton: {
    backgroundColor: '#ED6C30',
    borderRadius: 44,
    height: 54,
    width: 326,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 40,
  },
  addButtonText: {
    fontSize: 20,
    color: Color.colorWhite,
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
    position: 'absolute', // Position the bottom tab at the bottom of the screen
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
    bottom: 100, // Adjust position to appear below the dropdown icon
    right: 20, // Adjust to align with the dropdown icon
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
});

export default CreateTripPlan;
export { BackArrow };
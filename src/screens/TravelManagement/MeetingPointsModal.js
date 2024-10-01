import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';

const MeetingPointsModal = ({ visible, onClose, onSave, toCity, initialMeetingPoints = [], tripId, pickupAvailability, db }) => {
  const [meetingPoints, setMeetingPoints] = useState(initialMeetingPoints.length ? initialMeetingPoints : ['']);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("MeetingPointsModal received tripId:", tripId);
  }, [tripId]);

  const addMeetingPoint = () => {
    setMeetingPoints([...meetingPoints, '']);
  };

  const updateMeetingPoint = (text, index) => {
    const updatedPoints = [...meetingPoints];
    updatedPoints[index] = text;
    setMeetingPoints(updatedPoints);
  };

  const removeMeetingPoint = (index) => {
    const updatedPoints = meetingPoints.filter((_, i) => i !== index);
    setMeetingPoints(updatedPoints);
  };

  const handleDone = async () => {
    const validPoints = meetingPoints.filter(point => point.trim() !== '');
    if (validPoints.length > 0) {
        try {
            console.log("Attempting to update trip with ID:", tripId);
            
            if (!tripId) {
                throw new Error('Invalid tripId');
            }

            const tripRef = doc(db, 'trips', tripId);

            let updateData = {
                meetingPoints: validPoints, // Only update meeting points
            };

            // Include pickupAvailability if it exists
            if (pickupAvailability && pickupAvailability.fromDate && pickupAvailability.toDate) {
                updateData.pickupAvailability = {
                    fromDate: Timestamp.fromDate(new Date(pickupAvailability.fromDate)),
                    toDate: Timestamp.fromDate(new Date(pickupAvailability.toDate))
                };
            }

            console.log("Update data:", updateData);

            await updateDoc(tripRef, updateData);

            console.log('Trip data updated successfully');
            onSave(validPoints);
            onClose();

            // Display an alert indicating successful save
            Alert.alert(
                "Success",
                "Trip data has been saved successfully.",
                [{ text: "OK", onPress: () => console.log("Save confirmation closed") }]
            );
        } catch (error) {
            console.error('Error updating trip data: ', error);
            Alert.alert(
                "Error",
                "An error occurred while saving the trip data. Please try again.",
                [{ text: "OK", onPress: () => console.log("Alert closed") }]
            );
        }
    } else {
        Alert.alert(
            "Invalid Input",
            "Please enter at least one meeting point.",
            [{ text: "OK", onPress: () => console.log("Alert closed") }]
        );
    }
};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Select Meeting Points</Text>
            <ScrollView style={styles.scrollView}>
              {meetingPoints.map((point, index) => (
                <View key={index} style={styles.inputContainer}>
                  <Icon name="location-on" size={24} color="#000" style={styles.locationIcon} />
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter meeting point"
                      value={point}
                      onChangeText={(text) => updateMeetingPoint(text, index)}
                      accessible={true}
                      accessibilityLabel={`Meeting point ${index + 1}`}
                    />
                    <View style={styles.underline} />
                  </View>
                  {index > 0 && (
                    <TouchableOpacity onPress={() => removeMeetingPoint(index)} style={styles.removeButton}>
                      <Icon name="close" size={24} color="#000" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              <TouchableOpacity onPress={addMeetingPoint} style={styles.addButton}>
                <Icon name="add" size={24} color="#000" />
                <Text style={styles.addButtonText}>Add another</Text>
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity 
              onPress={handleDone} 
              style={[styles.doneButton, { opacity: meetingPoints.some(point => point.trim() !== '') ? 1 : 0.5 }]} 
              disabled={meetingPoints.every(point => point.trim() === '')}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

MeetingPointsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  toCity: PropTypes.string.isRequired,
  initialMeetingPoints: PropTypes.array,
  tripId: PropTypes.string.isRequired,
  pickupAvailability: PropTypes.shape({
    fromDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
    toDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  }).isRequired,
  db: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
    maxHeight: '70%',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    width: '100%',
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationIcon: {
    marginRight: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
  },
  underline: {
    height: 1,
    backgroundColor: '#CCCCCC', 
    width: '100%',
  },
  removeButton: {
    marginLeft: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  addButtonText: {
    marginLeft: 5,
    color: '#000',
    fontSize: 16,
  },
  doneButton: {
    backgroundColor: '#ED6C30',
    borderRadius: 44,
    paddingVertical: 10,
    alignItems: 'center',
    width: 200,
    height: 40,
    marginTop: 20,
    alignSelf: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MeetingPointsModal;

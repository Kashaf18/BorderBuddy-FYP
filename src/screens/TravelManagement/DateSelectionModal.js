import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MeetingPointsModal from './MeetingPointsModal';
import { Timestamp } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const DateSelectionModal = ({ visible, onClose, onSave, tripId }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [showMeetingPointsModal, setShowMeetingPointsModal] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    if (!tripId) {
      console.error("No tripId provided to DateSelectionModal");
      
      onClose();
    }
  }, [tripId, onClose]);

  const onFromChange = (event, selectedDate) => {
    setShowFromPicker(false);
    if (selectedDate) {
      setFromDate(selectedDate);
    }
  };

  const onToChange = (event, selectedDate) => {
    setShowToPicker(false);
    if (selectedDate) {
      setToDate(selectedDate);
    }
  };

  const handleNext = () => {
    if (fromDate && toDate) {
      setShowMeetingPointsModal(true); 
    } else {
      Alert.alert("Error", "Please select both From and To dates.");
    }
  };

  const handleSaveAll = (meetingPoints) => {
    if (fromDate && toDate && tripId) {
      onSave(tripId, { 
        fromDate: Timestamp.fromDate(fromDate),
        toDate: Timestamp.fromDate(toDate), 
        meetingPoints 
      });
      onClose();
    } else {
      Alert.alert("Error", "Please ensure both dates are selected and trip data is valid.");
    }
    console.log("TripId:", tripId);
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);
    console.log("Meeting Points:", meetingPoints);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Select Pickup Availability Dates</Text>

          <TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.dateButton}>
            <Icon name="event" size={24} color="#000" style={styles.dateIcon} />
            <Text style={styles.dateText}>{fromDate ? fromDate.toDateString() : "From date"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowToPicker(true)} style={styles.dateButton}>
            <Icon name="event" size={24} color="#000" style={styles.dateIcon} />
            <Text style={styles.dateText}>{toDate ? toDate.toDateString() : "To date"}</Text>
          </TouchableOpacity>

          {showFromPicker && (
            <DateTimePicker
              value={fromDate || new Date()}
              mode='date'
              display="default"
              onChange={onFromChange}
            />
          )}

          {showToPicker && (
            <DateTimePicker
              value={toDate || new Date()}
              mode='date'
              display="default"
              onChange={onToChange}
            />
          )}

          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.textStyle}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      <MeetingPointsModal
        visible={showMeetingPointsModal}
        onClose={() => setShowMeetingPointsModal(false)}
        onSave={handleSaveAll}
        toCity="Your City"  
        db={db}
        tripId={tripId}
        pickupAvailability={{
          fromDate: fromDate,
          toDate: toDate
        }}
      />
    </Modal>
  );
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    height: 50,
  },
  dateIcon: {
    marginRight: 10,
  },
  dateText: {
    flex: 1,
  },
  nextButton: {
    backgroundColor: '#ED6C30',
    borderRadius: 44,
    paddingVertical: 10,
    alignItems: 'center',
    width: 200,
    height: 40,
    marginTop: 55,
    alignSelf: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DateSelectionModal;
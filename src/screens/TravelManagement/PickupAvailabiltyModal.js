import React, { useState } from 'react';
import { View, Text, Modal, Button, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const PickupAvailabilityModal = ({ visible, onClose, tripData, onSave }) => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);

    const handleFromDateChange = (event, selectedDate) => {
        setShowFromDatePicker(false);
        if (selectedDate) {
            setFromDate(selectedDate);
        }
    };

    const handleToDateChange = (event, selectedDate) => {
        setShowToDatePicker(false);
        if (selectedDate) {
            setToDate(selectedDate);
        }
    };

    const handleSave = () => {
        if (fromDate && toDate) {
            onSave(tripData.id, { fromDate, toDate });
            onClose();
        } else {
            alert("Please select both 'From' and 'To' dates.");
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Edit Pickup Availability</Text>
                    
                    <TouchableOpacity onPress={() => setShowFromDatePicker(true)}>
                        <Text style={styles.dateText}>
                            From Date: {fromDate ? fromDate.toLocaleDateString() : "Select Date"}
                        </Text>
                    </TouchableOpacity>

                    {showFromDatePicker && (
                        <DateTimePicker
                            value={fromDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={handleFromDateChange}
                        />
                    )}

                    <TouchableOpacity onPress={() => setShowToDatePicker(true)}>
                        <Text style={styles.dateText}>
                            To Date: {toDate ? toDate.toLocaleDateString() : "Select Date"}
                        </Text>
                    </TouchableOpacity>

                    {showToDatePicker && (
                        <DateTimePicker
                            value={toDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={handleToDateChange}
                        />
                    )}

                    <View style={styles.buttonContainer}>
                        <Button title="Save" onPress={handleSave} />
                        <Button title="Cancel" onPress={onClose} color="red" />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dateText: {
        fontSize: 16,
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        width: 200,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

export default PickupAvailabilityModal;

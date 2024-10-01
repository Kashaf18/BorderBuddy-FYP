import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Image, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily, Color } from '../../assets/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';
import TripCard from './TripCard';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import EditTripModal from './EditTripModal'; 
import PickupAvailabilityModal from './PickupAvailabilityModal'; // Adjust if necessary


const TripsDashboard = ({ navigation }) => {
    const [trips, setTrips] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [tripToEdit, setTripToEdit] = useState(null);
    const [pickupModalVisible, setPickupModalVisible] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "trips"));
                const tripsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTrips(tripsData);
            } catch (error) {
                console.error("Error fetching trips: ", error);
            }
        };

        fetchTrips();
    }, []);

    const confirmDelete = (tripId) => {
        Alert.alert(
            "Delete Trip",
            "Are you sure you want to delete this trip?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Deletion cancelled"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => handleRemove(tripId)
                }
            ]
        );
    };

    const handleRemove = async (tripId) => {
        try {
            await deleteDoc(doc(db, 'trips', tripId));
            setTrips(trips.filter(trip => trip.id !== tripId));
        } catch (error) {
            console.error("Error deleting trip: ", error);
        }
    };

    const handleEdit = (trip) => {
        setTripToEdit(trip);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setTripToEdit(null);
    };

    const handleUpdate = (tripId, updatedData) => {
        setTrips(trips.map(trip => (trip.id === tripId ? { ...trip, ...updatedData } : trip)));
        handleCloseModal(); // Close the modal after saving
    };

    const handlePickupClick = (trip) => {
        setSelectedTrip(trip);
        setPickupModalVisible(true); // Show the pickup availability modal
    };

    const handleClosePickupModal = () => {
        setPickupModalVisible(false);
        setSelectedTrip(null);
    };

    const handleSavePickupDates = (tripId, dates) => {
        // Logic to save pickup availability dates in Firebase
        console.log('Saving pickup dates for trip:', tripId, dates);
        Alert.alert('Pickup availability saved successfully!');
        handleClosePickupModal(); // Close the modal after saving
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View>
                    <Image source={require("../../assets/images/TopImage.png")} style={styles.topImage} />
                </View>
                <Text style={styles.heading}>My Trips</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.MatchingButton} onPress={() => navigation.navigate('MatchingShipmentsScreen')}>
                        <Text style={styles.buttonText}>Matching Shipments </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.DealsButton} onPress={() => navigation.navigate('DealsScreen')}>
                        <Text style={styles.buttonText}>Deals</Text>
                    </TouchableOpacity>
                </View>

                {trips.length > 0 ? (
                    <FlatList
                        data={trips}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View key={item.id} style={styles.container2}>
                                <TripCard 
                                    trip={item} 
                                    handleRemove={() => confirmDelete(item.id)} 
                                    handleEdit={() => handleEdit(item)} 
                                    handlePickup={() => handlePickupClick(item)} // Add pickup handler
                                />
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.noTripsText}>No trips available</Text>
                )}
            </ScrollView>

            <View style={styles.addContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('CreateTripPlan')}>
                    <Ionicons name="add-circle-sharp" size={48} color="#ED6C30" style={styles.add} />
                </TouchableOpacity>
            </View>

            {/* Bottom Tab */}
            <View style={styles.bottomTab}>
                <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ProfileScreen')}>
                    <Icon name="home" size={35} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ProfileScreen')}>
                    <Icon name="shopping-bag" size={35} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('TripsDashboard')}>
                    <Icon name="luggage" size={35} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton}>
                    <Icon name="email" size={35} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ProfileScreen')}>
                    <Icon name="person" size={35} color="#fff" />
                </TouchableOpacity>
            </View>

            {tripToEdit && (
                <EditTripModal
                    visible={isModalVisible}
                    onClose={handleCloseModal}
                    tripId={tripToEdit.id}
                    tripData={tripToEdit}
                    onSave={handleUpdate} 
                />
            )}

            {selectedTrip && (
                <PickupAvailabilityModal
                    visible={pickupModalVisible}
                    onClose={handleClosePickupModal}
                    tripData={selectedTrip}
                    onSave={handleSavePickupDates} 
                />
            )}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        paddingBottom: 100, 
    },
    topImage: {
        width: 153,
        height: 198,
        marginLeft: 260,
        marginRight: 'auto',
    },
    heading: {
        fontSize: 24,
        fontFamily: FontFamily.interSemiBold,
        color: Color.colorBlack,
        textAlign: 'center',
        marginVertical: 20,
        marginTop: -95,
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
    container2: {
        flex: 1,
        justifyContent: 'flex-start', 
        padding: 20,
        marginBottom: -20, 
    },
    addContainer: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 700,
    },
    add: {
        alignSelf: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    MatchingButton: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1, 
        borderColor: '#C5C0C0', 
        marginLeft: 10,
    },
    DealsButton: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginLeft: -85,
        borderWidth: 1, 
        borderColor: '#C5C0C0', 
    },
    buttonText: {
        color: '#000',
        fontSize: 12,
        fontFamily: FontFamily.poppinsMedium,
    },
    noTripsText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginTop: 20,
    }
});

export default TripsDashboard;

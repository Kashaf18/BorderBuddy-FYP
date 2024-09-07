import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily, Color } from '../../assets/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';
import TripCard from './TripCard';


const TripsDashboard = ({ navigation }) => {
    const trips = [
        { from: 'New York', to: 'Dubai', availableWeight: 20, consumedWeight: 5, departureDate: '2024-05-25', departureTime: '10:00 AM', firstName: 'John', lastName: 'Doe' },
        { from: 'Chicago', to: 'Miami', availableWeight: 15, consumedWeight: 10, departureDate: '2024-06-01', departureTime: '02:00 PM', firstName: 'Jane', lastName: 'Smith' },
        { from: 'Milan', to: 'Dubai', availableWeight: 15, consumedWeight: 10, departureDate: '2024-06-01', departureTime: '02:00 PM', firstName: 'Jane', lastName: 'Smith' },
        // Add more trips as needed
    ];

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
                {trips.map((trip, index) => (
                    <View key={index} style={styles.container2}>
                        <TripCard trip={trip} />
                    </View>
                ))}
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
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        paddingBottom: 100, // Ensure space for the bottom tab
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
        top: 100, // Adjust this value to position the back button properly
        left: 20,
        marginBottom: 5,
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
    tripCard: {
        alignItems: "flex-start",
    },
    container2: {
        flex: 1,
        justifyContent: 'flex-start', // Align content at the top
        padding: 20,
        marginBottom: -20, // Reduce the margin between cards
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
        borderRadius:
            20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1, // Set border width
        borderColor: '#C5C0C0', // Set border color
        marginLeft: 10,
    },
    DealsButton: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginLeft: -85,
        borderWidth: 1, // Set border width
        borderColor: '#C5C0C0', // Set border color
    },
    buttonText: {
        color: '#000',
        fontSize: 12,
        fontFamily: FontFamily.poppinsMedium,
    },
});

export default TripsDashboard;

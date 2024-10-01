import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily, Color } from '../../assets/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';
import TripCard from './TripCard'; 
import DealsCard from './DealsCard';

const BackArrow = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('../../assets/images/back-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
    );
};

const DealsScreen = ({ navigation }) => {

    const deals = [
        {
            from: 'Australia',
            to: 'Denmark',
            departureDate: 'Mon 29th April 12:40 AM',
            productName: 'Iphone 13',
            reward: 30,
            weight: 5.5,
            rating: '(5.0)',
            userName: 'Kashaf Shahzad',
            label: 'User1'
        },
        {
            from: 'Dubai',
            to: 'Milan',
            departureDate: 'Mon 29th April 12:40 AM',
            productName: 'Airpods',
            reward: 20,
            weight: 1.5,
            rating: '(4.5)',
            userName: 'Manahil Adil',
            label: 'User2'
        },
        {
            from: 'Milan',
            to: 'New York',
            departureDate: 'Mon 29th April 12:40 AM',
            productName: 'Camera',
            reward: 40,
            weight: 2.5,
            rating: '(5.0)',
            userName: 'Aisha Talat',
            label: 'User3'
        },
        {
            from: 'Paris',
            to: 'London',
            departureDate: 'Wed 1st May 10:00 AM',
            productName: 'Laptop',
            reward: 50,
            weight: 3.0,
            rating: '(4.8)',
            userName: 'Sarah Johnson',
            label: 'User4'
        },
        {
            from: 'Tokyo',
            to: 'Los Angeles',
            departureDate: 'Fri 3rd May 11:30 PM',
            productName: 'Gaming Console',
            reward: 45,
            weight: 4.2,
            rating: '(4.7)',
            userName: 'David Lee',
            label: 'User5'
        },
        {
            from: 'New Delhi',
            to: 'Singapore',
            departureDate: 'Sun 5th May 6:00 AM',
            productName: 'Smart Watch',
            reward: 15,
            weight: 0.8,
            rating: '(4.6)',
            userName: 'Priya Kumar',
            label: 'User6'
        },
        {
            from: 'Berlin',
            to: 'Amsterdam',
            departureDate: 'Mon 6th May 2:00 PM',
            productName: 'Tablet',
            reward: 35,
            weight: 2.0,
            rating: '(4.9)',
            userName: 'Markus Müller',
            label: 'User7'
        },
        {
            from: 'Rome',
            to: 'Barcelona',
            departureDate: 'Tue 7th May 3:30 PM',
            productName: 'Bluetooth Speaker',
            reward: 25,
            weight: 1.2,
            rating: '(4.7)',
            userName: 'Laura Rossi',
            label: 'User8'
        },
        {
            from: 'Bangkok',
            to: 'Sydney',
            departureDate: 'Thu 9th May 9:00 AM',
            productName: 'Camera Lens',
            reward: 60,
            weight: 3.5,
            rating: '(4.9)',
            userName: 'Ananda Chai',
            label: 'User9'
        },
        {
            from: 'Toronto',
            to: 'Miami',
            departureDate: 'Sat 11th May 7:00 PM',
            productName: 'Drone',
            reward: 70,
            weight: 6.0,
            rating: '(5.0)',
            userName: 'Emily Williams',
            label: 'User10'
        },
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
                <BackArrow navigation={navigation} />
                <Text style={styles.heading}>Deals</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.MatchingButton} onPress={() => navigation.navigate('MatchingShipmentsScreen')}>
                        <Text style={styles.MatchingbuttonText}>Matching Shipments </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.DealsButton} onPress={() => navigation.navigate('DealsScreen')}>
                        <Text style={styles.DealsbuttonText}>Deals</Text>
                    </TouchableOpacity>
                </View>
                {deals.map((deal, index) => (
                    <View key={index} style={styles.container2}>
                        <DealsCard deal={deal} />
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
                <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ReportTheft')}>
                <Ionicons name="shield-sharp" size={35} color="#fff"  />
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
        paddingBottom: 100, 
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
        backgroundColor: '#ED6C30',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginLeft: -85,
        borderWidth: 1, 
        borderColor: '#C5C0C0', 
    },
    DealsbuttonText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: FontFamily.poppinsMedium,
    },
    MatchingbuttonText: {
        color: '#000',
        fontSize: 12,
        fontFamily: FontFamily.poppinsMedium,
    },
});

export default DealsScreen;

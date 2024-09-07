import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily, Color } from '../../assets/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';
import ShipmentCard from './ShippingCard';


const BackArrow = ({ navigation }) => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../../assets/images/back-icon.png')} style={styles.backIcon} />
      </TouchableOpacity>
    );
};

const MatchingShipmentsScreen = ({ navigation }) => {
   

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
                <Text style={styles.heading}>Matching Shipments</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.MatchingButton} onPress={() => navigation.navigate('MatchingShipmentsScreen')}>
                        <Text style={styles.MatchingShipmentsbuttonText}>Matching Shipments</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.DealsButton} onPress={() => navigation.navigate('DealsScreen')}>
                        <Text style={styles.DealsbuttonText}>Deals</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container2}>
                    <ShipmentCard style={styles.shippingCard} />
                </View>
                <View style={styles.container2}>
                    <ShipmentCard style={styles.shippingCard} />
                </View>
                <View style={styles.container2}>
                    <ShipmentCard style={styles.shippingCard} />
                </View>
                <View style={styles.container2}>
                    <ShipmentCard style={styles.shippingCard} />
                </View>
                
                
               
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
    shippingCard: {
        alignItems: "flex-start",
    },
    container2: {
        flex: 1,
        justifyContent: 'flex-end', // Align content at the bottom
        padding: 20,
        marginBottom: -40,
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
        backgroundColor: '#ED6C30',
        borderRadius: 
        20,
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
    DealsbuttonText: {
        color: '#000',
        fontSize: 12,
        fontFamily: FontFamily.poppinsMedium,
    },
    MatchingbuttonText: {
        color: '#ffff',
        fontSize: 12,
        fontFamily: FontFamily.poppinsMedium,
    },
});

export default MatchingShipmentsScreen;

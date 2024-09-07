import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5, FontAwesome6, Entypo } from '@expo/vector-icons';
import { FontFamily, Color } from '../../assets/GlobalStyles';

const TripCard = ({ trip }) => (
    <View style={styles.card}>
        <View style={styles.routeContainer}>
            <FontAwesome6 name="location-dot" size={24} color="#ED6C30" />
            <Text style={styles.city1}>{trip.from}</Text>
            <Ionicons name="airplane" size={28} color="#ED6C30" style={styles.iconPlane} />
            <Text style={styles.city2}>{trip.to}</Text>
        </View>
        <View style={styles.routeContainer}>
            <Entypo name="back-in-time" size={24} color="#ED6C30" style={styles.icon} />
            <Text style={styles.date}>Departs On: {trip.departureDate}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.weightContainer}>
            <View style={styles.weightSubContainer}>
                <FontAwesome5 name="weight-hanging" size={20} color="#ED6C30" style={styles.weightIcon} />
                <Text style={styles.weightNum}>{trip.availableWeight} KG</Text>
                <Text style={styles.weightText}>Available Weight</Text>
            </View>
            <View style={styles.weightSubContainer}>
                <FontAwesome5 name="weight-hanging" size={20} color="#ED6C30" style={styles.weightIcon} />
                <Text style={styles.consumedWeightNum}>{trip.consumedWeight} KG</Text>
                <Text style={styles.consumedWeightText}>Consumed Weight</Text>
            </View>
        </View>
        <View style={styles.profileContainer}>
            <Image
                source={require('../../assets/images/Profile.png')}
                style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
                <View style={styles.ratingContainer}>
                    <MaterialIcons name="star" size={15} color="#FFB800" />
                    <Text style={styles.rating}>(4.0)</Text>
                </View>
                <Text style={styles.name}>{trip.firstName} {trip.lastName}</Text>
            </View>
            <TouchableOpacity style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
            <View style={{ width: 10 }} />
            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        borderColor: '#ED6C30',
        borderWidth: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        paddingBottom: 10,
        marginBottom: 0,
        marginTop: 0, // Add or adjust this margin to control spacing
       
    },
    routeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginLeft: 10,
        marginTop: 10,
    },
    city1: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#504F4F',
        marginLeft: 19,
        fontFamily: FontFamily.poppinsSemiBold,
    },
    iconPlane: {
        flex: 1,
        textAlign: 'center',
        marginRight: 90,
    },
    city2: {
        position: 'absolute',
        right: 0,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#504F4F',
        marginRight: 30,
        fontFamily: FontFamily.poppinsSemiBold,
    },
    icon: {
        marginRight: 5,
    },
    line: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    date: {
        color: '#504F4F',
        marginLeft: 9,
        fontFamily: FontFamily.poppinsLight,
        fontSize: 12,
    },
    weightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginHorizontal: 10,
    },
    weightSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    weightIcon: {
        marginRight: 5,
    },
    weightNum: {
        fontSize: 12,
        fontFamily: FontFamily.poppinsSemiBold,
        color: "#504F4F",
        marginLeft: 0,
        marginTop: 5,
    },
    weightText: {
        fontSize: 8,
        fontFamily: FontFamily.poppinsLight,
        color: "#504F4F",
        marginLeft: 5,
        marginTop: 5,
    },
    consumedWeightNum: {
        fontSize: 12,
        fontFamily: FontFamily.poppinsSemiBold,
        color: "#504F4F",
        marginLeft: 0,
        marginTop: 5,
    },
    consumedWeightText: {
        fontSize: 8,
        fontFamily: FontFamily.poppinsLight,
        color: "#504F4F",
        marginLeft: 5,
        marginTop: 5,
    },
    profileContainer: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    profileInfo: {
        flex: 1,
        marginRight: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    rating: {
        marginLeft: 5,
        color: '#000000',
        fontSize: 10,
        fontWeight: 'bold',
        fontFamily: FontFamily.poppinsLight,
    },
    name: {
        fontSize: 12,
        color: '#504F4F',
        fontFamily: FontFamily.poppinsLight,
        fontWeight: 'bold',
    },
    removeButton: {
        backgroundColor: '#ED6C30',
        justifyContent: 'center',
        borderRadius: 22,
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: 78,
        height: 36,
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 12,
    },
    editButton: {
        borderStyle: 'solid',
        borderColor: '#ED6C30',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 22,
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: 78,
        height: 36,
    },
    editButtonText: {
        color: '#000',
        fontSize: 12,
        fontFamily: FontFamily.poppinsMedium,
        paddingHorizontal: 10,
    },
});

export default TripCard;

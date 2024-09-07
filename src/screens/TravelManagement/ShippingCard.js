import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const ShipmentCard = () => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/Iphone13ProMax.png')}
                    style={styles.image}
                />
                <View style={styles.rewardContainer}>
                    <Text style={styles.rewardText}>Reward $20</Text>
                </View>
            </View>
            <Text style={styles.productName}>Nvidia RTX 4090</Text>
            <View style={styles.weightContainer}>
                <FontAwesome5 name="weight-hanging" size={24} color="#ED6C30" style={styles.weightIcon} />
                <Text style={styles.weight}>10 kg</Text>
            </View>
            <View style={styles.routeContainer}>
                <FontAwesome6 name="location-dot" size={24} color="#ED6C30" />
                <Text style={styles.city1}>Peshawar</Text>
                <View style={{ flex: 1 }} />
                <Ionicons name="airplane" size={24} color="#ED6C30" style={styles.iconPlane} />
                <Text style={styles.city2}>Sialkot</Text>
            </View>
            <View style={styles.routeContainer}>
                <Entypo name="back-in-time" size={24} color="#ED6C30" style={styles.icon} />
                <Text style={styles.date}>Before: Mon 29th April 2024</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.profileContainer}>
                <Image
                    source={require('../../assets/images/profilePicture.jpeg')}
                    style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                    <View style={styles.ratingContainer}>
                        <MaterialIcons name="star" size={13} color="#FFB800" />
                        <Text style={styles.rating}>4.0</Text>
                    </View>
                    <Text style={styles.name}>Laiba Saleem</Text>
                </View>
                <TouchableOpacity style={styles.removeButton}>                    
                    <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 360,
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
    },
    rewardContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ED6C30',
    },
    rewardText: {
        color: '#ED6C30',
        fontWeight: 'medium',
        fontSize: 12,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 9,
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    productName: {
        fontWeight: 'semibold',
        fontSize: 18,
        fontFamily: 'poppins',
        marginBottom: 12,
        color: '#FFFFFF',
        backgroundColor: '#0B0B0B',
        opacity: 0.56,
        textAlign: 'center',
        height: 25,
    },
    weightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginLeft: 10,
    },
    weightIcon: {
        marginRight: 10,
    },
    weight: {
        color: '#8F8D8D',

    },
    routeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginLeft: 10,
    },
    city1: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#504F4F',
        marginLeft: 19,
    },
    iconPlane: {
        marginRight: 25,
    },
    city2: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#504F4F',
        marginRight: 80,
    },
    icon: {
        marginRight: 5,
    },
    line: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    date: {
        color: '#8F8D8D',
        marginLeft: 9,
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
        fontWeight: 'regular',
        fontFamily: "Poppins",
    },
    name: {
        fontSize: 12,
        color: '#504F4F',
    },
    removeButton: {
        backgroundColor: '#ED6C30',
        justifyContent: 'center',
        borderRadius: 22,
        paddingHorizontal: 7,
        paddingVertical: 6,
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
        
    },
    editButtonText: {
        color: '#ED6C30',
        fontSize: 12,
    },
});

export default ShipmentCard;

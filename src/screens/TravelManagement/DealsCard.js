import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5, FontAwesome6, Entypo } from '@expo/vector-icons';
import { FontFamily, Color } from '../../assets/GlobalStyles';

const DealsCard = ({ deal }) => (
    <View style={styles.card}>
        <View style={styles.routeContainer}>
            <FontAwesome6 name="location-dot" size={24} color="#ED6C30" />
            <Text style={styles.city1}>{deal.from}</Text>
            <Ionicons name="airplane" size={28} color="#ED6C30" style={styles.iconPlane} />
            <Text style={styles.city2}>{deal.to}</Text>
        </View>
        <View style={styles.routeContainer}>
            <Entypo name="back-in-time" size={24} color="#ED6C30" style={styles.icon} />
            <Text style={styles.date}>{deal.departureDate}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.dealContainer}>
            <Image
                source={require("../../assets/images/Iphone13ProMax.png")}
                style={styles.dealImage}
            />
            <View style={styles.dealInfo}>
                <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">{deal.productName}</Text>
                <View style={styles.iconTextContainer}>
                    <FontAwesome5 name="gift" size={20} color="#ED6C30" />
                    <Text style={styles.iconText}>${deal.reward}</Text>
                </View>
                <View style={styles.iconTextContainer}>
                    <FontAwesome5 name="weight" size={20} color="#ED6C30" />
                    <Text style={styles.iconText}>{deal.weight} KG</Text>
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
                        <Text style={styles.rating}>{deal.rating}</Text>
                    </View>
                    <Text style={styles.name}>{deal.userName}</Text>
                </View>
            </View>
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
        marginTop: 0, 
    },
    routeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
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
        marginHorizontal: 10,
    },
    date: {
        color: '#504F4F',
        marginLeft: 9,
        fontFamily: FontFamily.poppinsLight,
        fontSize: 12,
    },
    dealContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    dealImage: {
        width: 90,
        height: 90,
        marginRight: 10,
      
    },
    dealInfo: {
        flex: 1,
        marginRight: 10, // Added margin to avoid overlapping with profile container
    },
    productName: {
        fontSize: 11,
        fontFamily: FontFamily.poppinsSemiBold,
        color: '#504F4F',
        flexShrink: 1, // Prevents text from wrapping
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    iconText: {
        marginLeft: 5,
        fontSize: 12,
        fontFamily: FontFamily.poppinsMedium,
        color: '#504F4F',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom: -35,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    profileInfo: {
        alignItems: 'flex-start',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
    },
    rating: {
        marginLeft: 5,
        color: '#000',
        fontSize: 11,
        fontWeight: 'bold',
        fontFamily: FontFamily.poppinsLight,
    },
    name: {
        fontSize: 12,
        color: '#504F4F',
        fontFamily: FontFamily.poppinsLight,
        fontWeight: 'bold',
    },
});

export default DealsCard;

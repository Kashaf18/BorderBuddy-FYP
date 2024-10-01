import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily, Color } from '../../assets/GlobalStyles'; 

const ConnectNearestPoliceStations = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [policeStations, setPoliceStations] = useState([]);
  const [NearestStation, setNearestStation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      fetchNearbyPoliceStations(userLocation.coords.latitude, userLocation.coords.longitude);
    })();
  }, []);

  const fetchNearbyPoliceStations = async (lat, lon) => {
    try {
      const apiKey = 'AlzaSy7hap8YaljQmFdaQvfnw6G_vM07groBI8m';
      const response = await axios.get(
        `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=police&location=${lat},${lon}&radius=1500&language=en&key=${apiKey}`
      );
     
     

      const stations = await Promise.all(
        response.data.predictions.map(async (place) => {
          try {
            const detailsResponse = await axios.get(
              `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${place.place_id}&key=${apiKey}`
            );

            const result = detailsResponse.data.result;
            const address = result?.formatted_address || 'Address not available';
            const phoneNumber = result?.formatted_phone_number || '(051) 9258376';

            return {
              id: place.place_id,
              name: result?.name || place.description,
              address: address,
              phone: phoneNumber,
              lat: result?.geometry?.location?.lat || lat,
              lon: result?.geometry?.location?.lng || lon,
            };
          } catch (detailsError) {
            console.error(`Error fetching details for ${place.description}: `, detailsError);
            return null;
          }
        })
      );

      const validStations = stations.filter(station => station !== null);
      setPoliceStations(validStations);
      if (validStations.length > 1) {
        setNearestStation(validStations[2]);
      }
    } catch (error) {
      console.error('Error fetching police stations: ', error);
    }
  };
  const handleCall = () => {
    if (NearestStation && NearestStation.phone) {
      // Format the phone number for dialing
      const phoneUrl = `tel:${NearestStation.phone.replace(/\D/g, '')}`; // Remove non-numeric characters
      Linking.openURL(phoneUrl)
        .catch(err => console.error('An error occurred while trying to call:', err));
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
        >
          {policeStations.map((station) => (
            <Marker
              key={station.id}
              coordinate={{
                latitude: station.lat,
                longitude: station.lon,
              }}
              title={station.name}
              description={station.address}
            />
          ))}
        </MapView>
      ) : (
        <Text>Loading Map...</Text>
      )}

      <View style={styles.detailsContainer}>
        <Text style={styles.heading}>Nearest Police Station Details</Text>
        {NearestStation ? (
          <View style={styles.stationDetails}>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Police Station</Text>
              <Text style={styles.value}>{NearestStation.name}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>{NearestStation.address}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Contact #</Text>
              <Text style={styles.value}>{NearestStation.phone}</Text>
            </View>
            <TouchableOpacity style={styles.callButton} onPress={handleCall}> 
              <Icon name="phone" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <Text>No police stations found.</Text>
        )}
      </View>

      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Icon name="home" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ShopScreen')}>
          <Icon name="shopping-bag" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('TripsDashboard')}>
          <Icon name="luggage" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('MessagesScreen')}>
          <Icon name="email" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Icon name="person" size={35} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    marginTop: -20,
    flex: 1,
    justifyContent: 'center',
  },

 
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: -70,
    fontFamily: FontFamily.kanitRegular,
  },
 
  stationDetails: {
    alignItems: 'center',
   
  },
 

detailContainer: {
  backgroundColor: '#FAFAFA',
  paddingVertical: 10,
  paddingHorizontal: 10,
  marginVertical: 8,
  width: '100%',
  borderRadius: 15,
  elevation: 2, // Reduced elevation to make it appear lighter
  shadowColor: '#D3D3D3', // Use a lighter shadow color to avoid darkening effect
  shadowOffset: { width: 0, height: 1 }, // Reduced shadow offset for a softer look
  shadowOpacity: 0.05, // Reduced opacity for a subtler shadow
  shadowRadius: 1, // Reduced shadow radius
  flexDirection: 'row',
  alignItems: 'center',
},

label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8F8D8D',
    flex: 0.4, // Allows the label to shrink if necessary
    fontFamily: FontFamily.kanitExtraLight,
},

value: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    paddingLeft: 1, // Adjust the padding as needed for consistent spacing
    flex: 0.6,        // Allows the value to take remaining space
    textAlign: 'left',
    fontFamily: FontFamily.kanitRegular,
},


  callButton: {
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#F66A22',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ED6C30',
    borderRadius: 44,
    height: 71,
    width: 370,
    alignItems: 'center',
    marginVertical: 20,
    marginLeft: 20,
    marginHorizontal: 40,
    position: 'absolute',
    bottom: -17,
  },
 
});

export default ConnectNearestPoliceStations;








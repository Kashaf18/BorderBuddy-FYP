import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


const LocationPicker = ({ visible, onClose, onLocationSelect }) => {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    };

    fetchCurrentLocation();
  }, []);

  const handleSelectLocation = () => {
    if (region) {
      onLocationSelect(region);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(region) => setRegion(region)}
        >
          {region && (
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          )}
        </MapView>
        <TouchableOpacity onPress={handleSelectLocation} style={styles.selectButton}>
          <Text style={styles.selectButtonText}>Select Location</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  map: {
    width: '100%',
    height: '80%',
  },
  selectButton: {
    backgroundColor: '#ED6C30',
    padding: 15,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default LocationPicker;

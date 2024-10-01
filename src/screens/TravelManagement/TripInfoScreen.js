import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const TripInfoScreen = () => {
  const route = useRoute();
  const { tripId } = route.params;
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const tripDoc = doc(db, 'trips', tripId);
        const tripSnapshot = await getDoc(tripDoc);
        
        if (tripSnapshot.exists()) {
          setTripData(tripSnapshot.data());
        } else {
          setError('No such document!');
        }
      } catch (error) {
        console.error("Error fetching trip data: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTripData();
  }, [tripId, db]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ED6C30" />
      </View>
    );
  }

  if (error || !tripData) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error || 'No trip data available'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trip Information</Text>
      <Text style={styles.label}>From Country:</Text>
      <Text style={styles.value}>{tripData.fromCountry || 'N/A'}</Text>
      <Text style={styles.label}>From City:</Text>
      <Text style={styles.value}>{tripData.fromCity || 'N/A'}</Text>
      
      <Text style={styles.label}>To Country:</Text>
      <Text style={styles.value}>{tripData.toCountry || 'N/A'}</Text>
      <Text style={styles.label}>To City:</Text>
      <Text style={styles.value}>{tripData.toCity || 'N/A'}</Text>
      
      <Text style={styles.label}>Travel Dates:</Text>
      <Text style={styles.value}>
        From: {tripData.travelDates?.fromDate ? tripData.travelDates.fromDate.toDate().toLocaleDateString() : 'N/A'}
      </Text>
      <Text style={styles.value}>
        To: {tripData.travelDates?.toDate ? tripData.travelDates.toDate.toDate().toLocaleDateString() : 'N/A'}
      </Text>
      
      <Text style={styles.label}>Category:</Text>
      <Text style={styles.value}>{tripData.category || 'N/A'}</Text>
      
      <Text style={styles.label}>Pickup Availability:</Text>
      <Text style={styles.value}>
        From: {tripData.pickupAvailability?.fromDate ? tripData.pickupAvailability.fromDate.toDate().toLocaleDateString() : 'N/A'}
      </Text>
      <Text style={styles.value}>
        To: {tripData.pickupAvailability?.toDate ? tripData.pickupAvailability.toDate.toDate().toLocaleDateString() : 'N/A'}
      </Text>

      <Text style={styles.label}>Meeting Points:</Text>
      {tripData.meetingPoints && tripData.meetingPoints.length > 0 ? (
        tripData.meetingPoints.map((point, index) => (
          <Text key={index} style={styles.value}>{point}</Text>
        ))
      ) : (
        <Text style={styles.value}>No meeting points available</Text>
      )}
      
      <Text style={styles.label}>Notes:</Text>
      <Text style={styles.value}>{tripData.notes || 'N/A'}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TripInfoScreen;

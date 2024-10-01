import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Share, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { FontFamily, Color } from '../../assets/GlobalStyles'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
const BackArrow = ({ navigation }) => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../../assets/images/back-icon.png')} style={styles.backIcon} />
      </TouchableOpacity>
    );
  };
const GenerateReport = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the route to access passed params
  const { docId } = route.params; // Get the docId from params
  const [reportData, setReportData] = useState({});
  const [referenceNumber, setReferenceNumber] = useState('');

  // Generate a random 6-digit reference number
  const generateReferenceNumber = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    setReferenceNumber(randomNumber.toString());
  };

  const fetchTheftReport = async () => {
    try {
      const docRef = doc(db, 'theftReports', docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setReportData(docSnap.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  const storeGeneratedReport = async () => {
    try {
      await setDoc(doc(db, 'generatedReports', referenceNumber), {
        ...reportData,
        referenceNumber,
      });
      console.log('Report stored successfully!');
      Alert.alert("Report stored successfully!");
      navigation.navigate('ConnectNearestPoliceStations');
    } catch (error) {
      console.log('Error storing report:', error);
    }
  };

  useEffect(() => {
    fetchTheftReport();
    generateReferenceNumber();
  }, []);

  const shareReport = async () => {
    try {
      const result = await Share.share({
        message: `Theft Report Reference Number: ${referenceNumber}\n\nDate: ${reportData.date}\nTime: ${reportData.time}\nLocation: ${reportData.location}\nStolen Items: ${reportData.stolenItems}\n\nDescription: ${reportData.description}`,
        title: 'Theft Report',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <body>
          <h1>Theft Report</h1>
          <p><strong>Reference Number:</strong> ${referenceNumber}</p>
          <p><strong>Date:</strong> ${reportData.date}</p>
          <p><strong>Time:</strong> ${reportData.time}</p>
          <p><strong>Location:</strong> ${reportData.location}</p>
          <p><strong>Stolen Items:</strong> ${reportData.stolenItems}</p>
          <h2>Description:</h2>
          <p>${reportData.description}</p>
        </body>
      </html>
    `;
  
    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      const pdfName = `${FileSystem.documentDirectory}theft_report_${referenceNumber}.pdf`;
      await FileSystem.moveAsync({
        from: uri,
        to: pdfName,
      });
  
      if (Platform.OS === "android") {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(pdfName, { encoding: FileSystem.EncodingType.Base64 });
          await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, `theft_report_${referenceNumber}.pdf`, 'application/pdf')
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
            })
            .catch((e) => console.log(e));
        }
      }
  
      Alert.alert(
        "Download Complete",
        "The report has been saved to your device.",
        [{ text: "OK" }]
      );
  
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert("Error", "Failed to generate and save PDF");
    }
  };
  
return (
    <View style={styles.container}>
        <BackArrow navigation={navigation} />
        <Image source={require("../../assets/images/TopImage.png")} style={styles.topImage} />

        <Text style={styles.title}>Report Generation</Text>

        <View style={styles.reportContainer}>
            <View style={styles.row}>
                <Text style={styles.label}>Date and Time</Text>
                <Text style={styles.value}>{reportData.date || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Location</Text>
                <Text style={styles.value}>{reportData.location || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Stolen Items</Text>
                <Text style={styles.value}>{reportData.stolenItems || 'N/A'}</Text>
            </View>

            <Text style={styles.descriptionText}>Description of incident..</Text>
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                    {reportData.description || 'N/A'}
                </Text>
            </View>

            <Text style={styles.referenceLabel}>Reference Number #</Text>
            <Text style={styles.referenceNumber}>{referenceNumber}</Text>


            {/* <Text style={styles.label}>Reference Number: {referenceNumber}</Text> */}
            <View style={styles.actionsContainer}>
                <View style={styles.row}>
                    <View style={styles.dateTimeContainer}>
                        <Ionicons name="time" size={20} color="#ED6C30" />
                        <Text style={styles.dateTime}>{reportData.time || 'N/A'}</Text>
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <Ionicons name="calendar-outline" size={20} color="#ED6C30" />
                        <Text style={styles.dateTime}>{reportData.date || 'N/A'}</Text>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={shareReport}>
          <Ionicons name="share-social-outline" size={20} color="#ED6C30" />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={generatePDF}>
          <Ionicons name="download-sharp" size={20} color="#ED6C30" />
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
      </View>


                
            </View>
            
        </View>

       

      {/* Store Report Button */}
      <TouchableOpacity onPress={storeGeneratedReport} style={styles.reportButton}>
        <Text style={styles.reportButtonText}>Store Report</Text>
       
      </TouchableOpacity>

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
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
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
    title: {
        fontSize: 24,
        fontFamily: FontFamily.interSemiBold,
        color: Color.colorBlack,
        textAlign: 'center',
        marginVertical: 20,
        marginTop: -95,
    },
    
    descriptionContainer:{
        marginTop: 15,
        alignSelf: 'center', 
        height: 80,
        width: 320,
        backgroundColor: "#FBFBFB",
        marginLeft: 5,
      },
    reportContainer: {
        borderWidth: 1,
        borderColor: '#F29B72',
        borderRadius: 12,
        borderStyle: 'dashed',
        padding: 15,
        marginVertical: 15,
        marginBottom: 20,
        width: 365,
        height: 510,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
       
    },
    label: {
        fontSize: 14,
        color: '#8F8D8D',
        fontWeight: '500',
        fontFamily: FontFamily.kanitExtraLight,
        marginTop:12,
       // marginRight: 10,
       width: '30%', 
    },
    value: {
        fontSize: 14,
        color: '#000000',
        fontFamily: FontFamily.kanitRegular,
        marginTop:12,
        width: '60%',
        flexWrap: 'wrap',
       
    },
    descriptionText: {
      fontSize: 14,
        color: '#8F8D8D',
        fontWeight: '500',
        fontFamily: FontFamily.kanitExtraLight,
        marginTop:12,
      },
    description: {
        fontSize: 12,
        color: '#000000',
        marginTop: 5,
        marginBottom: 10,
        lineHeight: 20,
        fontFamily: FontFamily.kanitExtraLight,
        marginLeft: 10,
    },
    referenceLabel: {
        marginTop: 15,    
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
        color: '#8F8D8D',
        fontFamily: FontFamily.kanitExtraLight,
    },
    referenceNumber: {
        fontSize: 20,
        textAlign: 'center',
        color: '#00000',
        marginVertical: 5,
        fontFamily: FontFamily.kanitRegular,
    },
    actionsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginVertical: 5,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 3,
        marginLeft:10,
        marginRight:10,
    },
    dateTime: {
        marginLeft: 5,
        fontSize: 12,
        color: '#504F4F',
        fontFamily: FontFamily.poppinsLight,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: -2,
        flexWrap: 'wrap', 
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ED6C30',
        borderWidth: 1,
        borderRadius: 20,
        width: 114,
        justifyContent: 'center',
        height: 36,
        marginTop: 12,
    },
    buttonText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#ED6C30',
        fontFamily: FontFamily.kanitRegular,
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
      tabButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      },
      reportButton: {
        width: '50%',
        backgroundColor: '#ED6C30',
        borderRadius: 44,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: -2,
      },
      reportButtonText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: FontFamily.kanitMedium,
      },

      
});

export default GenerateReport;
export { BackArrow }; 

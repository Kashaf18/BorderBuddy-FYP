import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import SplashScreenComponent from "../screens/Profiling/SplashScreen";
import LoginScreen from '../screens/Profiling/LoginScreen';
import ForgotPasswordScreen from '../screens/Profiling/ForgotPasswordScreen';
import SignUpScreen from '../screens/Profiling/SignUpScreen';
import ProfileScreen, { BackArrow } from '../screens/Profiling/ProfileScreen';
import TripsDashboard from '../screens/TravelManagement/TripsDashboard';
import CreateTripPlan from '../screens/TravelManagement/CreateTripPlan';
import DealsScreen from "../screens/TravelManagement/DealsScreen";
import MeetingPointsModal from '../screens/TravelManagement/MeetingPointsModal';
import TripInfoScreen from '../screens/TravelManagement/TripInfoScreen';
import MatchingShipmentsScreen from "../screens/TravelManagement/MatchingShipmentsScreen";
import ReportTheft from "../screens/TheftHandling/ReportTheft";
import GenerateReport from "../screens/TheftHandling/GenerateReport";
import ConnectNearestPoliceStations from "../screens/TheftHandling/ConnectNearestPoliceStations";
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { View } from "react-native";
import { FontFamily, Color, FontSize } from '../assets/GlobalStyles';
import { TouchableOpacity, Text } from 'react-native';


const Stack = createStackNavigator();
const fetchFonts = () => {
    return Font.loadAsync({
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Kanit-Medium': require('../assets/fonts/Kanit-Medium.ttf'),
        'Kanit-Regular': require('../assets/fonts/Kanit-Regular.ttf'),
        'Kanit-ExtraLight': require('../assets/fonts/Kanit-ExtraLight.ttf'),
    });
};

function AppNavigation() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    


    useEffect(() => {
       
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync(); // Prevent splash screen from hiding
                await fetchFonts(); // Load the fonts
            } catch (e) {
                console.warn(e); // Log errors
            } finally {
                setFontsLoaded(true); // Set the fonts loaded state to true
                await SplashScreen.hideAsync(); // Manually hide splash screen after fonts are loaded
            }
        }
        prepare(); // Run the function when the component mounts
    }, []);

    if (!fontsLoaded) {
        return null; // While fonts are loading, don't render anything (or use a custom loader)
    }


    const options = {
        headerShown: false,
    };
    return (
      
            <Stack.Navigator>


                <Stack.Screen name="SplashScreen" component={SplashScreenComponent} options={options} />

                <Stack.Screen name="LoginScreen" component={LoginScreen} options={options} />
                <Stack.Screen
                    name="ForgotPasswordScreen"
                    component={ForgotPasswordScreen}
                    options={options}
                />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={options} />
                <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{ headerShown: false, headerBackVisible: false }}
                />
                 <Stack.Screen
                    name="TripsDashboard"
                    component={TripsDashboard}
                    options={{ headerShown: false, headerBackVisible: false }}
                />
                <Stack.Screen
                    name="CreateTripPlan"
                    component={CreateTripPlan}
                    options={{ headerShown: false, headerBackVisible: false }}
                />
                <Stack.Screen
                    name="DealsScreen"
                    component={DealsScreen}
                    options={{ headerShown: false, headerBackVisible: false }}
                />
                <Stack.Screen
                    name="MatchingShipmentsScreen"
                    component={MatchingShipmentsScreen}
                    options={{ headerShown: false, headerBackVisible: false }}
                />
                <Stack.Screen
                    name="ReportTheft"
                    component={ReportTheft}
                    options={{ headerShown: false, headerBackVisible: false }}
                />
                 <Stack.Screen
                    name="GenerateReport"
                    component={GenerateReport}
                    options={{ headerShown: false, headerBackVisible: false }}
                />
                    <Stack.Screen
                    name="ConnectNearestPoliceStations"
                    component={ConnectNearestPoliceStations}
                    options={{ headerShown: false, headerBackVisible: false }}
                />
                <Stack.Screen name="MeetingPoints" component={MeetingPointsModal}
                 options={{ headerShown: false, headerBackVisible: false }} />
                <Stack.Screen name="TripInfo" component={TripInfoScreen} 
                 options={{ headerShown: false, headerBackVisible: false }}/>

            </Stack.Navigator>
        
    );
}

export default AppNavigation;
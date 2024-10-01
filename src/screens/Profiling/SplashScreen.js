import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontFamily, FontSize, Color, Padding, Border } from '../../assets/GlobalStyles';
const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
   
    // console.log('Navigation:', navigation);

  
    // console.log('TopImage:', require("../../assets/images/TopImage.png"));
    // console.log('Arrow Image:', require("../../assets/images/imgArrowright.png"));
    // console.log('FontFamily:', FontFamily);
    // console.log('FontSize:', FontSize);
    // console.log('Color:', Color);
    // console.log('Padding:', Padding);
    // console.log('Border:', Border);

    const onTapGetStarted = () => {
      
        navigation.navigate('LoginScreen');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={require("../../assets/images/TopImage.png")} 
                        style={styles.topImage}
                    />
                </View>
                
                <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>WELCOME TO</Text>
                    <Text style={styles.richText}>
                        <Text style={styles.bText}>B</Text>
                        <Text style={styles.orderText}>ORDER</Text>
                        <Text style={styles.BText}>B</Text>
                        <Text style={styles.uddyText}>UDDY</Text>
                    </Text>
                </View>
                
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        Seamless Global Shopping{'\n'}Rewarding Travelers
                    </Text>
                </View>

                <TouchableOpacity style={styles.getStartedButton} onPress={onTapGetStarted}>
                    <Text style={styles.getStartedText}>Get Started</Text>
                    <Image 
                        source={require("../../assets/images/imgArrowright.png")}
                        style={styles.arrowIcon}
                    />
                </TouchableOpacity>
            </View>
            <Image 
                source={require("../../assets/images/TopImage.png")} 
                style={styles.bottomImage}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Color.colorWhite,
  },
  container2: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Padding.p_xl,
  },
  imageContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      alignItems: 'center',
  },
  topImage: {
      width: 153,
      height: 172,
      top: -50
  },
  textContainer: {
      alignItems: 'center',
      marginBottom: height * 0.02,
  },
  welcomeText: {
      fontSize: FontSize.size_5xl,
      fontWeight: '600',
      fontFamily: FontFamily.poppinsSemiBold,
      textShadowColor: Color.colorLightgray_100,
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      color: '#C6BEBE',
      alignItems: 'center',
      justifyContent: 'center',
  },
  richText: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: height * 0.01,
  },
  bText: {
      fontSize: FontSize.size_31xl,
      color: Color.colorCoral_100,
      fontFamily: FontFamily.poppinsBold,
  },
  BText: {
    fontSize: FontSize.size_31xl,
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsBold,
  },
  orderText: {
      fontSize: FontSize.size_9xl,
      color: Color.colorCoral_100,
      fontFamily: FontFamily.poppinsBold,
  },
  uddyText: {
      fontSize: FontSize.size_9xl,
      color: Color.colorBlack,
      fontFamily: FontFamily.poppinsBold,
  },
  descriptionContainer: {
      marginVertical: height * 0.02,
      width: '80%',
      alignItems: 'center',
  },
  descriptionText: {
      fontSize: FontSize.size_lg,
      textAlign: 'center',
      color: Color.colorGray_100,
  },
  getStartedButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Color.colorCoral_100,
      paddingHorizontal: Padding.p_xl,
      paddingVertical: Padding.p_4xs,
      borderRadius: Border.br_25xl,
      marginTop: height * 0.03,
      width: '50%',
  },
  getStartedText: {
      fontSize: 16,
      color: Color.colorWhite,
      fontFamily: FontFamily.kanitMedium,
  },
  arrowIcon: {
    marginLeft: 10,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  bottomImage: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 157,
      height: 176,
      transform: [{ rotate: '180deg' }],
  },
});

export default SplashScreen;

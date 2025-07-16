import React from 'react';
import { View, Text, ScrollView, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { utl } from '../../styles/utl';
import PrimaryButton from '../../components/PrimaryButtons';
import { useRouter } from 'expo-router';


export default function WelcomeScreen2() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require('../../assets/images/welcome1-background.png')}
      style={[utl.flex1, utl.bgDark]}
      resizeMode='contain'
    
    >
      <ScrollView style={[utl.flex1, utl.py64]}>
        
        {/* CONTENT */}
        <View style={[utl.px16]}>
          <Text style={[utl.textLight, utl.textCenter, utl.text3xl, utl.fontJostBold, utl.mb12]}>
            YOUR OWN MYSTERY NIGHT
          </Text>

          <Text style={[utl.textSecondary, utl.textCenter, utl.textBase, utl.fontJost, utl.mb16]}>
           Play again and again with free and premium themes. Personalize every session for endless replayability.
          </Text>

        </View>

        {/* IMAGE HERO */}
        <Image
          source={require('../../assets/images/welcome-screen3-image.png')}
          style={{
            width: '100%',
            height: 478,
          }}
            resizeMode='contain'
          
        />

        {/* PAGINATION DOTS */}
        <View style={[utl.flexRow, utl.justifyCenter, utl.mb12, utl.mt12]}>
          <View style={{
            width: 10, height: 10, borderRadius: 5, marginHorizontal: 4, backgroundColor: '#1F1F1F'
          }} />
          <View style={{
            width: 10, height: 10, borderRadius: 5, marginHorizontal: 4, backgroundColor: '#1F1F1F'
          }} />
          <View style={{
            width: 10, height: 10, borderRadius: 5, marginHorizontal: 4, backgroundColor: '#CBA84E'
          }} />
        </View>

        {/* BUTTON */}
        <View style={[utl.mb24, utl.px24]}>
          <PrimaryButton
            title="Get Started"
            icon={<Ionicons name="search" size={20} color="#333" />}
            onPress={() => router.push('/LoginScreen')}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
 
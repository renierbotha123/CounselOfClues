import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { utl } from '../../styles/utl';
import PrimaryButton from '../../components/PrimaryButtons';
import { ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';


export default function WelcomeScreen() {
  const router = useRouter();

  return (
    

<ImageBackground
    source={require('../../assets/images/welcome1-background.png')}
    style={[utl.flex1, utl.bgDark]}
    resizeMode='center'
    >
    <ScrollView style={[utl.flex1, utl.py64]}>
      
     {/* CONTENT */}
      <View style={[utl.px16]}>
        <Text style={[utl.textLight, utl.textCenter, utl.text3xl, utl.fontJostBold, utl.mb12 ]}>
          WELCOME TO {"\n"} COUNSEL OF CLUES
        </Text>

         <Text style={[utl.textSecondary, utl.textCenter, utl.textBase, utl.fontJost, utl.mb16]}>
         <Text style={[utl.textGold, utl.textCenter, utl.textBase, utl.fontJostBold]}>Gather{' '}</Text>
          your friends.{' '}
          <Text style={[utl.textGold, utl.textCenter, utl.textBase, utl.fontJostBold]}>Choose{' '}</Text>
          a theme. Immerse yourselves in a mystery you must{' '}
          <Text style={[utl.textGold, utl.textCenter, utl.textBase, utl.fontJostBold]}>solve</Text>
          .
        </Text>
        
        </View>

         {/* IMAGE HERO */}
      <Image
        source={require('../../assets/images/welcome-screen1-image.png')}
        style={{
          width: '100%',
          height: 478,
          }}
          resizeMode='contain'
      />

        {/* PAGINATION DOTS */}
        <View style={[utl.flexRow, utl.justifyCenter, utl.mb12, utl.mt12]}>
          <View style={{
            width: 10, height: 10, borderRadius: 5, marginHorizontal: 4, backgroundColor: '#CBA84E'
          }} />
          <View style={{
            width: 10, height: 10, borderRadius: 5, marginHorizontal: 4, backgroundColor: '#1F1F1F'
          }} />
          <View style={{
            width: 10, height: 10, borderRadius: 5, marginHorizontal: 4, backgroundColor: '#1F1F1F'
          }} />
        </View>

       
        <View style={[ utl.mb24, utl.px24]}>  
       <PrimaryButton
          title="Next"
          icon={<Ionicons name="arrow-forward" size={20} color="#333" />}
          onPress={() => router.push('/onboarding/WelcomeScreen2')}
        /> 
      </View>

    </ScrollView>
    </ImageBackground>
  );
}

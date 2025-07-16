import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { utl } from '../styles/utl';
import PrimaryButton from '../components/PrimaryButtons';
import InputField from '../components/InputField';
import { Image } from 'react-native';
import SocialButton from '../components/SocialButton';
import api from '../src/api/api';
import { saveToken } from '../src/utils/authTokens';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const validateInputs = () => {
  const newErrors: string[] = [];

  if (!name.trim()) newErrors.push('Name is required.');
  if (!email.trim()) newErrors.push('Email is required.');
  else if (!email.includes('@')) newErrors.push('Email must be valid.');
  if (!password) newErrors.push('Password is required.');
  else if (password.length < 6) newErrors.push('Password must be at least 6 characters.');
  if (password !== confirmPassword) newErrors.push('Passwords do not match.');

  setErrors(newErrors);
  return newErrors.length === 0;
};



const router = useRouter();

const handleSignUp = async () => {
  if (!validateInputs()) return;

  try {
    const response = await api.post('/auth/register', {
      username: name,
      email,
      password
    });

    console.log('✅ Registered:', response.data);
    await saveToken(response.data.token);
    router.replace('/HomeScreen'); // or wherever you want to send them
  } catch (error) {
    console.error('❌ Sign up failed:', error);
    setErrors(['Could not sign up. Please try again.']);
  }
};



  return (
    <ScrollView contentContainerStyle={[utl.flex1, utl.bgDark, utl.px24, utl.py64]}>
      {/* LOGO / TITLE */}
       {/* IMAGE HERO */}
                    <Image
                      source={require('../assets/images/logo.png')}
                      style={{
                        width: '100%',
                        height: 50,
                        marginBottom: 12,
                      }}
                        resizeMode='contain'
                      
                    />

      {/* HEADING */}
      <View style={[utl.mb16]}>
        <Text style={[utl.textPrimary, utl.textLeft, utl.text2xl, utl.fontJostBold, utl.mb12]}>
          SIGN UP
        </Text>
        <Text style={[utl.textSecondary, utl.textLeft, utl.textBase, utl.fontInter]}>
          Sign up with your social accounts:
        </Text>
      </View>

      {/* SOCIAL BUTTONS */}
           <View style={[utl.flexRow, utl.justifyBetween, utl.mb16]}>
       <SocialButton
         title="with Google"
         icon={require('../assets/icons/google.png')}
         onPress={() => console.log('Google Sign-In')}
         style={[utl.flex1, utl.mr8]}
       />
       <SocialButton
         title="with Apple"
         icon={require('../assets/icons/apple.png')}
         onPress={() => console.log('Apple Sign-In')}
         style={[utl.flex1, utl.ml8]}
       />
     </View>

      {/* SEPARATOR */}
      <Text style={[utl.textSecondary, utl.textLeft, utl.mb8, utl.fontInter]}>
        Or with email
      </Text>

      {/* INPUT FIELDS */}
      <InputField
        label="Name"
        required
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={utl.mb16}
      />
      <InputField
        label="Email"
        required
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={utl.mb16}
      />
      <InputField
        label="Password"
        required
        placeholder="Password"
        secure
        value={password}
        onChangeText={setPassword}
        style={utl.mb16}
      />
      
      <InputField
        label="Confirm Password"
        required
        placeholder="Confirm Password"
        secure
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={utl.mb16}
        />

        {errors.length > 0 && (
  <View style={[utl.mb12, utl.mt12]}>
    {errors.map((error, index) => (
      <Text key={index} style={[utl.textError, utl.textSm, utl.mb4]}>
        {error}
      </Text>
    ))}
  </View>
)}

        

      {/* PRIMARY BUTTON */}
      <PrimaryButton
        title="Sign Up"
        onPress={handleSignUp}
      />

      {/* LINK BACK TO LOGIN */}
      <Text style={[utl.textSecondary, utl.textCenter, utl.fontInter, utl.mt16, utl.textBase]}>
        Already have an account?{' '}
        <Link href="/LoginScreen">
          <Text style={[utl.textGold, utl.fontInterSemiBold]}>Log in here</Text>
        </Link>
      </Text>
       
       <View
  style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 400,
    height: 400,
    opacity: 0.8,
  }}
  pointerEvents="none"
>
  <Image
    source={require('../assets/images/dotPattern.png')}
    style={{
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    }}
  />
</View>


    </ScrollView>
  );
}

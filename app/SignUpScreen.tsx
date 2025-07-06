import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { utl } from '../styles/utl';
import PrimaryButton from '../components/PrimaryButtons';
import InputField from '../components/InputField';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Simple console log for now
    console.log('Sign Up:', { name, email, password, confirmPassword });
    // Later, add validation or API call here
  };

  return (
    <ScrollView contentContainerStyle={[utl.flex1, utl.bgDark, utl.px24, utl.py64]}>
      {/* LOGO / TITLE */}
      <View style={[utl.mb16]}>
        <Text style={[utl.textGold, utl.textCenter, utl.text3xl, utl.fontJostBold]}>
          COUNSEL OF CLUES
        </Text>
      </View>

      {/* HEADING */}
      <View style={[utl.mb16]}>
        <Text style={[utl.textPrimary, utl.textLeft, utl.text2xl, utl.fontJostBold, utl.mb12]}>
          SIGN UP
        </Text>
        <Text style={[utl.textSecondary, utl.textLeft, utl.textBase, utl.fontInter]}>
          Create a new account
        </Text>
      </View>

      {/* SOCIAL BUTTONS */}
      <View style={[utl.flexRow, utl.justifyBetween, utl.mb16]}>
        <Pressable style={[utl.bgWhite, utl.py12, utl.px16, utl.roundedLg, utl.flex1, utl.itemsCenter, utl.mr8]}>
          <Text style={[utl.textDark, utl.fontInter]}>🔎  Google</Text>
        </Pressable>
        <Pressable style={[utl.bgWhite, utl.py12, utl.px16, utl.roundedLg, utl.flex1, utl.itemsCenter, utl.ml8]}>
          <Text style={[utl.textDark, utl.fontInter]}>🍎  Apple</Text>
        </Pressable>
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
    </ScrollView>
  );
}

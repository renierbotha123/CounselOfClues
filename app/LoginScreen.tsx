import React, {useState} from 'react';
import { View, Text, TextInput, Pressable, ScrollView, TextBase } from 'react-native';
import { Link } from 'expo-router';
import { utl } from '../styles/utl';
import PrimaryButton from '../components/PrimaryButtons';
import InputField from '../components/InputField';



export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        <Text style={[utl.textPrimary, utl.textLeft, utl.text2xl, utl.fontJostBold]}>
         LOG IN
        </Text>
        <Text style={[utl.textSecondary, utl.textLeft, utl.textBase, utl.fontJost, utl.textBase]}>
          Log in with your social accounts
        </Text>
      </View>

      {/* SOCIAL BUTTONS */}
      <View style={[utl.flexRow, utl.justifyBetween, utl.mb16]}>
        <Pressable style={[utl.bgWhite, utl.py12, utl.px16, utl.roundedLg, utl.flex1, utl.itemsCenter, utl.mr8]}>
          <Text style={[utl.textDark, utl.fontJost]}>🔎  Google</Text>
        </Pressable>
        <Pressable style={[utl.bgWhite, utl.py12, utl.px16, utl.roundedLg, utl.flex1, utl.itemsCenter, utl.ml8]}>
          <Text style={[utl.textDark, utl.fontJost]}>🍎  Apple</Text>
        </Pressable>
      </View>

      {/* SEPARATOR */}
      <Text style={[utl.textSecondary, utl.textLeft, utl.mb16, utl.fontJost, utl.textBase]}>
        Or with email
      </Text>

      {/* INPUT FIELDS */}
       <View style={[utl.mb16]}>
      <InputField
        label='Email'
        required
        placeholder='Enter your email'
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
        style={utl.mb4}
        />

        <Pressable>
          <Text style={[utl.textGold, utl.textRight, utl.fontJostSemiBold]}>
            Forgot password?
          </Text>
        </Pressable>
      </View>

      {/* PRIMARY BUTTON */}
      <PrimaryButton
        title="Log In"
        onPress={() => console.log('Logging in')}
        />

      {/* SIGN UP LINK */}
      <Text style={[utl.textSecondary, utl.textCenter, utl.fontJost, utl.mt12, utl.textBase]}>
        First time here?{' '}
        <Link href="/SignUpScreen">
          <Text style={[utl.textGold, utl.textBase, utl.fontJostSemiBold]}>Sign up for free</Text>
        </Link>
      </Text>
    </ScrollView>
  );
}

import React, {useState} from 'react';
import { View, Text, TextInput, Pressable, ScrollView, TextBase, ImageBackground } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { utl } from '../styles/utl';
import PrimaryButton from '../components/PrimaryButtons';
import InputField from '../components/InputField';
import { Image } from 'react-native';
import SocialButton from '../components/SocialButton';
import api from '../src/api/api';
import { saveToken } from '../src/utils/authTokens';




export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const validateInputs = () => {
  const newErrors: string[] = [];
  if (!email.trim()) newErrors.push('Email is required.');
  else if (!email.includes('@')) newErrors.push('Email must be valid.');
  if (!password) newErrors.push('Password is required.');
  setErrors(newErrors);
  return newErrors.length === 0;
};

const router = useRouter();

const handleLogin = async () => {
  if (!validateInputs()) return;

  try {
    const response = await api.post('/auth/login', {
      email,
      password
    });

    console.log('✅ Logged in:', response.data);
    await saveToken(response.data.token);
    router.replace('/HomeScreen'); // or wherever you want to go
  } catch (error) {
    console.error('❌ Login failed:', error);
    setErrors(['Invalid email or password.']);
  }
};


  
  return (
     
    <ScrollView contentContainerStyle={[utl.flex1,utl.px24, utl.bgDark, utl.py64]}>

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
        <Text style={[utl.textPrimary, utl.textLeft, utl.text2xl, utl.fontJostBold]}>
         LOG IN
        </Text>
        <Text style={[utl.textSecondary, utl.textLeft, utl.textBase, utl.fontJost, utl.textBase]}>
          Log in with your social accounts
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

        {errors.length > 0 && (
  <View style={[utl.mb16]}>
    {errors.map((error, index) => (
      <Text key={index} style={[utl.textError, utl.textSm, utl.mb4]}>
        {error}
      </Text>
    ))}
  </View>
)}

        <Pressable>
          <Text style={[utl.textGold, utl.textRight, utl.fontJostSemiBold]}>
            Forgot password?
          </Text>
        </Pressable>
      </View>

      {/* PRIMARY BUTTON */}
      <PrimaryButton title="Log In" onPress={handleLogin} />


      {/* SIGN UP LINK */}
      <Text style={[utl.textSecondary, utl.textCenter, utl.fontJost, utl.mt12, utl.textBase]}>
        First time here?{' '}
        <Link href="/SignUpScreen">
          <Text style={[utl.textGold, utl.textBase, utl.fontJostSemiBold]}>Sign up for free</Text>
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

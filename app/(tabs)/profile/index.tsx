import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { utl } from '../../../styles/utl';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Replace the URL with your actual API endpoint
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfile(data);
        setError(null);
      } catch (err: any) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={[utl.flex1, utl.bgDark, utl.justifyCenter, utl.itemsCenter]}>
        <Text style={[utl.textGold, utl.text2xl, utl.fontJostBold]}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[utl.flex1, utl.bgDark, utl.justifyCenter, utl.itemsCenter]}>
        <Text style={[utl.textGold, utl.text2xl, utl.fontJostBold]}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[utl.flex1, utl.bgDark, utl.justifyCenter, utl.itemsCenter]}>
      <Text style={[utl.textGold, utl.text2xl, utl.fontJostBold]}>
        {profile ? `Welcome, ${profile.name}` : 'Profile Screen'}
      </Text>
      {profile && (
        <Text style={[utl.textGold, utl.textLg, { marginTop: 10 }]}>
          Email: {profile.email}
        </Text>
      )}
    </View>
  );
}

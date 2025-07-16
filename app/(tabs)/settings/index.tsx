import { View, Text } from 'react-native';
import { utl } from '../../../styles/utl';

export default function SettingsScreen() {
  return (
    <View style={[utl.flex1, utl.bgDark, utl.justifyCenter, utl.itemsCenter]}>
      <Text style={[utl.textGold, utl.text2xl, utl.fontJostBold]}>
        Settings Screen
      </Text>
    </View>
  );
}

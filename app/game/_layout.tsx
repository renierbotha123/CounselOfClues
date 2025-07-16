import { Stack } from 'expo-router';

export default function GameLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#FFD700',
        headerTitleStyle: { fontFamily: 'Jost_700Bold' },
        contentStyle: { backgroundColor: '#121212' },
      }}
    >
      <Stack.Screen name="LobbyScreen" options={{ title: 'Lobby' }} />
      <Stack.Screen name="JoinScreen" options={{ title: 'Join Game' }} />
      <Stack.Screen name="RoleScreen" options={{ title: 'Your Role' }} />
      <Stack.Screen name="NarrativeScreen" options={{ title: 'Story' }} />
      <Stack.Screen name="QuestionScreen" options={{ title: 'Question' }} />
      <Stack.Screen name="VotingScreen" options={{ title: 'Vote' }} />
      <Stack.Screen name="ResultsScreen" options={{ title: 'Results' }} />
    </Stack>
  );
}

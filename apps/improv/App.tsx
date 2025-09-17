import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DrawScreen } from './src/screens/DrawScreen';
import { BrowseScreen } from './src/screens/BrowseScreen';
import { PracticeScreen } from './src/screens/PracticeScreen';
import { CardDetailModal } from './src/components/CardDetailModal';
import { Card as CardType } from './src/constants/cards';
import { RootStackParamList } from './src/types/navigation';
import { SettingsProvider } from './src/contexts/SettingsContext';
import { ErrorBoundary } from './src/components/ErrorBoundary';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabs({ onCardPress }: { onCardPress: (card: CardType) => void }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#6b7280',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Draw"
        options={{
          tabBarLabel: 'Practice',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 18 }}>{focused ? '🎲' : '🎲'}</Text>
          ),
        }}
      >
        {props => <DrawScreen {...props} onCardPress={onCardPress} />}
      </Tab.Screen>
      <Tab.Screen
        name="Browse"
        options={{
          tabBarLabel: 'Browse',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 18 }}>{focused ? '📚' : '📚'}</Text>
          ),
        }}
      >
        {props => <BrowseScreen {...props} onCardPress={onCardPress} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const handleCardPress = (card: CardType) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <SettingsProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Main" options={{ headerShown: false }}>
                {() => <MainTabs onCardPress={handleCardPress} />}
              </Stack.Screen>
              <Stack.Screen
                name="Practice"
                options={{
                  title: 'Practice Session',
                  headerStyle: {
                    backgroundColor: '#ffffff',
                  },
                  headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: '600',
                  },
                }}
              >
                {props => <PracticeScreen {...props} onCardPress={handleCardPress} />}
              </Stack.Screen>
            </Stack.Navigator>

            <CardDetailModal
              card={selectedCard}
              visible={!!selectedCard}
              onClose={handleCloseModal}
            />

            <StatusBar style="dark" />
          </NavigationContainer>
        </SettingsProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

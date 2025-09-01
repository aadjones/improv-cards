import React, { useState } from 'react';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DrawScreen } from './src/screens/DrawScreen';
import { BrowseScreen } from './src/screens/BrowseScreen';
import { CardDetailModal } from './src/components/CardDetailModal';
import { Card as CardType } from './src/constants/cards';

const Tab = createBottomTabNavigator();

export default function App() {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [activeTab, setActiveTab] = useState('Draw');

  const handleCardPress = (card: CardType) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handlePracticeThis = () => {
    // Navigate to draw screen and set this card as drawn
    setSelectedCard(null);
    setActiveTab('Draw');
    // TODO: Implement practice this functionality
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#2563eb',
            tabBarInactiveTintColor: '#6b7280',
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: '600',
            },
            tabBarStyle: {
              backgroundColor: '#ffffff',
              borderTopWidth: 1,
              borderTopColor: '#e5e7eb',
              paddingTop: 8,
              paddingBottom: 8,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
              marginTop: 4,
            },
          }}
        >
          <Tab.Screen
            name="Draw"
            options={{
              title: 'Draw Cards',
              tabBarLabel: 'Draw',
              tabBarIcon: ({ focused, color }) => (
                <Text style={{ fontSize: 20, color }}>{focused ? '🎲' : '🎯'}</Text>
              ),
            }}
          >
            {(props) => <DrawScreen {...props} onCardPress={handleCardPress} />}
          </Tab.Screen>
          <Tab.Screen
            name="Browse"
            options={{
              title: 'Browse All Cards',
              tabBarLabel: 'Browse',
              tabBarIcon: ({ focused, color }) => (
                <Text style={{ fontSize: 20, color }}>{focused ? '📚' : '📖'}</Text>
              ),
            }}
          >
            {(props) => <BrowseScreen {...props} onCardPress={handleCardPress} />}
          </Tab.Screen>
        </Tab.Navigator>

        <CardDetailModal
          card={selectedCard}
          visible={!!selectedCard}
          onClose={handleCloseModal}
          onPracticeThis={activeTab === 'Browse' ? handlePracticeThis : undefined}
        />

        <StatusBar style="dark" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

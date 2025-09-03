import React, { useState } from 'react';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DrawScreen } from './src/screens/DrawScreen';
import { BrowseScreen } from './src/screens/BrowseScreen';
import { PracticeScreen } from './src/screens/PracticeScreen';
import { CardDetailModal } from './src/components/CardDetailModal';
import { Card as CardType } from './src/constants/cards';
import { RootStackParamList } from './src/types/navigation';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator({
  navigation: parentNavigation,
  onCardPress,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  onCardPress: (card: CardType) => void;
}) {
  return (
    <>
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
            title: 'Setup',
            tabBarLabel: 'Setup',
            tabBarIcon: ({ focused, color }) => (
              <Text style={{ fontSize: 20, color }}>{focused ? '🎲' : '🎯'}</Text>
            ),
          }}
        >
          {_props => <DrawScreen navigation={parentNavigation} onCardPress={onCardPress} />}
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
          {props => <BrowseScreen {...props} onCardPress={onCardPress} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

function PracticeTabNavigator({
  navigation: parentNavigation,
  onCardPress,
  route,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  onCardPress: (card: CardType) => void;
  route: NativeStackScreenProps<RootStackParamList, 'Practice'>['route'];
}) {
  return (
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
        name="PracticeSession"
        options={{
          title: 'Practice Session',
          tabBarLabel: 'Practice',
          tabBarIcon: ({ focused, color }) => (
            <Text style={{ fontSize: 20, color }}>{focused ? '🎹' : '🎼'}</Text>
          ),
        }}
      >
        {props => <PracticeScreen {...props} route={route} onCardPress={onCardPress} />}
      </Tab.Screen>
      <Tab.Screen
        name="NewSession"
        options={{
          title: 'New Session',
          tabBarLabel: 'New Session',
          tabBarIcon: ({ focused, color }) => (
            <Text style={{ fontSize: 20, color }}>{focused ? '🎲' : '🎯'}</Text>
          ),
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            parentNavigation.navigate('Main');
          },
        }}
      >
        {() => null}
      </Tab.Screen>
      <Tab.Screen
        name="BrowsePractice"
        options={{
          title: 'Browse All Cards',
          tabBarLabel: 'Browse',
          tabBarIcon: ({ focused, color }) => (
            <Text style={{ fontSize: 20, color }}>{focused ? '📚' : '📖'}</Text>
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
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main">
            {props => <TabNavigator navigation={props.navigation} onCardPress={handleCardPress} />}
          </Stack.Screen>
          <Stack.Screen
            name="Practice"
            options={{
              headerShown: false,
            }}
          >
            {props => (
              <PracticeTabNavigator
                navigation={props.navigation}
                onCardPress={handleCardPress}
                route={props.route}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>

        <CardDetailModal card={selectedCard} visible={!!selectedCard} onClose={handleCloseModal} />

        <StatusBar style="dark" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

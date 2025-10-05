import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PracticeScreen from './src/screens/PracticeScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import CustomScreen from './src/screens/CustomScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
              backgroundColor: '#FFFFFF',
              borderTopColor: '#E5E7EB',
              borderTopWidth: 1,
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
            },
            tabBarActiveTintColor: '#2563EB',
            tabBarInactiveTintColor: '#9CA3AF',
            headerStyle: {
              backgroundColor: '#FFFFFF',
              borderBottomColor: '#F3F4F6',
              borderBottomWidth: 1,
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: '700',
            },
          }}
        >
          <Tab.Screen
            name="Practice"
            component={PracticeScreen}
            options={{
              title: 'Practice',
              tabBarLabel: 'Practice',
            }}
          />
          <Tab.Screen
            name="Library"
            component={LibraryScreen}
            options={{
              title: 'Library',
              tabBarLabel: 'Library',
            }}
          />
          <Tab.Screen
            name="Custom"
            component={CustomScreen}
            options={{
              title: 'Custom',
              tabBarLabel: 'Custom',
            }}
          />
        </Tab.Navigator>
        <StatusBar style="dark" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

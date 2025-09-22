import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import Home from './src/screens/Home';
import Balance from './src/screens/Balance';
import Library from './src/screens/Library';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#f8f9fa' },
          headerStyle: { backgroundColor: '#f8f9fa' },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Practice',
            tabBarLabel: 'Practice',
          }}
        />
        <Tab.Screen
          name="Balance"
          component={Balance}
          options={{
            title: 'Balance',
            tabBarLabel: 'Balance',
          }}
        />
        <Tab.Screen
          name="Library"
          component={Library}
          options={{
            title: 'Library',
            tabBarLabel: 'Library',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

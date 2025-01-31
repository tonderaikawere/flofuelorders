import React from 'react';
import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          height: 70,
        }
      }}
    >
      <Tabs.Screen 
        name='index' 
        options={{
          tabBarLabel: '', // Optional: Add label to display
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} // Home icon with outline for inactive state
              size={22} 
              color={focused ? '#fff' : '#6A0DAD'} 
              style={[styles.icon, focused && styles.activeTab]} 
            />
          )
        }} 
      />
      <Tabs.Screen 
        name='clients' 
        options={{
          tabBarLabel: '', // Optional: Add label to display
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? 'person-add' : 'person-add-outline'} // Person add icon for clients tab
              size={22} 
              color={focused ? '#fff' : '#6A0DAD'} 
              style={[styles.icon, focused && styles.activeTab]} 
            />
          )
        }} 
      />
      <Tabs.Screen 
        name='activities' 
        options={{
          tabBarLabel: '', // Optional: Add label to display
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? 'pulse' : 'pulse-outline'} // Pulse icon for activities tab
              size={22} 
              color={focused ? '#fff' : '#6A0DAD'} 
              style={[styles.icon, focused && styles.activeTab]} 
            />
          )
        }} 
      />
      <Tabs.Screen 
        name='feedback' 
        options={{
          tabBarBadge: 3, // Optional: Badge with number for notifications or feedback
          tabBarLabel: '', // Optional: Add label to display
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'} // Chat bubble icon for feedback tab
              size={22} 
              color={focused ? '#fff' : '#6A0DAD'} 
              style={[styles.icon, focused && styles.activeTab]} 
            />
          )
        }} 
      />
      <Tabs.Screen 
        name='threshold' 
        options={{
          tabBarLabel: '', // Optional: Add label to display
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? 'person-add' : 'person-add-outline'} // Settings icon with outline for inactive state
              size={22} 
              color={focused ? '#fff' : '#6A0DAD'} 
              style={[styles.icon, focused && styles.activeTab]} 
            />
          )
        }} 
      />
      <Tabs.Screen 
        name='settings' 
        options={{
          tabBarLabel: '', // Optional: Add label to display
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? 'settings' : 'settings-outline'} // Settings icon with outline for inactive state
              size={22} 
              color={focused ? '#fff' : '#6A0DAD'} 
              style={[styles.icon, focused && styles.activeTab]} 
            />
          )
        }} 
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#6A0DAD',
    borderRadius: 30,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
});

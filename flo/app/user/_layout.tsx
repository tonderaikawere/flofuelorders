import React from 'react';
import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          tabBarLabel: '', // Show label on mobile, hide on web
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={22}
              color={focused ? '#fff' : '#6A0DAD'}
              style={[styles.icon, focused && styles.activeTab]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='transactions'
        options={{
          tabBarLabel: '', // Show label on mobile, hide on web
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'cash' : 'cash-outline'}
              size={22}
              color={focused ? '#fff' : '#6A0DAD'}
              style={[styles.icon, focused && styles.activeTab]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='notifications'
        options={{
          tabBarLabel: '', // Show label on mobile, hide on web
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'notifications' : 'notifications-outline'}
              size={22}
              color={focused ? '#fff' : '#6A0DAD'}
              style={[styles.icon, focused && styles.activeTab]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          tabBarLabel: '', // Show label on mobile, hide on web
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={22}
              color={focused ? '#fff' : '#6A0DAD'}
              style={[styles.icon, focused && styles.activeTab]}
            />
          ),
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

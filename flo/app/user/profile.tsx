import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <Text style={styles.header}>Profile</Text>

      {/* Fuel Refill Icon */}
      <TouchableOpacity style={styles.refillButton}>
        <MaterialIcons name="local-gas-station" size={50} color="#FFF" />
        <Text style={styles.refillButtonText}>Refill Fuel</Text>
      </TouchableOpacity>

      {/* Profile Details */}
      <View style={styles.profileCard}>
        <Text style={styles.profileText}>Name: John Doe</Text>
        <Text style={styles.profileText}>Phone: +123 456 7890</Text>
        <Text style={styles.profileText}>Fuel Left: **$30**</Text>
        <Text style={styles.profileText}>Total Refills: **$150**</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', position: 'relative' },
  circle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    backgroundColor: '#7E57C2',
    borderRadius: 150,
    top: -100,
    left: -50,
    opacity: 0.4,
  },
  circle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: '#9575CD',
    borderRadius: 100,
    bottom: -80,
    right: -50,
    opacity: 0.4,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 60,
    textAlign: 'center',
  },
  refillButton: {
    backgroundColor: '#7E57C2',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    shadowColor: '#9500ff',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
    elevation: 8,
  },
  refillButtonText: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 10,
  },
  profileCard: {
    backgroundColor: '#FFF', // White background
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 30,
    shadowColor: '#9500ff',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
    elevation: 8,
  },
  profileText: { fontSize: 16, color: '#333', marginBottom: 10 },
});

export default ProfileScreen;
